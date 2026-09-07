"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Dana AI — shared scroll-reveal trigger (design.md §6).
 * Mirrors the original styles/scroll-reveal.js: observes every [data-reveal] element on the
 * page once, reveals it on first intersection, then unobserves it ("never animate more than
 * once per element per visit"). Mounted once from the root layout so every page/route gets it
 * without each component re-declaring its own IntersectionObserver.
 *
 * Re-scans on pathname change: the root layout persists across client-side navigation in the
 * App Router, so a plain mount-only effect would only ever see the first page's [data-reveal]
 * elements. Depending on the pathname re-runs the scan whenever a new route's content mounts.
 */
export default function ScrollRevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
