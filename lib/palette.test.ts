import assert from "node:assert/strict";
import { test } from "node:test";
import { filterItems, moveIndex, type PaletteItem } from "./palette.ts";

const items: PaletteItem[] = [
  { id: "a", group: "Projects", label: "AccessForge AI", hint: "Sidewalk repair planning", keywords: ["Python", "FastAPI"] },
  { id: "b", group: "Projects", label: "Developer portfolio", keywords: ["Next.js"] },
  { id: "c", group: "Theme", label: "Dark theme" },
];

test("an empty query returns every item in order", () => {
  assert.deepEqual(filterItems(items, "  ").map(({ id }) => id), ["a", "b", "c"]);
});

test("every word must match label, hint, or keywords, ignoring case", () => {
  assert.deepEqual(filterItems(items, "python").map(({ id }) => id), ["a"]);
  assert.deepEqual(filterItems(items, "sidewalk ai").map(({ id }) => id), ["a"]);
  assert.deepEqual(filterItems(items, "dark portfolio"), []);
});

test("moveIndex wraps in both directions and handles empty lists", () => {
  assert.equal(moveIndex(2, 1, 3), 0);
  assert.equal(moveIndex(0, -1, 3), 2);
  assert.equal(moveIndex(0, 1, 0), -1);
});
