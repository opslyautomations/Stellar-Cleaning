import type { Metadata } from "next";

import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";

import { AREAS } from "@/lib/business";
import { CITY_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Photo credits | Stellar Cleaning Solutions",
  robots: { index: false, follow: true },
};

/**
 * Attribution for the Creative Commons city photographs. Linked from the
 * footer and from every coverage grid; kept out of the sitemap.
 */
export default function CreditsPage() {
  return (
    <>
      <PageHeader
        stamp="PHOTO CREDITS"
        title="City photography"
        lede="The city photos on this site come from Wikimedia Commons. Thank you to the photographers who share their work under open licences."
      />

      <section className="sect sect--paper">
        <Container>
          <dl className="details-list">
            {AREAS.map((area) => {
              const { credit } = CITY_IMAGES[area.slug];
              return (
                <div className="details-list__row" key={area.slug}>
                  <dt>{area.name}</dt>
                  <dd>
                    <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer">
                      Photo by {credit.author}
                    </a>
                    <span>
                      {credit.licenseUrl ? (
                        <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer">
                          {credit.license}
                        </a>
                      ) : (
                        credit.license
                      )}
                      , via Wikimedia Commons. Resized for the web.
                    </span>
                  </dd>
                </div>
              );
            })}
          </dl>
        </Container>
      </section>
    </>
  );
}
