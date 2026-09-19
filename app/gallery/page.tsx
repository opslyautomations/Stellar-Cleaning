import type { Metadata } from "next";
import { Phone } from "lucide-react";

import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/layout/PageHeader";
import CtaSlab from "@/components/ui/CtaSlab";
import FramedGallery from "@/components/ui/FramedGallery";
import LedgerRows from "@/components/ui/LedgerRows";

import { CALL_LABEL, TEL_HREF } from "@/lib/business";
import { GALLERY } from "@/lib/images";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ path: "/gallery" });

/**
 * These are stock photographs, so nothing here is captioned as a Stellar job
 * or a client property. They show the standard the work is held to.
 */
const CAPTION_ROWS = [
  {
    num: "01",
    title: "Representative of the standard",
    body: "These are reference images of the finish we work to, not photographs of specific Stellar jobs or client properties.",
  },
  {
    num: "02",
    title: "Commercial, office and residential",
    body: "The same checklist applies to a retail floor, a professional suite and a family kitchen.",
  },
  {
    num: "03",
    title: "Ten cities across two regions",
    body: "Willamette Valley and Central Oregon, on two scheduled routes.",
  },
];

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Gallery", path: "/gallery" }])} />

      <PageHeader stamp="THE WORK" title="See the standard" />

      <FramedGallery
        stamp="EVERY ROOM"
        title="Kitchens, bathrooms, offices and floors"
        images={GALLERY}
        priorityIndex={0}
      />

      <LedgerRows
        tone="alt"
        stamp="ABOUT THESE IMAGES"
        title="What you are looking at"
        rows={CAPTION_ROWS}
      />

      <CtaSlab
        stamp="YOUR TURN"
        title="Want your space on this list?"
        body="Free walkthrough, written quote, no obligation."
        primary={{ href: TEL_HREF, label: CALL_LABEL, external: true, icon: <Phone size={18} aria-hidden="true" /> }}
        secondary={{ href: "/contact", label: "Request a Free Estimate" }}
      />
    </>
  );
}
