# Stellar component catalog

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
| 1 | `SplitAnchorHero` | Two-column hero over soft amber glows; pill eyebrow, h1, lede, CTAs, check highlights left; framed slot with floating chip right |
| 2 | `StampStrip` | White trust bar: 3–5 proof points with check icons, divided columns; 2-up on mobile |
| 3 | `LedgerRows` | Rows inside one white rounded panel: tint number badge, title, description |
| 4 | `OffsetCardGrid` | 2/3/4 column grid of the card anatomy; optional photo, icon, title, copy, optional link |
| 5 | `TabDossier` | Vertical tabs left, panel right; arrow-key navigable; accordion under 768px |
| 6 | `IndexColumns` | Dense multi-column link index with hairline dividers |
| 7 | `PortraitAside` | Rounded image one side, text the other; the stamp floats as a chip over the image's lower corner |
| 8 | `ChecklistSlab` | Two-column list of small white cards, tint circle check marker per item |
| 9 | `QuoteWall` | Review cards, varied spans in a 6-col grid (`pair` variant for two quotes) |
| 10 | `MarqueeRule` | Thin full-bleed dark strip with looping uppercase text |
| 11 | `NumberedProcess` | 3–4 step cards, each led by a filled amber number badge |
| 12 | `OfferCards` | Promo cards with an amber gradient top edge and tint ribbon label |
| 13 | `CoverageBand` | City grid of linked pin cards grouped by region, plus a coverage statement |
| 14 | `RuledAccordion` | Stacked white `<details>` cards, round `+`/`−` glyph, 0fr→1fr panel |
| 15 | `CtaSlab` | Rounded dark panel inside the gutter; centred h2, one line, click-to-call plus secondary |
| 16 | `FooterLedger` | Four-column dark footer |
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

- The nine colour tokens are fixed. `--accent-tint`, `--accent-ring` and
  `--rule-strong` are tints of them, not new hues.
- Elevation is soft and layered: `--shadow-sm` at rest, `--shadow-md` for
  featured surfaces, `--shadow-lg` on hover and for floating chips. Never a
  hard offset shadow.
- Radii: 12px buttons, 14px small cards, 20px cards and frames, 28px hero
  form, portrait image and CTA panel. Eyebrows, chips and ribbons are pills.
- Borders are 1px `--rule`. No 2px ink outlines.
- Interactive surfaces lift on hover (`translateY(-2px)` buttons,
  `-4px` cards) and never on reduced motion.
- `--accent` (`#F59E0B`) is a **fill only**. Accent text on a light background is
  `--accent-deep` (`#B45309`). Primary buttons are amber with `--ink` text.
- No dark mode. No animation library. No component library.
