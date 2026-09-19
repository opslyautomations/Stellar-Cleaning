import type { ReactNode } from "react";
import Link from "next/link";
import Container from "./Container";
import SectionHeader from "./SectionHeader";
import { sectionClass, type Tone } from "./section";

export type IndexItem = { href: string; label: string; note?: string };
export type IndexGroup = { label?: string; items: IndexItem[] };

/** Dense multi-column link index with hairline dividers. */
export default function IndexColumns({
  stamp,
  title,
  lede,
  groups,
  columns = 2,
  footNote,
  tone = "paper",
}: {
  stamp: string;
  title: ReactNode;
  lede?: ReactNode;
  groups: IndexGroup[];
  columns?: 2 | 3 | 4;
  footNote?: ReactNode;
  tone?: Tone;
}) {
  return (
    <section data-component="IndexColumns" className={sectionClass(tone)}>
      <Container>
        <SectionHeader stamp={stamp} title={title} lede={lede} />
        <div className={`index-cols__grid index-cols__grid--${columns}`} data-reveal="block">
          {groups.map((group, gi) => (
            <div className="index-cols__group" key={group.label ?? `group-${gi}`}>
              {group.label ? <p className="index-cols__grouplabel">{group.label}</p> : null}
              <ul className="index-cols">
                {group.items.map((item) => (
                  <li className="index-cols__item" key={item.href + item.label}>
                    <Link className="index-cols__link" href={item.href}>
                      {item.label}
                      {item.note ? <span className="index-cols__note">{item.note}</span> : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {footNote ? (
          <p style={{ marginTop: 28, color: "var(--ink-muted)" }} data-reveal="block">
            {footNote}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
