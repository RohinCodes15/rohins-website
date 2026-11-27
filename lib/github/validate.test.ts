import assert from "node:assert/strict";
import { test } from "node:test";
import { validateContributionResponse } from "./validate.ts";

type Day = { date: string; contributionCount: unknown; contributionLevel: unknown };

const day = (date: string, count = 0, level = count ? "FIRST_QUARTILE" : "NONE"): Day => ({
  date,
  contributionCount: count,
  contributionLevel: level,
});

function body(weeks: Day[][], total?: number, login = "octocat") {
  // Total of the valid counts only, so invalid days reach the calendar checks.
  const sum = weeks
    .flat()
    .reduce((t, d) => t + (Number.isSafeInteger(d.contributionCount) && (d.contributionCount as number) > 0 ? (d.contributionCount as number) : 0), 0);
  return {
    data: {
      user: {
        login,
        contributionsCollection: {
          startedAt: "2026-01-04T08:00:00Z",
          endedAt: "2026-01-10T07:59:59Z",
          contributionCalendar: {
            totalContributions: total ?? sum,
            weeks: weeks.map((contributionDays) => ({ contributionDays })),
          },
        },
      },
    },
  };
}

const reason = (input: unknown, login = "octocat") => {
  const result = validateContributionResponse(input, login);
  return result.ok ? "ok" : result.reason;
};

test("accepts a valid calendar across weeks and keeps raw counts", () => {
  const result = validateContributionResponse(
    body([[day("2026-01-03", 2)], [day("2026-01-04", 0), day("2026-01-05", 7, "FOURTH_QUARTILE")]]),
    "OctoCat",
  );
  assert.ok(result.ok);
  assert.equal(result.calendar.total, 9);
  assert.deepEqual(result.calendar.days, [
    { date: "2026-01-03", count: 2, level: 1 },
    { date: "2026-01-04", count: 0, level: 0 },
    { date: "2026-01-05", count: 7, level: 4 },
  ]);
});

test("treats a verified all-zero calendar as data", () => {
  assert.equal(reason(body([[day("2026-01-04"), day("2026-01-05")]])), "ok");
});

test("classifies GraphQL errors, including rate limits", () => {
  assert.equal(reason({ errors: [{ type: "RATE_LIMITED" }], data: null }), "rate-limited");
  assert.equal(reason({ errors: [{ message: "boom" }], data: null }), "graphql-error");
});

test("rejects missing or mismatched users", () => {
  assert.equal(reason({ data: { user: null } }), "user-missing");
  assert.equal(reason(body([[day("2026-01-04")]], undefined, "someone-else")), "user-mismatch");
});

test("rejects malformed shapes", () => {
  for (const input of [null, [], "x", { data: {} }, { data: { user: { login: 1 } } }]) {
    assert.equal(reason(input), "malformed");
  }
  const noCollection = { data: { user: { login: "octocat" } } };
  assert.equal(reason(noCollection), "malformed");
  const badDates = body([[day("2026-01-04")]]);
  (badDates.data.user.contributionsCollection as { startedAt: unknown }).startedAt = 5;
  assert.equal(reason(badDates), "malformed");
  const badTotal = body([[day("2026-01-04")]], -1);
  assert.equal(reason(badTotal), "malformed");
});

test("rejects invalid calendars instead of filling gaps", () => {
  const cases: Day[][][] = [
    [[day("2026-01-04"), day("2026-01-06")]], // gap
    [[day("2026-01-04"), day("2026-01-04")]], // duplicate
    [[day("2026-01-05"), day("2026-01-04")]], // out of order
    [[day("2026-02-31")]], // impossible date
    [[day("2026-1-04")]], // bad format
    [[day("2026-01-04", -1)]], // negative
    [[day("2026-01-04", 1.5)]], // fractional
    [[day("2026-01-04", 1, "HIGH")]], // unknown level
    [[day("2026-01-04", 1, "toString")]], // prototype key
    [], // empty
  ];
  for (const weeks of cases) assert.equal(reason(body(weeks)), "invalid-calendar");
  assert.equal(reason(body([[day("2026-01-04", 3)]], 4)), "invalid-calendar"); // total mismatch
  const badWeek = body([[day("2026-01-04")]]);
  (badWeek.data.user.contributionsCollection.contributionCalendar.weeks as unknown[]).push({});
  assert.equal(reason(badWeek), "invalid-calendar");
  const badDay = body([[day("2026-01-04")]]);
  (badDay.data.user.contributionsCollection.contributionCalendar.weeks[0].contributionDays as unknown[]).push(null);
  assert.equal(reason(badDay), "invalid-calendar");
});

test("rejects malformed GraphQL errors and invalid collection bounds", () => {
  const valid = body([[day("2026-01-04")]]);
  assert.equal(reason({ ...valid, errors: {} }), "malformed");
  valid.data.user.contributionsCollection.startedAt = "not a timestamp";
  assert.equal(reason(valid), "malformed");
});

function withProfile(repositories: unknown, pullRequests: unknown) {
  const input = body([[day("2026-01-04", 3)]]);
  const user = input.data.user as Record<string, unknown>;
  user.repositories = repositories;
  (user.contributionsCollection as Record<string, unknown>).totalPullRequestContributions = pullRequests;
  return input;
}

test("adds profile stats when they validate, summing stars over every public repository", () => {
  const result = validateContributionResponse(
    withProfile({ totalCount: 3, nodes: [{ stargazerCount: 2 }, { stargazerCount: 0 }, { stargazerCount: 5 }] }, 4),
    "octocat",
  );
  assert.ok(result.ok);
  assert.deepEqual(result.calendar.stats, { publicRepos: 3, stars: 7, pullRequests: 4 });
});

test("omits stars when not every repository was counted, and drops malformed stats without failing the calendar", () => {
  const partial = validateContributionResponse(withProfile({ totalCount: 150, nodes: [{ stargazerCount: 1 }] }, 2), "octocat");
  assert.ok(partial.ok);
  assert.deepEqual(partial.calendar.stats, { publicRepos: 150, pullRequests: 2 });

  const broken = validateContributionResponse(withProfile({ totalCount: -1, nodes: "x" }, "many"), "octocat");
  assert.ok(broken.ok);
  assert.equal(broken.calendar.stats, undefined);
  assert.equal(broken.calendar.total, 3);
});
