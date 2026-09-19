import type { MetadataRoute } from "next";
import { absolute } from "@/lib/seo";
import { PAGES, ROUTES } from "@/lib/seo-content";

/**
 * Generated from the same route registry the nav reads, so it cannot drift.
 * 21 URLs. `/design-system` is not in ROUTES and so can never appear here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((path) => ({
    url: absolute(path),
    lastModified,
    changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: PAGES[path].priority,
  }));
}
