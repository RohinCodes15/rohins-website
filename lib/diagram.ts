export interface Flow { readonly from: string; readonly to: string; readonly label: string }
export interface PlacedNode { readonly name: string; readonly row: number; readonly x: number }

/**
 * Rows for a directed acyclic flow graph. A node's row is set by its longest path to a sink, so every
 * edge here spans one row and never passes through a node. Rows are ordered top-down by the mean position of
 * each node's parents (one barycentre pass, which removes the common crossings); nodes without parents keep
 * first-appearance order. Nodes are spread evenly across `width`.
 */
export function layoutFlows(flows: readonly Flow[], width: number): { nodes: PlacedNode[]; rows: number } {
  const names = [...new Set(flows.flatMap(({ from, to }) => [from, to]))];
  const depth = new Map<string, number>();
  const visit = (name: string, seen: Set<string>): number => {
    const known = depth.get(name);
    if (known !== undefined) return known;
    if (seen.has(name)) throw new Error(`Architecture flows contain a cycle at ${name}`);
    const next = new Set(seen).add(name);
    const value = Math.max(0, ...flows.filter(({ from }) => from === name).map(({ to }) => visit(to, next) + 1));
    depth.set(name, value);
    return value;
  };
  names.forEach((name) => visit(name, new Set()));
  const deepest = Math.max(0, ...depth.values());
  const byRow = new Map<number, string[]>();
  for (const name of names) {
    const row = deepest - (depth.get(name) ?? 0);
    byRow.set(row, [...(byRow.get(row) ?? []), name]);
  }
  const x = new Map<string, number>();
  const nodes: PlacedNode[] = [];
  for (let row = 0; row <= deepest; row += 1) {
    const members = byRow.get(row) ?? [];
    const centre = (name: string) => {
      const parents = flows.filter(({ to }) => to === name).map(({ from }) => x.get(from)).filter((value) => value !== undefined);
      return parents.length ? parents.reduce((sum, value) => sum + value, 0) / parents.length : Infinity;
    };
    const ordered = members.map((name, index) => ({ name, index, key: centre(name) })).sort((a, b) => a.key - b.key || a.index - b.index);
    ordered.forEach(({ name }, index) => {
      const position = ((index + 1) * width) / (ordered.length + 1);
      x.set(name, position);
      nodes.push({ name, row, x: position });
    });
  }
  return { nodes, rows: deepest + 1 };
}
