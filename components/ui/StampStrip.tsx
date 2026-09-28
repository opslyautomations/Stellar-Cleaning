import { CheckCircle2 } from "lucide-react";
import Container from "./Container";
import { delay, sectionClass, type Tone } from "./section";

/** A full-width trust bar: 3–5 short proof points, each with a check icon. */
export default function StampStrip({
  items,
  tone = "alt",
  label,
}: {
  items: string[];
  tone?: Tone;
  label: string;
}) {
  return (
    <section data-component="StampStrip" className={sectionClass(tone, "stamp-strip")} aria-label={label}>
      <Container>
        <ul className="stamp-strip__row">
          {items.map((item, i) => (
            <li className="stamp-strip__item" key={item} data-reveal="card" style={delay(i, 70)}>
              <span className="stamp-strip__icon" aria-hidden="true">
                <CheckCircle2 size={18} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
