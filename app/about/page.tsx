import type { Metadata } from "next";
import { Phone } from "lucide-react";

import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/layout/PageHeader";
import ChecklistSlab from "@/components/ui/ChecklistSlab";
import CtaSlab from "@/components/ui/CtaSlab";
import IndexColumns from "@/components/ui/IndexColumns";
import LedgerRows from "@/components/ui/LedgerRows";
import PortraitAside from "@/components/ui/PortraitAside";

import { BUSINESS, CALL_LABEL, TEL_HREF } from "@/lib/business";
import { DIFFERENTIATORS, areaIndexGroups } from "@/lib/content";
import { ABOUT_BUSINESS, ABOUT_OWNER } from "@/lib/images";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ path: "/about" });

const ORIGIN = [
  {
    num: "01",
    title: "A Corvallis job, then another",
    body: "The company started with a handful of local accounts and grew entirely on referrals from people who noticed the difference.",
  },
  {
    num: "02",
    title: "The same crew, every time",
    body: "Rotating strangers through a building is how standards slip. We assign a dedicated crew per account and keep it that way.",
  },
  {
    num: "03",
    title: "Inspected, not assumed",
    body: "Supervisors run regular quality checks. Nobody has to take our word for it.",
  },
  {
    num: "04",
    title: "Two regions, one standard",
    body: "From Corvallis to Bend, the checklist does not change with the drive time.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "About", path: "/about" }])} />

      <PageHeader stamp="ABOUT US" title="The team behind the clean" />

      {/* 1 — The business */}
      <PortraitAside
        stamp="THE BUSINESS"
        title="Based in Corvallis, working across two regions"
        body={[
          "Stellar Cleaning Solutions is a professional cleaning company based in Corvallis, Oregon, serving businesses and homeowners throughout the Willamette Valley and Central Oregon. We specialize in custodial and janitorial services for commercial properties and offices, alongside residential cleaning for homes across the valley.",
          "Our team delivers reliable, thorough and consistent results — so our clients can focus on what matters most to them. Whether it is a one-time deep clean before a reopening or a nightly janitorial contract, the standard is the same on every job.",
        ]}
        image={{ ...ABOUT_BUSINESS, priority: true }}
      />

      {/* 2 — What sets us apart */}
      <ChecklistSlab
        stamp="OUR STANDARD"
        title="Five things we do not compromise on"
        items={DIFFERENTIATORS.map((item) => ({ title: item.title, note: item.body }))}
      />

      {/* 3 — Origin */}
      <LedgerRows stamp="SINCE DAY ONE" title="How Stellar started" rows={ORIGIN} />

      {/* 4 — Meet Matt */}
      <PortraitAside
        tone="alt"
        reverse
        stamp="OWNER"
        title={`${BUSINESS.owner}, owner`}
        body={[
          `${BUSINESS.owner} runs Stellar Cleaning Solutions out of ${BUSINESS.city}. He is the one who walks the space before the quote, sets the crew assignments, and answers the phone when a client needs something handled. The company is deliberately sized so that stays true.`,
        ]}
        image={ABOUT_OWNER}
      />

      {/* 5 — Where we work */}
      <IndexColumns
        stamp="COVERAGE"
        title="Ten cities, two regions"
        groups={areaIndexGroups()}
        columns={2}
      />

      {/* 6 — CTA */}
      <CtaSlab
        stamp="NEXT STEP"
        title="Let's talk about your space"
        body="Free estimates across the Willamette Valley and Central Oregon. No fee, no obligation."
        primary={{ href: TEL_HREF, label: CALL_LABEL, external: true, icon: <Phone size={18} aria-hidden="true" /> }}
        secondary={{ href: "/contact", label: "Request a Free Estimate" }}
      />
    </>
  );
}
