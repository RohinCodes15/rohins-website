import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Button({ className, type = "button", ...props }: ComponentProps<"button">) {
  return (
    <button
      {...props}
      type={type}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-control px-3.5 py-2 text-body font-medium",
        "press enabled:hover:border-signal enabled:active:bg-surface disabled:opacity-50",
        className,
      )}
    />
  );
}
