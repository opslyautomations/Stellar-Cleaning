import Container from "./Container";
import StampBadge from "./StampBadge";
import { delay, sectionClass, type Tone } from "./section";

/** A horizontal row of 4–5 rotated stamps, alternating -2deg / +1.5deg. */
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
            <li key={item} style={delay(i, 60)}>
              <StampBadge reveal alt={i % 2 === 1}>
                {item}
              </StampBadge>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
