"use client";

import { useId } from "react";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
  onChange: (value: number) => void;
}

/** Native range input: keyboard, touch, and screen readers work without extra code. */
export function Slider({ label, value, min, max, step, format, onChange }: SliderProps) {
  const id = useId();
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3">
      <label htmlFor={id} className="text-small text-text-2">{label}</label>
      <output htmlFor={id} className="font-mono text-meta tabular-nums">{format(value)}</output>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={format(value)}
        onChange={(event) => onChange(Number(event.target.value))}
        className="col-span-2 h-6 w-full cursor-pointer accent-signal"
      />
    </div>
  );
}
