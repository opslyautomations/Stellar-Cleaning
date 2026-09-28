import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import Container from "./Container";
import SectionHeader from "./SectionHeader";
import { sectionClass, type Tone } from "./section";

export type CoverageGroup = { label: string; items: { href: string; label: string }[] };

/** City grid: each area a small linked card with a pin, grouped by region, plus a short coverage statement. */
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
  return (
    <section data-component="CoverageBand" className={sectionClass(tone)}>
      <Container>
        <SectionHeader stamp={stamp} title={title} />
        <p className="coverage__statement" data-reveal="block">
          {statement}
        </p>
        <div style={{ marginTop: 34 }}>
          {groups.map((group) => (
            <div className="coverage__group" key={group.label} data-reveal="block">
              <p className="coverage__label">{group.label}</p>
              <ul className="coverage__chips">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link className="coverage__chip" href={item.href}>
                      <span className="coverage__chip-icon" aria-hidden="true">
                        <MapPin size={17} />
                      </span>
                      {item.label}
                      <ArrowRight className="coverage__chip-arrow" size={16} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
