import type { ReactNode } from "react";

/** Max-width 1200px, 24px gutters, 16px under 480px (set in globals.css). */
export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className ? `container ${className}` : "container"}>{children}</div>;
}
