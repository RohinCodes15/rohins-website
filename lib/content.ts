import type { Project, ProjectStatus, StackId } from "./types.ts";

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = { completed: "Completed", "in-development": "In development" };

/** The one place the project route shape lives. */
export function projectHref(slug: string): string {
  return `/work/${encodeURIComponent(slug)}`;
}

export function findBySlug<T extends { readonly slug: string }>(
  items: readonly T[],
  slug: string,
): T | undefined {
  return items.find((item) => item.slug === slug);
}

/** Shared view-transition name, so a project's title carries over from the home row to its case study. */
export function projectTitleTransition(slug: string): string {
  return `project-${slug.toLowerCase().replace(/[^a-z0-9-]/g, "-")}`;
}

export function projectsByStack(projects: readonly Project[], id: StackId): Project[] {
  return projects.filter((project) => project.stack.includes(id));
}

export function duplicateSlugs(items: readonly { readonly slug: string }[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const { slug } of items) {
    if (seen.has(slug)) duplicates.add(slug);
    seen.add(slug);
  }
  return [...duplicates];
}

