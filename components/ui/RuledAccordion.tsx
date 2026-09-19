import type { ReactNode } from "react";
import Container from "./Container";
import SectionHeader from "./SectionHeader";
import { sectionClass, type Tone } from "./section";

export type AccordionItem = {
  q: string;
  /** Plain answer text. Used for FAQ content and mirrored into FAQPage schema. */
  a?: string;
  /** Arbitrary panel content — used by the mobile drawer for link lists. */
  content?: ReactNode;
};

/**
 * Hairline-ruled accordion. Backed by <details>/<summary>, so it opens and
 * closes with JavaScript disabled. The panel animates with
 * grid-template-rows 0fr -> 1fr; where a browser cannot transition that from
 * a closed <details>, the panel simply appears.
 */
export default function RuledAccordion({
  stamp,
  title,
  lede,
  items,
  tone = "paper",
  compact = false,
}: {
  stamp: string;
  title: ReactNode;
  lede?: ReactNode;
  items: AccordionItem[];
  tone?: Tone;
  compact?: boolean;
}) {
  const body = (
    <div className="accordion" data-reveal="block">
      {items.map((item) => (
        <details className="accordion__item" key={item.q}>
          <summary className="accordion__summary">
            <span>{item.q}</span>
            <span className="accordion__glyph" aria-hidden="true">
              +
            </span>
          </summary>
          <div className="accordion__panel">
            <div>{item.content ?? <p>{item.a}</p>}</div>
          </div>
        </details>
      ))}
    </div>
  );

  if (compact) return body;

  return (
    <section data-component="RuledAccordion" className={sectionClass(tone)}>
      <Container>
        <SectionHeader stamp={stamp} title={title} lede={lede} />
        {body}
      </Container>
    </section>
  );
}
