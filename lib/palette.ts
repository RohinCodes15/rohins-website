export interface PaletteItem {
  readonly id: string;
  readonly group: "Pages" | "Projects" | "Journal" | "Sections" | "Theme" | "Contact";
  readonly label: string;
  /** Short context shown under the label, such as a project summary. */
  readonly hint?: string;
  /** Extra words that should match, such as stack names. */
  readonly keywords?: readonly string[];
}

/**
 * Every query word must appear somewhere in the item's text. Groups holding a label match come first, so
 * "risk" opens RiskLens rather than a page that only mentions risk in its hint. Order within a group is
 * preserved, which keeps the result list grouped exactly as it renders.
 */
export function filterItems<T extends PaletteItem>(items: readonly T[], query: string): T[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [...items];
  const hits = items.filter((item) => {
    const text = [item.label, item.hint ?? "", ...(item.keywords ?? [])].join(" ").toLowerCase();
    return words.every((word) => text.includes(word));
  });
  const labelGroups = new Set(hits.filter(({ label }) => words.every((word) => label.toLowerCase().includes(word))).map(({ group }) => group));
  return [...hits.filter(({ group }) => labelGroups.has(group)), ...hits.filter(({ group }) => !labelGroups.has(group))];
}

/** Arrow-key movement that wraps around the list. */
export function moveIndex(current: number, delta: number, length: number): number {
  if (length === 0) return -1;
  return (((current + delta) % length) + length) % length;
}
