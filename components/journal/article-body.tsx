import Image from "next/image";
import { Container } from "@/components/ui/container";
import type { JournalBlock } from "@/lib/types";

export const headingId = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Renders typed journal blocks on the page grid: text in the main column, code and figures wider. */
export function ArticleBody({ blocks }: { blocks: readonly JournalBlock[] }) {
  const figureNumber = new Map(blocks.filter((block) => block.type === "figure").map((block, index) => [block, index + 1]));
  return (
    <Container className="gap-y-4">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return <p key={index} className="grid-main max-w-prose">{block.text}</p>;
          case "heading":
            return <h2 key={index} id={headingId(block.text)} className="grid-main mt-8 scroll-mt-8 text-h2">{block.text}</h2>;
          case "list":
            return <ul key={index} className="grid-main max-w-prose space-y-1">{block.items.map((item) => (
              <li key={item} className="grid grid-cols-[1.25rem_minmax(0,1fr)]"><span aria-hidden="true" className="font-mono text-text-2">–</span>{item}</li>
            ))}</ul>;
          case "code":
            // tabIndex lets keyboard users scroll long lines (axe scrollable-region-focusable).
            return <pre key={index} tabIndex={0} aria-label={`${block.language} code`} className="grid-figure overflow-x-auto rounded-sm border border-rule-strong bg-surface p-4 font-mono text-meta"><code>{block.code}</code></pre>;
          case "figure": {
            const { src, width, height, alt, caption } = block.figure;
            return (
              <figure key={index} className="grid-figure my-4 min-w-0">
                <Image src={src} width={width} height={height} alt={alt} sizes="(min-width: 64rem) 75vw, 100vw" className="h-auto w-full rounded-sm border border-rule-strong" />
                <figcaption className="mt-3 max-w-prose text-small text-text-2"><span className="font-mono text-meta">Fig. {figureNumber.get(block)}</span> — {caption}</figcaption>
              </figure>
            );
          }
        }
      })}
    </Container>
  );
}
