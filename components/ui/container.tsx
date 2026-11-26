import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Direct children are placed on the responsive page grid. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={cn("grid-page", className)} />;
}
