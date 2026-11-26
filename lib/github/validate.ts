// Pure: no server-only import, so it stays testable and reusable. Validation rules: docs/TECHNICAL_RESEARCH.md.

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface ContributionDay {
  readonly date: string;
  readonly count: number;
  readonly level: ContributionLevel;
}

export interface ContributionCalendar {
  readonly login: string;
  readonly startedAt: string;
  readonly endedAt: string;
  readonly total: number;
  readonly days: readonly ContributionDay[];
}

export type ValidationFailure =
  | "graphql-error"
  | "rate-limited"
  | "user-missing"
  | "user-mismatch"
  | "malformed"
  | "invalid-calendar";

export type ValidationResult =
  | { readonly ok: true; readonly calendar: ContributionCalendar }
  | { readonly ok: false; readonly reason: ValidationFailure };

const LEVELS = new Map<unknown, ContributionLevel>([
  ["NONE", 0],
  ["FIRST_QUARTILE", 1],
  ["SECOND_QUARTILE", 2],
  ["THIRD_QUARTILE", 3],
  ["FOURTH_QUARTILE", 4],
]);
const DAY_MS = 86_400_000;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIMESTAMP_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isCount = (value: unknown): value is number =>
  typeof value === "number" && Number.isSafeInteger(value) && value >= 0;

const fail = (reason: ValidationFailure): ValidationResult => ({ ok: false, reason });

/** Midnight UTC in ms, or null. The round trip rejects impossible dates such as 2026-02-31. */
function parseDate(value: unknown): number | null {
  if (typeof value !== "string" || !DATE_PATTERN.test(value)) return null;
  const time = Date.parse(`${value}T00:00:00Z`);
  if (Number.isNaN(time) || new Date(time).toISOString().slice(0, 10) !== value) return null;
  return time;
}

function isTimestamp(value: unknown): value is string {
  return typeof value === "string" && TIMESTAMP_PATTERN.test(value) &&
    parseDate(value.slice(0, 10)) !== null && Number.isFinite(Date.parse(value));
}

/** Days in order, or null on any invalid, missing, duplicated, or out-of-order day. */
function parseDays(weeks: readonly unknown[]): ContributionDay[] | null {
  const days: ContributionDay[] = [];
  let previous: number | null = null;
  for (const week of weeks) {
    if (!isRecord(week) || !Array.isArray(week.contributionDays)) return null;
    for (const day of week.contributionDays) {
      if (!isRecord(day)) return null;
      const time = parseDate(day.date);
      const level = LEVELS.get(day.contributionLevel);
      if (time === null || !isCount(day.contributionCount) || level === undefined) return null;
      if (previous !== null && time - previous !== DAY_MS) return null;
      previous = time;
      days.push({ date: day.date as string, count: day.contributionCount, level });
    }
  }
  return days.length > 0 ? days : null;
}

/** Validates a GitHub GraphQL contribution response body for `expectedLogin`. */
export function validateContributionResponse(body: unknown, expectedLogin: string): ValidationResult {
  if (!isRecord(body)) return fail("malformed");
  if ("errors" in body && !Array.isArray(body.errors)) return fail("malformed");
  if (Array.isArray(body.errors) && body.errors.length > 0) {
    const limited = body.errors.some((error) => isRecord(error) && error.type === "RATE_LIMITED");
    return fail(limited ? "rate-limited" : "graphql-error");
  }

  const user = isRecord(body.data) ? body.data.user : undefined;
  if (user === null) return fail("user-missing");
  if (!isRecord(user) || typeof user.login !== "string") return fail("malformed");
  if (user.login.toLowerCase() !== expectedLogin.toLowerCase()) return fail("user-mismatch");

  const collection = user.contributionsCollection;
  if (!isRecord(collection)) return fail("malformed");
  const { startedAt, endedAt, contributionCalendar: calendar } = collection;
  if (!isTimestamp(startedAt) || !isTimestamp(endedAt) || Date.parse(startedAt) > Date.parse(endedAt)) {
    return fail("malformed");
  }
  if (!isRecord(calendar) || !isCount(calendar.totalContributions) || !Array.isArray(calendar.weeks)) {
    return fail("malformed");
  }

  const days = parseDays(calendar.weeks);
  if (!days) return fail("invalid-calendar");
  const sum = days.reduce((total, day) => total + day.count, 0);
  if (sum !== calendar.totalContributions) return fail("invalid-calendar");

  return {
    ok: true,
    calendar: { login: user.login, startedAt, endedAt, total: calendar.totalContributions, days },
  };
}
