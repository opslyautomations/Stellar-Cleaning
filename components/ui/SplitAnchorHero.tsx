import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import Container from "./Container";
import StampBadge from "./StampBadge";
import { sectionClass, type Tone } from "./section";

/**
 * Two-column split. Left: pill eyebrow, h1, lede, two CTAs, optional
 * checkmarked highlights. Right: a framed slot — the quote form on the
 * homepage — with an optional floating chip over its top corner.
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
  highlights,
  chip,
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
  /** Short reassurance lines under the CTAs, each with a check icon. */
  highlights?: string[];
  /** Floating card over the slot's top-right corner. */
  chip?: ReactNode;
}) {
  const Heading = headingLevel;
  return (
    <section data-component="SplitAnchorHero"
      className={sectionClass(tone, variant === "hero" ? "hero" : "hero hero--panel")}
      aria-label={variant === "hero" ? "Introduction" : undefined}
    >
      {variant === "hero" ? (
        <>
          <div className="hero__glow" aria-hidden="true" />
          <div className="hero__glow hero__glow--b" aria-hidden="true" />
        </>
      ) : null}
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
            {highlights?.length ? (
              <ul className="hero__highlights">
                {highlights.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={18} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
              </>
            )}
          </div>
          <div className="hero__slot">
            {chip ? <div className="hero__chip">{chip}</div> : null}
            {slot}
          </div>
        </div>
      </Container>
    </section>
  );
}
