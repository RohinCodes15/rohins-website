"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { certifications } from "@/content/certifications";
import { journal } from "@/content/journal";
import { leadership } from "@/content/leadership";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { stack } from "@/content/stack";
import { PROJECT_STATUS_LABELS, projectHref } from "@/lib/content";
import { filterItems, moveIndex, type PaletteItem } from "@/lib/palette";
import type { Theme } from "@/lib/theme";
import { setTheme } from "./theme-toggle";

type Item = PaletteItem & ({ href: string; external?: boolean } | { theme: Theme });


/** Built from the content registries, so the palette lists exactly what the site shows. */
function buildItems(): Item[] {
  const sections: Item[] = [
    { id: "intro", group: "Sections", label: "About", hint: site.intro, keywords: ["overview", "bio"], href: "/#intro" },
    { id: "activity", group: "Sections", label: "GitHub activity", keywords: ["contributions"], href: "/#activity" },
    { id: "work", group: "Sections", label: "Selected work", keywords: ["projects"], href: "/#work" },
    { id: "stack", group: "Sections", label: "Technology stack", keywords: ["skills", "tools"], href: "/#stack" },
    { id: "research", group: "Sections", label: "Research and interests", keywords: ["research"], href: "/#research" },
  ];
  if (leadership.length) sections.push({ id: "leadership", group: "Sections", label: "Leadership", href: "/#leadership" });
  if (certifications.length) sections.push({ id: "certifications", group: "Sections", label: "Certifications", href: "/#certifications" });

  return [
    { id: "home", group: "Pages", label: "Home", href: "/" },
    { id: "lab", group: "Pages", label: "Research lab", hint: "Monte Carlo, portfolio risk, and regression demonstrations", keywords: ["research", "simulation", "quant"], href: "/lab" },
    ...projects.map((project): Item => ({
      id: `project-${project.slug}`,
      group: "Projects",
      label: project.title,
      hint: `${PROJECT_STATUS_LABELS[project.status]} · ${project.summary}`,
      keywords: project.stack.map((id) => stack[id].label),
      href: projectHref(project.slug),
    })),
    ...journal.map((entry): Item => ({ id: `journal-${entry.slug}`, group: "Journal", label: entry.title, hint: entry.summary, keywords: [...entry.topics], href: `/journal/${encodeURIComponent(entry.slug)}` })),
    ...sections,
    ...(["system", "light", "dark"] as const).map((theme): Item => ({
      id: `theme-${theme}`, group: "Theme", label: `${theme[0].toUpperCase()}${theme.slice(1)} theme`, keywords: ["appearance", "mode"], theme,
    })),
    ...(site.email ? [{ id: "email", group: "Contact", label: `Email ${site.email}`, keywords: ["contact", "mail"], href: `mailto:${site.email}` } satisfies Item] : []),
    ...site.links.map(({ label, href }): Item => ({ id: `link-${href}`, group: "Contact", label, keywords: ["contact"], href, external: href.startsWith("https://") })),
  ];
}

export default function CommandPalette({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const listId = useId();
  const items = useMemo(() => buildItems(), []);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const shown = filterItems(items, query);
  const groups = [...new Set(shown.map(({ group }) => group))];

  // No close() in cleanup: it fires onClose, and dev-mode effect replays would unmount the palette at once.
  // Unmounting removes the dialog, which already dismisses it.
  useEffect(() => {
    if (!dialog.current?.open) dialog.current?.showModal();
  }, []);

  function run(item: Item | undefined) {
    if (!item) return;
    dialog.current?.close();
    if ("theme" in item) setTheme(item.theme);
    else if (item.external) window.open(item.href, "_blank", "noopener");
    else if (item.href.startsWith("mailto:")) window.location.assign(item.href);
    else router.push(item.href);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const moves: Record<string, number> = { ArrowDown: 1, ArrowUp: -1 };
    if (event.key in moves) setActive((index) => moveIndex(index, moves[event.key], shown.length));
    else if (event.key === "Home" && event.ctrlKey) setActive(0);
    else if (event.key === "End" && event.ctrlKey) setActive(shown.length - 1);
    else if (event.key === "Enter") run(shown[active]);
    else return;
    event.preventDefault();
  }

  useEffect(() => {
    document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, listId]);

  return (
    <dialog
      ref={dialog}
      aria-label="Search the site"
      onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}
      className="palette-dialog m-0 mx-auto mt-[12vh] w-[min(40rem,calc(100vw-2rem))] max-w-none rounded-sm border border-rule-strong bg-surface p-0 text-text"
    >
      <input
        autoFocus
        role="combobox"
        aria-expanded="true"
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={shown.length ? `${listId}-${active}` : undefined}
        aria-label="Search pages, projects, and settings"
        placeholder="Search pages, projects, and settings"
        value={query}
        onChange={(event) => { setQuery(event.target.value); setActive(0); }}
        onKeyDown={onKeyDown}
        className="w-full border-b border-rule bg-transparent px-4 py-4 text-lead outline-none placeholder:text-text-2 focus-visible:outline-none"
      />
      <div id={listId} role="listbox" aria-label="Results" className="max-h-[min(60vh,28rem)] overflow-y-auto overscroll-contain py-2">
        {groups.map((group) => (
          <div key={group} role="group" aria-labelledby={`${listId}-${group}`}>
            <p id={`${listId}-${group}`} role="presentation" className="px-4 pt-3 pb-1 font-mono text-meta text-text-2">{group}</p>
            {shown.map((item, index) => item.group === group && (
              <div
                key={item.id}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={index === active}
                onMouseMove={() => setActive(index)}
                onClick={() => run(item)}
                className="group/option grid cursor-pointer grid-cols-[0.375rem_minmax(0,1fr)] items-baseline gap-x-3 px-4 py-2 aria-selected:bg-bg"
              >
                {/* The probe square marks the option being inspected, as the rail marks the current section. */}
                <span aria-hidden="true" className="size-1.5 self-center group-aria-selected/option:bg-probe" />
                <span className="min-w-0">
                  <span className="block">{item.label}{"external" in item && item.external && <span className="text-text-2"> (opens in new tab)</span>}</span>
                  {item.hint && <span className="block truncate text-small text-text-2">{item.hint}</span>}
                </span>
              </div>
            ))}
          </div>
        ))}
        {shown.length === 0 && (
          <p className="px-4 py-6 text-text-2">No matches for “{query}”. Try a project name, a technology, or a page.</p>
        )}
      </div>
      <p role="status" className="sr-only">{shown.length} {shown.length === 1 ? "result" : "results"}</p>
      <p aria-hidden="true" className="hidden border-t border-rule px-4 py-2 font-mono text-index text-text-2 sm:block">
        ↑ ↓ to move · Enter to open · Esc to close
      </p>
    </dialog>
  );
}
