import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";

/**
 * Crawlers we explicitly welcome, each as its own Allow block: the AI answer
 * engines and the training/search crawlers that decide whether this business
 * shows up in an assistant's answer at all.
 */
const AI_AND_SEARCH_AGENTS = [
  "GPTBot",
  "ClaudeBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "CCBot",
  "meta-externalagent",
  "FacebookBot",
  "LinkedInBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Never `Disallow: /`, and never block /_next/static.
        disallow: ["/api/", "/admin/", "/private/", "/design-system"],
      },
      ...AI_AND_SEARCH_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/", "/design-system"],
      })),
    ],
    sitemap: `${BUSINESS.domain}/sitemap.xml`,
    host: BUSINESS.domain,
  };
}
