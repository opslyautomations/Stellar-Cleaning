import { AREAS, BUSINESS } from "./business";
import { absolute, ogPath } from "./seo";
import type { Review } from "./reviews";

export const BUSINESS_ID = `${BUSINESS.domain}/#business`;

type Json = Record<string, unknown>;

const DAY_URL: Record<string, string> = {
  Monday: "https://schema.org/Monday",
  Tuesday: "https://schema.org/Tuesday",
  Wednesday: "https://schema.org/Wednesday",
  Thursday: "https://schema.org/Thursday",
  Friday: "https://schema.org/Friday",
  Saturday: "https://schema.org/Saturday",
  Sunday: "https://schema.org/Sunday",
};

/**
 * Site-wide LocalBusiness. Emitted once, in the root layout.
 *
 * This is a service-area business with no storefront, so there is no
 * `streetAddress` and coverage is expressed with `areaServed`. `priceRange`
 * is omitted entirely because no pricing is published.
 *
 * `aggregateRating` appears here and nowhere else on the site.
 */
export function localBusinessSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": BUSINESS_ID,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: BUSINESS.domain,
    telephone: BUSINESS.phoneRaw,
    email: BUSINESS.email,
    image: `${BUSINESS.domain}${ogPath("/")}`,
    description:
      "Owner-operated commercial and residential cleaning company based in Corvallis, Oregon, serving ten cities across the Willamette Valley and Central Oregon.",
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.state,
      postalCode: BUSINESS.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    areaServed: AREAS.map((area) => ({
      "@type": "City",
      name: area.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: area.name,
        addressRegion: BUSINESS.state,
        addressCountry: "US",
      },
    })),
    openingHoursSpecification: BUSINESS.hours.map((block) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: block.days.map((day) => DAY_URL[day]),
      opens: block.open,
      closes: block.close,
    })),
    founder: { "@type": "Person", name: BUSINESS.owner },
    employee: { "@type": "Person", name: BUSINESS.owner },
    sameAs: [BUSINESS.gbpUrl],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS.rating.value,
      reviewCount: BUSINESS.rating.count,
      bestRating: 5,
      worstRating: 1,
    },
    knowsLanguage: "en-US",
  };
}

/** Every page except the homepage carries one of these. */
export function breadcrumbSchema(trail: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  };
}

export function serviceSchema({
  name,
  description,
  path,
  serviceType,
  cityName,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  /** Set on an area page to scope the service to that city. */
  cityName?: string;
}): Json {
  const areaServed = cityName
    ? [
        {
          "@type": "City",
          name: cityName,
          address: {
            "@type": "PostalAddress",
            addressLocality: cityName,
            addressRegion: BUSINESS.state,
            addressCountry: "US",
          },
        },
      ]
    : AREAS.map((area) => ({ "@type": "City", name: area.name }));

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: absolute(path),
    provider: { "@id": BUSINESS_ID },
    areaServed,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absolute("/contact"),
      servicePhone: BUSINESS.phoneRaw,
    },
  };
}

/** Built from the FAQs actually rendered on the page, word for word. */
export function faqSchema(items: { q: string; a: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** One Review node per verified review. Never generated, never padded. */
export function reviewSchema(reviews: Review[]): Json[] {
  return reviews.map((review) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@id": BUSINESS_ID },
    author: { "@type": "Person", name: review.author },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: review.body,
    datePublished: review.date,
    publisher: { "@type": "Organization", name: review.source },
  }));
}

export function contactPageSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Stellar Cleaning Solutions",
    url: absolute("/contact"),
    about: { "@id": BUSINESS_ID },
    mainEntity: { "@id": BUSINESS_ID },
  };
}
