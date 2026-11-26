import { mulberry32, normalSampler } from "./random.ts";

export interface RegressionParams {
  readonly slope: number;
  readonly intercept: number;
  readonly noise: number;
  readonly samples: number;
  readonly seed: number;
}

/** 95% two-sided normal critical value. The demo keeps n ≥ 30, where the t distribution is close to normal. */
const Z_975 = 1.959963984540054;
export const MIN_SAMPLES = 30;

/** Synthetic data from a known line: y = α + βx + ε, x uniform on [0, 10], ε ~ N(0, σ²). */
export function generateLine({ slope, intercept, noise, samples, seed }: RegressionParams) {
  const random = mulberry32(seed);
  const normal = normalSampler(random);
  return Array.from({ length: samples }, () => {
    const x = random() * 10;
    return { x, y: intercept + slope * x + noise * normal() };
  });
}

/** Ordinary least squares with the classical standard error of the slope. */
export function fitLine(points: readonly { x: number; y: number }[]) {
  const n = points.length;
  const meanX = points.reduce((sum, { x }) => sum + x, 0) / n;
  const meanY = points.reduce((sum, { y }) => sum + y, 0) / n;
  let sxx = 0;
  let sxy = 0;
  let syy = 0;
  for (const { x, y } of points) {
    sxx += (x - meanX) ** 2;
    sxy += (x - meanX) * (y - meanY);
    syy += (y - meanY) ** 2;
  }
  const slope = sxy / sxx;
  const intercept = meanY - slope * meanX;
  const residual = points.reduce((sum, { x, y }) => sum + (y - intercept - slope * x) ** 2, 0);
  const slopeError = Math.sqrt(residual / (n - 2) / sxx);
  return {
    slope,
    intercept,
    slopeError,
    interval: [slope - Z_975 * slopeError, slope + Z_975 * slopeError] as const,
    rSquared: syy === 0 ? 1 : 1 - residual / syy,
  };
}
