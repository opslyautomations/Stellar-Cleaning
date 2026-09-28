import Link from "next/link";
import { Sparkles } from "lucide-react";

import FooterLedger from "@/components/ui/FooterLedger";
import { AREAS, BUSINESS, MAIL_HREF, SERVICES, TEL_HREF } from "@/lib/business";

export default function Footer() {
  return (
    <FooterLedger
      company={
        <>
          <span className="footer__wordmark">
            <span className="brand-mark" aria-hidden="true">
              <Sparkles size={20} strokeWidth={2.2} />
            </span>
            {BUSINESS.name}
          </span>
          <p className="footer__tagline">
            Professional cleaning for businesses and homeowners across the Willamette Valley and
            Central Oregon.
          </p>
          <dl className="footer__meta" style={{ marginTop: 20 }}>
            <dt>Phone</dt>
            <dd>
              <a href={TEL_HREF}>{BUSINESS.phone}</a>
            </dd>
            <dt>Email</dt>
            <dd>
              <a href={MAIL_HREF}>{BUSINESS.email}</a>
            </dd>
            <dt>Based in</dt>
            <dd>
              {BUSINESS.city}, {BUSINESS.stateFull} {BUSINESS.zip}
            </dd>
            <dt>Hours</dt>
            {BUSINESS.hoursDisplay.map((row) => (
              <dd key={row.label}>
                {row.label}: {row.value}
              </dd>
            ))}
            <dt>Google</dt>
            <dd>
              <a href={BUSINESS.gbpUrl} target="_blank" rel="noopener noreferrer">
                View on Google
              </a>
            </dd>
          </dl>
        </>
      }
      columns={[
        {
          label: "Services",
          links: SERVICES.map((service) => ({
            href: `/services/${service.slug}`,
            label: service.name,
          })),
        },
        {
          label: "Service Areas",
          split: true,
          links: AREAS.map((area) => ({ href: `/areas/${area.slug}`, label: area.name })),
        },
        {
          label: "Company",
          links: [
            { href: "/about", label: "About" },
            { href: "/reviews", label: "Reviews" },
            { href: "/gallery", label: "Gallery" },
            { href: "/specials", label: "Specials" },
            { href: "/contact", label: "Contact" },
          ],
        },
      ]}
      bottomLeft={
        <>
          © {new Date().getFullYear()} {BUSINESS.legalName}. All rights reserved. ·{" "}
          <Link href="/credits">Photo credits</Link>
        </>
      }
      bottomRight={
        <a href={BUSINESS.credit.href} target="_blank" rel="noopener noreferrer">
          {BUSINESS.credit.label}
        </a>
      }
    />
  );
}
