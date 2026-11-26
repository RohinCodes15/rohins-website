import type { JournalEntry } from "../lib/types.ts";

/**
 * Research and engineering journal, newest first. Add only articles the owner wrote or approved.
 * While this list is empty, /journal returns 404 and nothing links to it.
 */
export const journal: readonly JournalEntry[] = [];
