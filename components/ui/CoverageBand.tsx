import type { ReactNode } from "react";
import Link from "next/link";
import Container from "./Container";
import SectionHeader from "./SectionHeader";
import { sectionClass } from "./section";

export type CoverageGroup = { label: string; items: { href: string; label: string }[] };

/** Dark band; city list as stamp-style chips plus a short coverage statement. */
export default function CoverageBand({
  stamp,
  title,
  statement,
  groups,
}: {
  stamp: string;
  title: ReactNode;
  statement: ReactNode;
  groups: CoverageGroup[];
}) {
  return (
    <section data-component="CoverageBand" className={sectionClass("deep")}>
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
                      {item.label}
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
