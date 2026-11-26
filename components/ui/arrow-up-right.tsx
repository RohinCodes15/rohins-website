import { cn } from "@/lib/utils";

/**
 * The ↗ external-link mark as an inline SVG: neither Switzer nor Commit Mono has U+2197, so the text glyph
 * fell back to a system font (DESIGN_SYSTEM §3.1a). Sized in em and drawn in currentColor to match the text.
 */
export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      className={cn("inline-block size-[0.7em] align-[-0.02em]", className)}
    >
      <path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" />
    </svg>
  );
}
