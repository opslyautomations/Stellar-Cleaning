import type { ReactNode } from "react";
import { Star } from "lucide-react";
import Container from "./Container";
import SectionHeader from "./SectionHeader";
import { delay, sectionClass, type Tone } from "./section";

export type QuoteItem = {
  author: string;
  body: string;
  rating: 1 | 2 | 3 | 4 | 5;
  source: string;
  city?: string;
};

/**
 * Review cards. `variant="masonry"` uses varied spans in a 6-column grid;
 * that only reads correctly at four or more quotes, so `variant="pair"`
 * renders two equal columns instead.
 *
 * This component never generates text — it renders exactly what it is given.
 */
export default function QuoteWall({
  stamp,
  title,
  lede,
  quotes,
  variant = "masonry",
  after,
  tone = "paper",
}: {
  stamp: string;
  title: ReactNode;
  lede?: ReactNode;
  quotes: QuoteItem[];
  variant?: "masonry" | "pair";
  after?: ReactNode;
  tone?: Tone;
}) {
  return (
    <section data-component="QuoteWall" className={sectionClass(tone)}>
      <Container>
        <SectionHeader stamp={stamp} title={title} lede={lede} />
        <ul className={`quote-wall quote-wall--${variant}`}>
          {quotes.map((quote, i) => (
            <li className="quote" key={quote.author} data-reveal="card" style={delay(i, 60)}>
              <span className="quote__stars">
                <span className="visually-hidden">
                  Rated {quote.rating} out of 5 on {quote.source}
                </span>
                {Array.from({ length: quote.rating }).map((_, s) => (
                  <Star key={s} size={17} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                ))}
              </span>
              <blockquote className="quote__body">&ldquo;{quote.body}&rdquo;</blockquote>
              <div className="quote__foot">
                <span className="quote__avatar" aria-hidden="true">
                  {quote.author.trim().charAt(0).toUpperCase()}
                </span>
                <cite className="quote__author">{quote.author}</cite>
                {quote.city ? <span className="quote__source">{quote.city}</span> : null}
                <span className="quote__source">{quote.source}</span>
              </div>
            </li>
          ))}
        </ul>
        {after ? (
          <div className="btn-row" data-reveal="block">
            {after}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
