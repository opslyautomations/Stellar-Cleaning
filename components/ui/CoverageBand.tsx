import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import Container from "./Container";
import SectionHeader from "./SectionHeader";
import { delay, sectionClass, type Tone } from "./section";

export type CoverageItem = {
  href: string;
  label: string;
  image?: { src: string; alt: string; width: number; height: number };
};
export type CoverageGroup = { label: string; items: CoverageItem[] };

/**
 * City grid grouped by region, plus a short coverage statement. Items with an
 * image render as photo tiles; items without one fall back to small pin cards.
 */
export default function CoverageBand({
  stamp,
  title,
  statement,
  groups,
  tone = "paper",
}: {
  stamp: string;
  title: ReactNode;
  statement: ReactNode;
  groups: CoverageGroup[];
  tone?: Tone;
}) {
  const hasPhotos = groups.some((group) => group.items.some((item) => item.image));
  return (
    <section data-component="CoverageBand" className={sectionClass(tone)}>
      <Container>
        <SectionHeader stamp={stamp} title={title} />
        <p className="coverage__statement" data-reveal="block">
          {statement}
        </p>
        <div style={{ marginTop: 34 }}>
          {groups.map((group) => (
            <div className="coverage__group" key={group.label}>
              <p className="coverage__label">{group.label}</p>
              <ul className={hasPhotos ? "coverage__tiles" : "coverage__chips"}>
                {group.items.map((item, i) => (
                  <li key={item.href} data-reveal="card" style={delay(i, 60)}>
                    {item.image ? (
                      <Link className="coverage__tile" href={item.href}>
                        <Image
                          src={item.image.src}
                          alt={item.image.alt}
                          width={item.image.width}
                          height={item.image.height}
                          sizes="(min-width: 1040px) 240px, (min-width: 640px) 33vw, 50vw"
                        />
                        <span className="coverage__tile-label">
                          <MapPin size={16} aria-hidden="true" />
                          {item.label}
                          <ArrowRight className="coverage__chip-arrow" size={16} aria-hidden="true" />
                        </span>
                      </Link>
                    ) : (
                      <Link className="coverage__chip" href={item.href}>
                        <span className="coverage__chip-icon" aria-hidden="true">
                          <MapPin size={17} />
                        </span>
                        {item.label}
                        <ArrowRight className="coverage__chip-arrow" size={16} aria-hidden="true" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {hasPhotos ? (
          <p className="coverage__credit">
            City photos from Wikimedia Commons contributors. <Link href="/credits">Photo credits</Link>
          </p>
        ) : null}
      </Container>
    </section>
  );
}
