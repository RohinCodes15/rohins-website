import type { ComponentProps } from "react";
import { ArrowUpRight } from "@/components/ui/arrow-up-right";
import { TextRoll } from "@/components/ui/text-roll";
import { cn } from "@/lib/utils";

type LinkProps = Omit<ComponentProps<"a">, "href" | "target"> & {
  href: string;
  external?: boolean;
  /** Roll the letters on hover and keyboard focus (TextRoll). Needs a plain-text label. */
  roll?: boolean;
};

export function Link({ children, className, external = false, roll = false, href, rel, ...props }: LinkProps) {
  const rolling = roll && typeof children === "string";
  return (
    <a
      {...props}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? cn("noopener", rel) : rel}
      className={cn(
        "group/link wrap-anywhere",
        rolling
          ? "link-roll"
          : "underline decoration-text-3 decoration-1 underline-offset-[0.22em] transition-colors duration-(--duration-micro) ease-out hover:decoration-signal focus-visible:decoration-signal",
        className,
      )}
    >
      {rolling ? <TextRoll text={children} /> : children}
      {external && (
        <>
          {/* Margin, not a space character, so the underline stops at the last letter. */}
          <ArrowUpRight className="ms-[0.25em] transition-transform duration-(--duration-micro) ease-out motion-safe:group-hover/link:translate-x-0.5 motion-safe:group-hover/link:-translate-y-0.5" />
          <span className="sr-only"> (opens in new tab)</span>
        </>
      )}
    </a>
  );
}
