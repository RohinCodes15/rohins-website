"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { simulateGbm } from "@/lib/lab/monte-carlo";
import { histogram } from "@/lib/lab/random";
import { ChartFigure, Controls, DemoNote, Key, HALO, Readout, fixed, percent, tickNumber } from "./parts";
import { Plot, linePath } from "./plot";
import { Slider } from "./slider";

const START = 100;

export function MonteCarloDemo() {
  const [params, setParams] = useState({ drift: 0.07, volatility: 0.2, years: 1, paths: 1000, seed: 1 });
  const deferred = useDeferredValue(params);
  const result = useMemo(() => simulateGbm({ start: START, ...deferred }), [deferred]);
  const set = (key: keyof typeof params) => (value: number) => setParams((current) => ({ ...current, [key]: value }));

  const drawnValues = result.drawn.flatMap((points) => points.map(([, price]) => price));
  const yDomain = [Math.min(...drawnValues, START) * 0.95, Math.max(...drawnValues, result.analytic) * 1.05] as const;
  const bins = histogram(result.terminal, 36);
  const maxCount = Math.max(...bins.map(({ count }) => count));
  const gap = (result.estimate - result.analytic) / result.standardError;

  return (
    <div className="grid gap-8">
      <DemoNote />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <ChartFigure number="1" caption={`First 40 of ${deferred.paths.toLocaleString("en-US")} simulated paths from S₀ = 100, with the analytic mean.`}
          legend={<><Key mark="line">simulated path</Key><Key mark="dash">E[Sₜ] = S₀e^(μt), analytic</Key></>}>
          <Plot label={`Simulated price paths over ${deferred.years} years. Analytic mean at the horizon ${fixed(result.analytic)}, simulated mean ${fixed(result.estimate)}.`}
            x={[0, deferred.years]} y={yDomain} xLabel="years" yLabel="price" formatX={(v) => String(v)} formatY={tickNumber}>
            {({ sx, sy }) => (
              <>
                {result.drawn.map((points, index) => (
                  <path key={index} d={linePath(points.map(([t, price]) => [sx(t), sy(price)]))} className="fill-none stroke-signal" strokeOpacity={0.28} strokeWidth={1} />
                ))}
                <path d={linePath(Array.from({ length: 41 }, (_, i) => { const t = (i / 40) * deferred.years; return [sx(t), sy(START * Math.exp(deferred.drift * t))]; }))} className="fill-none stroke-text" strokeWidth={2} strokeDasharray="5 4" />
              </>
            )}
          </Plot>
        </ChartFigure>
        <Controls seed={params.seed} onResample={() => setParams((current) => ({ ...current, seed: current.seed + 1 }))}>
          <Slider label="Drift μ (annual)" value={params.drift} min={-0.1} max={0.2} step={0.01} format={(v) => percent(v, 0)} onChange={set("drift")} />
          <Slider label="Volatility σ (annual)" value={params.volatility} min={0} max={0.6} step={0.01} format={(v) => percent(v, 0)} onChange={set("volatility")} />
          <Slider label="Horizon T" value={params.years} min={0.25} max={5} step={0.25} format={(v) => `${v} yr`} onChange={set("years")} />
          <Slider label="Paths" value={params.paths} min={100} max={4000} step={100} format={(v) => v.toLocaleString("en-US")} onChange={set("paths")} />
        </Controls>
      </div>
      <ChartFigure number="2" caption="Distribution of simulated prices at the horizon, with the 5th, 50th, and 95th percentiles.">
        <Plot label={`Histogram of terminal prices. 5th percentile ${fixed(result.p05)}, median ${fixed(result.p50)}, 95th percentile ${fixed(result.p95)}.`}
          x={[bins[0].start, bins.at(-1)!.end]} y={[0, maxCount]} xLabel="price at T" yLabel="paths" formatX={tickNumber} formatY={tickNumber} height={220}>
          {({ sx, sy }) => (
            <>
              {bins.map(({ start, end, count }) => (
                <rect key={start} x={sx(start) + 1} width={Math.max(0, sx(end) - sx(start) - 2)} y={sy(count)} height={sy(0) - sy(count)} className="fill-signal-fill" rx={1}>
                  <title>{`${fixed(start)}–${fixed(end)}: ${count} paths`}</title>
                </rect>
              ))}
              {/* Labels step down so close or equal percentiles (low σ) never overprint. */}
              {([["5th", result.p05], ["median", result.p50], ["95th", result.p95]] as const).map(([name, value], index) => (
                <g key={name}>
                  <line x1={sx(value)} x2={sx(value)} y1={sy(0)} y2={sy(maxCount)} className="stroke-text" strokeWidth={1} />
                  <text x={sx(value) + 4} y={sy(maxCount) + 10 + index * 14} {...HALO}>{name}</text>
                </g>
              ))}
            </>
          )}
        </Plot>
      </ChartFigure>
      <Readout items={[
        { label: "simulated mean at T", value: fixed(result.estimate), note: `± ${fixed(1.96 * result.standardError)} (95%)` },
        { label: "analytic mean S₀e^(μT)", value: fixed(result.analytic), note: `${fixed(gap, 1)} standard errors away` },
        { label: "paths ending below 100", value: percent(result.belowStart) },
        { label: "5th percentile", value: fixed(result.p05) },
        { label: "median", value: fixed(result.p50) },
        { label: "95th percentile", value: fixed(result.p95) },
      ]} />
    </div>
  );
}
