import type { ReactNode } from "react";

/**
 * The eyebrow that introduces every section. 1–3 words, uppercase.
 * A white pill with an sky-blue dot on its own; a plain label inside a SectionHeader.
 */
export default function StampBadge({
  children,
  alt = false,
  reveal = false,
  plain = false,
  className,
}: {
  children: ReactNode;
  /** Kept for API compatibility; no longer changes the rendering. */
  alt?: boolean;
  /** Opt into the stamp entrance. Never used above a hero h1. */
  reveal?: boolean;
  /** Deep-sky-blue dot instead of the bright one. */
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
