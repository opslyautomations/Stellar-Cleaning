import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

/**
 * The page header every route except the homepage uses: `SectionHeader` over a
 * `--paper-alt` band, exactly as the catalog composition rules require.
 *
 * This is a composition of two existing primitives, not a new visual pattern —
 * it introduces no styles of its own beyond the band and page-header padding
 * already defined in globals.css.
 */
export default function PageHeader({
  stamp,
  title,
  lede,
}: {
  stamp: string;
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <section className="sect sect--alt page-header">
      <Container>
        <SectionHeader stamp={stamp} title={title} lede={lede} as="h1" />
      </Container>
    </section>
  );
}
