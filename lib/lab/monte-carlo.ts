import { mean, mulberry32, normalSampler, quantile, standardDeviation } from "./random.ts";

export interface GbmParams {
  readonly start: number;
  /** Annual drift μ, e.g. 0.07. */
  readonly drift: number;
  /** Annual volatility σ, e.g. 0.2. */
  readonly volatility: number;
  readonly years: number;
  readonly paths: number;
  readonly seed: number;
}

export const STEPS_PER_YEAR = 252;
/** Paths drawn on the chart; every path still counts toward the statistics. */
export const DRAWN_PATHS = 40;

/**
 * Geometric Brownian motion, exact discretisation: S(t+Δt) = S(t)·exp((μ − σ²/2)Δt + σ√Δt·Z).
 * The analytic mean E[S_T] = S₀·e^{μT} lets the reader check the estimate against a closed form.
 */
export function simulateGbm({ start, drift, volatility, years, paths, seed }: GbmParams) {
  const normal = normalSampler(mulberry32(seed));
  const steps = Math.max(1, Math.round(years * STEPS_PER_YEAR));
  const dt = years / steps;
  const shift = (drift - volatility ** 2 / 2) * dt;
  const scale = volatility * Math.sqrt(dt);
  const stride = Math.max(1, Math.floor(steps / 120));
  // [time in years, price]: the last kept step can be closer than `stride`, so x positions come from the step itself.
  const drawn: (readonly [number, number])[][] = [];
  const terminal: number[] = [];

  for (let path = 0; path < paths; path += 1) {
    let price = start;
    const points: (readonly [number, number])[] | null = path < DRAWN_PATHS ? [[0, start]] : null;
    for (let step = 1; step <= steps; step += 1) {
      price *= Math.exp(shift + scale * normal());
      if (points && (step % stride === 0 || step === steps)) points.push([step * dt, price]);
    }
    if (points) drawn.push(points);
    terminal.push(price);
  }

  const sorted = [...terminal].sort((a, b) => a - b);
  const estimate = mean(terminal);
  return {
    drawn,
    terminal,
    estimate,
    standardError: standardDeviation(terminal) / Math.sqrt(paths),
    analytic: start * Math.exp(drift * years),
    p05: quantile(sorted, 0.05),
    p50: quantile(sorted, 0.5),
    p95: quantile(sorted, 0.95),
    belowStart: terminal.filter((value) => value < start).length / paths,
  };
}
