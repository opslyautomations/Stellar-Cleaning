import type { ReactNode } from "react";
import StampBadge from "./StampBadge";

/**
 * Stamp + heading + optional lede. Used as the page header on every page
 * except the homepage, which uses SplitAnchorHero instead.
 *
 * When `as="h1"` the header carries no reveal attributes at all: that h1 is the
 * page's LCP element and is never animated.
 */
export default function SectionHeader({
  stamp,
  title,
  lede,
  as = "h2",
  center = false,
  wide = false,
  id,
}: {
  stamp: string;
  title: ReactNode;
  lede?: ReactNode;
  as?: "h1" | "h2";
  center?: boolean;
  wide?: boolean;
  id?: string;
}) {
  const Heading = as;
  const isLcp = as === "h1";

  const classes = ["section-header"];
  if (center) classes.push("section-header--center");
  if (wide) classes.push("section-header--wide");

  return (
    <header className={classes.join(" ")}>
      <div className="section-header__stamp">
        <StampBadge reveal={!isLcp}>{stamp}</StampBadge>
      </div>
      <div {...(isLcp ? {} : { "data-reveal": "block" })}>
        <Heading id={id}>{title}</Heading>
        {lede ? <p className="section-header__lede">{lede}</p> : null}
      </div>
    </header>
  );
}
