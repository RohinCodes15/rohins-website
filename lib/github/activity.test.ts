import assert from "node:assert/strict";
import { test } from "node:test";
import { createActivityReader, GITHUB_LOGIN } from "./activity.ts";
import type { ContributionResult } from "./contributions.ts";

const hour = 3_600_000;

function harness() {
  let now = Date.parse("2026-11-25T12:00:00Z");
  let calls = 0;
  const values = new Map<string, unknown>();
  const cache = {
    get: async (key: string) => values.get(key) ?? null,
    set: async (key: string, value: unknown) => { values.set(key, value); },
  };
  const calendar = {
    login: GITHUB_LOGIN,
    startedAt: "2026-11-24T00:00:00Z",
    endedAt: "2026-11-24T23:59:59Z",
    total: 0,
    days: [{ date: "2026-11-24", count: 0, level: 0 as const }],
  };
  let failure: Extract<ContributionResult, { status: "unavailable" }> | undefined;
  const reader = () => createActivityReader(cache, async () => {
    calls++;
    return failure ?? { status: "ok", calendar, retrievedAt: new Date(now).toISOString() };
  }, () => now);
  return {
    reader,
    advance: (ms: number) => { now += ms; },
    fail: (result?: typeof failure) => { failure = result; },
    calls: () => calls,
  };
}

test("shares one refresh and reuses a verified zero calendar while fresh", async () => {
  const h = harness();
  const read = h.reader();
  const results = await Promise.all([read(), read(), read()]);
  assert.equal(h.calls(), 1);
  assert.equal(results[0]?.calendar.total, 0);
  assert.deepEqual(results[0], results[2]);
  h.advance(hour - 1);
  await h.reader()();
  assert.equal(h.calls(), 1);
});

test("keeps last good data on throttling, honors cooldown, and expires it after 24 hours", async () => {
  const h = harness();
  const read = h.reader();
  const original = await read();
  h.advance(hour);
  h.fail({ status: "unavailable", reason: "rate-limited", retryAfterMs: 25 * hour });
  assert.deepEqual(await read(), original);
  h.advance(hour);
  assert.deepEqual(await h.reader()(), original);
  assert.equal(h.calls(), 2);
  h.advance(22 * hour);
  assert.equal(await read(), null);
  assert.equal(h.calls(), 2);
});

test("permission failures drop last good data across instances and allow recovery", async () => {
  const h = harness();
  const read = h.reader();
  assert.ok(await read());
  h.advance(hour);
  h.fail({ status: "unavailable", reason: "forbidden" });
  assert.equal(await read(), null);
  assert.equal(await h.reader()(), null);
  h.advance(hour);
  h.fail();
  assert.equal((await read())?.calendar.total, 0);
  assert.equal(h.calls(), 3);
});

test("secondary failures back off exponentially", async () => {
  const h = harness();
  const read = h.reader();
  h.fail({ status: "unavailable", reason: "network" });
  assert.equal(await read(), null);
  h.advance(60_000);
  assert.equal(await read(), null);
  h.advance(60_000);
  await read();
  assert.equal(h.calls(), 2);
});

test("returns a verified response even when the optional cache is offline", async (t) => {
  t.mock.method(console, "warn", () => {});
  const cacheError = async () => { throw new Error("cache unavailable"); };
  const read = createActivityReader({ get: cacheError, set: cacheError }, async () => ({
    status: "unavailable", reason: "network",
  }));
  assert.equal(await read(), null);
});
