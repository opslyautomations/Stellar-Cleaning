import type { Metadata } from "next";

import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/layout/PageHeader";
import CtaSlab from "@/components/ui/CtaSlab";
import OfferCards from "@/components/ui/OfferCards";
import QuoteWall from "@/components/ui/QuoteWall";
import StampStrip from "@/components/ui/StampStrip";

import { BUSINESS } from "@/lib/business";
import { REVIEWS } from "@/lib/reviews";
import { breadcrumbSchema, reviewSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ path: "/reviews" });

export default function ReviewsPage() {
  return (
    <>
      {/* Review nodes only — aggregateRating is declared once, site-wide, in
          the root LocalBusiness block. Repeating it here is a violation. */}
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Reviews", path: "/reviews" }]),
          ...reviewSchema(REVIEWS),
        ]}
      />

      <PageHeader
        stamp="TRUSTED BY LOCALS"
        title="What our clients say"
        lede="Verified reviews from our Google Business Profile."
      />

      <StampStrip
        tone="paper"
        label="Rating summary"
        items={[
          `${BUSINESS.rating.value} ★ AVERAGE`,
          `${BUSINESS.rating.count} GOOGLE REVIEWS`,
          "VERIFIED ON GOOGLE",
        ]}
      />

      {/* Two equal columns rather than the varied-span masonry: the masonry
          only reads correctly at four quotes or more. */}
      <QuoteWall
        tone="alt"
        stamp="IN THEIR WORDS"
        title="Reviews we can point at"
        lede="We publish only reviews we can verify against the live Google profile. Right now that is two."
        variant="pair"
        quotes={REVIEWS.map((review) => ({
          author: review.author,
          body: review.body,
          rating: review.rating,
          source: review.source,
        }))}
      />

      <CtaSlab
        stamp="ON GOOGLE"
        title={`Read all ${BUSINESS.rating.count} on Google`}
        body="We publish only reviews we can verify. The full set lives on our Google Business Profile."
        primary={{ href: BUSINESS.gbpUrl, label: "View on Google", external: true }}
        secondary={{ href: BUSINESS.gbpUrl, label: "Leave a Review", external: true }}
      />

      <OfferCards
        wide
        stamp="NO OBLIGATION"
        title="Ready to see the difference?"
        offers={[
          {
            ribbon: "FREE ESTIMATE",
            title: "Free estimate, ten cities",
            body: "We walk the space, scope the work and send a written quote. No fee, no deposit and no obligation to book.",
            href: "/contact",
            cta: "Request Your Free Estimate",
          },
        ]}
      />
    </>
  );
}
