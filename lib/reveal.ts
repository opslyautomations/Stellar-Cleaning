/**
 * The entire scroll-motion budget for this site.
 *
 * One IntersectionObserver. Adds `.in` to every element carrying `data-reveal`,
 * fires once per element, then stops observing it. No library, no scroll
 * listener, no timeline.
 *
 * The pre-reveal (hidden) state lives behind BOTH `.js-reveal` on <html> and
 * `prefers-reduced-motion: no-preference`, so with JavaScript off nothing is
 * ever hidden.
 */
export function mountReveal(): () => void {
  if (typeof window === "undefined") return () => {};

  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)")
  );

  if (!("IntersectionObserver" in window)) {
    nodes.forEach((n) => n.classList.add("in"));
    return () => {};
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  nodes.forEach((n) => io.observe(n));
  return () => io.disconnect();
}
