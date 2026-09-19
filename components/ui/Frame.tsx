import type { ReactNode } from "react";

/**
 * The bordered, hard-offset-shadow wrapper behind every card and image.
 * 2px ink border, 4px radius, `6px 6px 0` shadow — zero blur, zero spread.
 */
export default function Frame({
  children,
  className,
  flush = false,
  pressable = false,
}: {
  children: ReactNode;
  className?: string;
  /** Clip the contents — used for images. */
  flush?: boolean;
  /** Translate 3px and collapse the shadow on hover/focus. */
  pressable?: boolean;
}) {
  const classes = ["frame"];
  if (flush) classes.push("frame--flush");
  if (pressable) classes.push("pressable");
  if (className) classes.push(className);
  return <div className={classes.join(" ")}>{children}</div>;
}
