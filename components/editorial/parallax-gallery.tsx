import Image from "next/image";
import type { Project } from "@/lib/types";

const COLUMNS = 3;

/**
 * Real project screens in three columns that drift at different speeds while the gallery crosses the viewport;
 * the middle column moves against the others. Pure CSS on a scroll timeline (`.parallax-gallery` in globals.css):
 * native scrolling, no JavaScript. Without scroll-timeline support or with reduced motion, every screen shows
 * in a static grid. Layout idea after Skiper UI's Skiper 30 (skiper-ui.com); no Skiper code is used.
 */
export function ParallaxGallery({ gallery }: { gallery: NonNullable<Project["gallery"]> }) {
  const columns = Array.from({ length: COLUMNS }, (_, column) => gallery.images.filter((_, index) => index % COLUMNS === column));
  return (
    <figure className="grid-main min-w-0">
      <div className="parallax-gallery rounded-sm border border-rule-strong bg-surface p-3 sm:p-4">
        {columns.map((images, column) => (
          <div key={column} className="parallax-column grid content-start gap-3 sm:gap-4">
            {images.map(({ src, width, height, alt }) => (
              <Image key={src} src={src} width={width} height={height} alt={alt} sizes="(min-width: 64rem) 14rem, 30vw" className="h-auto w-full rounded-sm border border-rule" />
            ))}
          </div>
        ))}
      </div>
      <figcaption className="mt-3 max-w-prose text-small text-text-2">{gallery.caption}</figcaption>
    </figure>
  );
}
