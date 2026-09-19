# Warm Trades component catalog

Sixteen catalog components and six support primitives. Every page on this site is
assembled from these and nothing else. If a page needs a new visual pattern, the
pattern is added here and to `/design-system` first — never inline on the page.

## Composition rules

1. **No two adjacent sections on any page may use the same component from this catalog.**
2. **Any page with sections must use at least 6 distinct catalog components.**
3. **`MarqueeRule` appears at most once per page.**
4. **`SplitAnchorHero` is homepage-only; other pages use `SectionHeader` over a `--paper-alt` band as their page header.**

`SplitAnchorHero` has one sanctioned exception: `/contact` reuses it with
`variant="panel"` as a two-column form layout, which renders without the
oversized h1 treatment and is not a hero.

## Catalog

| # | Component | Shape |
|---|---|---|
| 1 | `SplitAnchorHero` | 56/44 asymmetric grid; eyebrow stamp, h1, lede, two CTAs left; framed slot right |
| 2 | `StampStrip` | Row of 4–5 rotated stamps, alternating -2deg / +1.5deg; wraps on mobile |
| 3 | `LedgerRows` | Hairline-separated full-width rows: mono numeral, title, description. No boxes |
| 4 | `OffsetCardGrid` | 2/3/4 column grid of the card anatomy; icon, title, copy, optional link |
| 5 | `TabDossier` | Vertical tabs left, panel right; arrow-key navigable; accordion under 768px |
| 6 | `IndexColumns` | Dense multi-column link index with hairline dividers |
| 7 | `PortraitAside` | Framed image one side, text the other; stamp overlaps the image corner by 16px |
| 8 | `ChecklistSlab` | Full-width band, two-column list, amber square check marker per item |
| 9 | `QuoteWall` | Review cards, varied spans in a 6-col grid (`pair` variant for two quotes) |
| 10 | `MarqueeRule` | Thin full-bleed dark strip with looping Space Mono text |
| 11 | `NumberedProcess` | 3–4 steps, each with an oversized outlined numeral |
| 12 | `OfferCards` | Promo cards with a clip-path notched corner and ribbon label |
| 13 | `CoverageBand` | Dark band; city list as chips plus a coverage statement |
| 14 | `RuledAccordion` | Hairline-ruled `<details>` accordion, `+`/`−` glyph, 0fr→1fr panel |
| 15 | `CtaSlab` | Full-bleed dark band; h2, one line, click-to-call plus secondary |
| 16 | `FooterLedger` | Four-column dark footer with hairline dividers |
| 17 | `FramedGallery` | Six-column image wall at mixed aspect ratios, every image in a `Frame` |

`FramedGallery` was added in Prompt 05 for `/gallery`, following the rule above:
the pattern went into the catalog and onto `/design-system` before the page used
it. It introduces no new styling — the border, radius and offset shadow are the
`Frame` primitive's.

## Support primitives

`Button` (`primary` amber fill / `secondary` paper fill / `ghost` underline only),
`StampBadge`, `Frame`, `SectionHeader`, `Rule`, `Container`.

`section.ts` is not a component. It returns the band-tone class (`paper` /
`alt` / `deep`) and the reveal stagger custom property, so every catalog
component paints the same three tones.

## Non-negotiables

- Every card, image frame, button and badge sits on a **zero-blur offset shadow**.
  Never `shadow-md`, never a blur radius.
- Every section is introduced by **exactly one** stamp badge.
- `border-radius` on a card, button or frame is `4px`. Stamps and chips are pills.
- `--accent` (`#F59E0B`) is a **fill only**. Accent text on a light background is
  `--accent-deep` (`#B45309`).
- On `--deep` bands the offset shadow re-points to `--accent-deep` so it stays
  visible. Still zero blur, still a hard offset — only the color changes.
- No dark mode. No animation library. No component library.
