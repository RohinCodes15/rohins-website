"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { frontier, normalRisk, portfolioMoments, simulatedRisk } from "@/lib/lab/portfolio";
import { histogram } from "@/lib/lab/random";
import { ChartFigure, Controls, DemoNote, HALO, Key, Readout, percent, tickNumber, tickPercent } from "./parts";
import { Plot, linePath } from "./plot";
import { Slider } from "./slider";

const SAMPLES = 20000;

export function PortfolioDemo() {
  const [state, setState] = useState({ weight: 0.6, returnA: 0.08, volA: 0.22, returnB: 0.03, volB: 0.08, correlation: 0.2, seed: 1 });
  const deferred = useDeferredValue(state);
  const set = (key: keyof typeof state) => (value: number) => setState((current) => ({ ...current, [key]: value }));

  const { params, moments, normal, simulated, curve } = useMemo(() => {
    const params = { weight: deferred.weight, returns: [deferred.returnA, deferred.returnB] as const, volatilities: [deferred.volA, deferred.volB] as const, correlation: deferred.correlation };
    const moments = portfolioMoments(params);
    return { params, moments, normal: normalRisk(moments.expected, moments.volatility), simulated: simulatedRisk(params, SAMPLES, deferred.seed), curve: frontier(params) };
  }, [deferred]);

  const sigmaMax = Math.max(params.volatilities[0], params.volatilities[1]) * 1.15;
  const muValues = [...curve.map(({ expected }) => expected), 0];
  const bins = histogram(simulated.outcomes, 40);
  const maxCount = Math.max(...bins.map(({ count }) => count));
  const weighted = deferred.weight * deferred.volA + (1 - deferred.weight) * deferred.volB;

  return (
    <div className="grid gap-8">
      <DemoNote />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <ChartFigure number="3" caption="Risk and expected return of every mix of two synthetic assets. The marked point is the current weight."
          legend={<><Key mark="line">all weights from B to A</Key><Key mark="probe">current portfolio</Key><Key mark="dot">single asset</Key></>}>
          <Plot label={`Risk–return curve. Current portfolio: expected return ${percent(moments.expected)}, volatility ${percent(moments.volatility)}.`}
            x={[0, sigmaMax]} y={[Math.min(...muValues) - 0.01, Math.max(...muValues) + 0.01]} xLabel="volatility σ" yLabel="expected return μ" formatX={tickPercent} formatY={tickPercent}>
            {({ sx, sy, width }) => (
              <>
                <path d={linePath(curve.map(({ volatility, expected }) => [sx(volatility), sy(expected)]))} className="fill-none stroke-signal" strokeWidth={2} />
                {([["A", params.volatilities[0], params.returns[0]], ["B", params.volatilities[1], params.returns[1]]] as const).map(([name, sigma, mu]) => (
                  <g key={name}>
                    <circle cx={sx(sigma)} cy={sy(mu)} r={4} className="fill-text stroke-surface" strokeWidth={2} />
                    {/* Labels near the right edge sit left of their point so they never clip. A sits above, B below, so they never overprint. */}
                    <text x={sx(sigma) > width * 0.7 ? sx(sigma) - 8 : sx(sigma) + 8} y={sy(mu)} dy={name === "A" ? "-0.6em" : "1.3em"} textAnchor={sx(sigma) > width * 0.7 ? "end" : "start"} className="fill-text">Asset {name}</text>
                  </g>
                ))}
                <rect x={sx(moments.volatility) - 5} y={sy(moments.expected) - 5} width={10} height={10} className="fill-probe-mark stroke-surface" strokeWidth={2}>
                  <title>{`Weight in A ${percent(deferred.weight, 0)}: μ ${percent(moments.expected)}, σ ${percent(moments.volatility)}`}</title>
                </rect>
              </>
            )}
          </Plot>
        </ChartFigure>
        <Controls seed={state.seed} onResample={() => setState((current) => ({ ...current, seed: current.seed + 1 }))}>
          <Slider label="Weight in asset A" value={state.weight} min={0} max={1} step={0.01} format={(v) => percent(v, 0)} onChange={set("weight")} />
          <Slider label="Correlation ρ" value={state.correlation} min={-0.9} max={0.9} step={0.05} format={(v) => v.toFixed(2).replace("-", "−")} onChange={set("correlation")} />
          <Slider label="Asset A return μ" value={state.returnA} min={-0.05} max={0.15} step={0.01} format={(v) => percent(v, 0)} onChange={set("returnA")} />
          <Slider label="Asset A volatility σ" value={state.volA} min={0.02} max={0.5} step={0.01} format={(v) => percent(v, 0)} onChange={set("volA")} />
          <Slider label="Asset B return μ" value={state.returnB} min={-0.05} max={0.15} step={0.01} format={(v) => percent(v, 0)} onChange={set("returnB")} />
          <Slider label="Asset B volatility σ" value={state.volB} min={0.02} max={0.5} step={0.01} format={(v) => percent(v, 0)} onChange={set("volB")} />
        </Controls>
      </div>
      <ChartFigure number="4" caption={`${SAMPLES.toLocaleString("en-US")} simulated one-year portfolio returns. The worst 5% sit left of the VaR line.`}
        legend={<><Key mark="bar">simulated returns</Key><Key mark="probe">worst 5%</Key></>}>
        <Plot label={`Histogram of simulated returns. 95% value at risk ${percent(simulated.var95)}, expected shortfall ${percent(simulated.es95)}.`}
          x={[bins[0].start, bins.at(-1)!.end]} y={[0, maxCount]} xLabel="one-year return" yLabel="samples" formatX={tickPercent} formatY={tickNumber} height={220}>
          {({ sx, sy }) => (
            <>
              {bins.map(({ start, end, count }) => (
                <rect key={start} x={sx(start) + 1} width={Math.max(0, sx(end) - sx(start) - 2)} y={sy(count)} height={sy(0) - sy(count)} rx={1}
                  className={end <= -simulated.var95 ? "fill-probe-mark" : "fill-signal-fill"}>
                  <title>{`${percent(start)} to ${percent(end)}: ${count} samples`}</title>
                </rect>
              ))}
              <line x1={sx(-simulated.var95)} x2={sx(-simulated.var95)} y1={sy(0)} y2={sy(maxCount)} className="stroke-text" />
              <text x={sx(-simulated.var95) + 4} y={sy(maxCount) + 10} {...HALO}>VaR 95%</text>
            </>
          )}
        </Plot>
      </ChartFigure>
      <Readout items={[
        { label: "expected return μₚ", value: percent(moments.expected) },
        { label: "volatility σₚ", value: percent(moments.volatility), note: `${percent(weighted)} if ρ were 1` },
        { label: "95% VaR, normal formula", value: percent(normal.var95) },
        { label: "95% VaR, simulated", value: percent(simulated.var95) },
        { label: "95% expected shortfall, normal", value: percent(normal.es95) },
        { label: "95% expected shortfall, simulated", value: percent(simulated.es95) },
      ]} />
    </div>
  );
}
