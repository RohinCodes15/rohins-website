import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function TechnologyBadge({ className, ...props }: ComponentProps<"span">) {
  return <span {...props} className={cn("wrap-anywhere text-meta text-text-2", className)} />;
}
