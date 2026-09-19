import type { ReactNode } from "react";

/**
 * The rotated pill that introduces every section.
 * 1–3 words. Space Mono, uppercase, amber fill, 2px ink border.
 */
export default function StampBadge({
  children,
  alt = false,
  reveal = false,
  plain = false,
  className,
}: {
  children: ReactNode;
  /** +1.5deg instead of -2deg, for alternating strips. */
  alt?: boolean;
  /** Opt into the stamp entrance. Never used above a hero h1. */
  reveal?: boolean;
  /** Paper fill instead of amber, for strips that would otherwise be all amber. */
  plain?: boolean;
  className?: string;
}) {
  const classes = ["stamp"];
  if (alt) classes.push("stamp--alt");
  if (plain) classes.push("stamp--plain");
  if (className) classes.push(className);
  return (
    <span className={classes.join(" ")} {...(reveal ? { "data-reveal": "stamp" } : {})}>
      {children}
    </span>
  );
}
