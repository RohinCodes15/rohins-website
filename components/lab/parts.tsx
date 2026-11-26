import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export const percent = (value: number, digits = 1) => `${(value * 100).toFixed(digits)}%`;
export const fixed = (value: number, digits = 2) => value.toFixed(digits).replace("-", "−");
/** Decimals a tick spacing needs: 5 needs 0, 0.5 needs 1, 0.05 needs 2. */
const tickDecimals = (step: number) => Math.max(0, Math.ceil(-Math.log10(step) - 1e-9));
export const tickNumber = (value: number, step: number) => fixed(value, tickDecimals(step));
export const tickPercent = (value: number, step: number) => percent(value, tickDecimals(step * 100)).replace("-", "−");

/** Shown on every demo: these are teaching tools on generated data, not findings or advice. */
export function DemoNote() {
  return (
    <p className="font-mono text-meta text-text-2">
      Educational demonstration · synthetic data · not research findings or investment advice
    </p>
  );
}

/** Metric readout: numeral first visually, label below, both in text tokens. */
export function Readout({ items }: { items: readonly { label: string; value: string; note?: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
      {items.map(({ label, value, note }) => (
        <div key={label} className="flex min-w-0 flex-col">
          <dt className="order-2 mt-1 font-mono text-meta text-text-2">{label}</dt>
          <dd className="order-1 text-h3 tabular-nums">{value}</dd>
          {note && <dd className="order-3 mt-0.5 text-small text-text-2">{note}</dd>}
        </div>
      ))}
    </dl>
  );
}

/** Chart frame and caption, matching the site's figures. */
export function ChartFigure({ number, caption, legend, children }: { number: string; caption: string; legend?: ReactNode; children: ReactNode }) {
  return (
    <figure className="min-w-0">
      <div className="rounded-sm border border-rule-strong bg-surface px-2 pt-3 pb-1 sm:px-3">
        {legend && <div className="mb-2 flex flex-wrap gap-x-5 gap-y-1 px-1 font-mono text-index text-text-2">{legend}</div>}
        {children}
      </div>
      <figcaption className="mt-3 text-small text-text-2"><span className="font-mono text-meta">Fig. {number}</span> — {caption}</figcaption>
    </figure>
  );
}

/** Legend key: the mark's shape beside its name, so identity is never colour alone. */
export function Key({ mark, children }: { mark: "line" | "dash" | "dot" | "point" | "bar" | "probe"; children: ReactNode }) {
  const marks = {
    line: <span className="h-0.5 w-4 bg-signal" />,
    dash: <span className="w-4 border-t-2 border-dashed border-text" />,
    dot: <span className="size-2 rounded-full bg-text" />,
    point: <span className="size-2 rounded-full bg-signal-fill" />,
    bar: <span className="size-2.5 bg-signal-fill" />,
    probe: <span className="size-2.5 bg-probe-mark" />,
  };
  return <span className="inline-flex items-center gap-2">{marks[mark]}{children}</span>;
}

/** Controls column with a resample button that shows the seed, so any result can be reproduced. */
export function Controls({ children, seed, onResample }: { children: ReactNode; seed: number; onResample: () => void }) {
  return (
    <fieldset className="grid content-start gap-4">
      <legend className="sr-only">Parameters</legend>
      {children}
      <div className="flex items-center justify-between gap-3 pt-1">
        <Button onClick={onResample} className="cursor-pointer">New sample</Button>
        <span className="font-mono text-meta text-text-2 tabular-nums">seed {seed}</span>
      </div>
    </fieldset>
  );
}

/** Annotation text drawn over marks: a surface-coloured halo keeps it legible on top of bars. */
export const HALO = { className: "fill-text stroke-surface [paint-order:stroke]", strokeWidth: 3, strokeLinejoin: "round" } as const;
