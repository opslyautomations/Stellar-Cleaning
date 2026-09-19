import type { Metadata } from "next";
import { Phone } from "lucide-react";

import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/layout/PageHeader";
import CoverageBand from "@/components/ui/CoverageBand";
import CtaSlab from "@/components/ui/CtaSlab";
import OfferCards from "@/components/ui/OfferCards";
import RuledAccordion from "@/components/ui/RuledAccordion";

import { CALL_LABEL, TEL_HREF } from "@/lib/business";
import { OFFERS, coverageGroups } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ path: "/specials" });

const DETAILS = [
  {
    q: "How do I claim the new client discount?",
    a: "Mention it when you request your estimate, or note it in the form. It is applied to your first scheduled clean after the walkthrough.",
  },
  {
    q: "Can I combine the new client discount with the recurring bundle?",
    a: "Yes. New clients who start on a weekly or bi-weekly schedule get the first-clean discount and then the recurring rate from the second clean onward.",
  },
  {
    q: "Is the free estimate really free?",
    a: "Yes — no fee, no deposit and no obligation to book. We walk the space, scope the work and send a quote.",
  },
];

export default function SpecialsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Specials", path: "/specials" }])} />

      <PageHeader stamp="LIMITED OFFERS" title="Current specials" />

      <OfferCards stamp="ON NOW" title="Three ways to start" offers={OFFERS} />

      <RuledAccordion tone="alt" stamp="THE DETAILS" title="How the offers work" items={DETAILS} />

      <CoverageBand
        stamp="COVERAGE"
        title="Offers apply across both regions"
        statement="Every offer on this page is available in all ten cities we serve, on both the Willamette Valley and Central Oregon routes."
        groups={coverageGroups()}
      />

      <CtaSlab
        stamp="CLAIM IT"
        title="Claim an offer"
        body="Tell us which one when you request your estimate and we will apply it to the first clean."
        primary={{ href: TEL_HREF, label: CALL_LABEL, external: true, icon: <Phone size={18} aria-hidden="true" /> }}
        secondary={{ href: "/contact", label: "Request a Free Estimate" }}
      />
    </>
  );
}
