/**
 * Thin full-bleed dark strip with looping Space Mono text.
 * Maximum one per page. The track is duplicated so a -50% translate loops
 * seamlessly; the copy is hidden from assistive tech once.
 */
export default function MarqueeRule({ text, label }: { text: string; label: string }) {
  return (
    <section data-component="MarqueeRule" className="marquee" aria-label={label}>
      <div className="marquee__track">
        <span className="marquee__chunk">{text.repeat(2)}</span>
        <span className="marquee__chunk" aria-hidden="true">
          {text.repeat(2)}
        </span>
      </div>
    </section>
  );
}
