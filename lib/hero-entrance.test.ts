import assert from "node:assert/strict";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import { HERO_PLAYED_KEY, HERO_PLAYED_SCRIPT } from "./hero-entrance.ts";

function runScript(getItem: (key: string) => string | null): boolean {
  const dataset: { heroPlayed?: string } = {};
  runInNewContext(HERO_PLAYED_SCRIPT, { sessionStorage: { getItem }, document: { documentElement: { dataset } } });
  return "heroPlayed" in dataset;
}

test("the head script turns the entrance off once this session has played it", () => {
  const keys: string[] = [];
  assert.equal(runScript((key) => (keys.push(key), "1")), true);
  assert.deepEqual(keys, [HERO_PLAYED_KEY]);
});

test("the head script leaves the entrance on for a new session or blocked storage", () => {
  assert.equal(runScript(() => null), false);
  assert.equal(runScript(() => { throw new Error("blocked"); }), false);
});
