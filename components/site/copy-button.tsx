"use client";

import { useEffect, useState } from "react";

const RESET_MS = 1500;

/** Copies text and confirms by swapping its label (DESIGN_SYSTEM §7: text swap, no animation). */
export function CopyButton({ text, label }: { text: string; label: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timer = setTimeout(() => setState("idle"), RESET_MS);
    return () => clearTimeout(timer);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="min-h-11 cursor-pointer rounded-sm border border-control px-3.5 text-body font-medium press hover:border-signal active:bg-surface"
    >
      <span aria-live="polite">{state === "copied" ? "Copied" : state === "failed" ? "Copy failed. Select the address instead" : label}</span>
    </button>
  );
}
