'use client';

/**
 * ChromaGrid from React Bits (https://reactbits.dev/components/chroma-grid), installed with
 * `shadcn add https://reactbits.dev/r/ChromaGrid-TS-TW.json` (shadcn 4.23.1). Copyright (c) 2026 David Haz,
 * MIT + Commons Clause (see ./LICENSE.md). Kept: the pointer-driven spotlight (CSS variables written from one
 * requestAnimationFrame loop, so moving the pointer never re-renders React), its falloff mask, grayscale base layer,
 * colour layer, accent wash and rim. Local changes: tiles are technology logos (contained, not cover photos) on
 * buttons with one roving tab stop; keyboard focus moves the spotlight; colours come from the site tokens instead of
 * the built-in themes; the photo demo items, card-reveal mode, frame and info rows are removed; mono logos invert in
 * dark mode; a tile without a logo shows only its name; tiles carry a view-transition name while the caller filters;
 * the base layer dims by opacity, not brightness, so white and black mono logos settle to the caption grey in both themes.
 */

import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type RefObject } from 'react';
import { cn } from '@/lib/utils';

export interface ChromaItem {
  id: string;
  title: string;
  /** Local logo path. Without one, the tile shows its title alone. */
  image?: string;
  /** Brand colour for the spotlight wash and rim; the signal blue otherwise. */
  accent?: string;
  /** Single-colour logo that inverts in dark mode. */
  mono?: boolean;
  /** Read after the title by assistive technology. */
  description?: string;
}

export interface ChromaGridProps {
  items: readonly ChromaItem[];
  /** Accessible name of the list. */
  label?: string;
  /** Spotlight radius in px. */
  radius?: number;
  softness?: number;
  /** Lag of the spotlight behind the pointer. */
  damping?: number;
  /** Seconds for the colour to drain after the pointer leaves. */
  fadeOut?: number;
  /** 0–1 grayscale of logos outside the spotlight. */
  grayscale?: number;
  /** 0–0.9 dimming of logos outside the spotlight. */
  dim?: number;
  glow?: number;
  borderGlow?: number;
  /** The tile under the pointer, focused or tapped. */
  onActive?: (id: string) => void;
  className?: string;
}

const LOGO_SIZE = 32;
const SPOT_MASK =
  'radial-gradient(circle var(--chroma-r) at calc(var(--chroma-x, -9999px) - var(--chroma-ox, 0px)) calc(var(--chroma-y, -9999px) - var(--chroma-oy, 0px)), var(--chroma-stops))';
const WASH = 'radial-gradient(120% 80% at 50% 100%, var(--chroma-accent), transparent 70%)';
const GLOW_RIM = 'inset 0 0 0 1px var(--chroma-accent)';
const LAYER = 'pointer-events-none absolute inset-0';
const LOGO_CLASS = 'absolute inset-0 m-auto size-8 select-none object-contain [-webkit-user-drag:none]';
const NEXT_KEYS: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const falloffStops = (softness: number) => {
  const core = clamp(1 - softness, 0, 0.95);
  const stops = [];
  for (let i = 0; i <= 12; i++) {
    const t = i / 12;
    const u = clamp((t - core) / Math.max(0.0001, 1 - core), 0, 1);
    const alpha = 1 - u * u * u * (u * (u * 6 - 15) + 10);
    stops.push(`rgba(0, 0, 0, ${alpha.toFixed(3)}) ${(t * 100).toFixed(1)}%`);
  }
  return stops.join(', ');
};

/** Pointer and focus drive --chroma-x/y/power on the root; offsets let each masked layer place the same circle. */
function useSpotlight(root: RefObject<HTMLUListElement | null>, damping: number, fadeOut: number) {
  const settings = useRef({ damping, fadeOut });
  useEffect(() => {
    settings.current = { damping, fadeOut };
  }, [damping, fadeOut]);

  useEffect(() => {
    const node = root.current;
    if (!node) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const state = { x: 0, y: 0, tx: 0, ty: 0, power: 0, target: 0, primed: false };
    let raf = 0;
    let last = 0;

    const place = () => {
      const box = node.getBoundingClientRect();
      node.querySelectorAll<HTMLElement>('[data-chroma-area]').forEach((area) => {
        const rect = area.getBoundingClientRect();
        area.style.setProperty('--chroma-ox', `${rect.left - box.left}px`);
        area.style.setProperty('--chroma-oy', `${rect.top - box.top}px`);
      });
    };

    const frame = (now: number) => {
      raf = 0;
      const instant = reduce.matches;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      const follow = instant ? 1 : 1 - Math.exp(-dt / Math.max(0.01, settings.current.damping * 0.32));
      state.x += (state.tx - state.x) * follow;
      state.y += (state.ty - state.y) * follow;
      const span = state.target > state.power ? 0.1 : Math.max(0.02, settings.current.fadeOut * 0.35);
      state.power += (state.target - state.power) * (instant ? 1 : 1 - Math.exp(-dt / span));
      const settled = Math.abs(state.tx - state.x) < 0.1 && Math.abs(state.ty - state.y) < 0.1 && Math.abs(state.target - state.power) < 0.002;
      if (settled) {
        state.power = state.target;
        last = 0;
      } else {
        raf = requestAnimationFrame(frame);
      }
      node.style.setProperty('--chroma-x', `${state.x.toFixed(2)}px`);
      node.style.setProperty('--chroma-y', `${state.y.toFixed(2)}px`);
      node.style.setProperty('--chroma-power', state.power.toFixed(4));
    };

    const aim = (clientX: number, clientY: number) => {
      const box = node.getBoundingClientRect();
      state.tx = clientX - box.left;
      state.ty = clientY - box.top;
      if (!state.primed || state.power < 0.02) {
        state.x = state.tx;
        state.y = state.ty;
        state.primed = true;
      }
      state.target = 1;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const release = () => {
      state.target = 0;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onPointer = (event: PointerEvent) => aim(event.clientX, event.clientY);
    // A lifted finger also "leaves"; keep a tapped tile in colour until focus moves out of the grid.
    const onLeave = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') release();
    };
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof HTMLElement) || !event.target.matches(':focus-visible')) return;
      const rect = event.target.getBoundingClientRect();
      aim(rect.left + rect.width / 2, rect.top + rect.height / 2);
    };
    const onBlur = (event: FocusEvent) => {
      if (!node.contains(event.relatedTarget as Node | null)) release();
    };

    // Tiles reflow when the caller filters them; both observers re-measure so the circle stays on target.
    const resize = new ResizeObserver(place);
    resize.observe(node);
    const mutations = new MutationObserver(place);
    mutations.observe(node, { childList: true });
    node.addEventListener('pointermove', onPointer);
    node.addEventListener('pointerdown', onPointer);
    node.addEventListener('pointerleave', onLeave);
    node.addEventListener('pointercancel', release);
    node.addEventListener('focusin', onFocus);
    node.addEventListener('focusout', onBlur);
    place();

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      mutations.disconnect();
      node.removeEventListener('pointermove', onPointer);
      node.removeEventListener('pointerdown', onPointer);
      node.removeEventListener('pointerleave', onLeave);
      node.removeEventListener('pointercancel', release);
      node.removeEventListener('focusin', onFocus);
      node.removeEventListener('focusout', onBlur);
    };
  }, [root]);
}

