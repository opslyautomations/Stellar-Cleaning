import type { ReactNode } from "react";
import Container from "./Container";
import SectionHeader from "./SectionHeader";
import { delay, sectionClass, type Tone } from "./section";

export type ProcessStep = { title: string; body: string };

/** 3–4 step cards, each led by a filled sky-blue number badge. */
export default function NumberedProcess({
  stamp,
  title,
  lede,
  steps,
  tone = "paper",
}: {
  stamp: string;
  title: ReactNode;
  lede?: ReactNode;
  steps: ProcessStep[];
  tone?: Tone;
}) {
  const count = steps.length >= 4 ? 4 : 3;
  return (
    <section data-component="NumberedProcess" className={sectionClass(tone)}>
      <Container>
        <SectionHeader stamp={stamp} title={title} lede={lede} />
        <ol className={`process process--${count}`}>
          {steps.map((step, i) => (
            <li className="process__step" key={step.title} data-reveal="card" style={delay(i, 60)}>
              <span className="process__num" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="process__title">{step.title}</h3>
              <p className="process__body">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
