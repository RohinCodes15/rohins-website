"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { ChromaGrid } from "@/components/reactbits/chroma-grid";
import { projectHref } from "@/lib/content";
import type { StackEntry } from "@/lib/types";

type Technology = StackEntry & { id: string; usedIn: readonly { slug: string; title: string }[] };

// Container widths, not viewport widths: the stack sits in the centred column, at most 60rem.
const GRID_CLASS = "gap-1.5 grid-cols-2 @min-[18rem]:grid-cols-3 @min-[28rem]:grid-cols-4 @min-[40rem]:grid-cols-6 @min-[52rem]:grid-cols-8";

const describe = ({ category, usedIn }: Technology) =>
  `${category}.${usedIn.length ? ` Used in ${usedIn.map(({ title }) => title).join(", ")}.` : ""}`;

/** The technology under the pointer, focused or tapped, with links to the projects that use it. */
function Detail({ technology }: { technology?: Technology }) {
  if (!technology) return <p className="text-text-2">Point at, focus or tap a technology to see where it is used.</p>;
  const { label, category, usedIn } = technology;
  return (
    <p>
      <span className="text-text">{label}</span> <span className="font-mono text-meta text-text-2">{category}</span>
      {usedIn.length > 0 && <span className="block text-text-2">Used in {usedIn.map(({ slug, title }, index) => (
        <span key={slug}>{index > 0 && ", "}<a href={projectHref(slug)} className="hover-underline text-text">{title}</a></span>
      ))}</span>}
    </p>
  );
}

export function StackExplorer({ technologies }: { technologies: readonly Technology[] }) {
  const [filter, setFilter] = useState("All");
  const [activeId, setActiveId] = useState<string | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const categories = ["All", ...new Set(technologies.map(({ category }) => category))];
  const count = (category: string) => category === "All" ? technologies.length : technologies.filter((t) => t.category === category).length;
  const shown = filter === "All" ? technologies : technologies.filter(({ category }) => category === filter);
  const active = shown.find(({ id }) => id === activeId);

  // Tiles that stay glide to their new cells, others fade (globals.css, Stack grid). Without View Transitions or
  // with reduced motion, the grid changes at once.
  const choose = (category: string) => {
    const node = stage.current;
    if (!node || !document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFilter(category);
      return;
    }
    node.dataset.filtering = "";
    document.startViewTransition(() => flushSync(() => setFilter(category))).finished.finally(() => delete node.dataset.filtering);
  };

  return (
    <div className="min-w-0">
      <div aria-label="Filter technologies" role="group" className="stack-filters mt-2 flex flex-wrap gap-x-5 gap-y-1 font-mono text-meta">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={filter === category}
            onClick={() => choose(category)}
            className="inline-flex min-h-6 cursor-pointer items-baseline gap-1.5 text-text-2 underline decoration-transparent underline-offset-4 transition-colors duration-(--duration-micro) ease-out hover:text-text hover:decoration-signal aria-pressed:text-text aria-pressed:decoration-signal"
          >
            {category}
            <span aria-hidden="true" className="text-index text-text-2 tabular-nums">{count(category)}</span>
          </button>
        ))}
      </div>
      <div ref={stage} className="stack-stage mt-4 min-w-0 @container">
        <p role="status" className="sr-only">{shown.length} {shown.length === 1 ? "technology" : "technologies"} shown</p>
        <ChromaGrid
          label="Technologies"
          items={shown.map((technology) => ({
            id: technology.id, title: technology.label, image: technology.logo, accent: technology.accent, mono: technology.mono, description: describe(technology),
          }))}
          onActive={setActiveId}
          className={GRID_CLASS}
        />
        <div className="mt-3 min-h-12 text-small">
          <Detail technology={active} />
        </div>
      </div>
    </div>
  );
}
