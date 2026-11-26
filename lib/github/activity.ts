import "server-only";
import { getCache } from "@vercel/functions";
import { githubProfile } from "../../content/site.ts";
import { githubContributionsToken } from "../env.ts";
import { fetchContributionCalendar, type ContributionResult } from "./contributions.ts";

export const GITHUB_LOGIN = githubProfile.login;
type Snapshot = Extract<ContributionResult, { status: "ok" }>;
type Cache = Pick<ReturnType<typeof getCache>, "get" | "set">;
type Cooldown = { until: number; attempts: number };

const HOUR = 3_600_000;
const MAX_AGE = 24 * HOUR;
const KEY = `activity:v1:public:${GITHUB_LOGIN}`;
const COOLDOWN = `${KEY}:cooldown`;

export function createActivityReader(cache: Cache, fetchCalendar: () => Promise<ContributionResult>, now = Date.now) {
  let refresh: Promise<Snapshot | null> | undefined;
  let localCooldown: Cooldown | undefined;
  let withhold = false;

  async function read(key: string) {
    try {
      return await cache.get(key);
    } catch {
      console.warn("[github-activity] cache read failed");
      return null;
    }
  }

  async function write(key: string, value: unknown, ttl: number) {
    try {
      await cache.set(key, value, { ttl: Math.ceil(ttl / 1000) });
    } catch {
      console.warn("[github-activity] cache write failed");
    }
  }

  function usable(snapshot: Snapshot | null) {
    if (!snapshot || snapshot.status !== "ok" || snapshot.calendar?.login?.toLowerCase() !== GITHUB_LOGIN.toLowerCase()) return null;
    const age = now() - Date.parse(snapshot.retrievedAt);
    return age >= 0 && age < MAX_AGE ? snapshot : null;
  }

  async function update(cached: Snapshot | null, previous: Cooldown | null) {
    const result = await fetchCalendar();
    if (result.status === "ok") {
      await write(KEY, result, MAX_AGE);
      await write(COOLDOWN, null, HOUR);
      withhold = false;
      localCooldown = undefined;
      return result;
    }
    const denied = ["missing-token", "unauthorized", "forbidden", "user-missing", "user-mismatch"].includes(result.reason);
    const attempts = denied ? 1 : Math.min((previous?.attempts ?? 0) + 1, 7);
    const backoff = Math.max(result.retryAfterMs ?? 0, denied ? HOUR : 60_000 * 2 ** (attempts - 1));
    localCooldown = { until: now() + backoff, attempts };
    if (denied) {
      withhold = true;
      // A shared tombstone also keeps other instances from publishing a formerly visible snapshot.
      await write(KEY, null, MAX_AGE);
    }
    await write(COOLDOWN, { ...localCooldown, withhold }, Math.max(backoff, MAX_AGE));
    return withhold ? null : usable(cached);
  }

  return async () => {
    if (refresh) return refresh;
    const [value, limit] = await Promise.all([read(KEY), read(COOLDOWN)]);
    if (refresh) return refresh;
    const cached = usable(value as Snapshot | null);
    const shared = limit as (Cooldown & { withhold?: boolean }) | null;
    const cooldown = (localCooldown?.until ?? 0) > (shared?.until ?? 0) ? localCooldown : shared;
    const denied = withhold || shared?.withhold;
    if (!denied && cached && now() - Date.parse(cached.retrievedAt) < HOUR) return cached;
    if (cooldown && cooldown.until > now()) return denied ? null : cached;
    refresh = update(cached, cooldown ?? null).finally(() => { refresh = undefined; });
    return refresh;
  };
}

const readActivity = createActivityReader(getCache(), () => fetchContributionCalendar(GITHUB_LOGIN));

export async function getActivity() {
  if (!githubContributionsToken()) return null;
  return readActivity();
}
