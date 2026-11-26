import assert from "node:assert/strict";
import { beforeEach, mock, test } from "node:test";
import { fetchContributionCalendar } from "./contributions.ts";

const validBody = {
  data: {
    user: {
      login: "octocat",
      contributionsCollection: {
        startedAt: "2026-01-04T08:00:00Z",
        endedAt: "2026-01-05T07:59:59Z",
        contributionCalendar: {
          totalContributions: 1,
          weeks: [{ contributionDays: [{ date: "2026-01-04", contributionCount: 1, contributionLevel: "FIRST_QUARTILE" }] }],
        },
      },
    },
  },
};

const respond = (status: number, body: unknown, headers: Record<string, string> = {}) =>
  mock.method(globalThis, "fetch", async () =>
    new Response(typeof body === "string" ? body : JSON.stringify(body), { status, headers }),
  );

function reset() {
  mock.restoreAll();
  mock.method(console, "warn", () => {});
}

beforeEach(reset);

test("missing token makes no request", async () => {
  const fetchMock = respond(200, validBody);
  const result = await fetchContributionCalendar("octocat", "");
  assert.deepEqual(result, { status: "unavailable", reason: "missing-token" });
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("sends a fixed query with variables and returns validated data", async () => {
  const fetchMock = respond(200, validBody);
  const result = await fetchContributionCalendar("octocat", "token");
  assert.equal(result.status, "ok");
  assert.ok(result.status === "ok" && result.calendar.total === 1);
  const [url, init] = fetchMock.mock.calls[0].arguments as [string, RequestInit];
  assert.equal(url, "https://api.github.com/graphql");
  assert.equal((init.headers as Record<string, string>).Authorization, "Bearer token");
  assert.deepEqual(JSON.parse(init.body as string).variables, { login: "octocat" });
});

test("classifies HTTP failures", async () => {
  const cases: [number, Record<string, string>, string][] = [
    [401, {}, "unauthorized"],
    [403, {}, "forbidden"],
    [403, { "retry-after": "120" }, "rate-limited"],
    [429, {}, "rate-limited"],
    [502, {}, "upstream"],
  ];
  for (const [status, headers, expected] of cases) {
    reset();
    respond(status, "", headers);
    const result = await fetchContributionCalendar("octocat", "token");
    assert.equal(result.status === "unavailable" && result.reason, expected, `HTTP ${status}`);
  }
});

test("rate-limit waits honour headers with a one-minute floor", async () => {
  respond(403, "", { "retry-after": "120" });
  assert.deepEqual(await fetchContributionCalendar("octocat", "token"), {
    status: "unavailable",
    reason: "rate-limited",
    retryAfterMs: 120_000,
  });

  reset();
  respond(429, "");
  const floor = await fetchContributionCalendar("octocat", "token");
  assert.ok(floor.status === "unavailable" && floor.retryAfterMs === 60_000);

  reset();
  const resetAt = Math.floor(Date.now() / 1000) + 600;
  respond(200, { errors: [{ type: "RATE_LIMITED" }] }, { "x-ratelimit-remaining": "0", "x-ratelimit-reset": String(resetAt) });
  const primary = await fetchContributionCalendar("octocat", "token");
  assert.ok(primary.status === "unavailable" && primary.reason === "rate-limited");
  assert.ok(primary.retryAfterMs !== undefined && primary.retryAfterMs > 500_000);
});

test("HTTP 200 with GraphQL errors or bad JSON is unavailable", async () => {
  respond(200, { errors: [{ message: "nope" }] });
  const graphql = await fetchContributionCalendar("octocat", "token");
  assert.ok(graphql.status === "unavailable" && graphql.reason === "graphql-error" && graphql.retryAfterMs === undefined);

  reset();
  respond(200, "not json");
  const malformed = await fetchContributionCalendar("octocat", "token");
  assert.ok(malformed.status === "unavailable" && malformed.reason === "malformed");
});

test("classifies timeouts and network errors", async () => {
  mock.method(globalThis, "fetch", async () => {
    throw new DOMException("timed out", "TimeoutError");
  });
  const timeout = await fetchContributionCalendar("octocat", "token");
  assert.ok(timeout.status === "unavailable" && timeout.reason === "timeout");

  reset();
  mock.method(globalThis, "fetch", async () => {
    throw new TypeError("fetch failed");
  });
  const network = await fetchContributionCalendar("octocat", "token");
  assert.ok(network.status === "unavailable" && network.reason === "network");
});

test("waits for the later of Retry-After and the exhausted primary reset", async () => {
  const resetAt = Math.floor(Date.now() / 1000) + 600;
  respond(403, "", {
    "retry-after": "120",
    "x-ratelimit-remaining": "0",
    "x-ratelimit-reset": String(resetAt),
  });
  const result = await fetchContributionCalendar("octocat", "token");
  assert.ok(result.status === "unavailable" && result.reason === "rate-limited");
  assert.ok(result.retryAfterMs !== undefined && result.retryAfterMs > 500_000);
});

test("recognizes exhausted primary budget on an HTTP 200 GraphQL error", async () => {
  respond(200, { errors: [{ message: "rate limit exceeded" }] }, {
    "x-ratelimit-remaining": "0",
  });
  assert.deepEqual(await fetchContributionCalendar("octocat", "token"), {
    status: "unavailable",
    reason: "rate-limited",
    retryAfterMs: 60_000,
  });
});

test("classifies a timeout while reading the body", async () => {
  mock.method(globalThis, "fetch", async () =>
    new Response(new ReadableStream({
      start(controller) {
        controller.error(new DOMException("timed out", "TimeoutError"));
      },
    })),
  );
  assert.deepEqual(await fetchContributionCalendar("octocat", "token"), {
    status: "unavailable",
    reason: "timeout",
  });
});
