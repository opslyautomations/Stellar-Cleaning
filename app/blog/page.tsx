import type { Metadata } from "next";
import { Phone } from "lucide-react";

import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/layout/PageHeader";
import CtaSlab from "@/components/ui/CtaSlab";
import IndexColumns from "@/components/ui/IndexColumns";
import OffsetCardGrid from "@/components/ui/OffsetCardGrid";

import { getPosts } from "@/lib/blog";
import { postCard } from "@/lib/blog-cards";
import { CALL_LABEL, TEL_HREF } from "@/lib/business";
import { blogSchema, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ path: "/blog" });

/** Topic order on the index. A post in any other category lands at the end. */
const CATEGORIES = [
  "Residential",
  "Move-Out & Rentals",
  "Seasonal & Local",
  "Office",
  "Janitorial",
  "Commercial",
];

export default function BlogIndexPage() {
  const posts = getPosts();
  const rank = (category: string) => {
    const index = CATEGORIES.indexOf(category);
    return index < 0 ? CATEGORIES.length : index;
  };
  const sorted = [...posts].sort((a, b) => rank(a.category) - rank(b.category));
  const categories = [...new Set(sorted.map((post) => post.category))];

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Blog", path: "/blog" }])} />
      <JsonLd data={blogSchema(posts)} />

      <PageHeader
        stamp="THE BLOG"
        title="Cleaning guides and straight answers"
        lede="The questions we hear most from homeowners, landlords and facility managers across the Willamette Valley and Central Oregon, answered properly."
      />

      <IndexColumns
        stamp="BY TOPIC"
        title="Browse by topic"
        columns={3}
        groups={categories.map((category) => ({
          label: category,
          items: sorted
            .filter((post) => post.category === category)
            .map((post) => ({ href: `/blog/${post.slug}`, label: post.title })),
        }))}
      />

      <OffsetCardGrid
        tone="alt"
        stamp="ALL GUIDES"
        title={`${posts.length} guides for Oregon homes and businesses`}
        cards={sorted.map(postCard)}
        columns={3}
      />

      <CtaSlab
        stamp="NEXT STEP"
        title="Rather we just handle it?"
        body="Free walkthroughs and written estimates in all ten cities we serve. No fee, no obligation."
        primary={{ href: TEL_HREF, label: CALL_LABEL, external: true, icon: <Phone size={18} aria-hidden="true" /> }}
        secondary={{ href: "/contact", label: "Request a Free Estimate" }}
      />
    </>
  );
}
