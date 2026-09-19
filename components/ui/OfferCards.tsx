import type { ReactNode } from "react";
import Button from "./Button";
import Container from "./Container";
import SectionHeader from "./SectionHeader";
import { delay, sectionClass, type Tone } from "./section";

export type Offer = {
  ribbon: string;
  title: string;
  body: string;
  href: string;
  cta: string;
};

/** Promo cards with a clip-path notched corner and a ribbon label. */
export default function OfferCards({
  stamp,
  title,
  lede,
  offers,
  tone = "paper",
  wide = false,
}: {
  stamp: string;
  title: ReactNode;
  lede?: ReactNode;
  offers: Offer[];
  tone?: Tone;
  /** Single full-width card instead of a three-up grid. */
  wide?: boolean;
}) {
  return (
    <section data-component="OfferCards" className={sectionClass(tone)}>
      <Container>
        <SectionHeader stamp={stamp} title={title} lede={lede} />
        <ul className={wide ? "offers" : "offers offers--3"}>
          {offers.map((offer, i) => (
            <li key={offer.title} data-reveal="card" style={delay(i, 60)}>
              <article className={wide ? "offer offer--wide" : "offer"}>
                <span className="offer__ribbon">{offer.ribbon}</span>
                <h3 className="offer__title">{offer.title}</h3>
                <p className="offer__body">{offer.body}</p>
                <div className="offer__cta">
                  <Button href={offer.href} variant="primary">
                    {offer.cta}
                  </Button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
