"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { MIN_SAMPLES, fitLine, generateLine } from "@/lib/lab/regression";
import { ChartFigure, Controls, DemoNote, Key, LabNumber, Readout, fixed, tickNumber } from "./parts";
import { Plot, linePath } from "./plot";
import { Slider } from "./slider";

const REPEATS = 200;

export function RegressionDemo() {
  const [state, setState] = useState({ slope: 1.5, intercept: 2, noise: 3, samples: 60, seed: 1 });
  const deferred = useDeferredValue(state);
  const set = (key: keyof typeof state) => (value: number) => setState((current) => ({ ...current, [key]: value }));

  const { points, fit, coverage } = useMemo(() => {
    const points = generateLine(deferred);
    let covered = 0;
    // Fresh samples from the same line: how often does the interval contain the true slope?
    for (let offset = 1; offset <= REPEATS; offset += 1) {
      const [low, high] = fitLine(generateLine({ ...deferred, seed: deferred.seed * 1000 + offset })).interval;
      if (low <= deferred.slope && deferred.slope <= high) covered += 1;
    }
    return { points, fit: fitLine(points), coverage: covered / REPEATS };
  }, [deferred]);

  const ys = points.map(({ y }) => y);
  const covers = fit.interval[0] <= deferred.slope && deferred.slope <= fit.interval[1];

  return (
    <div className="grid gap-8">
      <DemoNote />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <ChartFigure number="5" caption={`${deferred.samples} points drawn from a known line plus normal noise, with the least-squares fit.`}
          legend={<><Key mark="point">sample point</Key><Key mark="line">fitted line</Key><Key mark="dash">true line</Key></>}>
          <Plot label={`Scatter plot with fitted slope ${fixed(fit.slope)} against true slope ${fixed(deferred.slope)}.`}
            x={[0, 10]} y={[Math.min(...ys) - 1, Math.max(...ys) + 1]} xLabel="x" yLabel="y" formatY={tickNumber}>
            {({ sx, sy }) => (
              <>
                {points.map(({ x, y }, index) => <circle key={index} cx={sx(x)} cy={sy(y)} r={3} className="fill-signal-fill" fillOpacity={0.55} />)}
                <path d={linePath([[sx(0), sy(deferred.intercept)], [sx(10), sy(deferred.intercept + deferred.slope * 10)]])} className="fill-none stroke-text" strokeWidth={2} strokeDasharray="5 4" />
                <path d={linePath([[sx(0), sy(fit.intercept)], [sx(10), sy(fit.intercept + fit.slope * 10)]])} className="fill-none stroke-signal" strokeWidth={2} />
              </>
            )}
          </Plot>
        </ChartFigure>
        <Controls seed={state.seed} onResample={() => setState((current) => ({ ...current, seed: current.seed + 1 }))}>
          <Slider label="True slope β" value={state.slope} min={-3} max={3} step={0.1} format={(v) => fixed(v, 1)} onChange={set("slope")} />
          <Slider label="True intercept α" value={state.intercept} min={-5} max={5} step={0.5} format={(v) => fixed(v, 1)} onChange={set("intercept")} />
          <Slider label="Noise σ" value={state.noise} min={0} max={8} step={0.25} format={(v) => fixed(v, 2)} onChange={set("noise")} />
          <Slider label="Sample size n" value={state.samples} min={MIN_SAMPLES} max={500} step={10} format={(v) => String(v)} onChange={set("samples")} />
        </Controls>
      </div>
      <Readout items={[
        { label: "fitted slope β̂", value: <LabNumber value={fit.slope} />, note: `standard error ${fixed(fit.slopeError, 3)}` },
        { label: "95% interval for β", value: `${fixed(fit.interval[0])} to ${fixed(fit.interval[1])}`, note: covers ? "contains the true slope" : "misses the true slope" },
        { label: "R²", value: <LabNumber value={fit.rSquared} digits={3} /> },
        { label: "fitted intercept α̂", value: <LabNumber value={fit.intercept} /> },
        { label: `intervals covering β, ${REPEATS} fresh samples`, value: <LabNumber value={coverage} digits={0} percent />, note: "should be close to 95%" },
      ]} />
    </div>
  );
}
