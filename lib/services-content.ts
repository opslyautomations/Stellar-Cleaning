import {
  CalendarCheck,
  ClipboardCheck,
  Clock,
  Eye,
  Layers,
  Leaf,
  MoonStar,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
} from "lucide-react";
import type { OffsetCard } from "@/components/ui/OffsetCardGrid";
import type { ChecklistItem } from "@/components/ui/ChecklistSlab";
import type { LedgerRow } from "@/components/ui/LedgerRows";
import type { DossierItem } from "@/components/ui/TabDossier";

/**
 * The four service pages share a skeleton but deliberately do not share a
 * layout. The "what's included" block uses a different catalog component on
 * each page, and the janitorial page moves benefits above scope.
 */
export type IncludedBlock =
  | { kind: "checklist"; stamp: string; title: string; items: ChecklistItem[] }
  | { kind: "ledger"; stamp: string; title: string; rows: LedgerRow[] }
  | { kind: "dossier"; stamp: string; title: string; items: DossierItem[] };

export type ServiceContent = {
  stamp: string;
  h1: string;
  lede: string;
  serviceType: string;
  /** Distinct from `stamp`, so the header and the first section do not repeat. */
  detailStamp: string;
  detail: { title: string; body: string[] };
  /** PortraitAside orientation — alternates across the four pages. */
  reverse: boolean;
  included: IncludedBlock;
  benefits: OffsetCard[];
  /** Per-page section furniture, so the four pages do not share headings. */
  benefitsStamp: string;
  benefitsTitle: string;
  faqStamp: string;
  faqTitle: string;
  /** Exactly three, each with a full multi-sentence answer. Mirrored into FAQPage schema. */
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  /** Section order. Janitorial puts benefits before scope. */
  order: ("detail" | "included" | "benefits" | "faqs" | "related" | "cta")[];
};

