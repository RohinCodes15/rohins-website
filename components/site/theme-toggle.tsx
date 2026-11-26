"use client";

import { useSyncExternalStore } from "react";
import { parseTheme, THEME_STORAGE_KEY, THEMES, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const LABELS: Record<Theme, string> = { system: "System", light: "Light", dark: "Dark" };

// The selected look comes from <html data-theme>, which the head script sets before paint, so the
// control is already correct before hydration. React owns `checked` for assistive technology.
const SELECTED: Record<Theme, string> = {
  system: "in-data-[theme=system]:text-text in-data-[theme=system]:decoration-probe",
  light: "in-data-[theme=light]:text-text in-data-[theme=light]:decoration-probe",
  dark: "in-data-[theme=dark]:text-text in-data-[theme=dark]:decoration-probe",
};

const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  // Another tab changed the theme (key null means storage was cleared).
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== THEME_STORAGE_KEY) return;
    document.documentElement.dataset.theme = parseTheme(event.newValue);
    listener();
  };
  listeners.add(listener);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = (): Theme => parseTheme(document.documentElement.dataset.theme);
// Unknown on the server: render no radio as checked so hydration matches.
const getServerSnapshot = (): null => null;

/** Shared by the toggle and the command palette, so both stay in step. */
export function setTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try {
    if (theme === "system") localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage blocked: the choice still applies to this page view, it just won't persist.
  }
  for (const listener of listeners) listener();
}

export function ThemeToggle({ className }: { className?: string }) {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    // Hidden, but still holding its space, until the head script runs: without JavaScript it can't work.
    <fieldset className={cn("invisible font-mono text-meta in-data-theme:visible", className)}>
      <legend className="float-left me-3 inline-flex min-h-6 items-center text-text-2">Theme</legend>
      <div className="flex flex-wrap gap-1">
        {THEMES.map((theme) => (
          <label
            key={theme}
            className={cn(
              "inline-flex min-h-6 cursor-pointer items-center px-1 text-text-2 underline decoration-transparent decoration-2 underline-offset-4 hover:text-text",
              "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-signal",
              SELECTED[theme],
            )}
          >
            <input
              type="radio"
              name="theme"
              value={theme}
              checked={current === theme}
              onChange={() => setTheme(theme)}
              className="sr-only"
            />
            {LABELS[theme]}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
