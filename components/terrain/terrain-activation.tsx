"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { ContributionDay } from "@/lib/github/validate";

type Terrain = typeof import("@/components/kokonutui/activity-terrain").default;

export function TerrainActivation({ days }: { days: readonly ContributionDay[] }) {
  const [Terrain, setTerrain] = useState<Terrain | null>(null);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [compact, setCompact] = useState(false);
  const panel = useId();
  const control = useRef<HTMLButtonElement>(null);
  const reset = useCallback(() => {
    setActive(false);
    setError(true);
    control.current?.focus();
  }, []);

  useEffect(() => {
    const viewport = window.matchMedia("(width < 40rem)");
    const update = () => setCompact(viewport.matches);
    update();
    viewport.addEventListener("change", update);
    return () => viewport.removeEventListener("change", update);
  }, []);

  async function activate() {
    if (loading) return;
    if (active) {
      setActive(false);
      return;
    }
    setError(false);
    if (!Terrain) {
      setLoading(true);
      try {
        const { default: Component } = await import("@/components/kokonutui/activity-terrain");
        setTerrain(() => Component);
      } catch {
        setError(true);
        return;
      } finally {
        setLoading(false);
      }
    }
    setActive(true);
  }

  const range = compact ? days.slice(-26 * 7) : days;

  return (
    <div className="terrain-activation px-3 pb-3 sm:px-4">
      <Button ref={control} aria-expanded={active} aria-controls={panel} onClick={activate} aria-disabled={loading}>
        {active ? "Close terrain" : "View as terrain"}
      </Button>
      <div id={panel} hidden={!active}>
        {active && compact && days.length > range.length && <p className="mt-3 px-3 font-mono text-meta text-text-2">Most recent 26 weeks</p>}
        {active && Terrain && (
          <Terrain
            key={range[0].date}
            title={compact && days.length > range.length ? "Most recent 26 weeks" : "Contribution terrain"}
            data={range.map(({ count }) => count)}
            levels={range.map(({ level }) => level)}
            endDate={range[range.length - 1].date}
            onUnavailable={reset}
          />
        )}
      </div>
      <p role="status" className={loading || error ? "mt-2 text-meta text-text-2" : "sr-only"}>
        {loading ? "Loading terrain…" : error ? "Terrain unavailable. The HTML calendar is still available." : ""}
      </p>
    </div>
  );
}
