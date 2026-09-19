import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Phone } from "lucide-react";

import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/layout/PageHeader";
import ChecklistSlab from "@/components/ui/ChecklistSlab";
import CtaSlab from "@/components/ui/CtaSlab";
import IndexColumns from "@/components/ui/IndexColumns";
import LedgerRows from "@/components/ui/LedgerRows";
import OffsetCardGrid from "@/components/ui/OffsetCardGrid";
import PortraitAside from "@/components/ui/PortraitAside";
import RuledAccordion from "@/components/ui/RuledAccordion";
import TabDossier from "@/components/ui/TabDossier";

import { CALL_LABEL, SERVICES, TEL_HREF, serviceBySlug } from "@/lib/business";
import { relatedServices } from "@/lib/content";
import { SERVICE_IMAGES } from "@/lib/images";
import { SERVICE_CONTENT } from "@/lib/services-content";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { pageSeo } from "@/lib/seo-content";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  return buildMetadata({ path: `/services/${slug}` });
}

export default async function ServicePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const service = serviceBySlug(slug);
  const content = SERVICE_CONTENT[slug];
  if (!service || !content) notFound();

  const path = `/services/${slug}`;
  const seo = pageSeo(path);

  // Tones alternate down the page; the CTA slab is always the dark anchor.
  const toneFor = (index: number) => (index % 2 === 0 ? ("paper" as const) : ("alt" as const));

  const blocks = content.order.map((key, index) => {
    const tone = toneFor(index);

    if (key === "detail") {
      return (
        <PortraitAside
          key={key}
          tone={tone}
          reverse={content.reverse}
          stamp={content.detailStamp}
          title={content.detail.title}
          body={content.detail.body}
          image={{ ...SERVICE_IMAGES[slug], priority: true }}
        />
      );
    }

    if (key === "included") {
      const block = content.included;
      if (block.kind === "checklist") {
        return (
          <ChecklistSlab
            key={key}
            tone={tone}
            stamp={block.stamp}
            title={block.title}
            items={block.items}
          />
        );
      }
      if (block.kind === "ledger") {
        return (
          <LedgerRows key={key} tone={tone} stamp={block.stamp} title={block.title} rows={block.rows} />
        );
      }
      return (
        <TabDossier key={key} tone={tone} stamp={block.stamp} title={block.title} items={block.items} />
      );
    }

    if (key === "benefits") {
      return (
        <OffsetCardGrid
          key={key}
          tone={tone}
          stamp={content.benefitsStamp}
          title={content.benefitsTitle}
          cards={content.benefits}
          columns={3}
        />
      );
    }

    if (key === "faqs") {
      return (
        <RuledAccordion
          key={key}
          tone={tone}
          stamp={content.faqStamp}
          title={content.faqTitle}
          items={content.faqs}
        />
      );
    }

    if (key === "related") {
      return (
        <IndexColumns
          key={key}
          tone={tone}
          stamp="ALSO AVAILABLE"
          title="Related services"
          groups={relatedServices(slug)}
          columns={3}
        />
      );
    }

    return (
      <CtaSlab
        key={key}
        stamp="GET A QUOTE"
        title={content.ctaTitle}
        body="Free walkthrough, written quote, no obligation."
        primary={{
          href: TEL_HREF,
          label: CALL_LABEL,
          external: true,
          icon: <Phone size={18} aria-hidden="true" />,
        }}
        secondary={{ href: "/contact", label: "Request a Free Estimate" }}
      />
    );
  });

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: service.name, path },
          ]),
          serviceSchema({
            name: service.name,
            description: seo.description,
            path,
            serviceType: content.serviceType,
          }),
          // Mirrors the rendered accordion word for word.
          faqSchema(content.faqs),
        ]}
      />

      <PageHeader stamp={content.stamp} title={content.h1} lede={content.lede} />
      {blocks}
    </>
  );
}
