import type { OffsetCard } from "@/components/ui/OffsetCardGrid";
import type { Post } from "./blog";
import { CITY_IMAGES, SERVICE_IMAGES, type SiteImage } from "./images";

/**
 * A post's card photo: the first city it is about, otherwise its first
 * service. No new photography — every image is one the site already uses
 * and already credits.
 */
export function postImage(post: Post): SiteImage {
  const city = post.areas[0] ? CITY_IMAGES[post.areas[0]] : undefined;
  if (city) return { src: city.src, alt: city.alt, width: city.width, height: city.height };
  return SERVICE_IMAGES[post.services[0] ?? "residential-cleaning"];
}

export function postCard(post: Post): OffsetCard {
  return {
    title: post.title,
    body: post.excerpt,
    href: `/blog/${post.slug}`,
    linkLabel: "Read the guide →",
    image: postImage(post),
  };
}
