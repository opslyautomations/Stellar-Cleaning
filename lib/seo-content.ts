import { AREAS, BUSINESS, SERVICES } from "./business";

export type PageSeo = {
  /** <title>, held to 55-60 characters. */
  title: string;
  /** <meta name="description">, held to 150-160 characters. */
  description: string;
  /** Headline printed on the generated OG image. */
  ogTitle: string;
  /** Stamp text printed on the generated OG image. */
  ogKicker: string;
  /** Sitemap priority. */
  priority: number;
};

/**
 * Every title and description on this site, in one table.
 *
 * Keeping them together is what makes "no duplicate titles, no duplicate
 * descriptions, all 21 in range" a checkable property rather than a hope.
 * Each area description is written for that city; none is generated.
 */
export const PAGES: Record<string, PageSeo> = {
  "/": {
    title: "Commercial & Residential Cleaning Services | Corvallis OR",
    description: "Commercial, residential, janitorial and office cleaning across the Willamette Valley and Central Oregon. Trained, background-checked crews. Free estimates.",
    ogTitle: "Professional cleaning you can count on",
    ogKicker: "CORVALLIS, OR",
    priority: 1.0,
  },
  "/about": {
    title: "About Us | Stellar Cleaning Solutions, Corvallis Oregon",
    description: "Owner-operated cleaning company based in Corvallis, OR. Background-checked crews, honest quotes and eco-friendly products across the valley and Central Oregon.",
    ogTitle: "The team behind the clean",
    ogKicker: "ABOUT US",
    priority: 0.6,
  },
  "/services": {
    title: "Cleaning Services | Commercial, Residential & Janitorial",
    description: "Commercial cleaning, residential cleaning, janitorial services and office cleaning across the Willamette Valley and Central Oregon. Every quote starts free.",
    ogTitle: "Cleaning services built around your building",
    ogKicker: "OUR SERVICES",
    priority: 0.8,
  },
  "/services/commercial-cleaning": {
    title: "Commercial Cleaning Services in Corvallis & Albany, Oregon",
    description: "Commercial cleaning for offices, retail, medical suites and industrial space across Corvallis, Albany, Salem, Eugene and Bend. After hours. Free estimate.",
    ogTitle: "Commercial cleaning across the Willamette Valley",
    ogKicker: "COMMERCIAL",
    priority: 0.8,
  },
  "/services/residential-cleaning": {
    title: "Residential House Cleaning Services | Corvallis, Oregon",
    description: "House cleaning across the Willamette Valley: weekly, bi-weekly, deep cleans and move-out cleaning. Background-checked, insured crews. Free in-home estimate.",
    ogTitle: "House cleaning that fits your actual life",
    ogKicker: "RESIDENTIAL",
    priority: 0.8,
  },
  "/services/janitorial-services": {
    title: "Janitorial Services & Custodial Cleaning | Corvallis OR",
    description: "Ongoing janitorial and custodial services for facilities across the Willamette Valley and Central Oregon. Dedicated crews, supervisor inspections, free quotes.",
    ogTitle: "Custodial maintenance you do not have to manage",
    ogKicker: "JANITORIAL",
    priority: 0.8,
  },
  "/services/office-cleaning": {
    title: "Office Cleaning Services | Willamette Valley & Central OR",
    description: "Office cleaning programs from small suites to corporate campuses across Corvallis, Albany, Salem, Eugene and Bend. After-hours service, free estimate.",
    ogTitle: "Office cleaning programs, small suite to full campus",
    ogKicker: "OFFICE",
    priority: 0.8,
  },
  "/areas/corvallis": {
    title: "Cleaning Services in Corvallis, Oregon | Stellar Cleaning",
    description: "Commercial, janitorial and house cleaning in Corvallis, OR. Home base for our crews, so scheduling is fastest here. Book a free walkthrough, no obligation.",
    ogTitle: "Cleaning services in Corvallis, Oregon",
    ogKicker: "CORVALLIS",
    priority: 0.8,
  },
  "/areas/albany": {
    title: "Cleaning Services in Albany, Oregon | Commercial & Home",
    description: "Office, industrial and residential cleaning in Albany, OR. Historic-district floor care and evening service from a nearby crew. Free quote on request.",
    ogTitle: "Cleaning services in Albany, Oregon",
    ogKicker: "ALBANY",
    priority: 0.8,
  },
  "/areas/lebanon": {
    title: "Cleaning Services in Lebanon, OR | Janitorial & Home Care",
    description: "Janitorial, commercial and home cleaning in Lebanon, OR. Comfortable with restricted areas, escort rules and documented schedules. Free walkthrough first.",
    ogTitle: "Cleaning services in Lebanon, Oregon",
    ogKicker: "LEBANON",
    priority: 0.8,
  },
  "/areas/philomath": {
    title: "House & Commercial Cleaning in Philomath, Oregon | Stellar",
    description: "House and small-business cleaning in Philomath, OR. Same-day walkthroughs from our Corvallis base and wet-season entryways handled. Free estimate, no fee.",
    ogTitle: "Cleaning services in Philomath, Oregon",
    ogKicker: "PHILOMATH",
    priority: 0.8,
  },
  "/areas/salem": {
    title: "Office & Janitorial Cleaning in Salem, Oregon | Stellar",
    description: "After-hours office, government and clinic cleaning in Salem, OR. Scheduled as its own route rather than a mid-valley add-on. Free estimate, no obligation.",
    ogTitle: "Cleaning services in Salem, Oregon",
    ogKicker: "SALEM",
    priority: 0.8,
  },
  "/areas/eugene": {
    title: "Cleaning Services in Eugene, OR | Commercial & Janitorial",
    description: "Commercial, janitorial and residential cleaning in Eugene, OR. Rental turnover capacity and dedicated service days, not shuffled slots. Free estimate.",
    ogTitle: "Cleaning services in Eugene, Oregon",
    ogKicker: "EUGENE",
    priority: 0.8,
  },
  "/areas/springfield": {
    title: "Cleaning Services in Springfield, Oregon | Free Estimate",
    description: "Industrial, medical and home cleaning in Springfield, OR. Overnight and early-morning crews for facilities that never fully close. Free on-site estimate.",
    ogTitle: "Cleaning services in Springfield, Oregon",
    ogKicker: "SPRINGFIELD",
    priority: 0.8,
  },
  "/areas/bend": {
    title: "Cleaning Services in Bend, Oregon | Hospitality & Homes",
    description: "Hospitality, short-term rental and office cleaning in Bend, OR. Turnaround-driven scheduling and high-desert dust management. Quoted free after a visit.",
    ogTitle: "Cleaning services in Bend, Oregon",
    ogKicker: "BEND",
    priority: 0.8,
  },
  "/areas/prineville": {
    title: "Cleaning Services in Prineville, Oregon | Free Estimate",
    description: "Facility-grade commercial and residential cleaning in Prineville, OR. Scheduled Central Oregon route and straight answers on scope. Free written quote.",
    ogTitle: "Cleaning services in Prineville, Oregon",
    ogKicker: "PRINEVILLE",
    priority: 0.8,
  },
  "/areas/redmond": {
    title: "Cleaning Services in Redmond, Oregon | Post-Construction",
    description: "Commercial, post-construction and house cleaning in Redmond, OR. Construction dust is quoted as the multi-pass job it really is. Free quote, no pressure.",
    ogTitle: "Cleaning services in Redmond, Oregon",
    ogKicker: "REDMOND",
    priority: 0.8,
  },
  "/reviews": {
    title: "Customer Reviews | Stellar Cleaning Solutions, Corvallis",
    description: "Read verified Google reviews for Stellar Cleaning Solutions. 4.7 stars across 53 reviews from clients across the Willamette Valley and Central Oregon.",
    ogTitle: "What our clients say",
    ogKicker: "TRUSTED BY LOCALS",
    priority: 0.6,
  },
  "/specials": {
    title: "Current Specials & Offers | Stellar Cleaning, Corvallis OR",
    description: "Current cleaning offers from Stellar Cleaning Solutions: new client discount, recurring service savings and free estimates across all ten cities we serve.",
    ogTitle: "Current specials",
    ogKicker: "LIMITED OFFERS",
    priority: 0.6,
  },
  "/gallery": {
    title: "Photo Gallery | Stellar Cleaning Solutions, Corvallis OR",
    description: "See the standard. Commercial, office and residential cleaning work by Stellar Cleaning Solutions across the Willamette Valley and across Central Oregon.",
    ogTitle: "See the standard",
    ogKicker: "THE WORK",
    priority: 0.6,
  },
  "/contact": {
    title: "Contact Us | Free Cleaning Estimate in Corvallis, Oregon",
    description: `Request a free cleaning estimate in Corvallis, Albany, Salem, Eugene, Bend and across the Willamette Valley and Central Oregon. No fee. Call ${BUSINESS.phone}.`,
    ogTitle: "Request a free estimate",
    ogKicker: "GET IN TOUCH",
    priority: 0.6,
  },
};

/** All 21 routes, in navigation order. `/design-system` is deliberately absent. */
export const ROUTES: string[] = [
  "/",
  "/about",
  "/services",
  ...SERVICES.map((s) => `/services/${s.slug}`),
  ...AREAS.map((a) => `/areas/${a.slug}`),
  "/reviews",
  "/specials",
  "/gallery",
  "/contact",
];

export function pageSeo(path: string): PageSeo {
  const seo = PAGES[path];
  if (!seo) throw new Error(`No SEO entry registered for ${path}`);
  return seo;
}
