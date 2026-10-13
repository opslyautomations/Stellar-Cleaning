import type { Metadata } from "next";
import { BUSINESS } from "./business";
import { pageSeo } from "./seo-content";

/** `/` -> `/og/home`, `/areas/bend` -> `/og/areas/bend`. */
export function ogPath(path: string): string {
  return path === "/" ? "/og/home" : `/og${path}`;
}

export function absolute(path: string): string {
  return path === "/" ? BUSINESS.domain : `${BUSINESS.domain}${path}`;
}

/**
 * The only place a page's metadata is assembled. Every route calls this;
 * no page writes a raw Metadata object.
 *
 * Title and description default to the registry in `seo-content.ts`, which is
 * what keeps every title unique and inside the length windows.
 */
export function buildMetadata({
  path,
  title,
  description,
  ogImage,
  article,
}: {
  path: string;
  title?: string;
  description?: string;
  ogImage?: string;
  /** Set on blog posts: switches Open Graph to an article with its dates. */
  article?: { publishedTime: string; section: string; tags: string[] };
}): Metadata {
  const seo = pageSeo(path);
  const finalTitle = title ?? seo.title;
  const finalDescription = description ?? seo.description;
  const url = absolute(path);
  const image = ogImage ?? `${BUSINESS.domain}${ogPath(path)}`;
  const imageAlt = `${seo.ogTitle} — ${BUSINESS.name}, ${BUSINESS.city}, ${BUSINESS.state}`;

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: { canonical: url },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url,
      ...(article
        ? {
            type: "article" as const,
            publishedTime: article.publishedTime,
            modifiedTime: article.publishedTime,
            section: article.section,
            tags: article.tags,
            authors: [BUSINESS.legalName],
          }
        : { type: "website" as const }),
      siteName: BUSINESS.name,
      locale: "en_US",
      images: [
        {
          url: image,
          secureUrl: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
