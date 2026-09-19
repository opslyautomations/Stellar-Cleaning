import Link from "next/link";
import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  /** Renders a plain <a>. Set for tel:, mailto:, #anchors and off-site links. */
  external?: boolean;
  icon?: ReactNode;
  block?: boolean;
  className?: string;
  ariaLabel?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  external = false,
  icon,
  block = false,
  className,
  ariaLabel,
}: ButtonProps) {
  const classes = ["btn", `btn--${variant}`];
  if (block) classes.push("btn--block");
  if (className) classes.push(className);
  const cn = classes.join(" ");

  const inner = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );

  const isPlainAnchor =
    external || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("#");

  if (isPlainAnchor) {
    const offsite = href.startsWith("http");
    return (
      <a
        className={cn}
        href={href}
        aria-label={ariaLabel}
        {...(offsite ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link className={cn} href={href} aria-label={ariaLabel}>
      {inner}
    </Link>
  );
}
