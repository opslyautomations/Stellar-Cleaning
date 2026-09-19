import type { Metadata } from "next";
import { Briefcase, Building2, ClipboardCheck, Home, Phone } from "lucide-react";

import Button from "@/components/ui/Button";
import ChecklistSlab from "@/components/ui/ChecklistSlab";
import Container from "@/components/ui/Container";
import CoverageBand from "@/components/ui/CoverageBand";
import CtaSlab from "@/components/ui/CtaSlab";
import FooterLedger from "@/components/ui/FooterLedger";
import Frame from "@/components/ui/Frame";
import FramedGallery from "@/components/ui/FramedGallery";
import IndexColumns from "@/components/ui/IndexColumns";
import LedgerRows from "@/components/ui/LedgerRows";
import MarqueeRule from "@/components/ui/MarqueeRule";
import NumberedProcess from "@/components/ui/NumberedProcess";
import OfferCards from "@/components/ui/OfferCards";
import OffsetCardGrid from "@/components/ui/OffsetCardGrid";
import PortraitAside from "@/components/ui/PortraitAside";
import QuoteWall from "@/components/ui/QuoteWall";
import RuledAccordion from "@/components/ui/RuledAccordion";
import Rule from "@/components/ui/Rule";
import SectionHeader from "@/components/ui/SectionHeader";
import SplitAnchorHero from "@/components/ui/SplitAnchorHero";
import { GALLERY } from "@/lib/images";
import StampBadge from "@/components/ui/StampBadge";
import StampStrip from "@/components/ui/StampStrip";
import TabDossier from "@/components/ui/TabDossier";

export const metadata: Metadata = {
  title: "Design system — Warm Trades",
  robots: { index: false, follow: false },
};

const TOKENS = [
  { name: "--paper", hex: "#FAF6F0", note: "Page base, warm off-white" },
  { name: "--paper-alt", hex: "#F1E9DE", note: "Alternating section band" },
  { name: "--surface", hex: "#FFFFFF", note: "Card face" },
  { name: "--ink", hex: "#1A1614", note: "Primary text — 17:1 on paper" },
  { name: "--ink-muted", hex: "#6B5F57", note: "Secondary text — 5.7:1 on paper" },
  { name: "--deep", hex: "#2A2320", note: "Dark bands, footer, CTA slabs" },
  { name: "--accent", hex: "#F59E0B", note: "FILL ONLY — never text on light" },
  { name: "--accent-deep", hex: "#B45309", note: "Accent text/links — 4.7:1 on paper" },
  { name: "--rule", hex: "#E0D5C6", note: "Hairlines and borders" },
];

const CONTRAST = [
  ["--ink on --paper", "17:1", "All body text"],
  ["--ink-muted on --paper", "5.7:1", "Secondary text, captions"],
  ["--accent-deep on --paper", "4.7:1", "Link text, accent headings"],
  ["--ink on --accent", "8.2:1", "Text inside stamp badges"],
  ["--paper on --deep", "14.4:1", "Text in dark bands"],
];

const SCALE = [
  ["--step-4", "h1", "Professional cleaning you can count on"],
  ["--step-3", "h2", "The difference is that we actually show up"],
  ["--step-2", "h3", "A cleaner space means better business"],
  ["--step-1", "h4", "Attention to detail"],
  ["--step-0", "body", "Weekly, bi-weekly or one-time deep cleans."],
  ["--step--1", "small", "Corvallis, Oregon 97330"],
];

const MOTION = [
  ["Section header + body block", "data-reveal, once", "translateY(16px) → 0, opacity .001 → 1", "520ms", "cubic-bezier(.22,.61,.36,1)"],
  ["Framed card / image", "data-reveal, once, 60ms stagger", "translateY(14px) → 0", "460ms", "cubic-bezier(.22,.61,.36,1)"],
  ["Stamp badge", "data-reveal, once", "rotate(-6deg) scale(.96) → rotate(-2deg) scale(1)", "380ms", "cubic-bezier(.34,1.56,.64,1)"],
  ["Card / button", ":hover, :focus-visible", "translate(3px,3px), shadow 6px→3px", "160ms", "ease-out"],
  ["Nav dropdown", ":hover, :focus-within", "translateY(6px) → 0, clip-path inset reveal", "180ms", "ease-out"],
  ["Sticky mobile CTA bar", "scroll past 60vh", "translateY(100%) → 0", "240ms", "ease-out"],
  ["MarqueeRule", "always running", "translateX(0 → -50%) loop", "32s", "linear"],
  ["RuledAccordion panel", "click", "grid-template-rows 0fr → 1fr", "260ms", "ease"],
  ["Header bar", "scroll past 24px", "adds bottom rule + 4px offset shadow", "200ms", "ease"],
];

