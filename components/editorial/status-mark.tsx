import { PROJECT_STATUS_LABELS } from "@/lib/content";
import type { ProjectStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Shape plus text, never colour alone: a filled square is complete, an outlined one is still in development. */
export function StatusMark({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 whitespace-nowrap", className)}>
      <span
        aria-hidden="true"
        className={cn("size-1.5 shrink-0", status === "completed" ? "bg-text" : "border border-text")}
      />
      {PROJECT_STATUS_LABELS[status]}
    </span>
  );
}
