import assert from "node:assert/strict";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import { parseTheme, THEME_SCRIPT, THEME_STORAGE_KEY, THEMES } from "./theme.ts";

function runScript(getItem: (key: string) => string | null): string | undefined {
  const dataset: { theme?: string } = {};
  runInNewContext(THEME_SCRIPT, { localStorage: { getItem }, document: { documentElement: { dataset } } });
  return dataset.theme;
}

test("parseTheme accepts only known themes", () => {
  for (const theme of THEMES) assert.equal(parseTheme(theme), theme);
  for (const value of [null, undefined, "", "Dark", "sepia", 1, {}]) assert.equal(parseTheme(value), "system");
});

test("the head script applies the same rule as parseTheme", () => {
  for (const stored of ["light", "dark", "system", null, "Dark", "<script>"]) {
    assert.equal(runScript(() => stored), parseTheme(stored), `stored ${String(stored)}`);
  }
});

test("the head script reads the shared storage key", () => {
  const keys: string[] = [];
  runScript((key) => (keys.push(key), "dark"));
  assert.deepEqual(keys, [THEME_STORAGE_KEY]);
});

test("the head script falls back to system when storage throws", () => {
  assert.equal(
    runScript(() => {
      throw new Error("SecurityError");
    }),
    "system",
  );
});
