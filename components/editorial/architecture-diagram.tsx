import { layoutFlows, type Flow } from "@/lib/diagram";

const WIDTH = 720;
const NODE = { width: 188, height: 36 };
const ROW = 92;

/**
 * Data-flow diagram drawn from the case study's typed flows. Components named in the architecture list are
 * solid; anything outside the project (a browser, an external API) is dashed. Each edge carries a numbered
 * callout keyed to the list below, so labels never collide. The SVG is decorative; the list carries the
 * same information and is all that shows below 640 px. Pointing at a list entry traces its edge in --signal
 * (CSS :has(), no client JavaScript); the list already carries the meaning, so this is enhancement only.
 */
export function ArchitectureDiagram({ flows, components }: { flows: readonly Flow[]; components: readonly string[] }) {
  const { nodes, rows } = layoutFlows(flows, WIDTH);
  const at = new Map(nodes.map((node) => [node.name, { x: node.x, y: node.row * ROW + 8 }]));
  const height = rows * ROW - ROW + NODE.height + 16;

  return (
    <figure className="architecture-diagram min-w-0">
      <style>{flows.map((_, index) => `.architecture-diagram:has([data-flow="${index + 1}"]:hover) [data-edge="${index + 1}"]`).join(",") + "{--trace:0}"}</style>
      <div className="hidden rounded-sm border border-rule-strong bg-surface p-4 sm:block">
        <svg aria-hidden="true" viewBox={`0 0 ${WIDTH} ${height}`} className="block h-auto w-full font-mono text-[11px]">
          <defs>
            <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" className="fill-text-2" />
            </marker>
          </defs>
          {flows.map(({ from, to }, index) => {
            const a = at.get(from)!;
            const b = at.get(to)!;
            const [x1, y1, x2, y2] = [a.x, a.y + NODE.height, b.x, b.y - 2];
            return (
              <g key={`${from}-${to}`} data-edge={index + 1}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-text-2" markerEnd="url(#arrow)" />
                <line x1={x1} y1={y1} x2={x2} y2={y2} pathLength={1} strokeDasharray="1 1" className="flow-trace stroke-signal" />
                <circle cx={(x1 + x2) / 2} cy={(y1 + y2) / 2} r={9} className="fill-surface stroke-text-2" />
                <text x={(x1 + x2) / 2} y={(y1 + y2) / 2} dy="0.32em" textAnchor="middle" className="fill-text">{index + 1}</text>
              </g>
            );
          })}
          {nodes.map(({ name }) => {
            const { x, y } = at.get(name)!;
            const internal = components.includes(name);
            return (
              <g key={name}>
                <rect x={x - NODE.width / 2} y={y} width={NODE.width} height={NODE.height} rx={2} className={internal ? "fill-surface stroke-text" : "fill-surface stroke-text-2"} strokeDasharray={internal ? undefined : "4 3"} />
                <text x={x} y={y + NODE.height / 2} dy="0.32em" textAnchor="middle" className={internal ? "fill-text" : "fill-text-2"}>{name}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <ol className="mt-4 grid gap-x-8 gap-y-1 font-mono text-meta sm:grid-cols-2">
        {flows.map(({ from, to, label }, index) => (
          <li key={`${from}-${to}`} data-flow={index + 1} className="group/flow grid grid-cols-[1.75rem_minmax(0,1fr)]">
            <span className="text-text-2 tabular-nums transition-colors duration-(--duration-micro) group-hover/flow:text-signal">{index + 1}</span>
            <span>{from} <span aria-hidden="true">→</span><span className="sr-only">to</span> {to}<span className="block text-text-2">{label}</span></span>
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 text-small text-text-2">
        Data flow between components.<span className="hidden sm:inline"> Solid boxes are part of the project; dashed boxes are outside it. Numbers match the list above.</span>
      </figcaption>
    </figure>
  );
}
