import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { test } from "node:test";
import { closerLook } from "../content/gallery.ts";
import { projects } from "../content/projects.ts";
import { balanceColumns } from "./gallery.ts";

const image = (name: string, width: number, height: number) => ({ name, width, height });

test("balanceColumns sends each image to the shortest column, keeping order within a column", () => {
  const images = [image("tall", 1, 2), image("wide-a", 2, 1), image("wide-b", 2, 1), image("wide-c", 2, 1)];

  const columns = balanceColumns(images, 2);

  assert.deepEqual(columns.map((column) => column.map(({ name }) => name)), [["tall"], ["wide-a", "wide-b", "wide-c"]]);
});

test("balanceColumns deals equal shapes round-robin and returns empty columns when images run out", () => {
  const images = [image("a", 1, 1), image("b", 1, 1), image("c", 1, 1), image("d", 1, 1)];

  assert.deepEqual(balanceColumns(images, 3).map((column) => column.map(({ name }) => name)), [["a", "d"], ["b"], ["c"]]);
  assert.deepEqual(balanceColumns([], 2), [[], []]);
});

test("the homepage gallery shows real files from projects with case studies", () => {
  assert.ok(closerLook.length > 0);
  for (const { project, src, alt } of closerLook) {
    assert.ok(projects.some(({ slug }) => slug === project), `${src}: unknown project ${project}`);
    assert.ok(existsSync(new URL(`../public${src}`, import.meta.url)), `${src} is missing`);
    assert.ok(alt.length > 20, `${src}: alt text too short`);
  }
});
