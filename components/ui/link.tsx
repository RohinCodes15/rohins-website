import type { ComponentProps } from "react";
import { ArrowUpRight } from "@/components/ui/arrow-up-right";
import { cn } from "@/lib/utils";

type LinkProps = Omit<ComponentProps<"a">, "href" | "target"> & {
  href: string;
  external?: boolean;
};

export function Link({ children, className, external = false, href, rel, ...props }: LinkProps) {
  return (
    <a
      {...props}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? cn("noopener", rel) : rel}
      className={cn(
        "group/link wrap-anywhere underline decoration-text-3 decoration-1 underline-offset-[0.22em]",
        "transition-colors duration-(--duration-micro) ease-out hover:decoration-signal focus-visible:decoration-signal",
        className,
      )}
    >
      {children}
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
