import "server-only";
import { githubContributionsToken } from "../env.ts";
import {
  validateContributionResponse,
  type ContributionCalendar,
  type ValidationFailure,
} from "./validate.ts";

const ENDPOINT = "https://api.github.com/graphql";
const TIMEOUT_MS = 3_000;
const MIN_RETRY_MS = 60_000;
const QUERY = `query($login: String!) {
  user(login: $login) {
    login
    repositories(ownerAffiliations: OWNER, privacy: PUBLIC, first: 100) { totalCount nodes { stargazerCount } }
    contributionsCollection {
      startedAt
      endedAt
      totalPullRequestContributions
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`;

export type FailureReason =
  | ValidationFailure
  | "missing-token"
  | "unauthorized"
  | "forbidden"
  | "timeout"
  | "network"
  | "upstream";

export type ContributionResult =
  | { readonly status: "ok"; readonly calendar: ContributionCalendar; readonly retrievedAt: string }
  | { readonly status: "unavailable"; readonly reason: FailureReason; readonly retryAfterMs?: number };

/** One uncached read. The activity reader owns refresh and fallback policy. */
export async function fetchContributionCalendar(
  login: string,
  token = githubContributionsToken(),
): Promise<ContributionResult> {
  if (!token) return unavailable("missing-token");

  let response: Response;
  const signal = AbortSignal.timeout(TIMEOUT_MS);
  try {
    response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
      cache: "no-store",
      signal,
      redirect: "error",
    });
  } catch (error) {
    return unavailable(isTimeout(error, signal) ? "timeout" : "network");
  }

  const wait = rateLimitWait(response.headers);
  if (!response.ok) {
    const reason = statusReason(response.status, wait);
    return unavailable(reason, reason === "rate-limited" ? (wait ?? MIN_RETRY_MS) : undefined, response);
  }

  let body: unknown;
  try {
    body = await response.json();
  } catch (error) {
    return unavailable(isTimeout(error, signal) ? "timeout" : "malformed", undefined, response);
  }

  const result = validateContributionResponse(body, login);
  if (!result.ok) {
    const limited = result.reason === "rate-limited" ||
      (result.reason === "graphql-error" && response.headers.get("x-ratelimit-remaining") === "0");
    return limited
      ? unavailable("rate-limited", wait ?? MIN_RETRY_MS, response)
      : unavailable(result.reason, undefined, response);
  }
  return { status: "ok", calendar: result.calendar, retrievedAt: new Date().toISOString() };
}

function isTimeout(error: unknown, signal: AbortSignal): boolean {
  return signal.aborted || (error instanceof DOMException && error.name === "TimeoutError");
}

/** Honor both upstream limits when present. */
function rateLimitWait(headers: Headers): number | undefined {
  const raw = headers.get("retry-after");
  const now = Date.now();
  const seconds = Number(raw);
  const secondary = raw === null ? 0 : Number.isFinite(seconds)
    ? seconds * 1000
    : Date.parse(raw) - now;
  const reset = Number(headers.get("x-ratelimit-reset"));
  const primary = headers.get("x-ratelimit-remaining") === "0" && Number.isFinite(reset) && reset > 0
    ? reset * 1000 - now
    : 0;
  const wait = Math.max(Number.isFinite(secondary) ? secondary : 0, primary);
  return wait > 0 ? Math.max(wait, MIN_RETRY_MS) : undefined;
}

function statusReason(status: number, wait: number | undefined): FailureReason {
  if (status === 401) return "unauthorized";
  if (status === 429 || (status === 403 && wait !== undefined)) return "rate-limited";
  if (status === 403) return "forbidden";
  return "upstream";
}

function unavailable(reason: FailureReason, retryAfterMs?: number, response?: Response): ContributionResult {
  // Diagnostic metadata only: never the token or the response body.
  console.warn("[github-contributions] unavailable", {
    reason,
    status: response?.status,
    requestId: response?.headers.get("x-github-request-id") ?? undefined,
    retryAfterMs,
  });
  return retryAfterMs === undefined
    ? { status: "unavailable", reason }
    : { status: "unavailable", reason, retryAfterMs };
}