const DEFAULT_ORDER: ServiceContent["order"] = [
  "detail",
  "included",
  "benefits",
  "faqs",
  "related",
  "cta",
];

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  "commercial-cleaning": {
    stamp: "COMMERCIAL",
    h1: "Commercial cleaning across the Willamette Valley",
    lede: "Professional cleaning for offices, retail spaces and commercial properties throughout the Willamette Valley and Central Oregon. We keep your business looking its best.",
    serviceType: "Commercial cleaning",
    reverse: false,
    detailStamp: "THE CASE",
    detail: {
      title: "A cleaner space means better business",
      body: [
        "First impressions matter. A clean, well-maintained commercial space communicates professionalism and attention to detail to your clients, your customers and your own staff. Stellar Cleaning Solutions provides comprehensive commercial cleaning designed to keep your property spotless — consistently, not occasionally.",
        "We work around your schedule, with after-hours and weekend options so your operations are never disrupted. Our trained crews use commercial-grade equipment and eco-friendly products, and a supervisor inspects the work on a regular cycle rather than waiting for a complaint.",
      ],
    },
    included: {
      kind: "checklist",
      stamp: "SCOPE",
      title: "Spaces we clean",
      items: [
        { title: "Office buildings and corporate spaces" },
        { title: "Retail stores and showrooms" },
        { title: "Medical and dental offices" },
        { title: "Warehouses and industrial facilities" },
        { title: "Restaurants and hospitality venues" },
        { title: "Post-construction cleanup" },
      ],
    },
    benefitsStamp: "WHY IT WORKS",
    benefitsTitle: "What a commercial account gets you",
    faqStamp: "QUESTIONS",
    faqTitle: "Commercial cleaning questions",
    benefits: [
      {
        icon: Clock,
        title: "Cleaned outside your hours",
        body: "Evening and weekend crews mean no vacuum running during a client meeting and no wet floors at 10am.",
      },
      {
        icon: ShieldCheck,
        title: "Insured, background-checked crews",
        body: "Everyone who enters your building has been vetted and trained before their first shift.",
      },
      {
        icon: Eye,
        title: "Supervisor inspections",
        body: "Quality is checked on a schedule, so problems get caught by us rather than reported by you.",
      },
    ],
    faqs: [
      {
        q: "Can you clean after business hours?",
        a: "Yes — most of our commercial accounts are serviced in the evening or on weekends. We set the schedule around your operating hours during the walkthrough, and we can adjust it seasonally if your hours change.",
      },
      {
        q: "Do you supply your own equipment and products?",
        a: "Yes. We bring commercial-grade equipment and eco-friendly cleaning products to every job. If your facility requires specific products or has restrictions — common in medical and food-service spaces — we will use what your compliance requires.",
      },
      {
        q: "How do you handle a problem with a clean?",
        a: "Call or email and it gets addressed, not filed. Every commercial account has a direct contact line, and supervisors re-inspect the area in question rather than passing the note down the chain.",
      },
    ],
    ctaTitle: "Get a commercial cleaning quote",
    order: DEFAULT_ORDER,
  },

  "residential-cleaning": {
    stamp: "RESIDENTIAL",
    h1: "House cleaning that fits your actual life",
    lede: "Thorough, reliable home cleaning for homeowners and renters across the Willamette Valley. Come home to clean — every time.",
    serviceType: "Residential cleaning",
    reverse: true,
    detailStamp: "AT HOME",
    detail: {
      title: "Your home deserves the best",
      body: [
        "Life is busy. Let us handle the cleaning so you can focus on what matters. Our residential service is built around your schedule, whether that is a weekly refresh, a bi-weekly rhythm, or a one-time deep clean before a holiday or a move.",
        "Every team member is background-checked, insured and trained to treat your home with care. We bring our own supplies and equipment, and we customize each clean around your preferences — the rooms that matter most, the products you do or do not want used, and the pets who will absolutely be supervising.",
      ],
    },
    included: {
      kind: "ledger",
      stamp: "INCLUDED",
      title: "What a residential clean covers",
      rows: [
        {
          num: "01",
          title: "Regular house cleaning",
          body: "Weekly, bi-weekly or monthly, on a fixed day so you can plan around it.",
        },
        {
          num: "02",
          title: "Deep and spring cleaning",
          body: "The once-a-year reset — inside appliances, under furniture, the whole thing.",
        },
        {
          num: "03",
          title: "Move-in / move-out cleaning",
          body: "Turnover-grade cleaning for renters, landlords and anyone facing a deposit inspection.",
        },
        {
          num: "04",
          title: "Kitchen and bathroom sanitization",
          body: "The two rooms that decide whether a house feels clean.",
        },
        {
          num: "05",
          title: "Carpet and floor care",
          body: "Vacuuming, mopping and spot treatment appropriate to the surface.",
        },
        {
          num: "06",
          title: "Window and baseboard detailing",
          body: "The parts that get skipped when someone is in a hurry.",
        },
      ],
    },
    benefitsStamp: "PEACE OF MIND",
    benefitsTitle: "What you can count on at home",
    faqStamp: "GOOD TO KNOW",
    faqTitle: "House cleaning questions",
    benefits: [
      {
        icon: UserCheck,
        title: "Vetted people in your home",
        body: "Background-checked and insured, every one of them, before they ever hold a key.",
      },
      {
        icon: Sparkles,
        title: "We bring everything",
        body: "Supplies, equipment, products. You do not need to stock anything.",
      },
      {
        icon: CalendarCheck,
        title: "A schedule you can keep",
        body: "Same day, same crew, so cleaning stops being something you have to think about.",
      },
    ],
    faqs: [
      {
        q: "Do I need to be home during the clean?",
        a: "No. Most of our recurring clients give us access and go about their day. We will agree on entry arrangements during the walkthrough and confirm them in writing before the first visit.",
      },
      {
        q: "What is the difference between a regular clean and a deep clean?",
        a: "A regular clean maintains a home that is already in reasonable shape — surfaces, floors, kitchen, bathrooms. A deep clean resets it: inside appliances, baseboards, window tracks, behind and under furniture. Most clients start with a deep clean and then move onto a regular schedule.",
      },
      {
        q: "Are your products safe around pets and kids?",
        a: "Yes. We use eco-friendly products as standard. If anyone in the home needs something specific avoided, tell us at the walkthrough and we will work around it.",
      },
    ],
    ctaTitle: "Book a free in-home estimate",
    order: DEFAULT_ORDER,
  },

  "janitorial-services": {
    stamp: "JANITORIAL",
    h1: "Custodial maintenance you do not have to manage",
    lede: "Ongoing janitorial service for facilities of every size. Consistent, reliable and professional — every single day.",
    serviceType: "Janitorial service",
    reverse: false,
    detailStamp: "IN PRACTICE",
    detail: {
      title: "Reliable maintenance you can count on",
      body: [
        "A clean facility is not a one-time event; it is an ongoing commitment. Our janitorial service provides scheduled cleaning tailored to the specific needs of your property, from a small office suite to a multi-floor building.",
        "We assign a dedicated crew to your account, so you always know who is in your building. Supervisors conduct regular quality inspections, and you get a direct line for fast resolution instead of a ticket queue.",
      ],
    },
    included: {
      kind: "dossier",
      stamp: "CORE SERVICES",
      title: "What a janitorial contract covers",
      items: [
        {
          label: "Schedules",
          title: "Schedules",
          body: "Daily, nightly or custom cleaning schedules built around your operating hours.",
        },
        {
          label: "Restrooms",
          title: "Restrooms",
          body: "Sanitation and consumable restocking on every visit, logged.",
        },
        {
          label: "Waste",
          title: "Waste",
          body: "Trash removal and recycling management, including sorting requirements.",
        },
        {
          label: "Floor care",
          title: "Floor care",
          body: "Mopping, vacuuming and buffing appropriate to the surface and traffic level.",
        },
        {
          label: "Break rooms",
          title: "Break rooms",
          body: "Kitchen and break-room maintenance, including appliance exteriors and shared surfaces.",
        },
        {
          label: "Common areas",
          title: "Common areas",
          body: "Lobbies, corridors and shared space — the parts of a building visitors actually judge.",
        },
      ],
    },
    benefitsStamp: "THE DIFFERENCE",
    benefitsTitle: "Why these contracts stay put",
    faqStamp: "THE FINE PRINT",
    faqTitle: "Janitorial contract questions",
    benefits: [
      {
        icon: Users,
        title: "A dedicated crew",
        body: "The same people, every visit. Familiarity is what makes a janitorial contract actually work.",
      },
      {
        icon: ClipboardCheck,
        title: "Scheduled inspections",
        body: "Supervisors audit the work on a cycle and document it.",
      },
      {
        icon: PhoneCall,
        title: "A direct line",
        body: "One call reaches someone who can act, not a general inbox.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between janitorial and commercial cleaning?",
        a: "Commercial cleaning is typically scheduled or periodic work on a property. Janitorial is an ongoing custodial contract — a recurring crew, a fixed scope, consumables handled, and supervision built in. Most multi-tenant and high-traffic buildings need janitorial rather than periodic cleaning.",
      },
      {
        q: "Can you service multiple buildings under one account?",
        a: "Yes. We manage multi-property accounts across both regions we serve, with a consistent scope of work and a single point of contact for all sites.",
      },
      {
        q: "What happens if a crew member is out?",
        a: "The account has a trained backup assigned in advance. Coverage does not depend on one person showing up, and we notify you if the crew composition changes.",
      },
    ],
    ctaTitle: "Talk through a janitorial contract",
    // Benefits move above scope on this page, on purpose.
    order: ["detail", "benefits", "included", "faqs", "related", "cta"],
  },

  "office-cleaning": {
    stamp: "OFFICE",
    h1: "Office cleaning programs, small suite to full campus",
    lede: "Keep your office spotless and your team productive. Serving the Willamette Valley and Central Oregon.",
    serviceType: "Office cleaning",
    reverse: true,
    detailStamp: "THE PROGRAM",
    detail: {
      title: "A clean office powers productivity",
      body: [
        "Your team deserves a workspace that is fresh, organized and hygienic. We build customized office cleaning programs — from two-room professional suites to large corporate campuses — designed to keep every surface clean and every employee comfortable.",
        "We handle everything from daily tidying to periodic deep cleans, working after hours or on weekends so operations are never interrupted. Crews use eco-friendly products and commercial-grade equipment.",
      ],
    },
    included: {
      kind: "checklist",
      stamp: "INCLUDED",
      title: "What an office program covers",
      items: [
        { title: "Daily or weekly office cleaning programs" },
        { title: "Break room and kitchen sanitization" },
        { title: "Restroom deep cleaning and restocking" },
        { title: "Carpet vacuuming and floor care" },
        { title: "Trash removal and recycling management" },
        { title: "Window and glass cleaning" },
      ],
    },
    benefitsStamp: "BUILT FOR OFFICES",
    benefitsTitle: "Why offices pick this program",
    faqStamp: "BEFORE YOU ASK",
    faqTitle: "Office cleaning questions",
    benefits: [
      {
        icon: MoonStar,
        title: "After-hours by default",
        body: "Cleaning happens when the office is empty, not around your standups.",
      },
      {
        icon: Layers,
        title: "Scales with your footprint",
        body: "The same program logic works for a six-desk suite and a three-floor building.",
      },
      {
        icon: Leaf,
        title: "Eco-friendly products",
        body: "Lower-irritant products in a space where people spend forty hours a week.",
      },
    ],
    faqs: [
      {
        q: "How often should an office be cleaned?",
        a: "It depends on headcount and foot traffic. A small professional suite is often fine weekly; a busy office with shared kitchens and client traffic usually needs daily or three-times-weekly service. We recommend a frequency at the walkthrough based on what we actually see.",
      },
      {
        q: "Do you clean employee desks and personal items?",
        a: "We clean desk surfaces where they are cleared, and we never move or handle personal belongings, documents or devices. Most offices adopt a clear-desk convention on cleaning nights so surfaces can be wiped properly.",
      },
      {
        q: "Can you work around secure or restricted areas?",
        a: "Yes. Restricted rooms, server closets and confidential areas are handled per your access policy — excluded entirely, or serviced only under escort, whichever you specify in the contract.",
      },
    ],
    ctaTitle: "Get an office cleaning program quote",
    order: DEFAULT_ORDER,
  },
};
