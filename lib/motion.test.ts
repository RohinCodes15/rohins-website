import assert from "node:assert/strict";
import { test } from "node:test";
import { SPRINGS, STAGGER_MAX_STEPS, STAGGER_STEP_SECONDS, staggerDelay } from "./motion.ts";

test("staggerDelay steps per item and caps the total wait", () => {
  assert.equal(staggerDelay(0), 0);
  assert.equal(staggerDelay(2), 2 * STAGGER_STEP_SECONDS);
  assert.equal(staggerDelay(50), STAGGER_MAX_STEPS * STAGGER_STEP_SECONDS);
  assert.ok(staggerDelay(50) <= 0.15);
});

test("staggerDelay treats invalid indexes as the first item", () => {
  for (const index of [-1, Number.NaN, Number.POSITIVE_INFINITY]) assert.equal(staggerDelay(index), 0);
  assert.equal(staggerDelay(1.9), STAGGER_STEP_SECONDS);
});

test("springs settle within the design system's motion durations", () => {
  assert.ok(SPRINGS.micro.visualDuration <= 0.14);
  assert.ok(SPRINGS.ui.visualDuration <= 0.24);
  for (const spring of Object.values(SPRINGS)) assert.ok(spring.bounce <= 0.1, "keep springs restrained");
});
