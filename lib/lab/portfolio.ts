import { mean, mulberry32, normalSampler, quantile } from "./random.ts";

export interface TwoAssetParams {
  readonly weight: number;
  readonly returns: readonly [number, number];
  readonly volatilities: readonly [number, number];
  readonly correlation: number;
}

/** One-sided 95% standard normal quantile and density there: VaR and ES of a normal distribution. */
const Z_95 = 1.6448536269514722;
const DENSITY_AT_Z_95 = Math.exp(-(Z_95 ** 2) / 2) / Math.sqrt(2 * Math.PI);

/** μ_p = wμ₁ + (1−w)μ₂ and σ_p² = w²σ₁² + (1−w)²σ₂² + 2w(1−w)ρσ₁σ₂. */
export function portfolioMoments({ weight, returns, volatilities, correlation }: TwoAssetParams) {
  const [w1, w2] = [weight, 1 - weight];
  const [s1, s2] = volatilities;
  return {
    expected: w1 * returns[0] + w2 * returns[1],
    volatility: Math.sqrt(w1 ** 2 * s1 ** 2 + w2 ** 2 * s2 ** 2 + 2 * w1 * w2 * correlation * s1 * s2),
  };
}

/** Parametric one-year 95% VaR and expected shortfall, as positive fractions of portfolio value. */
export function normalRisk(expected: number, volatility: number) {
  return { var95: Z_95 * volatility - expected, es95: (volatility * DENSITY_AT_Z_95) / 0.05 - expected };
}

/** Correlated normal returns by Cholesky: r₂ = ρz₁ + √(1−ρ²)z₂. Synthetic, never market data. */
export function simulatedRisk(params: TwoAssetParams, samples: number, seed: number) {
  const normal = normalSampler(mulberry32(seed));
  const { weight, returns, volatilities, correlation } = params;
  const outcomes = Array.from({ length: samples }, () => {
    const z1 = normal();
    const z2 = correlation * z1 + Math.sqrt(1 - correlation ** 2) * normal();
    return weight * (returns[0] + volatilities[0] * z1) + (1 - weight) * (returns[1] + volatilities[1] * z2);
  }).sort((a, b) => a - b);
  const cutoff = quantile(outcomes, 0.05);
  const tail = outcomes.filter((value) => value <= cutoff);
  return { outcomes, var95: -cutoff, es95: -mean(tail) };
}

/** The risk–return curve as the weight in asset 1 moves from 0 to 1. */
export function frontier(params: Omit<TwoAssetParams, "weight">, points = 51) {
  return Array.from({ length: points }, (_, index) => {
    const weight = index / (points - 1);
    return { weight, ...portfolioMoments({ ...params, weight }) };
  });
}
