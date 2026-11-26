import assert from "node:assert/strict";
import { test } from "node:test";
import { DRAWN_PATHS, simulateGbm } from "./monte-carlo.ts";
import { frontier, normalRisk, portfolioMoments, simulatedRisk } from "./portfolio.ts";
import { histogram, mean, mulberry32, normalSampler, quantile, standardDeviation, ticks } from "./random.ts";
import { fitLine, generateLine } from "./regression.ts";

test("mulberry32 repeats for a seed and stays in [0, 1)", () => {
  const a = mulberry32(7);
  const b = mulberry32(7);
  const draws = Array.from({ length: 1000 }, () => a());
  assert.deepEqual(draws.slice(0, 5), Array.from({ length: 5 }, () => b()));
  assert.ok(draws.every((value) => value >= 0 && value < 1));
});

test("normal draws have mean near 0 and deviation near 1", () => {
  const normal = normalSampler(mulberry32(1));
  const draws = Array.from({ length: 20000 }, normal);
  assert.ok(Math.abs(mean(draws)) < 0.03);
  assert.ok(Math.abs(standardDeviation(draws) - 1) < 0.03);
});

test("quantile interpolates and histogram counts every value", () => {
  assert.equal(quantile([0, 10], 0.25), 2.5);
  const bins = histogram([1, 2, 2, 3, 10], 3);
  assert.equal(bins.reduce((sum, { count }) => sum + count, 0), 5);
  assert.equal(bins[2].count, 1);
  const flat = histogram([4, 4], 3);
  assert.deepEqual(flat.map(({ count }) => count), [0, 2, 0]);
  assert.ok(flat[1].start < 4 && 4 < flat[1].end);
});

test("GBM estimate lands within four standard errors of the analytic mean", () => {
  const result = simulateGbm({ start: 100, drift: 0.07, volatility: 0.2, years: 1, paths: 4000, seed: 3 });
  assert.ok(Math.abs(result.estimate - result.analytic) < 4 * result.standardError);
  assert.equal(result.drawn.length, DRAWN_PATHS);
  // 1.25 years = 315 steps, not a multiple of the drawing stride: the final point must still sit at T.
  const uneven = simulateGbm({ start: 100, drift: 0.07, volatility: 0.2, years: 1.25, paths: 1, seed: 3 });
  assert.equal(uneven.drawn[0].at(-1)![0], 1.25);
  assert.equal(uneven.drawn[0].at(-1)![1], uneven.terminal[0]);
  assert.equal(result.terminal.length, 4000);
  assert.ok(result.p05 < result.p50 && result.p50 < result.p95);
});

test("zero volatility makes GBM deterministic", () => {
  const result = simulateGbm({ start: 100, drift: 0.05, volatility: 0, years: 2, paths: 10, seed: 1 });
  for (const value of result.terminal) assert.ok(Math.abs(value - result.analytic) < 1e-9);
});

test("portfolio volatility is linear at ρ = 1 and diversifies below it", () => {
  const base = { weight: 0.5, returns: [0.06, 0.03] as const, volatilities: [0.2, 0.1] as const };
  assert.ok(Math.abs(portfolioMoments({ ...base, correlation: 1 }).volatility - 0.15) < 1e-12);
  assert.ok(portfolioMoments({ ...base, correlation: 0 }).volatility < 0.15);
  assert.ok(Math.abs(portfolioMoments({ ...base, correlation: 1 }).expected - 0.045) < 1e-12);
  const curve = frontier({ returns: base.returns, volatilities: base.volatilities, correlation: 0 }, 3);
  assert.deepEqual(curve.map(({ weight }) => weight), [0, 0.5, 1]);
});

test("normal VaR matches the closed form and simulation agrees with it", () => {
  const { var95, es95 } = normalRisk(0, 0.1);
  assert.ok(Math.abs(var95 - 0.16449) < 1e-4);
  assert.ok(Math.abs(es95 - 0.20627) < 1e-4);
  const params = { weight: 0.6, returns: [0.06, 0.03] as const, volatilities: [0.2, 0.1] as const, correlation: 0.3 };
  const { expected, volatility } = portfolioMoments(params);
  const simulated = simulatedRisk(params, 50000, 11);
  assert.ok(Math.abs(simulated.var95 - normalRisk(expected, volatility).var95) < 0.01);
  assert.ok(simulated.es95 > simulated.var95);
});

test("OLS recovers a noiseless line exactly", () => {
  const fit = fitLine(generateLine({ slope: 2, intercept: -1, noise: 0, samples: 40, seed: 5 }));
  assert.ok(Math.abs(fit.slope - 2) < 1e-9);
  assert.ok(Math.abs(fit.intercept + 1) < 1e-9);
  assert.ok(Math.abs(fit.rSquared - 1) < 1e-12);
});

test("about 95% of slope intervals cover the true slope", () => {
  let covered = 0;
  for (let seed = 0; seed < 400; seed += 1) {
    const [low, high] = fitLine(generateLine({ slope: 1.5, intercept: 2, noise: 3, samples: 60, seed })).interval;
    if (low <= 1.5 && 1.5 <= high) covered += 1;
  }
  assert.ok(covered / 400 > 0.91 && covered / 400 < 0.98, `coverage ${covered / 400}`);
});

test("ticks are round numbers inside the range", () => {
  assert.deepEqual(ticks(0, 10, 5), [0, 2, 4, 6, 8, 10]);
  assert.deepEqual(ticks(0.03, 0.27, 4), [0.05, 0.1, 0.15, 0.2, 0.25]);
  assert.deepEqual(ticks(5, 5, 4), [5]);
});
