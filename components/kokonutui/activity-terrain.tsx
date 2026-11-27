"use client";

/**
 * @author: @dorianbaffier
 * @description: Activity Terrain
 * @version: 1.0.0
 * @date: 2026-10-14
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import {
  type KeyboardEvent,
  type PointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

const DAYS = 7;
const GAP = 0.18;
// Tallest column, in cells.
const MAX_HEIGHT = 6;
const DEG = Math.PI / 180;
// Tilt of the terrain view; flat is looking straight down.
const PITCH_TERRAIN = 56 * DEG;
const YAW_TERRAIN = 30 * DEG;
// How far it turns before the edges start pulling back.
const YAW_LIMIT = 60 * DEG;
// While left alone, the terrain sways gently around its resting turn.
const DRIFT = 7 * DEG;
const DRIFT_SPEED = 0.35;
const DRIFT_STIFFNESS = 6;
// Seconds after the last drag or key press before the sway resumes.
const DRIFT_PAUSE = 2.5;
const PITCH_LIMIT = 66 * DEG;
// Drag, in radians per px.
const DRAG_YAW = 0.32 * DEG;
const DRAG_PITCH = 0.36 * DEG;
// Spin keeps going after a flick and slows on this half-life, in seconds.
const SPIN_HALF_LIFE = 0.16;
// The speed that coasts from straight on to the terrain's resting turn.
const SPIN_IN = (YAW_TERRAIN * Math.LN2) / SPIN_HALF_LIFE;
// Springs, per second squared and per second.
const PITCH_STIFFNESS = 140;
const PITCH_DAMPING = 2 * Math.sqrt(PITCH_STIFFNESS);
const EDGE_STIFFNESS = 180;
const BUMP_STIFFNESS = 400;
const BUMP_DAMPING = 2 * Math.sqrt(BUMP_STIFFNESS) * 0.7;
const BUMP = 0.45;
// Columns rise in a wave from where you grabbed; the far end lags by this
// share of the whole rise.
const WAVE = 0.7;
const PADDING = 28;
const REST_EPSILON = 0.0005;
const LABELS = ["Mon", "", "Wed", "", "Fri", "", ""];

export interface ActivityTerrainProps {
  /** Count per day, oldest first. */
  data: readonly number[];
  /** GitHub colour levels, in the same order as the counts. */
  levels?: readonly (0 | 1 | 2 | 3 | 4)[];
  /** The day of the last value, as YYYY-MM-DD. */
  endDate: string;
  onUnavailable?: () => void;
  title?: string;
  /** Start in the flat, heatmap view. */
  defaultFlat?: boolean;
  className?: string;
}

interface Cell {
  index: number;
  col: number;
  row: number;
  count: number;
  level: number;
  height: number;
  date: Date;
}

interface Pose {
  yaw: number;
  pitch: number;
  scale: number;
  cx: number;
  cy: number;
}

type Rgb = [number, number, number];

interface Palette {
  levels: Rgb[];
  accent: Rgb;
  text: string;
  font: string;
}

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

// A gentle overshoot, so each column pops as it lands.
function easeOutBack(t: number) {
  const c = 1.4;
  const u = t - 1;
  return 1 + (c + 1) * u * u * u + c * u * u;
}

// Resistance past an edge: the further out, the less it moves.
function rubber(value: number, min: number, max: number) {
  if (value < min) {
    return min - 0.18 * (1 - Math.exp((value - min) / 0.18));
  }
  if (value > max) {
    return max + 0.18 * (1 - Math.exp((max - value) / 0.18));
  }
  return value;
}

