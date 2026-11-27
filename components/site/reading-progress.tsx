"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";

/** Pages with less than this many extra viewports of scroll get no indicator. */
const MIN_SCROLL_VIEWPORTS = 0.75;
/** Gap kept between the indicator and the viewport edge while it is moved. */
const SAFE_EDGE = 8;
/** Distance one arrow-key press moves the indicator; Shift moves it further. */
const KEY_STEP = 24;
const KEY_STEP_LARGE = 96;
const RADIUS = 18;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

type Offset = { x: number; y: number };

/** Keeps the indicator inside the viewport. Offsets are measured from its resting corner. */
const clampOffset = ({ x, y }: Offset, element: HTMLElement | null): Offset => {
  if (!element) return { x, y };
  const { width, height } = element.getBoundingClientRect();
  const style = getComputedStyle(element);
  const restRight = window.innerWidth - parseFloat(style.right);
  const restBottom = window.innerHeight - parseFloat(style.bottom);
  const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
  return {
    x: clamp(x, SAFE_EDGE + width - restRight, window.innerWidth - SAFE_EDGE - restRight),
    y: clamp(y, SAFE_EDGE + height - restBottom, window.innerHeight - SAFE_EDGE - restBottom),
  };
};

/**
 * Reading progress for long pages: a ring and a percentage in the bottom-right corner, shown once reading starts on a
 * page with enough to scroll. Drag it anywhere inside the viewport, or focus it and use the arrow keys (Home puts it
 * back). One passive, frame-throttled scroll listener; it re-renders only when the whole percentage changes. Mount it
 * per page, so progress and position start fresh on every route.
 * Interaction after Skiper UI's Skiper 89 (skiper-ui.com); no Skiper code is used.
 */
export function ReadingProgress() {
  const [percent, setPercent] = useState(0);
  const [scrollable, setScrollable] = useState(false);
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const element = useRef<HTMLDivElement>(null);
  const drag = useRef<{ pointer: number; start: Offset; origin: Offset } | null>(null);
  const hintId = useId();

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const range = document.documentElement.scrollHeight - window.innerHeight;
      setScrollable(range > window.innerHeight * MIN_SCROLL_VIEWPORTS);
      setPercent(range > 0 ? Math.round(Math.min(1, Math.max(0, window.scrollY / range)) * 100) : 0);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const resize = () => { schedule(); setOffset((current) => clampOffset(current, element.current)); };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { pointer: event.pointerId, start: { x: event.clientX, y: event.clientY }, origin: offset };
    setDragging(true);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const active = drag.current;
    if (!active || active.pointer !== event.pointerId) return;
    setOffset(clampOffset({ x: active.origin.x + event.clientX - active.start.x, y: active.origin.y + event.clientY - active.start.y }, element.current));
  };
  const endDrag = () => { drag.current = null; setDragging(false); };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? KEY_STEP_LARGE : KEY_STEP;
    const moves: Record<string, Offset> = { ArrowLeft: { x: -step, y: 0 }, ArrowRight: { x: step, y: 0 }, ArrowUp: { x: 0, y: -step }, ArrowDown: { x: 0, y: step } };
    if (event.key === "Home") { event.preventDefault(); setOffset({ x: 0, y: 0 }); return; }
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    setOffset((current) => clampOffset({ x: current.x + move.x, y: current.y + move.y }, element.current));
  };

  const shown = scrollable && percent > 0;
  return (
    <div
      ref={element}
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-valuetext={`${percent}% read`}
      aria-describedby={hintId}
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      data-shown={shown}
      data-dragging={dragging}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
      className="reading-progress"
      style={{ "--progress": percent, "--offset-x": `${offset.x}px`, "--offset-y": `${offset.y}px` } as CSSProperties}
    >
      <svg viewBox="0 0 48 48" aria-hidden="true" className="reading-progress-ring">
        <circle cx="24" cy="24" r={RADIUS} className="reading-progress-track" />
        <circle cx="24" cy="24" r={RADIUS} className="reading-progress-bar" strokeDasharray={CIRCUMFERENCE} />
      </svg>
      <span aria-hidden="true" className="reading-progress-number" />
      <span role="tooltip" className="reading-progress-tip">{percent}% read</span>
      <span id={hintId} className="sr-only">Drag to move it, or use the arrow keys. Home puts it back in the corner.</span>
    </div>
  );
}
