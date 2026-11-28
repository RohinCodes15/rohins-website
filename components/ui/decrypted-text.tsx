"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Characters shown while a label resolves; digit labels scramble through digits only. */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%/+=<>";
const DIGITS = "0123456789";
const TICK_MS = 40;
/** The whole reveal stays under this, however long the label. */
const MAX_MS = 800;

type DecryptedTextProps = {
  text: string;
  className?: string;
  /** Replay when the pointer enters the closest ancestor matching this selector, or the label itself (true). */
  replayOn?: string | true;
};

/**
 * A short label that scrambles once, left to right, into its text when it first scrolls into view, after React
 * Bits' Decrypted Text (reactbits.dev/text-animations/decrypted-text). Written for this site rather than installed:
 * the registry item needs motion@^12 beside the pinned motion 14 and renders a Motion span per character. The DOM
 * keeps one real text node throughout (screen readers and search read it); the scramble is a `data-scramble`
 * attribute drawn by `.decrypt::after` over the transparent real glyphs, so the width never changes and React never
 * re-renders. One interval and one observer, both cleaned up on unmount. Reduced motion shows the text still.
 */
export function DecryptedText({ text, className, replayOn }: DecryptedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const pool = /^[\d\s]+$/.test(text) ? DIGITS : GLYPHS;
    const chars = [...text];
    const step = Math.max(1, Math.ceil(chars.length / (MAX_MS / TICK_MS)));
    let timer = 0;

    const finish = () => {
      window.clearInterval(timer);
      delete node.dataset.scramble;
    };
    const run = () => {
      window.clearInterval(timer);
      let revealed = 0;
      const paint = () => {
        node.dataset.scramble = chars.map((char, i) => (i < revealed || /\s/.test(char) ? char : pool[Math.floor(Math.random() * pool.length)])).join("");
      };
      paint();
      timer = window.setInterval(() => {
        revealed += step;
        if (revealed >= chars.length) finish();
        else paint();
      }, TICK_MS);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      run();
    }, { rootMargin: "0px 0px -10% 0px" });
    observer.observe(node);

    const target = replayOn === true ? node : replayOn ? node.closest(replayOn) : null;
    target?.addEventListener("pointerenter", run);
    return () => {
      finish();
      observer.disconnect();
      target?.removeEventListener("pointerenter", run);
    };
  }, [text, replayOn]);

  return <span ref={ref} className={cn("decrypt", className)}>{text}</span>;
}
