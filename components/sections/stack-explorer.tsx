"use client";

import { useState } from "react";
import { projectHref } from "@/lib/content";
import type { StackEntry } from "@/lib/types";
import type { StackRowsMotion } from "./stack-rows-motion";

type Technology = StackEntry & { id: string; usedIn: readonly { slug: string; title: string }[] };

// Motion loads only once the reader reaches for the filters (pointer or keyboard focus), so the homepage's
// initial JavaScript carries none of it. Until it arrives (or if it fails), the static rows stay and change instantly.
const LIST_CLASS = "mt-3 border-t border-rule lg:mt-0";
const ROW_CLASS = "grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-0.5 border-b border-rule py-2.5 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)_auto]";

function Row({ label, category, usedIn }: Technology) {
  return (
    <>
      <span>{label}</span>
      <span className="col-span-full row-start-2 text-small text-text-2 sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:self-center">
        {usedIn.length > 0 && <>Used in {usedIn.map(({ slug, title }, index) => (
          <span key={slug}>{index > 0 && ", "}<a href={projectHref(slug)} className="hover-underline">{title}</a></span>
        ))}</>}
      </span>
      <span className="col-start-2 row-start-1 self-center font-mono text-meta text-text-2 sm:col-start-3">{category}</span>
    </>
  );
}

function StaticRows({ items }: { items: readonly Technology[] }) {
  return <ul className={LIST_CLASS}>{items.map((item) => <li key={item.id} className={ROW_CLASS}><Row {...item} /></li>)}</ul>;
}

export function StackExplorer({ technologies }: { technologies: readonly Technology[] }) {
  const [filter, setFilter] = useState("All");
  const [MotionRows, setMotionRows] = useState<typeof StackRowsMotion | null>(null);
  const [requested, setRequested] = useState(false);
  const categories = ["All", ...new Set(technologies.map(({ category }) => category))];
  const count = (category: string) => category === "All" ? technologies.length : technologies.filter((t) => t.category === category).length;
  const shown = filter === "All" ? technologies : technologies.filter(({ category }) => category === filter);
  const prepare = () => {
    if (requested) return;
    setRequested(true);
    import("./stack-rows-motion")
      .then((module) => setMotionRows(() => module.StackRowsMotion))
      .catch(() => setRequested(false)); // Enhancement only: retry on the next approach.
  };

  return (
    // From 1024px the filters fill the left margin as a pinned column, right-aligned like the section numbers,
    // and the list takes the main column.
    <div className="col-span-full min-w-0 lg:grid lg:grid-cols-subgrid lg:items-start">
      <div aria-label="Filter technologies" role="group" onPointerEnter={prepare} onFocus={prepare} onTouchStart={prepare} className="stack-filters flex flex-wrap gap-x-5 gap-y-1 font-mono text-meta lg:sticky lg:top-8 lg:col-span-3 lg:flex-col lg:items-end lg:gap-y-1.5 lg:pt-2.5">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
            className="inline-flex min-h-6 cursor-pointer items-baseline gap-1.5 text-text-2 underline decoration-transparent underline-offset-4 transition-colors duration-(--duration-micro) ease-out hover:text-text hover:decoration-signal aria-pressed:text-text aria-pressed:decoration-signal"
          >
            {category}
            <span aria-hidden="true" className="text-index text-text-2 tabular-nums">{count(category)}</span>
          </button>
        ))}
      </div>
      <div className="min-w-0 lg:col-start-4 lg:col-end-[-1] lg:max-w-[calc(100%-var(--grid-gutter))]">
        <p role="status" className="sr-only">{shown.length} {shown.length === 1 ? "technology" : "technologies"} shown</p>
        {MotionRows
          ? <MotionRows items={shown} listClassName={LIST_CLASS} rowClassName={ROW_CLASS} renderRow={Row} />
          : <StaticRows items={shown} />}
      </div>
    </div>
  );
}
