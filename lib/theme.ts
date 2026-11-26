// Theme preference shared by the blocking head script and the toggle (docs/ARCHITECTURE.md §9, D3).
// The preference lives on <html data-theme>; app/globals.css resolves colours from it with light-dark().

export const THEMES = ["system", "light", "dark"] as const;
export type Theme = (typeof THEMES)[number];

export const THEME_STORAGE_KEY = "theme";

/** Anything other than a known theme (missing, tampered, or legacy storage) means "system". */
export function parseTheme(value: unknown): Theme {
  return THEMES.find((theme) => theme === value) ?? "system";
}

/**
 * Runs in <head> before first paint, so the stored theme applies without a flash.
 * Mirrors parseTheme; lib/theme.test.ts runs it to keep the two in step.
 * localStorage can throw (blocked storage), which falls back to "system".
 */
export const THEME_SCRIPT = `(function(){var t;try{t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})}catch(e){}document.documentElement.dataset.theme=t==="light"||t==="dark"?t:"system"})()`;
