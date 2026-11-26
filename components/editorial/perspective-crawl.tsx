import type { CSSProperties } from "react";
import { Container } from "@/components/ui/container";

/**
 * Lines that tilt back and rise into place as the reader scrolls through them, on a CSS scroll timeline.
 * Static, flat text is the default; the effect applies only with scroll timelines and no reduced-motion preference.
 * Layout idea after Skiper UI's Skiper 28 (skiper-ui.com); no Skiper code is used.
 */
export function PerspectiveCrawl({ lines }: { lines: { text: string; color: CSSProperties["color"] }[] }) {
  return (
    <div className="perspective-crawl">
      <div className="perspective-crawl-stage">
        <Container>
          <p className="perspective-crawl-text col-span-full grid text-center text-crawl text-balance">
            {lines.map(({ text, color }) => <span key={text} style={{ color }}>{text}</span>)}
          </p>
        </Container>
      </div>
    </div>
  );
}
