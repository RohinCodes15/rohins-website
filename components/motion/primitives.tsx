"use client";

// Motion primitives for interaction-driven animation only (docs/ARCHITECTURE.md D19).
// Nothing animates on page load or scroll: AnimatePresence initial={false} skips first-render entrances,
// so server HTML is final and readable without JavaScript. Hover effects are CSS (app/globals.css).
// Server components can render these and pass server-rendered children.

import { AnimatePresence, LazyMotion, useIsPresent } from "motion/react";
import * as m from "motion/react-m";
import { useSyncExternalStore, type ReactNode, type Ref } from "react";
import { ENTER, INSTANT, SPRINGS, staggerDelay } from "@/lib/motion";
import { cn } from "@/lib/utils";

const loadFeatures = () => import("./features").then((module) => module.default);
const preference = () => window.matchMedia("(prefers-reduced-motion: reduce)");
const readPreference = () => preference().matches;
const serverPreference = () => false;

function subscribe(listener: () => void) {
  const media = preference();
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}

function useReducedMotion() {
  // Motion 14 reads its hook preference only on mount.
  return useSyncExternalStore(subscribe, readPreference, serverPreference);
}

const presenceVariants = {
  exit: (reduced: boolean) => ({ ...ENTER.hidden, transition: reduced ? INSTANT : SPRINGS.micro }),
};
const itemVariants = {
  exit: (reduced: boolean) => ({ opacity: 0, transition: reduced ? INSTANT : SPRINGS.micro }),
};

function PresenceContent({ children, className, reduced }: { children: ReactNode; className?: string; reduced: boolean }) {
  const present = useIsPresent();
  return (
    <m.div
      className={cn("motion-surface", className)}
      inert={!present}
      data-motion-exiting={present ? undefined : ""}
      initial={reduced ? false : ENTER.hidden}
      animate={{ ...ENTER.shown, transition: reduced ? INSTANT : SPRINGS.ui }}
      variants={presenceVariants}
      exit="exit"
    >
      {children}
    </m.div>
  );
}

/** Content that enters and leaves after an interaction (copy confirmation, revealed detail). */
export function Presence({ show, children, className }: { show: boolean; children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <LazyMotion features={loadFeatures} strict>
      <AnimatePresence initial={false} custom={reduced}>
        {show && (
          <PresenceContent key="presence" className={className} reduced={reduced}>
            {children}
          </PresenceContent>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}

/**
 * A list whose items change after an interaction (a filter). New items enter with a short, capped
 * stagger; remaining items slide to their new positions. Children must be keyed StaggerItems.
 */
export function StaggerList({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <LazyMotion features={loadFeatures} strict>
      <ul className={cn("relative", className)}>
        {/* popLayout: leaving items stop taking space at once, so the others reflow together. */}
        <AnimatePresence initial={false} mode={reduced ? "sync" : "popLayout"} custom={reduced}>
          {children}
        </AnimatePresence>
      </ul>
    </LazyMotion>
  );
}

export function StaggerItem({
  index,
  children,
  className,
  ref,
}: {
  /** Position among the entering items; drives the stagger delay. */
  index: number;
  children: ReactNode;
  className?: string;
  ref?: Ref<HTMLLIElement>;
}) {
  const reduced = useReducedMotion();
  const present = useIsPresent();
  const enter = reduced ? INSTANT : { ...SPRINGS.ui, delay: staggerDelay(index) };
  return (
    <m.li
      ref={ref}
      layout={reduced ? false : "position"}
      className={cn("motion-surface", className)}
      inert={!present}
      data-motion-exiting={present ? undefined : ""}
      initial={reduced ? false : ENTER.hidden}
      animate={{ ...ENTER.shown, transition: enter }}
      variants={itemVariants}
      exit="exit"
      transition={{ layout: reduced ? INSTANT : SPRINGS.layout }}
    >
      {children}
    </m.li>
  );
}

/**
 * An element whose own size or position changes when its content changes.
 * "position" (default) moves without scaling, so text never stretches mid-animation.
 */
export function LayoutBox({
  children,
  className,
  layout = "position",
}: {
  children: ReactNode;
  className?: string;
  layout?: "position" | "size" | true;
}) {
  const reduced = useReducedMotion();
  return (
    <LazyMotion features={loadFeatures} strict>
      <m.div
        layout={reduced ? false : layout}
        transition={{ layout: reduced ? INSTANT : SPRINGS.layout }}
        className={cn("motion-surface", className)}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
