import type { Metadata } from "next";
import { Phone } from "lucide-react";

import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/layout/PageHeader";
import CtaSlab from "@/components/ui/CtaSlab";
import LedgerRows from "@/components/ui/LedgerRows";
import OffsetCardGrid from "@/components/ui/OffsetCardGrid";
import PortraitAside from "@/components/ui/PortraitAside";

import { CALL_LABEL, TEL_HREF } from "@/lib/business";
import { SERVICE_CARDS } from "@/lib/content";
import { SERVICES_INDEX } from "@/lib/images";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ path: "/services" });

const CLIENTS = [
  {
    num: "01",
    title: "Property managers",
    body: "Multi-tenant buildings where common areas set the tone for every lease conversation.",
  },
  {
    num: "02",
    title: "Offices and professional suites",
    body: "From a two-room practice to a full floor, cleaned after hours on a fixed schedule.",
  },
  {
    num: "03",
    title: "Medical and dental practices",
    body: "Product restrictions, restricted rooms and documented schedules, written into the contract.",
  },
  {
    num: "04",
    title: "Restaurants and hospitality",
    body: "Front of house that guests judge and back of house that inspectors do.",
  },
  {
    num: "05",
    title: "Homeowners and renters",
    body: "Weekly, bi-weekly or one-time deep cleans built around how the household actually runs.",
  },
  {
    num: "06",
    title: "Landlords and turnover crews",
    body: "Move-out cleans on a deadline, scoped so a deposit inspection is not a gamble.",
  },
];

export default function ServicesIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Services", path: "/services" }])} />

      <PageHeader stamp="OUR SERVICES" title="Cleaning services built around your building" />

      <PortraitAside
        stamp="THE RANGE"
        title="From a nightly contract to a single deep clean"
        body={[
          "Stellar Cleaning Solutions covers the full range of commercial and residential work across the Willamette Valley and Central Oregon — nightly janitorial contracts for multi-tenant buildings, after-hours office programs, periodic commercial cleaning, and one-time move-out cleans for renters and landlords.",
          "Every quote starts with a free walkthrough. We look at the actual square footage, the traffic the space takes and the hours you need us in it, then scope the work against what we saw rather than a rate card.",
        ]}
        image={{ ...SERVICES_INDEX, priority: true }}
      />

      <OffsetCardGrid
        tone="alt"
        stamp="WHAT WE DO"
        title="Four services, one standard"
        cards={SERVICE_CARDS}
        columns={4}
      />

      <LedgerRows stamp="OUR CLIENTS" title="The buildings on our books" rows={CLIENTS} />

      <CtaSlab
        stamp="GET A QUOTE"
        title="Tell us about your space"
        body="Free walkthrough, written quote, no obligation."
        primary={{ href: TEL_HREF, label: CALL_LABEL, external: true, icon: <Phone size={18} aria-hidden="true" /> }}
        secondary={{ href: "/contact", label: "Request a Free Estimate" }}
      />
    </>
  );
}