function parseDay(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function buildCells(data: readonly number[], endDate: string, levels?: ActivityTerrainProps["levels"]) {
  const end = parseDay(endDate);
  const start = new Date(end.getTime() - (data.length - 1) * 86_400_000);
  // Rows run Monday to Sunday.
  const offset = (start.getUTCDay() + 6) % 7;
  const max = Math.max(1, ...data);
  return data.map((count, index): Cell => {
    const slot = index + offset;
    const norm = count / max;
    return {
      index,
      col: Math.floor(slot / DAYS),
      row: slot % DAYS,
      count,
      level: levels?.[index] ?? (count === 0 ? 0 : Math.ceil(norm * 4)),
      // Log scale, so one very busy day does not flatten every other column.
      height: 0.06 + (Math.log1p(count) / Math.log1p(max)) * MAX_HEIGHT,
      date: new Date(start.getTime() + index * 86_400_000),
    };
  });
}

function hexToRgb(value: string): Rgb {
  const hex = value.trim().replace("#", "");
  const n = Number.parseInt(
    hex.length === 3 ? hex.replace(/./g, "$&$&") : hex,
    16
  );
  return [Math.floor(n / 65_536) % 256, Math.floor(n / 256) % 256, n % 256];
}

function shade([r, g, b]: Rgb, amount: number) {
  const k = 1 - amount;
  return `rgb(${Math.round(r * k)},${Math.round(g * k)},${Math.round(b * k)})`;
}

function lighten([r, g, b]: Rgb, amount: number) {
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  return `rgb(${mix(r)},${mix(g)},${mix(b)})`;
}

function readPalette(node: HTMLElement): Palette {
  const style = getComputedStyle(node);
  const read = (name: string) => style.getPropertyValue(name) || "#888888";
  // Resolve CSS theme colours on an element before converting them to canvas RGB.
  const swatch = document.createElement("span");
  swatch.hidden = true;
  node.parentElement?.append(swatch);
  const sample = document.createElement("canvas");
  sample.width = sample.height = 1;
  const context = sample.getContext("2d");
  const rgb = (name: string): Rgb => {
    swatch.style.color = read(name);
    const color = getComputedStyle(swatch).color;
    if (color.startsWith("#")) return hexToRgb(color);
    if (!context) return [136, 136, 136];
    context.fillStyle = color;
    context.clearRect(0, 0, 1, 1);
    context.fillRect(0, 0, 1, 1);
    const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
    return [r, g, b];
  };
  swatch.style.color = read("--terrain-text");
  const text = getComputedStyle(swatch).color;
  const palette = {
    levels: [0, 1, 2, 3, 4].map((l) => rgb(`--terrain-${l}`)),
    accent: rgb("--terrain-accent"),
    text,
    font: style.fontFamily,
  };
  swatch.remove();
  return palette;
}

function project(pose: Pose, x: number, y: number, z: number) {
  const cos = Math.cos(pose.yaw);
  const sin = Math.sin(pose.yaw);
  const xr = x * cos - z * sin;
  const zr = x * sin + z * cos;
  return [
    pose.cx + xr * pose.scale,
    pose.cy +
      (zr * Math.cos(pose.pitch) - y * Math.sin(pose.pitch)) * pose.scale,
  ];
}

/** The faces of one column that face the camera, top last. */
function visibleFaces(
  pose: Pose,
  x0: number,
  z0: number,
  h: number
): { points: number[][]; tone: number }[] {
  const x1 = x0 + 1 - GAP;
  const z1 = z0 + 1 - GAP;
  const p = (x: number, y: number, z: number) => project(pose, x, y, z);
  const faces: { points: number[][]; tone: number }[] = [];
  const sin = Math.sin(pose.yaw);
  const cos = Math.cos(pose.yaw);
  if (h > 0.02 && pose.pitch > 0.01) {
    // Of the four walls, the ones whose outward side points at the camera.
    if (cos > 0) {
      faces.push({
        points: [p(x0, 0, z1), p(x1, 0, z1), p(x1, h, z1), p(x0, h, z1)],
        tone: 0.14,
      });
    } else {
      faces.push({
        points: [p(x0, 0, z0), p(x1, 0, z0), p(x1, h, z0), p(x0, h, z0)],
        tone: 0.14,
      });
    }
    if (sin > 0.001) {
      faces.push({
        points: [p(x1, 0, z0), p(x1, 0, z1), p(x1, h, z1), p(x1, h, z0)],
        tone: 0.26,
      });
    } else if (sin < -0.001) {
      faces.push({
        points: [p(x0, 0, z0), p(x0, 0, z1), p(x0, h, z1), p(x0, h, z0)],
        tone: 0.26,
      });
    }
  }
  faces.push({
    points: [p(x0, h, z0), p(x1, h, z0), p(x1, h, z1), p(x0, h, z1)],
    tone: 0,
  });
  return faces;
}

function inside(points: number[][], x: number, y: number) {
  let hit = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [xi, yi] = points[i];
    const [xj, yj] = points[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      hit = !hit;
    }
  }
  return hit;
}

