import type { Metadata } from "next";
import { Phone } from "lucide-react";

import GHLForm from "@/components/GHLForm";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/layout/PageHeader";
import CtaSlab from "@/components/ui/CtaSlab";
import IndexColumns from "@/components/ui/IndexColumns";
import NumberedProcess from "@/components/ui/NumberedProcess";
import SplitAnchorHero from "@/components/ui/SplitAnchorHero";
import StampBadge from "@/components/ui/StampBadge";

import { BUSINESS, CALL_LABEL, MAIL_HREF, TEL_HREF } from "@/lib/business";
import { areaIndexGroups } from "@/lib/content";
import { breadcrumbSchema, contactPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ path: "/contact" });

const NEXT_STEPS = [
  {
    title: "We call or email back",
    body: "Usually the same business day, within the hours below.",
  },
  {
    title: "We walk the space",
    body: "At a time that works for you, so the quote reflects the actual square footage and scope.",
  },
  {
    title: "You get a written quote",
    body: "No obligation to book, no deposit and no pressure either way.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Contact", path: "/contact" }]),
          contactPageSchema(),
        ]}
      />

      <PageHeader
        stamp="GET IN TOUCH"
        title="Request a free estimate"
        lede="Tell us about your space and we will come look at it. No fee, no obligation."
      />

      {/* SplitAnchorHero reused as a two-column panel, not as a hero. */}
      <SplitAnchorHero
        variant="panel"
        headingLevel="h2"
        left={
          <>
            <div style={{ marginBottom: 20 }}>
              <StampBadge>REACH US</StampBadge>
            </div>
            <h2>Phone, email or the form</h2>
            <dl className="details-list">
              <div className="details-list__row">
                <dt>Phone</dt>
                <dd>
                  <a href={TEL_HREF}>{BUSINESS.phone}</a>
                </dd>
              </div>
              <div className="details-list__row">
                <dt>Email</dt>
                <dd>
                  <a href={MAIL_HREF}>{BUSINESS.email}</a>
                </dd>
              </div>
              <div className="details-list__row">
                <dt>Based in</dt>
                <dd>
                  {BUSINESS.city}, {BUSINESS.stateFull} {BUSINESS.zip}
                </dd>
              </div>
              <div className="details-list__row">
                <dt>Hours</dt>
                <dd>
                  {BUSINESS.hoursDisplay.map((row) => (
                    <span key={row.label}>
                      {row.label}: {row.value}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="details-list__row">
                <dt>Google</dt>
                <dd>
                  <a href={BUSINESS.gbpUrl} target="_blank" rel="noopener noreferrer">
                    View on Google
                  </a>
                </dd>
              </div>
            </dl>
            <p className="notice">
              <strong>We come to you.</strong> Stellar Cleaning Solutions is a service-based
              business — there is no walk-in location and no storefront. Every quote starts with us
              visiting your space.
            </p>
          </>
        }
        // Prompt 05 specifies heading="Request a free estimate" here, but that is
        // also this page's h1, directly above — so the panel gets its own label
        // rather than saying the same sentence twice.
        slot={<GHLForm heading="Tell us about the space" id="estimate" />}
      />

      <NumberedProcess
        tone="alt"
        stamp="WHAT HAPPENS NEXT"
        title="Three steps, no obligation"
        steps={NEXT_STEPS}
      />

      <IndexColumns
        stamp="WHERE WE WORK"
        title="Ten cities, two regions"
        groups={areaIndexGroups()}
        columns={2}
      />

      <CtaSlab
        stamp="PREFER TO CALL"
        title="Prefer to talk?"
        body={`Call ${BUSINESS.phone} during business hours and you will get a person, not a queue.`}
        primary={{ href: TEL_HREF, label: CALL_LABEL, external: true, icon: <Phone size={18} aria-hidden="true" /> }}
        secondary={{ href: BUSINESS.gbpUrl, label: "View on Google", external: true }}
      />
    </>
  );
}
