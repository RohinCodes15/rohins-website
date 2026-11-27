"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AnimatedNumberProps = {
  value: number;
  /** Fixed decimal places, shown throughout the animation. */
  digits?: number;
  /** Show `value` as a percentage (0.25 reads 25%). */
  percent?: boolean;
  /** Length of one count, in milliseconds. */
  duration?: number;
  className?: string;
};

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

/**
 * A number that counts up from zero the first time it scrolls into view, then eases from its current value to each
 * new value. The server renders the final value, so there is no hydration mismatch and nothing to see without
 * JavaScript; the final value also reserves the width, so nothing shifts while digits change. Screen readers get only
 * the final value. Reduced motion shows values directly.
 * Count after Skiper UI's Skiper 37 Animated Number (skiper-ui.com); no Skiper code is used.
 */
export function AnimatedNumber({ value, digits = 0, percent = false, duration = 1000, className }: AnimatedNumberProps) {
  const format = useMemo(() => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: percent ? "percent" : "decimal",
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
    return (n: number) => formatter.format(n).replace("-", "−");
  }, [digits, percent]);
  const [shown, setShown] = useState(value);
  const element = useRef<HTMLSpanElement>(null);
  const current = useRef(value);
  const target = useRef(value);
  const seen = useRef(false);
  const frame = useRef(0);
  const animate = useRef<() => void>(() => {});

  useEffect(() => {
    const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    animate.current = () => {
      cancelAnimationFrame(frame.current);
      const from = current.current;
      const to = target.current;
      if (reduced() || from === to) {
        current.current = to;
        setShown(to);
        return;
      }
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        current.current = from + (to - from) * easeInOut(t);
        setShown(t === 1 ? to : current.current);
        if (t < 1) frame.current = requestAnimationFrame(step);
      };
      frame.current = requestAnimationFrame(step);
    };

    const node = element.current;
    if (!node || reduced()) {
      seen.current = true;
      return () => cancelAnimationFrame(frame.current);
    }
    let first = true;
    const observer = new IntersectionObserver(([entry]) => {
      if (first) {
        first = false;
        // Already on screen when it mounted: keep the rendered value rather than flash back to zero.
        if (entry?.isIntersecting) {
          seen.current = true;
          observer.disconnect();
          return;
        }
        current.current = 0;
        setShown(0);
        return;
      }
      if (!entry?.isIntersecting) return;
      seen.current = true;
      observer.disconnect();
      animate.current();
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [duration]);

  useEffect(() => {
    target.current = value;
    if (seen.current) animate.current();
  }, [value]);

  return (
    <span ref={element} className={cn("inline-grid tabular-nums", className)}>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">{format(value)}</span>
      <span aria-hidden="true" className="col-start-1 row-start-1 justify-self-end">{format(shown)}</span>
      <span className="sr-only">{format(value)}</span>
    </span>
  );
}
