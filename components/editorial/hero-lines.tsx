"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type ComponentProps } from "react";

import { HERO_PLAYED_KEY } from "@/lib/hero-entrance";

type FloatingLines = typeof import("@/components/reactbits/floating-lines").default;
type Scheme = "light" | "dark";

/** Live lines start after this much idle time at most, so they never compete with first paint. */
const IDLE_TIMEOUT_MS = 1200;
/** Frame-rate check: sample this long after the intro, and fall back below this rate. */
const PROBE_DELAY_MS = 2000;
const PROBE_WINDOW_MS = 2000;
const MIN_FPS = 30;

function readHeroPlayed() {
  try {
    return sessionStorage.getItem(HERO_PLAYED_KEY) !== null;
  } catch {
    return false;
  }
}

// Blue carries the composition; white leads each wave and crimson closes it as a single accent line.
const STOPS = ["#FAFAFA", "#93C5FD", "#3B82F6", "#3B82F6", "#3B82F6", "#3B82F6", "#3B82F6", "#EF4444"];

const SHARED: ComponentProps<FloatingLines> = {
  linesGradient: STOPS,
  enabledWaves: ["top", "middle", "bottom"],
  // Ten lines per wave: the line before crimson takes about a tenth of its tint, so no purple line reads.
  lineCount: 10,
  animationSpeed: 0.4,
  amplitude: 1,
  lineWidth: 1,
  depthOfField: 0.2,
  interactive: true,
  bendRadius: 5,
  bendStrength: -0.5,
  mouseDamping: 0.04,
  parallax: true,
  parallaxStrength: 0.15,
  clickSwirl: false,
};

const LOOK: Record<Scheme, ComponentProps<FloatingLines>> = {
  dark: { glow: 0.25, brightness: 0.75, mixBlendMode: "screen" },
  light: { lightMode: true, opacity: 0.9 },
};

/** From lg the waves fall through the full height of the hero's right side; the band below lg runs across. */
const LAYOUT: Record<"wide" | "compact", ComponentProps<FloatingLines>> = {
  wide: {
    lineDistance: [4, 3.5, 4.5],
    topWavePosition: { x: 8, y: 0.6, rotate: -1.4 },
    middleWavePosition: { x: 4, y: 0, rotate: 1.2 },
    bottomWavePosition: { x: 2, y: -0.6, rotate: -1.8 },
  },
  compact: {
    lineDistance: [6, 5, 7],
    topWavePosition: { x: 9, y: 0.2, rotate: -0.35 },
    middleWavePosition: { x: 5, y: -0.15, rotate: 0.18 },
    bottomWavePosition: { x: 2.5, y: -0.55, rotate: -0.7 },
  },
};

