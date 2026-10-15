import type { Metadata } from "next";
import { Phone } from "lucide-react";

import LeadEvent from "@/components/LeadEvent";
import PageHeader from "@/components/layout/PageHeader";
import CtaSlab from "@/components/ui/CtaSlab";
import NumberedProcess from "@/components/ui/NumberedProcess";
import OffsetCardGrid from "@/components/ui/OffsetCardGrid";

import { BUSINESS, CALL_LABEL, TEL_HREF } from "@/lib/business";
import { NEXT_STEPS } from "@/lib/content";
import { getPost } from "@/lib/blog";
import { postCard } from "@/lib/blog-cards";

export const metadata: Metadata = {
  title: "Thank you | Stellar Cleaning Solutions",
  robots: { index: false, follow: true },
};

/** One residential, one move-out and one commercial guide, as on the homepage. */
const FEATURED_POSTS = [
  "deep-cleaning-vs-regular-house-cleaning",
  "move-out-cleaning-checklist-oregon",
  "how-often-should-an-office-be-cleaned",
];

/**
 * Where the GHL form sends people after they submit. Kept out of the sitemap
 * and noindexed: a visit here should only ever mean a real submission, which
 * is what makes it usable as the conversion signal in GTM.
 */
export default function ThankYouPage() {
  return (
    <>
      <LeadEvent />

      <PageHeader
        stamp="REQUEST RECEIVED"
        title="Thank you, your request is in"
        lede={`${BUSINESS.owner} or someone from the team will be in touch soon to set up a free walkthrough.`}
      />

      <NumberedProcess
        stamp="WHAT HAPPENS NEXT"
        title="Three steps, no obligation"
        steps={NEXT_STEPS}
      />

      <OffsetCardGrid
        tone="alt"
        stamp="WHILE YOU WAIT"
        title="Answers to the questions we hear most"
        cards={FEATURED_POSTS.flatMap((slug) => {
          const post = getPost(slug);
          return post ? [postCard(post)] : [];
        })}
        columns={3}
      />

      <CtaSlab
        stamp="NEED IT SOONER"
        title="In a hurry?"
        body={`Call ${BUSINESS.phone} during business hours and we can set up the walkthrough on the phone.`}
        primary={{ href: TEL_HREF, label: CALL_LABEL, external: true, icon: <Phone size={18} aria-hidden="true" /> }}
        secondary={{ href: "/", label: "Back to the homepage" }}
      />
    </>
  );
}
