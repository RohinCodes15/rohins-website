// Motion presets (docs/DESIGN_SYSTEM.md §7). Pure data so server code, tests, and client primitives share it.
// Springs use visualDuration + bounce: the spring settles visually in that time, matching the CSS
// --duration-micro (140 ms) and --duration-ui (240 ms) tokens, with physics instead of a fixed curve.

export const SPRINGS = {
  /** Small state changes: exits, icon swaps. */
  micro: { type: "spring", visualDuration: 0.14, bounce: 0 },
  /** Elements appearing after an interaction. */
  ui: { type: "spring", visualDuration: 0.24, bounce: 0 },
  /** Position and size changes. A little bounce reads as physical without drawing attention. */
  layout: { type: "spring", visualDuration: 0.3, bounce: 0.1 },
} as const;

export type SpringName = keyof typeof SPRINGS;

/** Reduced motion: every transition becomes an instant state change (DESIGN_SYSTEM §7). */
export const INSTANT = { duration: 0 } as const;

/** Entering content rises 8 px while fading in: short enough to stay out of the way. */
export const ENTER = {
  hidden: { opacity: 0, y: 8 },
  shown: { opacity: 1, y: 0 },
} as const;

export const STAGGER_STEP_SECONDS = 0.03;
/** Items past this index share the last delay, so a long list never waits more than 150 ms. */
export const STAGGER_MAX_STEPS = 5;

export function staggerDelay(index: number): number {
  if (!Number.isFinite(index) || index <= 0) return 0;
  return Math.min(Math.floor(index), STAGGER_MAX_STEPS) * STAGGER_STEP_SECONDS;
}
