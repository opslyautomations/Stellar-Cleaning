/**
 * Tone helper — not a component and not a visual pattern of its own. It only
 * returns the section shell class so every catalog component paints the same
 * three band tones (paper / paper-alt / deep).
 */
export type Tone = "paper" | "alt" | "deep";

export function sectionClass(tone: Tone = "paper", extra?: string): string {
  const base =
    tone === "deep"
      ? "sect sect--deep tone--deep"
      : tone === "alt"
        ? "sect sect--alt"
        : "sect sect--paper";
  return extra ? `${base} ${extra}` : base;
}

/** Inline custom property used for the 60ms reveal stagger. */
export function delay(index: number, step = 60): React.CSSProperties {
  return { ["--d" as string]: `${index * step}ms` } as React.CSSProperties;
}
