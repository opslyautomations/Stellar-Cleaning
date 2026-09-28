import type { ReactNode } from "react";
import { Check } from "lucide-react";
import Container from "./Container";
import SectionHeader from "./SectionHeader";
import { delay, sectionClass, type Tone } from "./section";

export type ChecklistItem = { title: string; note?: string };

/** Full-width band, two-column list, sky-blue square check marker per item. */
export default function ChecklistSlab({
  stamp,
  title,
  lede,
  items,
  tone = "alt",
}: {
  stamp: string;
  title: ReactNode;
  lede?: ReactNode;
  items: ChecklistItem[];
  tone?: Tone;
}) {
  return (
    <section data-component="ChecklistSlab" className={sectionClass(tone)}>
      <Container>
        <SectionHeader stamp={stamp} title={title} lede={lede} />
        <ul className="checklist__grid">
          {items.map((item, i) => (
            <li className="checklist__item" key={item.title} data-reveal="card" style={delay(i, 60)}>
              <span className="checklist__mark" aria-hidden="true">
                <Check size={17} strokeWidth={3} />
              </span>
              <span>
                <span className="checklist__title">{item.title}</span>
                {item.note ? <span className="checklist__note">{item.note}</span> : null}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
