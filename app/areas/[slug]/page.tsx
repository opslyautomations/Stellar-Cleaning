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

import { AREAS, CALL_LABEL, TEL_HREF, areaBySlug } from "@/lib/business";
import { AREA_NOTES, SERVICE_CARDS } from "@/lib/content";
import { AREA_CONTENT } from "@/lib/areas-content";
import { AREA_IMAGES } from "@/lib/images";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { pageSeo } from "@/lib/seo-content";

export function generateStaticParams() {
  return AREAS.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  return buildMetadata({ path: `/areas/${slug}` });
}

export default async function AreaPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const area = areaBySlug(slug);
  const content = AREA_CONTENT[slug];
  if (!area || !content) notFound();

  const path = `/areas/${slug}`;
  const seo = pageSeo(path);
  const index = AREAS.findIndex((a) => a.slug === slug);

  const services = (
    <OffsetCardGrid
      key="services"
      tone={content.layout === "A" ? "paper" : "paper"}
      stamp="AVAILABLE HERE"
      title={`All four services available in ${area.name}`}
      cards={SERVICE_CARDS}
      columns={4}
    />
  );

  const intro = (
    <PortraitAside
      key="intro"
      tone={content.layout === "A" ? "paper" : "alt"}
      reverse={index % 2 === 1}
      // The page header already carries the city name; the intro uses the
      // region so the two stamps on this page are not the same word.
      stamp={area.region.toUpperCase()}
      title={content.introTitle}
      body={content.introBody}
      image={{ ...AREA_IMAGES[slug], priority: true }}
    />
  );

  const why =
    content.layout === "A" ? (
      <LedgerRows
        key="why"
        tone="alt"
        stamp="WHY STELLAR"
        title={`Why ${area.name} chooses Stellar`}
        rows={content.why.map((reason, i) => ({
          num: String(i + 1).padStart(2, "0"),
          title: reason.title,
          body: reason.body,
        }))}
      />
    ) : (
      <ChecklistSlab
        key="why"
        tone="paper"
        stamp="WHY STELLAR"
        title={`Why ${area.name} chooses Stellar`}
        items={content.why.map((reason) => ({ title: reason.title, note: reason.body }))}
      />
    );

  const nearby = (
    <IndexColumns
      key="nearby"
      tone="alt"
      stamp="NEARBY"
      title="Also serving nearby"
      groups={[
        {
          items: content.nearby.map((nearbySlug) => {
            const nearbyArea = areaBySlug(nearbySlug)!;
            return {
              href: `/areas/${nearbySlug}`,
              label: nearbyArea.name,
              note: AREA_NOTES[nearbySlug],
            };
          }),
        },
        {
          items: [
            {
              href: "/services",
              label: "All cleaning services",
              note: "Commercial, residential, janitorial and office",
            },
          ],
        },
      ]}
      columns={2}
      footNote="Full coverage across the Willamette Valley and Central Oregon — ten cities on two scheduled routes."
    />
  );

  const cta = (
    <CtaSlab
      key="cta"
      stamp="NO OBLIGATION"
      title={`Free estimate in ${area.name}`}
      body="We walk the space, scope the work and send a written quote. No fee, no obligation."
      primary={{
        href: TEL_HREF,
        label: CALL_LABEL,
        external: true,
        icon: <Phone size={18} aria-hidden="true" />,
      }}
      secondary={{ href: "/contact", label: "Request a Free Estimate" }}
    />
  );

  const blocks =
    content.layout === "A"
      ? [intro, why, services, nearby, cta]
      : [services, intro, why, nearby, cta];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Service Areas", path: "/areas/corvallis" },
            { name: area.name, path },
          ]),
          serviceSchema({
            name: `Cleaning services in ${area.name}, ${area.region}`,
            description: seo.description,
            path,
            serviceType: "Cleaning service",
            cityName: area.name,
          }),
        ]}
      />

      <PageHeader
        stamp={area.name.toUpperCase()}
        title={`Cleaning services in ${area.name}, Oregon`}
        lede={`Commercial, residential, janitorial and office cleaning across ${area.name} and the wider ${area.region}.`}
      />
      {blocks}
    </>
  );
}
