export type Review = {
  author: string;
  body: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** ISO date, used for `datePublished` in Review schema. */
  date: string;
  source: "Google";
  /** Only set when the reviewer actually stated a city. Never inferred. */
  city?: string;
};

/**
 * The ONLY source of review text on this site.
 *
 * These two are verified entries from the Google Business Profile. Do not add
 * anything here that has not been read on the live profile: publishing a
 * fabricated review as genuine is a false-advertising problem, not a copy
 * problem. Neither reviewer stated a city, so neither carries one.
 *
 * Adding more verified reviews later is a one-file edit — every review surface
 * on the site renders from this array, so no markup changes.
 */
export const REVIEWS: Review[] = [
  {
    author: "Conor Henschel",
    body: "My carpet had multiple pet stains and everything came out! My apartment hasn't been this clean since I moved in. The crew were fast and efficient. Would definitely use them again.",
    rating: 5,
    date: "2026-03-18",
    source: "Google",
  },
  {
    author: "Jovie Acquiat",
    body: "They always arrive promptly, have a great attitude, and even love my dog! Communication is easy, the job is thorough, and my home smells and looks amazing. Highly recommend.",
    rating: 5,
    date: "2026-01-18",
    source: "Google",
  },
];
