import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
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
  /** Optional photo across the top of the card. */
  image?: { src: string; alt: string; width: number; height: number };
};

/** The card anatomy: white surface, hairline border, soft shadow, lifts on hover. */
export default function OffsetCardGrid({
  stamp,
  title,
  lede,
  cards,
  columns = 3,
  tone = "paper",
  label,
  center = false,
}: {
  stamp?: string;
  title?: ReactNode;
  lede?: ReactNode;
  cards: OffsetCard[];
  columns?: 2 | 3 | 4;
  tone?: Tone;
  label?: string;
  center?: boolean;
}) {
  const sizes =
    columns === 4
      ? "(min-width: 1040px) 280px, (min-width: 640px) 50vw, 100vw"
      : columns === 3
        ? "(min-width: 980px) 380px, (min-width: 640px) 50vw, 100vw"
        : "(min-width: 640px) 50vw, 100vw";
  return (
    <section data-component="OffsetCardGrid" className={sectionClass(tone)} aria-label={stamp ? undefined : label}>
      <Container>
        {stamp && title ? <SectionHeader stamp={stamp} title={title} lede={lede} center={center} /> : null}
        <ul className={`card-grid card-grid--${columns}`}>
          {cards.map((card, i) => {
            const Icon = card.icon;
            const classes = ["card"];
            if (card.image) classes.push("card--media");
            if (card.href) classes.push("pressable");
            const icon = Icon ? (
              <span className="card__icon" aria-hidden="true">
                <Icon size={22} strokeWidth={2} />
              </span>
            ) : null;
            const text = (
              <>
                <h3 className="card__title">{card.title}</h3>
                <p className="card__body">{card.body}</p>
                {card.href ? (
                  <Link className="card__link" href={card.href}>
                    {card.linkLabel ?? `${card.title} →`}
                  </Link>
                ) : null}
              </>
            );
            return (
              <li key={card.title} data-reveal="card" style={delay(i, 80)}>
                <article className={classes.join(" ")}>
                  {card.image ? (
                    <>
                      <div className="card__media">
                        <Image
                          src={card.image.src}
                          alt={card.image.alt}
                          width={card.image.width}
                          height={card.image.height}
                          sizes={sizes}
                        />
                      </div>
                      <div className="card__content">
                        {icon}
                        {text}
                      </div>
                    </>
                  ) : (
                    <>
                      {icon}
                      {text}
                    </>
                  )}
                </article>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