/** The resolved colour scheme: an explicit data-theme wins, "system" follows the OS. */
function subscribeScheme(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  media.addEventListener("change", onChange);
  return () => { observer.disconnect(); media.removeEventListener("change", onChange); };
}
function readScheme(): Scheme {
  const theme = document.documentElement.dataset.theme;
  if (theme === "light" || theme === "dark") return theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Weak hardware, data saver, reduced motion or no WebGL2 keep the static drawing. */
function canAnimate() {
  if (typeof WebGL2RenderingContext === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const { hardwareConcurrency = 8, connection } = navigator as Navigator & { connection?: { saveData?: boolean } };
  return hardwareConcurrency > 2 && !connection?.saveData;
}

/** A software rasterizer (no GPU) cannot hold the frame rate and blocks the main thread while it tries. */
function hasHardwareWebGL() {
  const gl = document.createElement("canvas").getContext("webgl2");
  if (!gl) return false;
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
  gl.getExtension("WEBGL_lose_context")?.loseContext();
  return !/swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer);
}

/** Counts frames for a window after the intro; calls `onSlow` if the page cannot hold MIN_FPS. */
function probeFrameRate(onSlow: () => void) {
  let raf = 0;
  let frames = 0;
  let start = 0;
  const tick = (now: number) => {
    if (!start) start = now;
    frames += 1;
    if (now - start < PROBE_WINDOW_MS) { raf = requestAnimationFrame(tick); return; }
    if (!document.hidden && (frames * 1000) / (now - start) < MIN_FPS) onSlow();
  };
  const timer = window.setTimeout(() => { raf = requestAnimationFrame(tick); }, PROBE_DELAY_MS);
  return () => { window.clearTimeout(timer); cancelAnimationFrame(raf); };
}

/**
 * Hero visual: React Bits Floating Lines over a static drawing of the same waves. The drawing is server HTML,
 * so it shows without JavaScript, under reduced motion, without WebGL2 or a GPU and on slow devices, and reserves the
 * space so nothing shifts. The WebGL code loads at idle time and fades in over it.
 */
export function HeroLines() {
  const [Lines, setLines] = useState<FloatingLines | null>(null);
  const [failed, setFailed] = useState(false);
  const [wide, setWide] = useState(true);
  const [dpr, setDpr] = useState(1);
  const scheme = useSyncExternalStore(subscribeScheme, readScheme, () => "dark" as const);

  useEffect(() => {
    if (!canAnimate()) return;
    let cancelled = false;
    const load = () => hasHardwareWebGL() && import("@/components/reactbits/floating-lines")
      .then(({ default: Component }) => {
        if (cancelled) return;
        // shortcut: layout and DPR are read once at load; a later resize across lg keeps them until reload.
        setWide(window.matchMedia("(min-width: 64rem)").matches);
        setDpr(Math.min(window.devicePixelRatio || 1, window.matchMedia("(pointer: coarse)").matches ? 1.25 : 1.5));
        setLines(() => Component);
      })
      .catch(() => { if (!cancelled) setFailed(true); });
    const hasIdle = "requestIdleCallback" in window;
    const idle = hasIdle ? window.requestIdleCallback(load, { timeout: IDLE_TIMEOUT_MS }) : window.setTimeout(load, IDLE_TIMEOUT_MS);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => { if (motion.matches) setFailed(true); };
    motion.addEventListener("change", onMotion);
    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      motion.removeEventListener("change", onMotion);
    };
  }, []);

  // The hero entrance (globals.css) ends with this layer's fade. Once it has finished, or was cut short by leaving the
  // page, record it for the tab session (lib/hero-entrance.ts). A later in-app mount turns it off before paint, since
  // the head script runs only on full page loads.
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (readHeroPlayed()) {
      document.documentElement.dataset.heroPlayed = "";
      return;
    }
    const entrance = root.current?.getAnimations().map((animation) => animation.finished) ?? [];
    void Promise.allSettled(entrance).then(() => {
      try {
        sessionStorage.setItem(HERO_PLAYED_KEY, "1");
      } catch {
        // Blocked storage: the entrance plays on each load.
      }
    });
  }, []);

  const live = Lines && !failed;
  useEffect(() => (live ? probeFrameRate(() => setFailed(true)) : undefined), [live]);

  return (
    <div
      aria-hidden="true"
      className="hero-lines"
      data-live={live ? "" : undefined}
      ref={root}
    >
      <StaticLines />
      {live && <Lines
        {...SHARED}
        {...LOOK[scheme]}
        {...LAYOUT[wide ? "wide" : "compact"]}
        dpr={dpr}
        className="hero-lines-canvas"
        onUnavailable={() => setFailed(true)}
      />}
    </div>
  );
}

/**
 * A still frame of the live composition, drawn from fixed numbers so server and client match: a braid of two
 * bands falling the full height and crossing at the middle (white, ice, blues, one crimson; then a fainter band).
 */
const MAIN_TONES = ["--hero-line-hi", "--hero-line-hi", ...Array(7).fill("--hero-line"), "--hero-line-accent"];
const STATIC_PATHS = [
  ...MAIN_TONES.map((tone, line) => {
    const x = 470 + line * 14;
    return {
      d: `M${x} -20 C ${x - 180} 250 ${x + 230} 420 ${x + 40} 700`,
      tone: `var(${tone})`,
      opacity: tone === "--hero-line" ? 0.6 : 0.75,
    };
  }),
  ...Array.from({ length: 8 }, (_, line) => {
    const x = 640 + line * 12;
    return { d: `M${x} -20 C ${x + 120} 260 ${x - 260} 440 ${x - 30} 700`, tone: "var(--hero-line)", opacity: 0.3 };
  }),
];

function StaticLines() {
  return (
    <svg className="hero-lines-static" viewBox="0 0 800 680" preserveAspectRatio="xMidYMid slice" fill="none">
      {STATIC_PATHS.map(({ d, tone, opacity }) => (
        <path key={d} d={d} style={{ stroke: tone }} strokeOpacity={opacity} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
