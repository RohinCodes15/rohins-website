"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { ticks } from "@/lib/lab/random";

type Scale = (value: number) => number;
type Domain = readonly [number, number];

interface PlotProps {
  /** Text alternative: what the chart shows and its key values. */
  label: string;
  x: Domain;
  y: Domain;
  /** Receives the tick spacing, so labels carry just enough decimals to stay distinct. */
  formatX?: (value: number, step: number) => string;
  formatY?: (value: number, step: number) => string;
  xLabel: string;
  yLabel: string;
  height?: number;
  children: (scales: { sx: Scale; sy: Scale; width: number }) => ReactNode;
}

const MARGIN = { top: 28, right: 12, bottom: 36, left: 52 };
const FALLBACK_WIDTH = 640;

/** SVG plot drawn at its real pixel width, so 13 px labels stay 13 px on a phone. Grid and axes stay recessive. */
export function Plot({ label, x, y, formatX = String, formatY = String, xLabel, yLabel, height = 280, children }: PlotProps) {
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(FALLBACK_WIDTH);

  // Layout effect: measure before the first paint, or phones briefly draw at FALLBACK_WIDTH and overflow.
  // Safe here because the demos render only in the browser (ClientOnly).
  useLayoutEffect(() => {
    const element = box.current;
    if (!element) return;
    setWidth(Math.max(240, Math.round(element.clientWidth)));
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(240, Math.round(entry.contentRect.width))));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const inner = { width: width - MARGIN.left - MARGIN.right, height: height - MARGIN.top - MARGIN.bottom };
  const sx: Scale = (value) => MARGIN.left + ((value - x[0]) / (x[1] - x[0] || 1)) * inner.width;
  const sy: Scale = (value) => MARGIN.top + inner.height - ((value - y[0]) / (y[1] - y[0] || 1)) * inner.height;
  const xTicks = ticks(x[0], x[1], width < 480 ? 3 : 6);
  const yTicks = ticks(y[0], y[1], 4);
  const xStep = xTicks[1] - xTicks[0] || 1;
  const yStep = yTicks[1] - yTicks[0] || 1;

  return (
    <div ref={box} className="w-full">
      <svg role="img" aria-label={label} width={width} height={height} className="block overflow-visible font-mono text-index">
        {yTicks.map((tick) => (
          <g key={tick}>
            <line x1={MARGIN.left} x2={width - MARGIN.right} y1={sy(tick)} y2={sy(tick)} className="stroke-rule" />
            <text x={MARGIN.left - 8} y={sy(tick)} dy="0.32em" textAnchor="end" className="fill-text-2">{formatY(tick, yStep)}</text>
          </g>
        ))}
        {xTicks.map((tick) => (
          <text key={tick} x={sx(tick)} y={height - MARGIN.bottom + 16} textAnchor="middle" className="fill-text-2">{formatX(tick, xStep)}</text>
        ))}
        <line x1={MARGIN.left} x2={width - MARGIN.right} y1={MARGIN.top + inner.height} y2={MARGIN.top + inner.height} className="stroke-rule-strong" />
        <text x={width - MARGIN.right} y={height - 4} textAnchor="end" className="fill-text-2">{xLabel}</text>
        <text x={4} y={12} className="fill-text-2">{yLabel}</text>
        {children({ sx, sy, width })}
      </svg>
    </div>
  );
}

/** "M x y L x y …" for a polyline. */
export function linePath(points: readonly (readonly [number, number])[]): string {
  return points.map(([px, py], index) => `${index ? "L" : "M"}${px.toFixed(1)} ${py.toFixed(1)}`).join("");
}
