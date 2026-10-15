import type { Metadata, Viewport } from "next";
import Script from "next/script";

import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import StickyCta from "@/components/layout/StickyCta";
import { BUSINESS } from "@/lib/business";
import { localBusinessSchema } from "@/lib/schema";
import { body, display } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.domain),
  title: {
    default: BUSINESS.name,
    template: `%s`,
  },
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.legalName }],
  creator: BUSINESS.legalName,
  publisher: BUSINESS.legalName,
};

export const viewport: Viewport = {
  themeColor: "#55B0E0",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable}`}
    >
      <head>
        {/* Google Tag Manager, verbatim from the container's install dialog.
            First in <head> so it can measure the whole page load. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${BUSINESS.gtmId}');`,
          }}
        />
        {/* Marks that JS is running, so the pre-reveal hidden state may apply.
            Without it nothing on the page is ever hidden. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js-reveal")`,
          }}
        />
        <JsonLd data={localBusinessSchema()} />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${BUSINESS.gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyCta />
        <Reveal />
        {/* Loaded once, globally. Never inside GHLForm — that would load it
            once per form placement. */}
        <Script
          src={`${BUSINESS.formHost}/js/form_embed.js`}
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
