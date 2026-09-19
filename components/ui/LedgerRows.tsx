import type { ReactNode } from "react";
import Container from "./Container";
import SectionHeader from "./SectionHeader";
import { delay, sectionClass, type Tone } from "./section";

export type LedgerRow = { num: string; title: string; body: string };

/**
 * Full-width rows separated by hairlines. Oversized Space Mono numeral,
 * title, description. No boxes anywhere in this component.
 */
export default function LedgerRows({
  stamp,
  title,
  lede,
  rows,
  tone = "paper",
}: {
  stamp: string;
  title: ReactNode;
  lede?: ReactNode;
  rows: LedgerRow[];
  tone?: Tone;
}) {
  return (
    <section data-component="LedgerRows" className={sectionClass(tone)}>
      <Container>
        <SectionHeader stamp={stamp} title={title} lede={lede} />
        <ul className="ledger">
          {rows.map((row, i) => (
            <li className="ledger__row" key={row.num} data-reveal="card" style={delay(i, 60)}>
              <span className="ledger__num">{row.num}</span>
              <h3 className="ledger__title">{row.title}</h3>
              <p className="ledger__body">{row.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
