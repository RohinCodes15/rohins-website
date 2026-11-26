import assert from "node:assert/strict";
import { test } from "node:test";
import { projects } from "../content/projects.ts";
import { layoutFlows } from "./diagram.ts";

test("rows follow the longest path to a sink, so edges span one row", () => {
  const flows = [
    { from: "browser", to: "web", label: "" },
    { from: "web", to: "api", label: "" },
    { from: "api", to: "db", label: "" },
    { from: "ingest", to: "db", label: "" },
  ];
  const { nodes, rows } = layoutFlows(flows, 600);
  const row = Object.fromEntries(nodes.map(({ name, row }) => [name, row]));
  assert.equal(rows, 4);
  assert.deepEqual(row, { browser: 0, web: 1, api: 2, db: 3, ingest: 2 });
  assert.deepEqual(nodes.filter((node) => node.row === 2).map(({ x }) => x), [200, 400]);
});

test("children are ordered under their parents, which removes a crossing", () => {
  const flows = [
    { from: "api", to: "db", label: "" },
    { from: "api", to: "engine", label: "" },
    { from: "ingest", to: "db", label: "" },
  ];
  const order = layoutFlows(flows, 600).nodes.filter(({ row }) => row === 1).map(({ name }) => name);
  assert.deepEqual(order, ["engine", "db"]);
});

test("a cycle fails loudly instead of looping", () => {
  assert.throws(() => layoutFlows([{ from: "a", to: "b", label: "" }, { from: "b", to: "a", label: "" }], 100), /cycle/);
});

test("every case-study flow lays out with single-row edges", () => {
  for (const { slug, caseStudy } of projects) {
    if (!caseStudy?.flows.length) continue;
    const { nodes } = layoutFlows(caseStudy.flows, 640);
    const row = new Map(nodes.map(({ name, row }) => [name, row]));
    for (const { from, to } of caseStudy.flows) assert.equal(row.get(to)! - row.get(from)!, 1, `${slug}: ${from} → ${to}`);
  }
});
