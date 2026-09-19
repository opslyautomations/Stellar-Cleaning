import { Briefcase, Building2, ClipboardCheck, Home } from "lucide-react";
import type { OffsetCard } from "@/components/ui/OffsetCardGrid";
import type { Offer } from "@/components/ui/OfferCards";
import type { CoverageGroup } from "@/components/ui/CoverageBand";
import type { IndexGroup } from "@/components/ui/IndexColumns";
import { AREAS, REGIONS, SERVICES, areasByRegion } from "./business";

/**
 * The four service cards, written once.
 *
 * This block is deliberately identical on the homepage, the services index and
 * every location page: the services genuinely are the same in every city, and
 * rewording them per page would be padding, not content.
 */
export const SERVICE_CARDS: OffsetCard[] = [
  {
    title: "Commercial Cleaning",
    icon: Building2,
    href: "/services/commercial-cleaning",
    linkLabel: "Commercial cleaning →",
    body: "Offices, retail floors, medical suites and industrial space — cleaned on a schedule that works around your operations, including after hours and weekends.",
  },
  {
    title: "Residential Cleaning",
    icon: Home,
    href: "/services/residential-cleaning",
    linkLabel: "Residential cleaning →",
    body: "Weekly, bi-weekly or one-time deep cleans. We bring our own supplies and build the clean around how you actually live.",
  },
  {
    title: "Janitorial Services",
    icon: ClipboardCheck,
    href: "/services/janitorial-services",
    linkLabel: "Janitorial services →",
    body: "Ongoing custodial maintenance with a dedicated crew, supervisor inspections, and a direct line when something needs attention.",
  },
  {
    title: "Office Cleaning",
    icon: Briefcase,
    href: "/services/office-cleaning",
    linkLabel: "Office cleaning →",
    body: "Programs for everything from a two-room suite to a multi-floor campus, run after hours so nobody's workday gets interrupted.",
  },
];

/**
 * The five differentiators. The homepage renders them as ledger rows and
 * /about renders them as a checklist — same words in both places, on purpose.
 */
export const DIFFERENTIATORS = [
  {
    num: "01",
    title: "Reliability",
    body: "We show up on time, every time. If we say Tuesday at six, we are there Tuesday at six.",
  },
  {
    num: "02",
    title: "Attention to detail",
    body: "Corners, baseboards, behind the door. The places that get skipped are the places we check first.",
  },
  {
    num: "03",
    title: "Transparency",
    body: "Honest quotes with no hidden fees. The estimate you approve is the invoice you get.",
  },
  {
    num: "04",
    title: "Eco-friendly products",
    body: "Safe for your staff, your family, your pets and the building.",
  },
  {
    num: "05",
    title: "Trained and vetted teams",
    body: "Every crew member is background-checked, insured and trained before they set foot on a job.",
  },
];

export const OFFERS: Offer[] = [
  {
    ribbon: "NEW CLIENT",
    title: "First-time clean discount",
    body: "New clients receive 20% off their first cleaning service, residential or commercial. Applies to the first scheduled clean after the free walkthrough.",
    href: "/contact",
    cta: "Claim Your Discount",
  },
  {
    ribbon: "BEST VALUE",
    title: "Recurring service bundle",
    body: "Sign up for weekly or bi-weekly service and save 15% on every clean. Lock in your rate today.",
    href: "/contact",
    cta: "Start Saving",
  },
  {
    ribbon: "NO OBLIGATION",
    title: "Free estimate",
    body: "Not sure what you need? We visit your space, assess the scope and provide a quote with no obligation and no pressure.",
    href: "/contact",
    cta: "Get Your Free Estimate",
  },
];

/** Short homepage variants of the same three offers. */
export const OFFERS_SHORT: Offer[] = [
  { ...OFFERS[0], body: "New clients get 20% off their first cleaning, residential or commercial.", cta: "Claim Your Discount" },
  { ...OFFERS[1], body: "Sign up for weekly or bi-weekly service and save 15% on every clean. Lock in your rate today." },
  { ...OFFERS[2], body: "Not sure what you need? We'll visit, assess the scope and quote it.", cta: "Get a Free Estimate" },
];

export const PROCESS_STEPS = [
  {
    title: "Tell us what you need",
    body: "Send the form or call. Takes about two minutes.",
  },
  {
    title: "We walk the space",
    body: "A free, no-obligation visit so the quote reflects your actual square footage and needs, not a guess.",
  },
  {
    title: "We get to work",
    body: "Your crew, your schedule, inspected on a regular cycle.",
  },
];

/** Every city, grouped by region, for CoverageBand. */
export function coverageGroups(): CoverageGroup[] {
  return REGIONS.map((region) => ({
    label: region,
    items: areasByRegion(region).map((area) => ({
      href: `/areas/${area.slug}`,
      label: area.name,
    })),
  }));
}

/** One-line note per city, used in link indexes. */
export const AREA_NOTES: Record<string, string> = {
  corvallis: "Home base — fastest scheduling",
  albany: "Historic districts and the industrial corridor",
  lebanon: "Healthcare-adjacent facilities and small offices",
  philomath: "Ten minutes from base, same-day walkthroughs",
  salem: "Government, professional services, healthcare",
  eugene: "Our largest market, scheduled on dedicated days",
  springfield: "Industrial, medical and shift-work facilities",
  bend: "Hospitality and short-term rental turnover",
  prineville: "Facility-grade commercial and family homes",
  redmond: "Newer commercial space and post-construction",
};

export function areaIndexGroups(withNotes = true): IndexGroup[] {
  return REGIONS.map((region) => ({
    label: region,
    items: areasByRegion(region).map((area) => ({
      href: `/areas/${area.slug}`,
      label: area.name,
      note: withNotes ? AREA_NOTES[area.slug] : undefined,
    })),
  }));
}

/** One-line note per service, used in "related services" indexes. */
export const SERVICE_NOTES: Record<string, string> = {
  "commercial-cleaning": "Offices, retail, medical suites and industrial space",
  "residential-cleaning": "Weekly, bi-weekly, deep cleans and move-out turnover",
  "janitorial-services": "Ongoing custodial contracts with a dedicated crew",
  "office-cleaning": "Professional suites through to multi-floor campuses",
};

/**
 * Related-services index, excluding the page you are already on.
 *
 * One group per service, so the three entries spread across the three columns
 * instead of stacking in the first one.
 */
export function relatedServices(excludeSlug?: string): IndexGroup[] {
  return SERVICES.filter((service) => service.slug !== excludeSlug).map((service) => ({
    items: [
      {
        href: `/services/${service.slug}`,
        label: service.name,
        note: SERVICE_NOTES[service.slug],
      },
    ],
  }));
}

export const MARQUEE_TEXT = `${AREAS.map((a) => a.name.toUpperCase()).join(" · ")} · `;