export default function DesignSystemPage() {
  return (
    <>
      <section className="sect sect--alt page-header">
        <Container>
          <SectionHeader
            stamp="DESIGN FRAME"
            as="h1"
            title="Warm Trades"
            lede="Every token, primitive and motion rule in one place. This route is noindex and is deleted before launch."
          />
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="sect sect--paper">
        <Container>
          <SectionHeader stamp="COLOR" title="Nine tokens" />
          <ul className="ds-swatches">
            {TOKENS.map((token) => (
              <li className="ds-swatch" key={token.name}>
                <div className="ds-swatch__chip" style={{ background: token.hex }} />
                <div className="ds-swatch__meta">
                  <code>{token.name}</code>
                  <br />
                  <code>{token.hex}</code>
                  <br />
                  {token.note}
                </div>
              </li>
            ))}
          </ul>

          <div className="ds-block">
            <span className="ds-label">Verified contrast pairs</span>
            <ul className="ds-motion">
              {CONTRAST.map(([pair, ratio, use]) => (
                <li key={pair}>
                  <strong>{pair}</strong> — {ratio} — {use}
                </li>
              ))}
            </ul>
          </div>

          <div className="ds-block">
            <span className="ds-label">Type scale</span>
            <ul className="ds-scale">
              {SCALE.map(([step, role, sample]) => (
                <li key={step}>
                  <span className="mono" style={{ color: "var(--accent-deep)" }}>
                    {step} · {role}
                  </span>
                  <div
                    style={{
                      fontSize: `var(${step})`,
                      fontFamily:
                        role === "body" || role === "small"
                          ? "var(--font-body)"
                          : "var(--font-display)",
                      fontWeight: role === "body" || role === "small" ? 400 : 800,
                      letterSpacing: role === "body" || role === "small" ? "0" : "-0.02em",
                      lineHeight: role === "body" || role === "small" ? 1.6 : 1.02,
                    }}
                  >
                    {sample}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="ds-block">
            <span className="ds-label">Support primitives</span>
            <div className="btn-row">
              <Button href="#" variant="primary">
                Primary button
              </Button>
              <Button href="#" variant="secondary">
                Secondary button
              </Button>
              <Button href="#" variant="ghost">
                Ghost link →
              </Button>
            </div>
            <div className="btn-row">
              <StampBadge>STAMP BADGE</StampBadge>
              <StampBadge alt>ALT ROTATION</StampBadge>
              <StampBadge plain>PLAIN FILL</StampBadge>
            </div>
            <div style={{ marginTop: 28, maxWidth: 420 }}>
              <Frame pressable>
                <div style={{ padding: 24 }}>
                  <strong>Frame</strong>
                  <p className="t-small" style={{ color: "var(--ink-muted)", margin: 0 }}>
                    2px ink border, 4px radius, 6px 6px 0 offset shadow, zero blur.
                  </p>
                </div>
              </Frame>
            </div>
            <div style={{ marginTop: 34 }}>
              <span className="ds-label">Rule</span>
              <Rule />
            </div>
          </div>
        </Container>
      </section>

      {/* 1 — SplitAnchorHero -------------------------------------------- */}
      <SplitAnchorHero
        eyebrow="CORVALLIS, OR"
        headingLevel="h2"
        title="1 — SplitAnchorHero"
        lede="Asymmetric 56/44 split. Stamp eyebrow, oversized heading, lede, two buttons on the left; a framed slot on the right. Nothing here animates."
        actions={
          <>
            <Button href="#" variant="primary" icon={<Phone size={18} aria-hidden="true" />}>
              Primary action
            </Button>
            <Button href="#" variant="secondary">
              Secondary action
            </Button>
          </>
        }
        slot={
          <Frame>
            <div style={{ padding: 24, minHeight: 320 }}>
              <h3 style={{ fontSize: "var(--step-1)" }}>Framed slot</h3>
              <p style={{ color: "var(--ink-muted)", margin: 0 }}>
                On the homepage and on /contact this slot holds the GoHighLevel quote form,
                with its height reserved so the embed cannot shift the layout.
              </p>
            </div>
          </Frame>
        }
      />

      {/* 2 — StampStrip -------------------------------------------------- */}
      <StampStrip
        label="2 — StampStrip"
        items={["4.7★ ON GOOGLE", "53 REVIEWS", "BACKGROUND-CHECKED", "ECO-FRIENDLY", "10 CITIES"]}
      />

      {/* 3 — LedgerRows -------------------------------------------------- */}
      <LedgerRows
        stamp="LEDGER"
        title="3 — LedgerRows"
        lede="Hairline-separated rows. Oversized mono numeral, title, description. No boxes."
        rows={[
          { num: "01", title: "Reliability", body: "We show up on time, every time." },
          { num: "02", title: "Attention to detail", body: "Corners, baseboards, behind the door." },
          { num: "03", title: "Transparency", body: "Honest quotes with no hidden fees." },
        ]}
      />

      {/* 4 — OffsetCardGrid ---------------------------------------------- */}
      <OffsetCardGrid
        tone="alt"
        stamp="CARDS"
        title="4 — OffsetCardGrid"
        lede="The card anatomy. Hover or focus a card and it translates 3px and the shadow collapses to 3px — pressed, never lifted."
        columns={4}
        cards={[
          { title: "Commercial", body: "Offices, retail floors, medical suites.", icon: Building2, href: "#" },
          { title: "Residential", body: "Weekly, bi-weekly or one-time deep cleans.", icon: Home, href: "#" },
          { title: "Janitorial", body: "Ongoing custodial maintenance.", icon: ClipboardCheck, href: "#" },
          { title: "Office", body: "Two-room suite to multi-floor campus.", icon: Briefcase, href: "#" },
        ]}
      />

      {/* 5 — TabDossier --------------------------------------------------- */}
      <TabDossier
        stamp="DOSSIER"
        title="5 — TabDossier"
        lede="Arrow keys move between tabs. Under 768px the list collapses to an accordion using the same markup."
        items={[
          { label: "Schedules", title: "Schedules", body: "Daily, nightly or custom cleaning schedules built around operating hours." },
          { label: "Restrooms", title: "Restrooms", body: "Sanitation and consumable restocking on every visit, logged." },
          { label: "Waste", title: "Waste", body: "Trash removal and recycling management, including sorting requirements." },
        ]}
      />

      {/* 6 — IndexColumns -------------------------------------------------- */}
      <IndexColumns
        tone="alt"
        stamp="INDEX"
        title="6 — IndexColumns"
        columns={2}
        groups={[
          {
            label: "Willamette Valley",
            items: [
              { href: "#", label: "Corvallis", note: "Home base" },
              { href: "#", label: "Albany", note: "Historic districts and the industrial corridor" },
            ],
          },
          {
            label: "Central Oregon",
            items: [
              { href: "#", label: "Bend", note: "Hospitality and short-term rental turnover" },
              { href: "#", label: "Redmond", note: "Newer commercial space and post-construction" },
            ],
          },
        ]}
      />

      {/* 7 — PortraitAside -------------------------------------------------- */}
      <PortraitAside
        stamp="PORTRAIT"
        title="7 — PortraitAside"
        body={[
          "Framed image on one side, text on the other. The stamp overlaps the image's top-left corner by 16px.",
          "Pass `reverse` to flip the sides on desktop. Below 880px it always stacks image-first.",
        ]}
        image={{
          src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=960&h=720&fit=crop&q=75",
          alt: "A cleaner in gloves and a face mask wiping down interior window shutters.",
          width: 960,
          height: 720,
          priority: true,
        }}
        link={{ href: "#", label: "Optional ghost link →" }}
      />

      {/* 8 — ChecklistSlab -------------------------------------------------- */}
      <ChecklistSlab
        stamp="CHECKLIST"
        title="8 — ChecklistSlab"
        items={[
          { title: "Office buildings and corporate spaces" },
          { title: "Retail stores and showrooms" },
          { title: "Medical and dental offices", note: "Optional second line for detail." },
          { title: "Warehouses and industrial facilities" },
        ]}
      />

      {/* 9 — QuoteWall -------------------------------------------------- */}
      <QuoteWall
        stamp="QUOTES"
        title="9 — QuoteWall"
        lede="Placeholder text only. This component never generates review copy — it renders exactly what it is handed."
        quotes={[
          { author: "Placeholder One", body: "Placeholder quote text used only on this preview route.", rating: 5, source: "Preview" },
          { author: "Placeholder Two", body: "Placeholder quote text used only on this preview route.", rating: 5, source: "Preview" },
          { author: "Placeholder Three", body: "Placeholder quote text used only on this preview route.", rating: 4, source: "Preview" },
        ]}
      />

      {/* 17 — FramedGallery ------------------------------------------------ */}
      <FramedGallery
        tone="alt"
        stamp="GALLERY"
        title="17 — FramedGallery"
        lede="Six-column wall at mixed aspect ratios. Spans of 2, 3 and 4 with 4:3, 1:1 and 3:4 crops, so the grid is deliberately uneven."
        images={GALLERY.slice(0, 6)}
        priorityIndex={-1}
      />

      {/* 10 — MarqueeRule -------------------------------------------------- */}
      <MarqueeRule
        label="10 — MarqueeRule"
        text="CORVALLIS · ALBANY · LEBANON · PHILOMATH · SALEM · EUGENE · SPRINGFIELD · BEND · PRINEVILLE · REDMOND · "
      />

      {/* 11 — NumberedProcess ------------------------------------------- */}
      <NumberedProcess
        stamp="PROCESS"
        title="11 — NumberedProcess"
        steps={[
          { title: "Tell us what you need", body: "Send the form or call. Takes about two minutes." },
          { title: "We walk the space", body: "A free, no-obligation visit so the quote reflects reality." },
          { title: "We get to work", body: "Your crew, your schedule, inspected on a regular cycle." },
        ]}
      />

      {/* 12 — OfferCards -------------------------------------------------- */}
      <OfferCards
        tone="alt"
        stamp="OFFERS"
        title="12 — OfferCards"
        offers={[
          { ribbon: "NEW CLIENT", title: "Notched corner", body: "clip-path cuts the top-right corner.", href: "#", cta: "Card CTA" },
          { ribbon: "BEST VALUE", title: "Ribbon label", body: "Space Mono, amber fill, ink border.", href: "#", cta: "Card CTA" },
          { ribbon: "NO OBLIGATION", title: "Third card", body: "Three-up on desktop, stacked on mobile.", href: "#", cta: "Card CTA" },
        ]}
      />

      {/* 13 — CoverageBand -------------------------------------------------- */}
      <CoverageBand
        stamp="COVERAGE"
        title="13 — CoverageBand"
        statement="Dark band. City list as stamp-style chips plus a short coverage statement."
        groups={[
          {
            label: "Willamette Valley",
            items: [
              { href: "#", label: "Corvallis" },
              { href: "#", label: "Albany" },
              { href: "#", label: "Salem" },
            ],
          },
          {
            label: "Central Oregon",
            items: [
              { href: "#", label: "Bend" },
              { href: "#", label: "Redmond" },
            ],
          },
        ]}
      />

      {/* 14 — RuledAccordion -------------------------------------------------- */}
      <RuledAccordion
        stamp="ACCORDION"
        title="14 — RuledAccordion"
        lede="Backed by <details>, so it opens and closes with JavaScript disabled."
        items={[
          { q: "Does this work without JavaScript?", a: "Yes. Each item is a native <details>/<summary> pair, so it opens and closes with scripting off. The panel animates via grid-template-rows where the browser supports transitioning it." },
          { q: "How is the panel animated?", a: "grid-template-rows moves from 0fr to 1fr over 260ms with an ease curve. No height measurement, no JavaScript." },
        ]}
      />

      {/* 15 — CtaSlab -------------------------------------------------- */}
      <CtaSlab
        title="15 — CtaSlab"
        body="Full-bleed dark band. On the dark tone the offset shadow re-points to --accent-deep so it stays visible."
        primary={{ href: "#", label: "Primary action", external: true }}
        secondary={{ href: "#", label: "Secondary action", external: true }}
      />

      {/* Motion inventory ------------------------------------------------ */}
      <section className="sect sect--paper">
        <Container>
          <SectionHeader
            stamp="MOTION"
            title="The complete motion inventory"
            lede="Nine rows. Nothing on this site animates that is not in this table."
          />
          <ul className="ds-motion">
            {MOTION.map(([element, trigger, change, duration, easing]) => (
              <li key={element}>
                <strong>{element}</strong>
                <div className="t-small" style={{ color: "var(--ink-muted)" }}>
                  {trigger} · {change} · {duration} · {easing}
                </div>
              </li>
            ))}
          </ul>
          <div className="ds-block">
            <span className="ds-label">Live examples</span>
            <p className="t-small" style={{ color: "var(--ink-muted)" }}>
              Every section above scrolled into view using rows 1–3. Hover any button or card for
              row 4. The header bar (row 9), nav dropdown (row 5) and sticky mobile CTA (row 6) are
              live in the global shell. The marquee above is row 7 and the accordion is row 8.
            </p>
          </div>
        </Container>
      </section>

      {/* 16 — FooterLedger -------------------------------------------------- */}
      <FooterLedger
        company={
          <>
            <span className="footer__wordmark">16 — FooterLedger</span>
            <p className="footer__tagline">
              Four columns with hairline dividers, collapsing to stacked below 900px.
            </p>
          </>
        }
        columns={[
          { label: "Column two", links: [{ href: "#", label: "Link" }, { href: "#", label: "Link" }] },
          {
            label: "Column three",
            split: true,
            links: [
              { href: "#", label: "Link" },
              { href: "#", label: "Link" },
              { href: "#", label: "Link" },
              { href: "#", label: "Link" },
            ],
          },
          { label: "Column four", links: [{ href: "#", label: "Link" }, { href: "#", label: "Link" }] },
        ]}
        bottomLeft="Preview route — deleted before launch."
        bottomRight="noindex, excluded from the sitemap."
      />
    </>
  );
}
