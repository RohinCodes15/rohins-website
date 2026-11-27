"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { ContributionDay } from "@/lib/github/validate";

type Terrain = typeof import("@/components/kokonutui/activity-terrain").default;

/** The terrain shows the most recent weeks, where the activity is; the stats above still cover the full year. */
const RECENT_WEEKS = 20;

/** Start loading the terrain this far before the Activity section scrolls into view. */
const PRELOAD_MARGIN = "600px";

/**
 * Shows contributions as the 3D terrain. The terrain code loads only as the section nears the viewport, so the
 * homepage's initial JavaScript is unchanged. Until it is ready, without JavaScript, or if the canvas fails, the
 * server-rendered `fallback` calendar shows instead.
 */
export function TerrainView({ days, fallback }: { days: readonly ContributionDay[]; fallback: ReactNode }) {
  const [Terrain, setTerrain] = useState<Terrain | null>(null);
  const [failed, setFailed] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const fail = useCallback(() => setFailed(true), []);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let cancelled = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      import("@/components/kokonutui/activity-terrain")
        .then(({ default: Component }) => { if (!cancelled) setTerrain(() => Component); })
        .catch(() => { if (!cancelled) setFailed(true); });
    }, { rootMargin: PRELOAD_MARGIN });
    observer.observe(element);
    return () => { cancelled = true; observer.disconnect(); };
  }, []);

  const range = days.slice(-RECENT_WEEKS * 7);
  const ready = Terrain && !failed;

  return (
    <div ref={root} className="terrain-view">
      {ready
        ? <Terrain
            key={range[0].date}
            title={range.length < days.length ? `Last ${RECENT_WEEKS} weeks` : "Contribution terrain"}
            data={range.map(({ count }) => count)}
            levels={range.map(({ level }) => level)}
            endDate={range[range.length - 1].date}
            onUnavailable={fail}
          />
        : fallback}
    </div>
  );
}
