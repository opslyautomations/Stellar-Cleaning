import type { Metadata } from "next";
import { Phone, Star } from "lucide-react";

import GHLForm from "@/components/GHLForm";
import Button from "@/components/ui/Button";
import CoverageBand from "@/components/ui/CoverageBand";
import CtaSlab from "@/components/ui/CtaSlab";
import LedgerRows from "@/components/ui/LedgerRows";
import MarqueeRule from "@/components/ui/MarqueeRule";
import NumberedProcess from "@/components/ui/NumberedProcess";
import OfferCards from "@/components/ui/OfferCards";
import OffsetCardGrid from "@/components/ui/OffsetCardGrid";
import PortraitAside from "@/components/ui/PortraitAside";
import QuoteWall from "@/components/ui/QuoteWall";
import SplitAnchorHero from "@/components/ui/SplitAnchorHero";
import StampStrip from "@/components/ui/StampStrip";

import { AREAS, BUSINESS, CALL_LABEL, TEL_HREF } from "@/lib/business";
import {
  DIFFERENTIATORS,
  MARQUEE_TEXT,
  OFFERS_SHORT,
  PROCESS_STEPS,
  SERVICE_CARDS,
  coverageGroups,
} from "@/lib/content";
import { HOME_PORTRAIT, SERVICE_IMAGES } from "@/lib/images";
import { REVIEWS } from "@/lib/reviews";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero. The h1 is the LCP element: no reveal, no animation. */}
      <SplitAnchorHero
        eyebrow={`${BUSINESS.city.toUpperCase()}, ${BUSINESS.state}`}
        title={
          <>
            Professional cleaning <span className="accent-text">you can count on</span>
          </>
        }
        lede="Stellar Cleaning Solutions keeps businesses and homes across the Willamette Valley and Central Oregon consistently, thoroughly clean. Custodial and janitorial work for commercial properties and offices, plus residential cleaning built around your schedule."
        actions={
          <>
            <Button href={TEL_HREF} variant="primary" icon={<Phone size={18} aria-hidden="true" />}>
              {CALL_LABEL}
            </Button>
            <Button href="/specials" variant="secondary">
              See Current Specials
            </Button>
          </>
        }
        highlights={["Background-checked crews", "Eco-friendly products", "Free, no-obligation estimates"]}
        chip={
          <>
            <span className="hero__chip-icon" aria-hidden="true">
              <Star size={18} fill="currentColor" strokeWidth={0} />
            </span>
            <span>
              <strong>{BUSINESS.rating.value} on Google</strong>
              <span>{BUSINESS.rating.count} verified reviews</span>
            </span>
          </>
        }
        slot={<GHLForm heading="Request a free estimate" id="estimate" />}
      />

      {/* 2 — Trust bar */}
      <StampStrip
        label="Why clients pick Stellar"
        items={[
          `${BUSINESS.rating.value}★ rating on Google`,
          `${BUSINESS.rating.count} verified reviews`,
          "Background-checked crews",
          "Eco-friendly products",
          `${AREAS.length} cities served`,
        ]}
      />

      {/* 3 — Services */}
      <OffsetCardGrid
        stamp="WHAT WE DO"
        title="Four ways we keep your space clean"
        lede="Commercial, janitorial and residential programs — each built around your schedule and inspected by a supervisor."
        cards={SERVICE_CARDS.map((card) => ({
          ...card,
          image: card.href ? SERVICE_IMAGES[card.href.replace("/services/", "")] : undefined,
        }))}
        columns={4}
      />

      {/* 4 — Why Stellar */}
      <LedgerRows
        tone="alt"
        stamp="WHY STELLAR"
        title="The difference is that we actually show up"
        rows={DIFFERENTIATORS}
      />

      {/* 5 — Owner intro. The one priority image on this page. */}
      <PortraitAside
        stamp="THE OWNER"
        title="Run by Matt, cleaned by people he trained"
        body={[
          "Stellar Cleaning Solutions is owner-operated out of Corvallis. Matt built the company around a simple idea — that a cleaning service is only worth what its consistency is worth. That means the same crew on your account, a supervisor who inspects the work, and someone who picks up the phone when you call.",
          "It is why property managers, dental offices and restaurants across the valley have stayed with us.",
        ]}
        image={{ ...HOME_PORTRAIT, priority: true }}
        link={{ href: "/about", label: "More about us →" }}
      />

      {/* 6 — How it works */}
      <NumberedProcess
        tone="alt"
        stamp="HOW IT WORKS"
        title="Three steps to a cleaner space"
        steps={PROCESS_STEPS}
      />

      {/* 7 — Marquee. The one per page. */}
      <MarqueeRule label="Cities we serve" text={MARQUEE_TEXT} />

      {/* 8 — Coverage */}
      <CoverageBand
        stamp="COVERAGE"
        title="Serving the Willamette Valley and Central Oregon"
        statement="Ten cities, two regions, one standard. Central Oregon runs on its own scheduled route rather than being squeezed onto the end of a valley day."
        groups={coverageGroups()}
      />

      {/* 9 — Reviews. Only verified entries from /lib/reviews.ts. */}
      <QuoteWall
        tone="alt"
        stamp="WHAT CLIENTS SAY"
        title={`${BUSINESS.rating.value} stars across ${BUSINESS.rating.count} Google reviews`}
        quotes={REVIEWS.map((review) => ({
          author: review.author,
          body: review.body,
          rating: review.rating,
          source: `${review.source} review`,
        }))}
        variant="pair"
        after={
          <>
            <Button href={BUSINESS.gbpUrl} variant="secondary" external>
              Read all {BUSINESS.rating.count} reviews on Google →
            </Button>
            <Button href="/reviews" variant="ghost">
              See more reviews →
            </Button>
          </>
        }
      />

      {/* 10 — Specials */}
      <OfferCards stamp="LIMITED OFFERS" title="Current specials" offers={OFFERS_SHORT} />

      {/* 11 — Final CTA */}
      <CtaSlab
        stamp="READY TO START"
        title="Ready for a space that stays clean?"
        body="Free estimates across all ten cities we serve. No obligation, no pressure."
        primary={{ href: TEL_HREF, label: CALL_LABEL, external: true, icon: <Phone size={18} aria-hidden="true" /> }}
        secondary={{ href: "/contact", label: "Request Your Free Estimate" }}
      />
    </>
  );
}
