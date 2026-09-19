/**
 * Stock photography, with alt text written against what each photograph
 * actually shows.
 *
 * These are Unsplash images, not Stellar's own job photography. Nothing on the
 * site captions them as a specific Stellar job or a specific client property.
 * When real job photos are supplied they replace these and the captions can
 * become specific.
 */
export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const RATIOS = {
  landscape: { width: 960, height: 720 }, // 4:3
  square: { width: 800, height: 800 }, // 1:1
  portrait: { width: 720, height: 960 }, // 3:4
} as const;

function unsplash(id: string, ratio: keyof typeof RATIOS): Omit<SiteImage, "alt"> {
  const { width, height } = RATIOS[ratio];
  return {
    src: `https://images.unsplash.com/${id}?w=${width}&h=${height}&fit=crop&q=75`,
    width,
    height,
  };
}

export const HOME_PORTRAIT: SiteImage = {
  ...unsplash("photo-1581578731548-c64695cc6952", "landscape"),
  alt: "A cleaner in gloves and a protective mask wiping down interior window shutters.",
};

export const ABOUT_BUSINESS: SiteImage = {
  ...unsplash("photo-1527515637462-cff94eecc1ac", "landscape"),
  alt: "A vacuum head lifting scattered confetti from a carpet during a post-event clean.",
};

export const ABOUT_OWNER: SiteImage = {
  ...unsplash("photo-1628177142898-93e36e4e3a50", "landscape"),
  alt: "A gloved hand holding a spray bottle above a wooden surface before wiping it down.",
};

export const SERVICES_INDEX: SiteImage = {
  ...unsplash("photo-1524758631624-e2822e304c36", "landscape"),
  alt: "A bright office lounge with armchairs, a low table and tall windows.",
};

export const SERVICE_IMAGES: Record<string, SiteImage> = {
  "commercial-cleaning": {
    ...unsplash("photo-1497366811353-6870744d04b2", "landscape"),
    alt: "An open-plan commercial office with polished concrete floors and a long meeting table.",
  },
  "residential-cleaning": {
    ...unsplash("photo-1618221195710-dd6b41faaea6", "landscape"),
    alt: "A tidy living room with a neutral sofa, a side table and a floor lamp.",
  },
  "janitorial-services": {
    ...unsplash("photo-1497366754035-f200968a6e72", "landscape"),
    alt: "A corridor of glass-walled offices with a clear, uncluttered floor.",
  },
  "office-cleaning": {
    ...unsplash("photo-1517502884422-41eaead166d4", "landscape"),
    alt: "A conference room with a long table and a wall of windows overlooking a city.",
  },
};

export const AREA_IMAGES: Record<string, SiteImage> = {
  corvallis: {
    ...unsplash("photo-1522708323590-d24dbb6b0267", "landscape"),
    alt: "A bright apartment living and dining area with afternoon light across the floor.",
  },
  albany: {
    ...unsplash("photo-1584622781564-1d987f7333c1", "landscape"),
    alt: "A living room with original wood flooring, a fireplace and neutral furnishings.",
  },
  lebanon: {
    ...unsplash("photo-1533090161767-e6ffed986c88", "landscape"),
    alt: "A spare white interior wall with a wall clock, a small plant and a desk lamp.",
  },
  philomath: {
    ...unsplash("photo-1600566753086-00f18fb6b3ea", "landscape"),
    alt: "A family living room with a staircase behind it and a dog resting on the rug.",
  },
  salem: {
    ...unsplash("photo-1571624436279-b272aff752b5", "landscape"),
    alt: "A meeting room with leather chairs around a long table in a professional office.",
  },
  eugene: {
    ...unsplash("photo-1568992687947-868a62a9f521", "landscape"),
    alt: "People working at a long shared table in a mixed-use commercial space.",
  },
  springfield: {
    ...unsplash("photo-1607472586893-edb57bdc0e39", "landscape"),
    alt: "Industrial pipework and valves running along a brick wall inside a facility.",
  },
  bend: {
    ...unsplash("photo-1590490360182-c33d57733427", "landscape"),
    alt: "A made-up guest bedroom with layered bedding and lamps on both bedside tables.",
  },
  prineville: {
    ...unsplash("photo-1554995207-c18c203602cb", "landscape"),
    alt: "An open-plan living space with a leather sofa and a painted accent wall.",
  },
  redmond: {
    ...unsplash("photo-1613545325278-f24b0cae1224", "landscape"),
    alt: "A newly finished double-height living area with large windows and pale floors.",
  },
};

export type GalleryImage = SiteImage & { span: 2 | 3 | 4 };

/** Twelve images at genuinely mixed aspect ratios across a six-column grid. */
export const GALLERY: GalleryImage[] = [
  {
    ...unsplash("photo-1584622650111-993a426fbf0a", "landscape"),
    alt: "A modern bathroom with a glass shower enclosure and a cleared vanity.",
    span: 3,
  },
  {
    ...unsplash("photo-1556911220-bff31c812dba", "landscape"),
    alt: "A residential kitchen with clear counters and a cooktop.",
    span: 3,
  },
  {
    ...unsplash("photo-1556740738-b6a63e27c4df", "square"),
    alt: "A retail counter with a point-of-sale terminal and a clear work surface.",
    span: 2,
  },
  {
    ...unsplash("photo-1507089947368-19c1da9775ae", "square"),
    alt: "A bright kitchen island with bar stools and an empty countertop.",
    span: 2,
  },
  {
    ...unsplash("photo-1556909212-d5b604d0c90d", "portrait"),
    alt: "A white kitchen with open shelving and a cleared cooktop.",
    span: 2,
  },
  {
    ...unsplash("photo-1600607687939-ce8a6c25118c", "landscape"),
    alt: "An open-plan living room with a sofa, a low table and wood panelling.",
    span: 4,
  },
  {
    ...unsplash("photo-1604709177225-055f99402ea3", "portrait"),
    alt: "A stone-tiled bathroom with a freestanding tub and a wall-mounted basin.",
    span: 2,
  },
  {
    ...unsplash("photo-1615529182904-14819c35db37", "portrait"),
    alt: "A living room with houseplants, rattan pendant shades and a low sofa.",
    span: 2,
  },
  {
    ...unsplash("photo-1541123437800-1bb1317badc2", "landscape"),
    alt: "A white kitchen with a central island and pendant lighting above it.",
    span: 4,
  },
  {
    ...unsplash("photo-1560185127-6ed189bf02f4", "square"),
    alt: "A living room with a sectional sofa and a coffee table under a vaulted ceiling.",
    span: 2,
  },
  {
    ...unsplash("photo-1560448204-e02f11c3d0e2", "portrait"),
    alt: "A light-filled sitting room with armchairs and tall windows.",
    span: 2,
  },
  {
    ...unsplash("photo-1519710164239-da123dc03ef4", "square"),
    alt: "A minimal white room with a small table, a chair and two potted plants.",
    span: 2,
  },
];
