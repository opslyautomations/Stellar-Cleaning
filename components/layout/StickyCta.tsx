"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { BUSINESS, TEL_HREF } from "@/lib/business";

/** Below 768px only; appears after 60vh of scroll. */
export default function StickyCta() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    document.body.dataset.stickyCta = "true";
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky-cta" data-shown={shown} aria-hidden={!shown}>
      <a
        className="sticky-cta__btn"
        href={TEL_HREF}
        tabIndex={shown ? undefined : -1}
        aria-label={`Call ${BUSINESS.phone}`}
      >
        <Phone size={17} aria-hidden="true" />
        <span>Call {BUSINESS.phone}</span>
      </a>
      <Link
        className="sticky-cta__btn sticky-cta__btn--accent"
        href="/contact"
        tabIndex={shown ? undefined : -1}
      >
        Free Estimate
      </Link>
    </div>
  );
}
