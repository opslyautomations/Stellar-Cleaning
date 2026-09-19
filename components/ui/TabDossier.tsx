"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Container from "./Container";
import SectionHeader from "./SectionHeader";
import { sectionClass, type Tone } from "./section";

export type DossierItem = { label: string; title: string; body: string };

/**
 * Vertical tab list on the left, detail panel on the right.
 * Under 768px the tab list becomes `display: contents` and CSS `order`
 * interleaves each trigger directly above its own panel — the same markup
 * reading as an accordion, with no duplicated content in the DOM.
 *
 * Keyboard: Up/Down/Home/End move between tabs, roving tabindex.
 */
export default function TabDossier({
  stamp,
  title,
  lede,
  items,
  tone = "paper",
}: {
  stamp: string;
  title: string;
  lede?: string;
  items: DossierItem[];
  tone?: Tone;
}) {
  const uid = useId().replace(/:/g, "");
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = items.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section data-component="TabDossier" className={sectionClass(tone)}>
      <Container>
        <SectionHeader stamp={stamp} title={title} lede={lede} />
        <div className="dossier" data-reveal="block">
          <div className="dossier__tabs" role="tablist" aria-orientation="vertical" aria-label={title}>
            {items.map((item, i) => (
              <button
                key={item.label}
                type="button"
                role="tab"
                id={`${uid}-tab-${i}`}
                aria-controls={`${uid}-panel-${i}`}
                aria-selected={active === i}
                aria-expanded={active === i}
                tabIndex={active === i ? 0 : -1}
                ref={(node) => {
                  tabRefs.current[i] = node;
                }}
                className="dossier__tab"
                style={{ order: i * 2 }}
                onClick={() => setActive(i)}
                onKeyDown={(event) => onKeyDown(event, i)}
              >
                <span>{item.label}</span>
                <span className="dossier__tab-glyph" aria-hidden="true">
                  {active === i ? "—" : "+"}
                </span>
              </button>
            ))}
          </div>

          {items.map((item, i) => (
            <div
              key={item.label}
              role="tabpanel"
              id={`${uid}-panel-${i}`}
              aria-labelledby={`${uid}-tab-${i}`}
              className="dossier__panel"
              style={{ order: i * 2 + 1 }}
              hidden={active !== i}
            >
              <h3 className="dossier__panel-title">{item.title}</h3>
              <p className="dossier__panel-body">{item.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
