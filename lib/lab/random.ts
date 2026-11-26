/** Seeded PRNG (mulberry32): same seed, same sequence, so every demo result can be reproduced. */
export function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal draws by Box–Muller. `1 - u` keeps the log argument above zero. */
export function normalSampler(random: () => number): () => number {
  return () => Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
}

export function mean(values: readonly number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

/** Sample standard deviation (n − 1). */
export function standardDeviation(values: readonly number[]): number {
  const m = mean(values);
  return Math.sqrt(values.reduce((sum, value) => sum + (value - m) ** 2, 0) / (values.length - 1));
}

/** Linear-interpolated quantile of an ascending-sorted array, p in [0, 1]. */
export function quantile(sorted: readonly number[], p: number): number {
  const position = (sorted.length - 1) * p;
  const low = Math.floor(position);
  const high = Math.ceil(position);
  return sorted[low] + (sorted[high] - sorted[low]) * (position - low);
}

export interface Bin { readonly start: number; readonly end: number; readonly count: number }

export function histogram(values: readonly number[], bins: number): Bin[] {
  // Identical values get a range of ±1 around them, so they land in a middle bin instead of an arbitrary edge.
  const low = Math.min(...values);
  const high = Math.max(...values);
  const [min, max] = low === high ? [low - 1, high + 1] : [low, high];
  const width = (max - min) / bins;
  const counts = new Array<number>(bins).fill(0);
  for (const value of values) counts[Math.min(bins - 1, Math.floor((value - min) / width))] += 1;
  return counts.map((count, index) => ({ start: min + index * width, end: min + (index + 1) * width, count }));
}

/** About `count` round-number ticks covering [min, max] (1, 2, or 5 × 10ⁿ steps). */
export function ticks(min: number, max: number, count = 5): number[] {
  const span = max - min || 1;
  const raw = span / count;
  const power = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 5, 10].map((m) => m * power).find((s) => span / s <= count + 1) ?? 10 * power;
  const first = Math.ceil(min / step) * step;
  return Array.from({ length: Math.floor((max - first) / step + 1e-9) + 1 }, (_, i) => Number((first + i * step).toPrecision(12)));
}
