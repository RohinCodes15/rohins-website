// Contrast regression check for the palette in app/globals.css (docs/DESIGN_SYSTEM.md §2.3).
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const css = readFileSync(join(import.meta.dirname, "../app/globals.css"), "utf8");

const HEX = "#[0-9a-f]{6}";
const rootSource = css.slice(css.indexOf(":root {"), css.indexOf("}", css.indexOf(":root {")));

// Each colour token is either one hex for both themes or light-dark(<light hex>, <dark hex>).
function palette(scheme: 0 | 1): Record<string, string> {
  const tokens: Record<string, string> = {};
  const pattern = new RegExp(`--([\\w-]+):\\s*(?:(${HEX})|light-dark\\((${HEX}),\\s*(${HEX})\\))\\s*;`, "gi");
  for (const [, name, both, lightHex, darkHex] of rootSource.matchAll(pattern)) {
    tokens[name] = both ?? (scheme === 0 ? lightHex : darkHex);
  }
  return tokens;
}

const light = palette(0);
const dark = palette(1);

test("every colour token is parsed for both themes", () => {
  for (const name of ["bg", "surface", "text", "text-2", "text-3", "signal", "probe", "probe-mark", "terrain-4"]) {
    assert.match(light[name] ?? "", /^#/, `light --${name}`);
    assert.match(dark[name] ?? "", /^#/, `dark --${name}`);
  }
  assert.notEqual(light.bg, dark.bg);
});

function luminance(hex: string): number {
  const channel = (i: number) => {
    const c = Number.parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5);
}

function contrast(a: string, b: string): number {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
}

const TEXT = 4.5;
const NON_TEXT = 3;

// [foreground, background, minimum ratio]
const pairs: [string, string, number][] = [
  ["text", "bg", TEXT],
  ["text", "surface", TEXT],
  ["text-2", "bg", TEXT],
  ["text-2", "surface", TEXT],
  ["signal", "bg", TEXT],
  ["signal", "surface", TEXT],
  ["probe", "bg", TEXT],
  ["probe", "surface", TEXT],
  ["on-probe", "probe-mark", TEXT],
  ["on-probe", "action", TEXT],
  ["on-probe", "action-hover", TEXT],
  ["action", "bg", NON_TEXT],
  ["terrain-text", "surface", TEXT],
  ["control", "bg", NON_TEXT],
  ["control", "surface", NON_TEXT],
  ["probe-mark", "bg", NON_TEXT],
  ["signal-fill", "bg", NON_TEXT],
  ["terrain-accent", "surface", NON_TEXT],
];

for (const [theme, tokens] of [["light", light], ["dark", dark]] as const) {
  test(`${theme} palette meets WCAG AA contrast`, () => {
    for (const [fg, bg, minimum] of pairs) {
      assert.ok(tokens[fg] && tokens[bg], `missing --${fg} or --${bg}`);
      const ratio = contrast(tokens[fg], tokens[bg]);
      assert.ok(ratio >= minimum, `${theme} --${fg} on --${bg}: ${ratio.toFixed(2)} < ${minimum}`);
    }
  });
}

test("--text-3 is AA body text in light mode and large-text only in dark mode", () => {
  assert.ok(contrast(light["text-3"], light.bg) >= TEXT);
  assert.ok(contrast(light["text-3"], light.surface) >= TEXT);
  // DESIGN_SYSTEM §2.3: dark --text-3 is restricted to large or non-essential text (3:1).
  assert.ok(contrast(dark["text-3"], dark.surface) >= NON_TEXT);
});

test("the terrain level ramp is monotonic in luminance", () => {
  for (const tokens of [light, dark]) {
    const ramp = [0, 1, 2, 3, 4].map((level) => luminance(tokens[`terrain-${level}`]));
    const increasing = ramp.every((value, i) => i === 0 || value > ramp[i - 1]);
    const decreasing = ramp.every((value, i) => i === 0 || value < ramp[i - 1]);
    assert.ok(increasing || decreasing, `terrain ramp is not ordered: ${ramp.map((v) => v.toFixed(3)).join(", ")}`);
  }
});
