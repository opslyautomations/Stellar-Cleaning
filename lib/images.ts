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

export type PhotoCredit = {
  author: string;
  license: string;
  /** Null for public-domain images. */
  licenseUrl: string | null;
  sourceUrl: string;
};

export type CityImage = SiteImage & { credit: PhotoCredit };

/**
 * Real photographs of each city, taken from Wikimedia Commons (the lead image
 * of each city's Wikipedia article, except Eugene, where a skyline replaced a
 * football-game photo). Nine are Creative Commons licensed and require
 * attribution; every one is credited on /credits and under its photo on the
 * area page. Stored locally at 1280px so next/image can optimise them.
 */
export const CITY_IMAGES: Record<string, CityImage> = {
  corvallis: {
    src: "/images/cities/corvallis.jpg",
    width: 1280,
    height: 853,
    alt: "The white Benton County Courthouse and its clock tower in downtown Corvallis under a clear blue sky.",
    credit: {
      author: "Gregkeene",
      license: "CC BY 3.0 US",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0/us/deed.en",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Benton_County_Courthouse_Greg_Keene.jpg",
    },
  },
  albany: {
    src: "/images/cities/albany.jpg",
    width: 1280,
    height: 714,
    alt: "First Avenue in downtown Albany, looking west past historic brick storefronts on a summer day.",
    credit: {
      author: "Edfallere",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Albany,_Oregon_looking_west_down_1st_Ave_SW_in_the_summer_of_2014.jpg",
    },
  },
  lebanon: {
    src: "/images/cities/lebanon.jpg",
    width: 1280,
    height: 782,
    alt: "The restored yellow Southern Pacific railroad depot in Lebanon.",
    credit: {
      author: "46percent",
      license: "Public domain",
      licenseUrl: null,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Lebanon_Southern_Pacific_Railroad_Depot.jpg",
    },
  },
  philomath: {
    src: "/images/cities/philomath.jpg",
    width: 1280,
    height: 850,
    alt: "The red-brick Benton County Historical Museum in Philomath, with its white cupola.",
    credit: {
      author: "Finetooth",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Benton_County_Historical_Museum.jpg",
    },
  },
  salem: {
    src: "/images/cities/salem.jpg",
    width: 1280,
    height: 834,
    alt: "Downtown Salem seen from the top of the Oregon State Capitol, with tree-lined streets and hills beyond.",
    credit: {
      author: "M.O. Stevens",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Salem_Oregon_downtown.JPG",
    },
  },
  eugene: {
    src: "/images/cities/eugene.jpg",
    width: 1280,
    height: 934,
    alt: "The downtown Eugene skyline with Spencer Butte behind it, seen from Skinner Butte.",
    credit: {
      author: "Jsayre64",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Eugene_skyline.jpg",
    },
  },
  springfield: {
    src: "/images/cities/springfield.jpg",
    width: 1280,
    height: 719,
    alt: "Main Street in downtown Springfield, lined with trees and historic storefronts.",
    credit: {
      author: "AnthonyTheGuy",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Main_Street,_Downtown_Springfield,_Oregon,_22_September_2026.jpg",
    },
  },
  bend: {
    src: "/images/cities/bend.jpg",
    width: 1280,
    height: 960,
    alt: "A downtown Bend street with the Tower Theatre sign, hanging flower baskets and a bronze bench statue.",
    credit: {
      author: "David Wilson",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:20210803_03_Bend,_Oregon.jpg",
    },
  },
  prineville: {
    src: "/images/cities/prineville.jpg",
    width: 1280,
    height: 850,
    alt: "Downtown Prineville from the Ochoco State Scenic Viewpoint, with the county courthouse at its centre.",
    credit: {
      author: "SounderBruce",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Prineville,_OR_from_Ochoco_State_Scenic_Viewpoint,_April_2025.jpg",
    },
  },
  redmond: {
    src: "/images/cities/redmond.jpg",
    width: 1280,
    height: 960,
    alt: "Business Highway 97 through downtown Redmond, passing under the city's decorative welcome arch.",
    credit: {
      author: "Doug Kerr",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Redmond,_Oregon,_Business_Hwy_97.jpg",
    },
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
