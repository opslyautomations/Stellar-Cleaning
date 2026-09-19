/**
 * The single source of truth for this site.
 *
 * Every page, every schema block and every footer link reads from this file.
 * No phone number, email address, city name or opening hour is written
 * anywhere else in the repo.
 *
 * There is no pricing on this site. No price fields, no "$" figures, no
 * "starting at" copy, no price ranges in schema. Every conversion path ends
 * at a free estimate.
 */
export const BUSINESS = {
  name: "Stellar Cleaning Solutions",
  legalName: "Stellar Cleaning Solutions LLC",
  owner: "Matt",
  phone: "(541) 223-9605",
  phoneRaw: "+15412239605",
  email: "info@stellarcleaningsolutionsllc.com",
  domain: "https://stellarcleaningsolutionsllc.services",
  city: "Corvallis",
  state: "OR",
  stateFull: "Oregon",
  zip: "97330",
  geo: { lat: 44.5646, lng: -123.262 },
  gbpUrl: "https://share.google/IE7zo0lnWvDUinOEL",
  rating: { value: 4.7, count: 53 },
  // Service-based business: no public storefront. Schema uses areaServed,
  // never a street address.
  isServiceArea: true,
  hours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      open: "08:00",
      close: "18:00",
    },
    { days: ["Saturday", "Sunday"], open: "10:00", close: "15:00" },
  ],
  hoursDisplay: [
    { label: "Monday – Friday", value: "8:00 AM – 6:00 PM" },
    { label: "Saturday – Sunday", value: "10:00 AM – 3:00 PM" },
  ],
  formId: "d56VOX7QnarTqGsA9E89",
  formHost: "https://api.opslyautomations.com",
  credit: { label: "Website by Opsly Automations", href: "https://opslyautomations.com" },
} as const;

export const SERVICES = [
  { slug: "commercial-cleaning", name: "Commercial Cleaning" },
  { slug: "residential-cleaning", name: "Residential Cleaning" },
  { slug: "janitorial-services", name: "Janitorial Services" },
  { slug: "office-cleaning", name: "Office Cleaning" },
] as const;

export const AREAS = [
  { slug: "corvallis", name: "Corvallis", region: "Willamette Valley" },
  { slug: "albany", name: "Albany", region: "Willamette Valley" },
  { slug: "lebanon", name: "Lebanon", region: "Willamette Valley" },
  { slug: "philomath", name: "Philomath", region: "Willamette Valley" },
  { slug: "salem", name: "Salem", region: "Willamette Valley" },
  { slug: "eugene", name: "Eugene", region: "Willamette Valley" },
  { slug: "springfield", name: "Springfield", region: "Willamette Valley" },
  { slug: "bend", name: "Bend", region: "Central Oregon" },
  { slug: "prineville", name: "Prineville", region: "Central Oregon" },
  { slug: "redmond", name: "Redmond", region: "Central Oregon" },
] as const;

export type ServiceSlug = (typeof SERVICES)[number]["slug"];
export type AreaSlug = (typeof AREAS)[number]["slug"];
export type Region = (typeof AREAS)[number]["region"];

export const REGIONS: Region[] = ["Willamette Valley", "Central Oregon"];

export function areasByRegion(region: Region) {
  return AREAS.filter((area) => area.region === region);
}

export function areaBySlug(slug: string) {
  return AREAS.find((area) => area.slug === slug);
}

export function serviceBySlug(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}

/** "Corvallis, Albany, Lebanon, Philomath, Salem, Eugene, Springfield, Bend, Prineville and Redmond" */
export function areaSentence(): string {
  const names = AREAS.map((a) => a.name);
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

export const TEL_HREF = `tel:${BUSINESS.phoneRaw}`;
export const MAIL_HREF = `mailto:${BUSINESS.email}`;
export const CALL_LABEL = `Call ${BUSINESS.phone}`;
