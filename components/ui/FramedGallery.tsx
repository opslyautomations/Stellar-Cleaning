import Image from "next/image";
import Container from "./Container";
import Frame from "./Frame";
import SectionHeader from "./SectionHeader";
import { delay, sectionClass, type Tone } from "./section";

export type FramedGalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Columns spanned in the six-column grid. */
  span: 2 | 3 | 4;
};

/**
 * Catalog addition (Prompt 05): a framed image grid at mixed aspect ratios.
 *
 * Six-column grid; each image spans 2, 3 or 4 and keeps its own 4:3, 1:1 or
 * 3:4 ratio, so the wall is deliberately uneven rather than a uniform tile
 * pattern. Every image sits in the `Frame` primitive, so the offset shadow and
 * 2px ink border are the same ones used everywhere else.
 */
export default function FramedGallery({
  stamp,
  title,
  lede,
  images,
  tone = "paper",
  priorityIndex = 0,
}: {
  stamp?: string;
  title?: string;
  lede?: string;
  images: FramedGalleryImage[];
  tone?: Tone;
  /** Exactly one image per page carries `priority`. */
  priorityIndex?: number;
}) {
  return (
    <section data-component="FramedGallery" className={sectionClass(tone)}>
      <Container>
        {stamp && title ? <SectionHeader stamp={stamp} title={title} lede={lede} /> : null}
        <ul className="gallery">
          {images.map((image, i) => (
            <li
              className={`gallery__item gallery__item--${image.span}`}
              key={image.src}
              data-reveal="card"
              style={delay(i % 4, 60)}
            >
              <Frame flush pressable>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 860px) 45vw, 50vw"
                  priority={i === priorityIndex}
                />
              </Frame>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
