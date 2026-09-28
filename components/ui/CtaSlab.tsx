import type { ReactNode } from "react";
import Button from "./Button";
import Container from "./Container";
import StampBadge from "./StampBadge";
import { sectionClass } from "./section";

export type CtaAction = { href: string; label: string; external?: boolean; icon?: ReactNode };

/** Rounded dark panel inside the page gutter: h2, one line of copy, click-to-call plus a second button. */
export default function CtaSlab({
  title,
  body,
  primary,
  secondary,
  stamp = "FREE ESTIMATE",
}: {
  title: ReactNode;
  body?: ReactNode;
  primary: CtaAction;
  secondary?: CtaAction;
  /** Every section is introduced by exactly one stamp — including this one. */
  stamp?: string;
}) {
  return (
    <section data-component="CtaSlab" className={sectionClass("paper", "cta-slab")}>
      <Container>
        <div className="cta-panel tone--deep">
          <div className="cta-slab__inner">
            <div style={{ marginBottom: 20 }}>
              <StampBadge reveal>{stamp}</StampBadge>
            </div>
            <div data-reveal="block">
              <h2>{title}</h2>
              {body ? <p className="cta-slab__body">{body}</p> : null}
              <div className="btn-row">
                <Button href={primary.href} variant="primary" external={primary.external} icon={primary.icon}>
                  {primary.label}
                </Button>
                {secondary ? (
                  <Button
                    href={secondary.href}
                    variant="secondary"
                    external={secondary.external}
                    icon={secondary.icon}
                  >
                    {secondary.label}
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
