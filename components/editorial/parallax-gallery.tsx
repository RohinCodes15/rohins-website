import Image from "next/image";
import NextLink from "next/link";
import { balanceColumns } from "@/lib/gallery";
import type { Figure } from "@/lib/types";
import { cn } from "@/lib/utils";

const COLUMNS = 3;

/** A screen in the gallery. With `href`, it links there and `label` names the destination for hover and screen readers. */
export type GalleryImage = Omit<Figure, "caption"> & { readonly href?: string; readonly label?: string };

type ParallaxGalleryProps = {
  images: readonly GalleryImage[];
  /** next/image `sizes` for one column at this placement. */
  sizes: string;
  className?: string;
};

/**
 * Real project screens in three columns that drift at different speeds while the gallery crosses the viewport;
 * the middle column moves against the others. Pure CSS on a scroll timeline (`.parallax-gallery` in globals.css):
 * native scrolling, no JavaScript. Without scroll-timeline support or with reduced motion, every screen shows
 * in a static grid. Layout idea after Skiper UI's Skiper 30 (skiper-ui.com); no Skiper code is used.
 */
export function ParallaxGallery({ images, sizes, className }: ParallaxGalleryProps) {
  return (
    <div className={cn("parallax-gallery", className)}>
      {balanceColumns(images, COLUMNS).map((column, index) => (
        <div key={index} className="parallax-column grid content-start gap-3">
          {column.map((image) => <Screen key={image.src} image={image} sizes={sizes} />)}
        </div>
      ))}
    </div>
  );
}

function Screen({ image: { src, width, height, alt, href, label }, sizes }: { image: GalleryImage; sizes: string }) {
  // width/height set the shown box; a source with another shape is cropped to it from the top.
  const picture = <Image src={src} width={width} height={height} alt={alt} sizes={sizes} style={{ aspectRatio: `${width} / ${height}` }} className="h-auto w-full rounded-sm object-cover object-top" />;
  if (!href) return picture;
  return (
    <NextLink href={href} className="gallery-link">
      {picture}
      {label && <span className="gallery-label">{label}</span>}
    </NextLink>
  );
}
