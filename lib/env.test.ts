import assert from "node:assert/strict";
import { afterEach, mock, test } from "node:test";
import { githubContributionsToken } from "./env.ts";

const original = process.env.GITHUB_CONTRIBUTIONS_TOKEN;

afterEach(() => {
  mock.restoreAll();
  if (original === undefined) delete process.env.GITHUB_CONTRIBUTIONS_TOKEN;
  else process.env.GITHUB_CONTRIBUTIONS_TOKEN = original;
});

test("unset or blank token is undefined", () => {
  delete process.env.GITHUB_CONTRIBUTIONS_TOKEN;
  assert.equal(githubContributionsToken(), undefined);
  process.env.GITHUB_CONTRIBUTIONS_TOKEN = "   ";
  assert.equal(githubContributionsToken(), undefined);
});

test("accepts a fine-grained token and trims whitespace", () => {
  process.env.GITHUB_CONTRIBUTIONS_TOKEN = " github_pat_ABCDEFGHIJKLMNOPQRSTUV_0123 \n";
  assert.equal(githubContributionsToken(), "github_pat_ABCDEFGHIJKLMNOPQRSTUV_0123");
});

test("rejects other token formats without logging the value", () => {
  const warn = mock.method(console, "warn", () => {});
  for (const value of ["ghp_classictoken0123456789012345678901234", "github_pat_short", "not a token"]) {
    process.env.GITHUB_CONTRIBUTIONS_TOKEN = value;
    assert.equal(githubContributionsToken(), undefined);
  }
  assert.equal(warn.mock.callCount(), 3);
  for (const call of warn.mock.calls) assert.ok(!JSON.stringify(call.arguments).includes("ghp_"));
});
