import { cn } from "@/lib/utils";

export function Separator({ decorative = false, className }: { decorative?: boolean; className?: string }) {
  const rule = cn("block h-px border-0 bg-rule", className);
  return decorative ? <span aria-hidden="true" className={rule} /> : <hr className={rule} />;
}
