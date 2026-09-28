import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import Frame from "./Frame";
import StampBadge from "./StampBadge";
import type { PhotoCredit } from "@/lib/images";
import { sectionClass, type Tone } from "./section";

export type PortraitImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
};

/**
 * Framed image one side, text the other. The stamp overlaps the image's
 * top-left corner by 16px. `reverse` flips the sides on desktop.
 */
export default function PortraitAside({
  stamp,
  title,
  body,
  image,
  reverse = false,
  link,
  tone = "paper",
  headingLevel = "h2",
  credit,
}: {
  stamp: string;
  title: ReactNode;
  body: string[];
  image: PortraitImage;
  reverse?: boolean;
  link?: { href: string; label: string };
  tone?: Tone;
  headingLevel?: "h2" | "h3";
  /** Attribution line under the photo, for licensed images. */
  credit?: PhotoCredit;
}) {
  const Heading = headingLevel;
  return (
    <section data-component="PortraitAside" className={sectionClass(tone)}>
      <Container>
        <div className={reverse ? "portrait portrait--reverse" : "portrait"}>
          <div className="portrait__media" data-reveal="card">
            <div className="portrait__figure">
              <span className="portrait__stamp">
                <StampBadge>{stamp}</StampBadge>
              </span>
              <Frame className="portrait__frame" flush pressable>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes={image.sizes ?? "(min-width: 880px) 46vw, 100vw"}
                  priority={image.priority}
                />
              </Frame>
            </div>
            {credit ? (
              <p className="portrait__credit">
                Photo:{" "}
                <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer">
                  {credit.author}
                </a>
                ,{" "}
                {credit.licenseUrl ? (
                  <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer">
                    {credit.license}
                  </a>
                ) : (
                  credit.license
                )}
              </p>
            ) : null}
          </div>
          <div className="portrait__body" data-reveal="block">
            <Heading>{title}</Heading>
            {body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            {link ? (
              <p>
                <Link className="btn btn--ghost" href={link.href}>
                  {link.label}
                </Link>
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
