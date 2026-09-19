import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import Container from "./Container";
import SectionHeader from "./SectionHeader";
import { delay, sectionClass, type Tone } from "./section";

export type OffsetCard = {
  title: string;
  body: string;
  icon?: ComponentType<{ size?: number; strokeWidth?: number; "aria-hidden"?: boolean }>;
  href?: string;
  linkLabel?: string;
};

/** The card anatomy: surface fill, 2px ink border, 4px radius, hard offset shadow. */
export default function OffsetCardGrid({
  stamp,
  title,
  lede,
  cards,
  columns = 3,
  tone = "paper",
  label,
}: {
  stamp?: string;
  title?: ReactNode;
  lede?: ReactNode;
  cards: OffsetCard[];
  columns?: 2 | 3 | 4;
  tone?: Tone;
  label?: string;
}) {
  return (
    <section data-component="OffsetCardGrid" className={sectionClass(tone)} aria-label={stamp ? undefined : label}>
      <Container>
        {stamp && title ? <SectionHeader stamp={stamp} title={title} lede={lede} /> : null}
        <ul className={`card-grid card-grid--${columns}`}>
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <li key={card.title} data-reveal="card" style={delay(i, 60)}>
                <article className={card.href ? "card pressable" : "card"}>
                  {Icon ? (
                    <span className="card__icon" aria-hidden="true">
                      <Icon size={22} strokeWidth={2} />
                    </span>
                  ) : null}
                  <h3 className="card__title">{card.title}</h3>
                  <p className="card__body">{card.body}</p>
                  {card.href ? (
                    <Link className="card__link" href={card.href}>
                      {card.linkLabel ?? `${card.title} →`}
                    </Link>
                  ) : null}
                </article>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