function polygon(ctx: CanvasRenderingContext2D, points: number[][]) {
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
  ctx.closePath();
}

const formatDay = (date: Date) =>
  date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
const formatMonth = (date: Date) =>
  date.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });

export default function ActivityTerrain({
  data,
  levels,
  endDate,
  onUnavailable,
  title = "Activity",
  defaultFlat = false,
  className,
}: ActivityTerrainProps) {
  const cells = useMemo(() => buildCells(data, endDate, levels), [data, endDate, levels]);
  const weeks = (cells.at(-1)?.col ?? 0) + 1;
  const total = useMemo(() => data.reduce((sum, n) => sum + n, 0), [data]);
  const [flat, setFlat] = useState(defaultFlat);
  const [active, setActive] = useState<Cell | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const [dragging, setDragging] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paletteRef = useRef<Palette | null>(null);
  const sim = useRef({
    yaw: 0,
    yawSpeed: 0,
    // The intro tilts it up from flat once it's on screen.
    pitch: 0,
    pitchSpeed: 0,
    pitchTarget: defaultFlat ? 0 : PITCH_TERRAIN,
    bumps: new Float64Array(cells.length),
    bumpSpeeds: new Float64Array(cells.length),
    hovered: -1,
    origin: { col: 0, row: 3 },
    width: 0,
    height: 0,
    dpr: 1,
    drag: null as null | {
      id: number;
      x: number;
      y: number;
      yaw: number;
      pitch: number;
      moved: boolean;
      samples: { t: number; x: number; y: number }[];
    },
    raf: 0,
    last: 0,
    visible: false,
    started: false,
    reduceMotion: false,
    clock: 0,
    lastInput: Number.NEGATIVE_INFINITY,
  });
  const cellsRef = useRef(cells);
  useEffect(() => {
    cellsRef.current = cells;
    const state = sim.current;
    state.hovered = -1;
    state.bumps = new Float64Array(cells.length);
    state.bumpSpeeds = new Float64Array(cells.length);
  }, [cells]);

  // How tall each column stands right now: the rise travels as a wave out
  // from the origin, and each column overshoots a touch as it lands.
  const columnHeight = useCallback(
    (cell: Cell, lift: number) => {
      const s = sim.current;
      const span = Math.hypot(weeks, DAYS) || 1;
      const d =
        Math.hypot(cell.col - s.origin.col, cell.row - s.origin.row) / span;
      const local = clamp(lift * (1 + WAVE) - d * WAVE, 0, 1);
      return cell.height * easeOutBack(local) + s.bumps[cell.index];
    },
    [weeks]
  );

  const pose = useCallback((): Pose & { lift: number } => {
    const s = sim.current;
    const lift = clamp(s.pitch / PITCH_TERRAIN, 0, 1.2);
    // Fit the whole board, at its current turn and tilt, into the canvas.
    const w = weeks;
    // The board starts 1.25 rows early so the month labels drawn above it (at -0.75) stay inside the canvas.
    const corners = [
      [0, -1.25],
      [w, -1.25],
      [0, DAYS],
      [w, DAYS],
    ];
    const probe: Pose = { yaw: s.yaw, pitch: s.pitch, scale: 1, cx: 0, cy: 0 };
    let minX = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;
    for (const [x, z] of corners) {
      for (const y of [0, MAX_HEIGHT * Math.min(lift, 1)]) {
        const [px, py] = project(probe, x - w / 2, y, z - DAYS / 2);
        minX = Math.min(minX, px);
        maxX = Math.max(maxX, px);
        minY = Math.min(minY, py);
        maxY = Math.max(maxY, py);
      }
    }
    const scale = Math.min(
      (s.width - PADDING * 2) / (maxX - minX),
      (s.height - PADDING * 2) / (maxY - minY)
    );
    return {
      yaw: s.yaw,
      pitch: s.pitch,
      scale,
      cx: s.width / 2 - ((minX + maxX) / 2) * scale,
      cy: s.height / 2 - ((minY + maxY) / 2) * scale + 6,
      lift,
    };
  }, [weeks]);

  // Back to front: the further a column's base, the earlier it's drawn.
  const ordered = useCallback(
    (p: Pose) => {
      const sin = Math.sin(p.yaw);
      const cos = Math.cos(p.yaw);
      const depth = (c: Cell) =>
        (c.col + 0.5 - weeks / 2) * sin + (c.row + 0.5 - DAYS / 2) * cos;
      return [...cellsRef.current].sort((a, b) => depth(a) - depth(b));
    },
    [weeks]
  );

  const drawLabels = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      p: Pose,
      lift: number,
      palette: Palette
    ) => {
      // Labels lie on the ground, so they'd hide behind the columns; they
      // fade out as the terrain rises, and the readout names each day.
      const alpha = clamp(1 - lift * 1.6, 0, 1);
      if (alpha === 0) {
        return;
      }
      const list = cellsRef.current;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = palette.text;
      ctx.font = `11px ${palette.font}`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      let month = -1;
      for (const cell of list) {
        if (cell.row !== 0 && cell.index !== 0) {
          continue;
        }
        const m = cell.date.getUTCMonth();
        if (m !== month && cell.col < weeks - 1) {
          month = m;
          const [x, y] = project(p, cell.col - weeks / 2, 0, -0.75 - DAYS / 2);
          ctx.fillText(formatMonth(cell.date), x, y);
        }
      }
      ctx.textAlign = "right";
      for (let row = 0; row < DAYS; row++) {
        if (LABELS[row]) {
          const [x, y] = project(p, -0.35 - weeks / 2, 0, row + 0.4 - DAYS / 2);
          ctx.fillText(LABELS[row], x, y);
        }
      }
      ctx.globalAlpha = 1;
    },
    [weeks]
  );

  const draw = useCallback(() => {
    const s = sim.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!(canvas && ctx && s.width)) {
      return;
    }
    // Colours come from CSS, read once per theme rather than every frame.
    paletteRef.current ??= readPalette(canvas);
    const palette = paletteRef.current;
    const p = pose();
    ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
    ctx.clearRect(0, 0, s.width, s.height);
    drawLabels(ctx, p, p.lift, palette);
    ctx.lineJoin = "round";
    for (const cell of ordered(p)) {
      const h = columnHeight(cell, p.lift);
      const color =
        cell.index === s.hovered ? palette.accent : palette.levels[cell.level];
      for (const face of visibleFaces(
        p,
        cell.col - weeks / 2,
        cell.row - DAYS / 2,
        h
      )) {
        polygon(ctx, face.points);
        const fill = shade(color, face.tone);
        ctx.fillStyle = fill;
        ctx.fill();
        // A hairline closes the seams between faces; column tops get a lighter
        // rim so low columns still read against a dark background.
        const top = face.tone === 0 && cell.count > 0;
        ctx.strokeStyle = top ? lighten(color, 0.35) : fill;
        ctx.lineWidth = top ? 1 : 0.6;
        ctx.stroke();
      }
    }
  }, [columnHeight, drawLabels, ordered, pose, weeks]);

  const hitTest = useCallback(
    (x: number, y: number) => {
      const p = pose();
      const list = ordered(p);
      for (let i = list.length - 1; i >= 0; i--) {
        const cell = list[i];
        const h = columnHeight(cell, p.lift);
        for (const face of visibleFaces(
          p,
          cell.col - weeks / 2,
          cell.row - DAYS / 2,
          h
        )) {
          if (inside(face.points, x, y)) {
            return cell;
          }
        }
      }
      return null;
    },
    [columnHeight, ordered, pose, weeks]
  );

  const stepSprings = useCallback((dt: number) => {
    const s = sim.current;
    let energy = 0;
    s.clock += dt;
    const drifting = !s.reduceMotion && s.pitchTarget > 0 && s.clock - s.lastInput > DRIFT_PAUSE;
    if (!s.drag) {
      // Spin coasts, then the edge pulls it back in range.
      s.yawSpeed *= 0.5 ** (dt / SPIN_HALF_LIFE);
      let target = s.yaw;
      if (s.pitchTarget === 0) {
        // Flat is always square on.
        target = 0;
      } else if (drifting) {
        target = YAW_TERRAIN + DRIFT * Math.sin(s.clock * DRIFT_SPEED);
      } else if (s.yaw > YAW_LIMIT) {
        target = YAW_LIMIT;
      } else if (s.yaw < -YAW_LIMIT) {
        target = -YAW_LIMIT;
      }
      if (target !== s.yaw) {
        const stiffness = drifting ? DRIFT_STIFFNESS : EDGE_STIFFNESS;
        s.yawSpeed +=
          ((target - s.yaw) * stiffness -
            s.yawSpeed * 2 * Math.sqrt(stiffness)) *
          dt;
      }
      s.yaw += s.yawSpeed * dt;
      energy = Math.max(energy, Math.abs(s.yawSpeed), Math.abs(target - s.yaw));

      const force =
        (s.pitchTarget - s.pitch) * PITCH_STIFFNESS -
        s.pitchSpeed * PITCH_DAMPING;
      s.pitchSpeed += force * dt;
      s.pitch += s.pitchSpeed * dt;
      energy = Math.max(
        energy,
        Math.abs(s.pitchSpeed),
        Math.abs(s.pitchTarget - s.pitch)
      );
    }
    for (let i = 0; i < s.bumps.length; i++) {
      const target = i === s.hovered && s.pitch > 0.1 ? BUMP : 0;
      s.bumpSpeeds[i] +=
        ((target - s.bumps[i]) * BUMP_STIFFNESS -
          s.bumpSpeeds[i] * BUMP_DAMPING) *
        dt;
      s.bumps[i] += s.bumpSpeeds[i] * dt;
      energy = Math.max(
        energy,
        Math.abs(s.bumpSpeeds[i]) * 0.1,
        Math.abs(target - s.bumps[i])
      );
    }
    // The sway never rests, so frames keep coming while it is on screen.
    return drifting ? Math.max(energy, 1) : energy;
  }, []);

  const tick = useCallback(
    function tickFrame(now: number) {
      const s = sim.current;
      s.raf = 0;
      const dt = s.last ? Math.min((now - s.last) / 1000, 1 / 30) : 1 / 60;
      s.last = now;
      const energy = stepSprings(dt);
      draw();
      if ((s.drag || energy > REST_EPSILON) && s.visible) {
        s.raf = requestAnimationFrame(tickFrame);
      } else {
        s.last = 0;
      }
    },
    [draw, stepSprings]
  );

  // Swing round from straight on as it tilts up, coasting to a stop at
  // the resting turn.
  const turnIn = useCallback(() => {
    const s = sim.current;
    if (Math.abs(s.yaw) > 2 * DEG) {
      return;
    }
    if (s.reduceMotion) {
      s.yaw = YAW_TERRAIN;
    } else {
      s.yawSpeed = SPIN_IN;
    }
  }, []);

  const wake = useCallback(() => {
    const s = sim.current;
    if (s.reduceMotion) {
      // No travel: everything lands where it's going.
      cancelAnimationFrame(s.raf);
      s.raf = 0;
      s.last = 0;
      s.pitch = s.pitchTarget;
      s.yaw = s.pitchTarget === 0 ? 0 : clamp(s.yaw, -YAW_LIMIT, YAW_LIMIT);
      s.pitchSpeed = 0;
      s.yawSpeed = 0;
      s.bumps.fill(0);
      draw();
      return;
    }
    if (!s.raf && s.visible) {
      s.raf = requestAnimationFrame(tick);
    }
  }, [draw, tick]);

  useEffect(() => {
    const s = sim.current;
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    if (!canvas.getContext("2d")) {
      onUnavailable?.();
      return;
    }
    const unavailable = () => onUnavailable?.();
    canvas.addEventListener("contextlost", unavailable);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => {
      s.reduceMotion = motion.matches;
      if (s.reduceMotion) wake();
    };
    updateMotion();
    motion.addEventListener("change", updateMotion);
    const resize = new ResizeObserver(([entry]) => {
      s.width = entry.contentRect.width;
      s.height = entry.contentRect.height;
      s.dpr = Math.min(window.devicePixelRatio || 1, window.matchMedia("(pointer: coarse)").matches ? 1.5 : 2);
      canvas.width = Math.round(s.width * s.dpr);
      canvas.height = Math.round(s.height * s.dpr);
      draw();
    });
    resize.observe(canvas);

    let onScreen = false;
    const update = () => {
      const wasVisible = s.visible;
      s.visible = onScreen && !document.hidden;
      if (s.visible) {
        // Coming back into view replays the rise from flat.
        if (s.started && !wasVisible && onScreen && s.pitchTarget > 0 && !s.reduceMotion) {
          s.pitch = 0;
          s.pitchSpeed = 0;
          s.yaw = 0;
          turnIn();
        }
        if (!s.started) {
          s.started = true;
          if (s.pitchTarget > 0) {
            turnIn();
          }
        }
        wake();
      } else if (s.raf) {
        cancelAnimationFrame(s.raf);
        s.raf = 0;
        s.last = 0;
      }
    };
    const intersection = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    intersection.observe(canvas);
    document.addEventListener("visibilitychange", update);

    // Repaint when the theme flips, since the canvas reads its colours.
    const repaint = () => {
      paletteRef.current = null;
      draw();
    };
    const theme = new MutationObserver(repaint);
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    });
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", repaint);

    return () => {
      canvas.removeEventListener("contextlost", unavailable);
      motion.removeEventListener("change", updateMotion);
      resize.disconnect();
      intersection.disconnect();
      theme.disconnect();
      scheme.removeEventListener("change", repaint);
      document.removeEventListener("visibilitychange", update);
      cancelAnimationFrame(s.raf);
      s.raf = 0;
    };
  }, [draw, onUnavailable, turnIn, wake]);

  const setView = (
    nextFlat: boolean,
    origin?: { col: number; row: number }
  ) => {
    const s = sim.current;
    setFlat(nextFlat);
    s.origin = origin ?? { col: nextFlat ? weeks : 0, row: 3 };
    s.pitchTarget = nextFlat ? 0 : PITCH_TERRAIN;
    s.yawSpeed = 0;
    if (!nextFlat) {
      turnIn();
    }
    wake();
  };

  const localPoint = (event: PointerEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    return rect
      ? { x: event.clientX - rect.left, y: event.clientY - rect.top }
      : { x: 0, y: 0 };
  };

  const hover = (cell: Cell | null) => {
    const s = sim.current;
    const index = cell ? cell.index : -1;
    if (index !== s.hovered) {
      s.hovered = index;
      setActive(cell);
      if (s.reduceMotion) {
        draw();
      } else {
        wake();
      }
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }
    const s = sim.current;
    const { x, y } = localPoint(event);
    event.currentTarget.setPointerCapture(event.pointerId);
    const cell = hitTest(x, y);
    if (cell) {
      s.origin = { col: cell.col, row: cell.row };
    }
    s.drag = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      yaw: s.yaw,
      pitch: s.pitch,
      moved: false,
      samples: [{ t: event.timeStamp, x: event.clientX, y: event.clientY }],
    };
    s.yawSpeed = 0;
    s.pitchSpeed = 0;
    setDragging(true);
    hover(cell);
    wake();
  };

  const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    const s = sim.current;
    const drag = s.drag;
    if (!drag || drag.id !== event.pointerId) {
      if (event.pointerType === "mouse") {
        const { x, y } = localPoint(event);
        hover(hitTest(x, y));
      }
      return;
    }
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!drag.moved && Math.hypot(dx, dy) > 4) {
      drag.moved = true;
    }
    if (!drag.moved) {
      return;
    }
    s.yaw = rubber(drag.yaw + dx * DRAG_YAW, -YAW_LIMIT, YAW_LIMIT);
    s.pitch = rubber(drag.pitch + dy * DRAG_PITCH, 0, PITCH_LIMIT);
    drag.samples.push({
      t: event.timeStamp,
      x: event.clientX,
      y: event.clientY,
    });
    if (drag.samples.length > 5) {
      drag.samples.shift();
    }
    if (s.reduceMotion) {
      draw();
    } else {
      wake();
    }
  };

  const handlePointerUp = (event: PointerEvent<HTMLCanvasElement>) => {
    const s = sim.current;
    const drag = s.drag;
    if (!drag || drag.id !== event.pointerId) {
      return;
    }
    s.drag = null;
    s.lastInput = s.clock;
    setDragging(false);
    if (!drag.moved) {
      wake();
      return;
    }
    // Velocity from the last few samples, in px per second.
    const first = drag.samples[0];
    const lastSample = drag.samples.at(-1) ?? first;
    const dt = Math.max((lastSample.t - first.t) / 1000, 0.016);
    const vx = (lastSample.x - first.x) / dt;
    const vy = (lastSample.y - first.y) / dt;
    const recent = event.timeStamp - lastSample.t < 80;
    s.yawSpeed = recent ? vx * DRAG_YAW : 0;
    s.pitchSpeed = recent ? vy * DRAG_PITCH : 0;
    // Land on whichever view the throw is heading for.
    const projected = s.pitch + s.pitchSpeed * 0.15;
    const nextFlat = projected < PITCH_TERRAIN / 2;
    setFlat(nextFlat);
    s.pitchTarget = nextFlat ? 0 : PITCH_TERRAIN;
    wake();
  };

  const handlePointerLeave = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!sim.current.drag && event.pointerType === "mouse") {
      hover(null);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLCanvasElement>) => {
    sim.current.lastInput = sim.current.clock;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
    };
    const move = moves[event.key];
    if (!move && event.key !== "Home" && event.key !== "End") {
      return;
    }
    event.preventDefault();
    const list = cellsRef.current;
    const current = list[sim.current.hovered] ?? list.at(-1);
    if (!current) {
      return;
    }
    const next = event.key === "Home" ? list[0]
      : event.key === "End" ? list.at(-1)
      : sim.current.hovered < 0 ? current
      : list.find((c) => c.col === current.col + move[0] && c.row === current.row + move[1]);
    hover(next ?? current);
    setAnnouncement(describe(next ?? current));
  };

  const describe = (cell: Cell) =>
    `${cell.count} ${cell.count === 1 ? "contribution" : "contributions"} on ${formatDay(cell.date)}`;
  const readout = active ? describe(active) : `${title} · ${total.toLocaleString("en-US")} contributions`;

  return (
    <div
      className={cn("w-full min-w-0 select-none", className)}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 px-3 pt-3 sm:px-4">
        <p className="min-w-0 font-mono text-meta text-text-2 tabular-nums">{readout}</p>
        <span className="sr-only" role="status">{announcement}</span>
        <div role="group" aria-label="Canvas view" className="flex shrink-0 gap-2">
          {(
            [
              ["2D", true],
              ["3D", false],
            ] as const
          ).map(([name, value]) => (
            <button
              aria-pressed={flat === value}
              className={cn(
                "min-h-11 min-w-11 rounded-sm border border-control px-2 font-mono text-meta hover:border-signal",
                flat === value ? "bg-surface underline decoration-signal underline-offset-4" : "text-text-2"
              )}
              key={name}
              onClick={() => flat !== value && setView(value)}
              type="button"
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <canvas
        aria-label={`${title}: ${total.toLocaleString("en-US")} contributions over ${weeks} weeks. Use the arrow keys to inspect days, or Home and End for the first and last day.`}
        className={cn(
          "block h-64 w-full touch-pan-y focus-visible:outline-offset-[-3px] sm:h-96",
          dragging ? "cursor-grabbing" : "cursor-grab"
        )}
        onBlur={() => {
          // Keyboard reading ends with focus; don't leave a day lit.
          if (!sim.current.drag) {
            setAnnouncement("");
            hover(null);
          }
        }}
        onKeyDown={handleKeyDown}
        onLostPointerCapture={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerDown={handlePointerDown}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        ref={canvasRef}
        role="img"
        tabIndex={0}
      />

      <div aria-hidden="true" className="flex items-center justify-end gap-1 px-4 pb-3 font-mono text-meta text-text-2">
        <span className="mr-1">Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <span
            className="size-2.5 rounded-xs"
            key={level}
            style={{ background: `var(--terrain-${level})` }}
          />
        ))}
        <span className="ml-1">More</span>
      </div>
    </div>
  );
}
