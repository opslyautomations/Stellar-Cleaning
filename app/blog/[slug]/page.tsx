import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Phone } from "lucide-react";

import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/layout/PageHeader";
import ArticleBody from "@/components/ui/ArticleBody";
import Button from "@/components/ui/Button";
import CtaSlab from "@/components/ui/CtaSlab";
import OffsetCardGrid from "@/components/ui/OffsetCardGrid";
import RuledAccordion from "@/components/ui/RuledAccordion";

import { getPost, getPosts, relatedPosts } from "@/lib/blog";
import { postCard } from "@/lib/blog-cards";
import { BUSINESS, CALL_LABEL, TEL_HREF, areaBySlug } from "@/lib/business";
import { blogPostingSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    path: `/blog/${slug}`,
    article: { publishedTime: post.date, section: post.category, tags: [post.keyword] },
  });
}

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const cities = post.areas.map((area) => areaBySlug(area)?.name).filter(Boolean);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <JsonLd data={blogPostingSchema(post)} />
      {post.faqs.length > 0 ? <JsonLd data={faqSchema(post.faqs)} /> : null}

      <PageHeader stamp={post.category.toUpperCase()} title={post.title} lede={post.excerpt} />

      <ArticleBody
        blocks={post.body}
        meta={[
          <time dateTime={post.date} key="date">
            {DATE_FORMAT.format(new Date(post.date))}
          </time>,
          `${post.readMinutes} min read`,
          ...(cities.length > 0 ? [cities.join(", ")] : []),
        ]}
        aside={
          <div className="article__cta tone--deep">
            <p className="article__cta-title">Want a professional on it?</p>
            <p>
              {BUSINESS.name} covers ten cities across the Willamette Valley and Central Oregon.
              Estimates are free and follow a walkthrough.
            </p>
            <Button href="/contact" variant="primary" block>
              Get Free Estimate
            </Button>
            <Button href={TEL_HREF} variant="secondary" block external icon={<Phone size={16} aria-hidden="true" />}>
              {BUSINESS.phone}
            </Button>
          </div>
        }
      />

      {post.faqs.length > 0 ? (
        <RuledAccordion
          tone="alt"
          stamp="FAQ"
          title="Frequently asked questions"
          items={post.faqs}
        />
      ) : null}

      <OffsetCardGrid
        stamp="KEEP READING"
        title="Related guides"
        cards={relatedPosts(post).map(postCard)}
        columns={3}
      />

      <CtaSlab
        stamp="FREE ESTIMATE"
        title="Let's talk about your space"
        body="We walk it, scope it and send a written quote. No fee, no obligation."
        primary={{ href: TEL_HREF, label: CALL_LABEL, external: true, icon: <Phone size={18} aria-hidden="true" /> }}
        secondary={{ href: "/contact", label: "Request a Free Estimate" }}
      />
    </>
  );
}
