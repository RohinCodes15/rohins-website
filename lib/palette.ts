export interface PaletteItem {
  readonly id: string;
  readonly group: "Pages" | "Projects" | "Journal" | "Sections" | "Theme" | "Contact";
  readonly label: string;
  /** Short context shown under the label, such as a project summary. */
  readonly hint?: string;
  /** Extra words that should match, such as stack names. */
  readonly keywords?: readonly string[];
}

/** Every query word must appear somewhere in the item's text. Order within a group is preserved. */
export function filterItems<T extends PaletteItem>(items: readonly T[], query: string): T[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [...items];
  return items.filter((item) => {
    const text = [item.label, item.hint ?? "", ...(item.keywords ?? [])].join(" ").toLowerCase();
    return words.every((word) => text.includes(word));
  });
}

/** Arrow-key movement that wraps around the list. */
export function moveIndex(current: number, delta: number, length: number): number {
  if (length === 0) return -1;
  return (((current + delta) % length) + length) % length;
}
