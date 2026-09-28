"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, Sparkles, X } from "lucide-react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import RuledAccordion from "@/components/ui/RuledAccordion";
import { AREAS, BUSINESS, REGIONS, SERVICES, TEL_HREF, areasByRegion } from "@/lib/business";

type NavItem = {
  label: string;
  href: string;
  dropdown?: "services" | "areas";
};

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", dropdown: "services" },
  { label: "Service Areas", href: "/areas/corvallis", dropdown: "areas" },
  { label: "Reviews", href: "/reviews" },
  { label: "Specials", href: "/specials" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [escaped, setEscaped] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);

  /** On the homepage the estimate CTA scrolls to the hero form instead of navigating. */
  const estimateHref = pathname === "/" ? "#estimate" : "/contact";

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock + focus trap + Escape, for the mobile drawer only.
  useEffect(() => {
    if (!drawerOpen) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        drawerRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((el) => el.offsetParent !== null);

    focusables()[0]?.focus();

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setDrawerOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
    };
  }, [drawerOpen]);

  /**
   * Dropdowns open on hover and focus-within in CSS, so they work with
   * JavaScript off. This only adds the keyboard extras: arrows move between
   * items, Escape closes the open panel and returns focus to its trigger.
   */
  const onNavKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>, key: string) => {
      const item = event.currentTarget as HTMLElement;
      const links = Array.from(item.querySelectorAll<HTMLElement>(".header__droplink"));
      const trigger = item.querySelector<HTMLElement>(".header__link");
      const index = links.indexOf(document.activeElement as HTMLElement);

      if (event.key === "Escape") {
        event.preventDefault();
        setEscaped(key);
        trigger?.focus();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setEscaped(null);
        links[index < 0 ? 0 : Math.min(index + 1, links.length - 1)]?.focus();
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (index <= 0) trigger?.focus();
        else links[index - 1]?.focus();
      }
    },
    []
  );

  const serviceLinks = SERVICES.map((service) => ({
    href: `/services/${service.slug}`,
    label: service.name,
  }));

  return (
    <>
      <header className="header" data-stuck={stuck}>
        <Container>
          <div className="header__bar">
            <Link className="header__wordmark" href="/">
              <span className="brand-mark" aria-hidden="true">
                <Sparkles size={20} strokeWidth={2.2} />
              </span>
              <span className="header__wordmark-text">Stellar Cleaning Solutions</span>
            </Link>

            <nav className="header__nav" aria-label="Main">
              <ul className="header__list">
                {NAV.map((item) => (
                  <li
                    className="header__item"
                    key={item.href}
                    data-closed={escaped === item.label ? "true" : undefined}
                    onMouseEnter={() => setEscaped(null)}
                    onKeyDown={item.dropdown ? (event) => onNavKeyDown(event, item.label) : undefined}
                  >
                    <Link
                      className="header__link"
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.label}
                    </Link>

                    {item.dropdown === "services" ? (
                      <ul className="header__dropdown">
                        {serviceLinks.map((link) => (
                          <li key={link.href}>
                            <Link className="header__droplink" href={link.href}>
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {item.dropdown === "areas" ? (
                      <div className="header__dropdown header__dropdown--wide">
                        {REGIONS.map((region) => (
                          <ul className="header__dropgroup" key={region}>
                            <li>
                              <span className="header__droplabel">{region}</span>
                            </li>
                            {areasByRegion(region).map((area) => (
                              <li key={area.slug}>
                                <Link className="header__droplink" href={`/areas/${area.slug}`}>
                                  {area.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ))}
                      </div>
                    ) : null}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="header__actions">
              <a className="header__phone" href={TEL_HREF}>
                <Phone size={16} aria-hidden="true" />
                <span>{BUSINESS.phone}</span>
              </a>
              <span className="header__cta">
                <Button href={estimateHref} variant="primary" external={estimateHref.startsWith("#")}>
                  Get Free Estimate
                </Button>
              </span>
              <button
                className="header__burger"
                type="button"
                ref={burgerRef}
                aria-expanded={drawerOpen}
                aria-controls="mobile-drawer"
                onClick={() => setDrawerOpen(true)}
              >
                <Menu size={20} aria-hidden="true" />
                <span>Menu</span>
              </button>
            </div>
          </div>
        </Container>
      </header>

      {drawerOpen ? (
        <div
          className="drawer"
          id="mobile-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          // Close on navigation. Handled here rather than in an effect on
          // pathname, which would be a setState cascade on every route change.
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) setDrawerOpen(false);
          }}
        >
          <Container>
            <div className="drawer__top">
              <Link className="header__wordmark" href="/">
                <span className="brand-mark" aria-hidden="true">
                  <Sparkles size={20} strokeWidth={2.2} />
                </span>
                <span className="header__wordmark-text">Stellar Cleaning Solutions</span>
              </Link>
              <button className="header__burger" type="button" onClick={() => setDrawerOpen(false)}>
                <X size={20} aria-hidden="true" />
                <span>Close</span>
              </button>
            </div>

            <div className="drawer__body">
              <Link className="drawer__link" href="/">
                Home
              </Link>
              <Link className="drawer__link" href="/about">
                About
              </Link>

              <RuledAccordion
                compact
                stamp=""
                title=""
                items={[
                  {
                    q: "Services",
                    content: (
                      <div>
                        <Link className="drawer__sublink" href="/services">
                          All services
                        </Link>
                        {serviceLinks.map((link) => (
                          <Link className="drawer__sublink" href={link.href} key={link.href}>
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ),
                  },
                  {
                    q: "Service Areas",
                    content: (
                      <div>
                        {REGIONS.map((region) => (
                          <div key={region}>
                            <span className="header__droplabel">{region}</span>
                            {areasByRegion(region).map((area) => (
                              <Link
                                className="drawer__sublink"
                                href={`/areas/${area.slug}`}
                                key={area.slug}
                              >
                                {area.name}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    ),
                  },
                ]}
              />

              <Link className="drawer__link" href="/reviews">
                Reviews
              </Link>
              <Link className="drawer__link" href="/specials">
                Specials
              </Link>
              <Link className="drawer__link" href="/gallery">
                Gallery
              </Link>
              <Link className="drawer__link" href="/contact">
                Contact
              </Link>

              <div className="drawer__actions">
                <Button href={TEL_HREF} variant="secondary" block icon={<Phone size={18} aria-hidden="true" />}>
                  {BUSINESS.phone}
                </Button>
                <Button href="/contact" variant="primary" block>
                  Get Free Estimate
                </Button>
              </div>
              <p className="t-small" style={{ color: "var(--ink-muted)", marginTop: 22 }}>
                {AREAS.length} cities across the Willamette Valley and Central Oregon.
              </p>
            </div>
          </Container>
        </div>
      ) : null}
    </>
  );
}