export function ChromaGrid({
  items,
  label,
  // Chosen in the browser (HANDOFF, Stack Chroma Grid): 160 lit about two tiles, 240 read as a wash.
  radius = 220,
  softness = 0.6,
  damping = 0.45,
  fadeOut = 0.6,
  grayscale = 1,
  dim = 0.4,
  glow = 0.5,
  borderGlow = 0.6,
  onActive,
  className
}: ChromaGridProps) {
  const rootRef = useRef<HTMLUListElement>(null);
  const [stop, setStop] = useState<string | null>(null);
  useSpotlight(rootRef, damping, fadeOut);

  // One tab stop for the whole grid; arrows, Home and End move between tiles.
  const tabStop = items.some(({ id }) => id === stop) ? stop : items[0]?.id;
  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const tiles = [...(rootRef.current?.querySelectorAll<HTMLButtonElement>('[data-chroma-tile]') ?? [])];
    const current = tiles.indexOf(document.activeElement as HTMLButtonElement);
    if (current < 0) return;
    const step = NEXT_KEYS[event.key];
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tiles.length - 1 : step ? clamp(current + step, 0, tiles.length - 1) : -1;
    if (next < 0) return;
    event.preventDefault();
    tiles[next].focus();
  };

  const style = {
    '--chroma-r': `${Math.max(20, radius)}px`,
    '--chroma-stops': falloffStops(clamp(softness, 0, 1)),
    '--chroma-gray': clamp(grayscale, 0, 1),
    '--chroma-dim': clamp(dim, 0, 0.9),
    '--chroma-glow': clamp(glow, 0, 1),
    '--chroma-border': clamp(borderGlow, 0, 1)
  } as CSSProperties;
  const spot = { WebkitMaskImage: SPOT_MASK, maskImage: SPOT_MASK };

  return (
    <ul ref={rootRef} aria-label={label} className={cn('chroma-grid relative grid [-webkit-tap-highlight-color:transparent]', className)} style={style} onKeyDown={onKeyDown}>
      {items.map(({ id, title, image, accent, mono, description }) => (
        <li key={id} className="min-w-0">
          <button
            type="button"
            data-chroma-area=""
            data-chroma-tile=""
            tabIndex={id === tabStop ? 0 : -1}
            aria-describedby={description ? `chroma-${id}-detail` : undefined}
            onPointerEnter={() => onActive?.(id)}
            onFocus={() => { setStop(id); onActive?.(id); }}
            onClick={() => onActive?.(id)}
            className="chroma-tile relative isolate flex h-full w-full cursor-default flex-col items-center justify-center gap-2 overflow-hidden rounded-xs border border-rule px-1.5 py-3 text-center"
            style={{ '--chroma-accent': accent ?? 'var(--signal)', '--chroma-vt': `chroma-${id}` } as CSSProperties}
          >
            <span aria-hidden="true" className={LAYER} style={{ background: WASH, opacity: 'calc(var(--chroma-glow) * var(--chroma-power, 0) * 0.35)', ...spot }} />
            {image && (
              <span data-chroma-area="" aria-hidden="true" className="relative size-8 shrink-0">
                <Image src={image} alt="" width={LOGO_SIZE} height={LOGO_SIZE} unoptimized className={cn(LOGO_CLASS, 'grayscale-[var(--chroma-gray)] opacity-[calc(1-var(--chroma-dim))]', mono && 'dark:invert')} />
                <Image src={image} alt="" width={LOGO_SIZE} height={LOGO_SIZE} unoptimized className={cn(LOGO_CLASS, mono && 'dark:invert')} style={{ opacity: 'var(--chroma-power, 0)', ...spot }} />
              </span>
            )}
            <span className={cn('relative line-clamp-2 leading-tight text-text-2', image ? 'text-small' : 'text-body')}>{title}</span>
            <span aria-hidden="true" className={cn(LAYER, 'rounded-[inherit]')} style={{ boxShadow: GLOW_RIM, opacity: 'calc(var(--chroma-border) * var(--chroma-power, 0))', ...spot }} />
          </button>
          {description && <span id={`chroma-${id}-detail`} hidden>{description}</span>}
        </li>
      ))}
    </ul>
  );
}
