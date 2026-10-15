"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Tells GA4 and GTM a quote request just came in. Rendered only on /thank-you, which
 * the GHL form redirects to on submit.
 *
 * Fires once per browser session, so a refresh or a back-button return does
 * not count the same lead twice.
 */
export default function LeadEvent() {
  useEffect(() => {
    const key = "stellar-lead-sent";
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Storage blocked: still send the event rather than lose the lead.
    }
    const formName = "Cleaning Request Form";
    // GA4 directly, through the gtag snippet in the root layout.
    window.gtag?.("event", "generate_lead", { form_name: formName });
    // GTM, for any other tags (e.g. Google Ads) that trigger on the lead.
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event: "generate_lead", form_name: formName });
  }, []);

  return null;
}
