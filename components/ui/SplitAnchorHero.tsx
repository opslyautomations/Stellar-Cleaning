import type { ReactNode } from "react";
import Container from "./Container";
import StampBadge from "./StampBadge";
import { sectionClass, type Tone } from "./section";

/**
 * 56/44 asymmetric split. Left: stamp eyebrow, h1, lede, two CTAs.
 * Right: a framed slot — the quote form on the homepage, anything framed elsewhere.
 *
 * Nothing in this component animates and nothing carries `data-reveal`:
 * the h1 here is the page's LCP element.
 *
 * `variant="panel"` reuses the same two-column shell without the oversized
 * h1 treatment, for pages that already have a page header.
 */
export default function SplitAnchorHero({
  eyebrow,
  title,
  lede,
  actions,
  slot,
  left,
  variant = "hero",
  tone = "paper",
  headingLevel = "h1",
}: {
  eyebrow?: string;
  title?: ReactNode;
  lede?: ReactNode;
  actions?: ReactNode;
  slot: ReactNode;
  /** Replaces the whole left column. Used by /contact for the details list. */
  left?: ReactNode;
  variant?: "hero" | "panel";
  tone?: Tone;
  headingLevel?: "h1" | "h2";
}) {
  const Heading = headingLevel;
  return (
    <section data-component="SplitAnchorHero"
      className={sectionClass(tone, variant === "hero" ? "hero" : "hero hero--panel")}
      aria-label={variant === "hero" ? "Introduction" : undefined}
    >
      <Container>
        <div className="hero__grid">
          <div>
            {left ?? (
              <>
            {eyebrow ? (
              <div className="hero__eyebrow">
                <StampBadge>{eyebrow}</StampBadge>
              </div>
            ) : null}
            {title ? <Heading className="hero__title">{title}</Heading> : null}
            {lede ? <p className="hero__lede">{lede}</p> : null}
            {actions ? <div className="btn-row">{actions}</div> : null}
              </>
            )}
          </div>
          <div className="hero__slot">{slot}</div>
        </div>
      </Container>
    </section>
  );
}
