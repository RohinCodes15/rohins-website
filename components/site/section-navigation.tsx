"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { TextRoll } from "@/components/ui/text-roll";
import { CommandPaletteTrigger } from "./command-palette-trigger";
import { ThemeToggle } from "./theme-toggle";

type SectionNavigationProps = {
  sections: readonly { id: string; label: string }[];
  label?: string;
  /** Rendered above the section list, for example a link back home. */
  children?: ReactNode;
};

export function SectionNavigation({ sections, label = "Portfolio sections", children }: SectionNavigationProps) {
  const [current, setCurrent] = useState<string | undefined>(sections[0]?.id);
  const list = useRef<HTMLUListElement>(null);
  // One probe square that glides to the current section, like a probe moving to what is being inspected.
  // Until it is measured, each link draws its own square, so the server HTML and no-JS view stay correct.
  const [probe, setProbe] = useState<{ x: number; y: number; moved: boolean } | null>(null);

  useLayoutEffect(() => {
    const root = list.current;
    if (!root) return;
    const place = () => {
      const marker = root.querySelector<HTMLElement>('[aria-current="location"] [data-marker]');
      if (!marker) return setProbe(null);
      setProbe((previous) => ({ x: marker.offsetLeft, y: marker.offsetTop, moved: previous !== null }));
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(root);
    return () => observer.disconnect();
  }, [current]);

  useEffect(() => {
    // Track the last heading above the reading line, including very short final sections.
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.32;
      const root = document.documentElement;
      const atEnd = root.scrollHeight > window.innerHeight && window.scrollY + window.innerHeight >= root.scrollHeight - 2;
      const active = sections.findLast(({ id }) => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= line);
      setCurrent(atEnd ? sections.at(-1)?.id : active?.id ?? sections[0]?.id);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sections]);

  return (
    <header className="grid-rail min-w-0 self-start pb-4 lg:col-start-1 lg:row-start-1 lg:row-span-3">
      {children}
      <nav aria-label={label}>
        <ul ref={list} className="relative flex flex-wrap gap-x-4 gap-y-1 font-mono text-meta lg:flex-col">
          {probe && <li aria-hidden="true" className="pointer-events-none absolute top-0 left-0 size-1.5 bg-probe" style={{
            transform: `translate(${probe.x}px, ${probe.y}px)`,
            transition: probe.moved ? "transform var(--duration-spring) var(--ease-spring)" : undefined,
          }} />}
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setCurrent(id)}
                aria-current={current === id ? "location" : undefined}
                className="group/nav inline-flex min-h-6 items-center gap-2 text-text-2 transition-colors duration-(--duration-micro) ease-out hover:text-text aria-[current=location]:text-text"
              >
                <span data-marker aria-hidden="true" className={`size-1.5 shrink-0 transition-colors duration-(--duration-micro) ease-out ${current === id ? (probe ? "bg-transparent" : "bg-probe") : "bg-transparent group-hover/nav:bg-text-3 group-focus-visible/nav:bg-text-3"}`} />
                <TextRoll text={label} />
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 lg:block">
        <CommandPaletteTrigger />
        <ThemeToggle className="lg:mt-3" />
      </div>
    </header>
  );
}
