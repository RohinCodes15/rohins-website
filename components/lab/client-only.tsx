"use client";

import { useSyncExternalStore, type ReactNode } from "react";

const subscribe = () => () => {};

/**
 * Renders the demos only in the browser. Their charts come from floating-point maths whose last bits differ
 * between Node and the browser, which made server HTML fail hydration. The placeholder keeps the space.
 */
export function ClientOnly({ children, minHeight }: { children: ReactNode; minHeight: string }) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  if (mounted) return children;
  return (
    <div style={{ minHeight }} className="grid content-start gap-3">
      <p className="font-mono text-meta text-text-2">Educational demonstration · synthetic data · not research findings or investment advice</p>
      <p className="text-text-2">Loading the interactive demonstration…</p>
      <noscript><p className="text-text-2">This demonstration needs JavaScript. The explanation above describes the method.</p></noscript>
    </div>
  );
}
