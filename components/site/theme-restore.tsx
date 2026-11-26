"use client";

import { useEffect } from "react";
import { parseTheme, THEME_STORAGE_KEY } from "@/lib/theme";

/**
 * Fallback for THEME_SCRIPT. When Next.js re-renders the root layout on the client (the not-found path does),
 * <html> loses data-theme and the inline script does not run again. Restore the stored choice once.
 */
export function ThemeRestore() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.theme) return;
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      // Blocked storage: "system" applies, matching THEME_SCRIPT.
    }
    root.dataset.theme = parseTheme(stored);
  }, []);
  return null;
}
