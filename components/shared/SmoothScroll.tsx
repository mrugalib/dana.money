"use client";

import { useEffect } from "react";

/**
 * Dana AI — hand-rolled smooth/slow-motion scroll (no Lenis or other scroll library).
 * Intercepts wheel input on desktop/trackpad, scales down the raw delta (slower scroll speed),
 * and eases the page toward that target every frame instead of jumping straight there — the
 * same "glide" feel Lenis gives, without adding a dependency.
 *
 * Skipped entirely (native scroll left untouched) when:
 *   - the user has prefers-reduced-motion set, or
 *   - the pointer is coarse (touch) — mobile already has smooth native momentum scrolling, and
 *     hijacking touch scroll is where these DIY implementations usually go wrong.
 * Also steps aside for wheel events inside any nested scrollable element (e.g. the mobile nav's
 * overflow-y:auto menu) so that content still scrolls normally instead of fighting the page.
 *
 * Click-triggered jumps (hash links like the navbar logo's "/#hero", or any "/#section" link)
 * bypass the wheel handler entirely — they move the page via native scrollIntoView(). If the
 * easing loop above is still gliding toward a stale wheel target when that jump happens, its next
 * animation frame calls window.scrollTo() back toward that stale target, snapping the page right
 * back and making the click look like it did nothing. A capturing click listener cancels any
 * in-flight glide before the click's own navigation runs, so the resulting scroll position sticks.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || isCoarsePointer) return;

    const WHEEL_MULTIPLIER = 0.6; // <1 slows the effective scroll speed per wheel tick
    const EASE = 0.085; // <1, lower = slower/smoother catch-up glide

    let current = window.scrollY;
    let target = window.scrollY;
    let rafId: number | null = null;

    function maxScroll() {
      return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    }

    function isInsideNestedScroller(node: EventTarget | null): boolean {
      let el = node as HTMLElement | null;
      while (el && el !== document.body) {
        const style = window.getComputedStyle(el);
        if (
          (style.overflowY === "auto" || style.overflowY === "scroll") &&
          el.scrollHeight > el.clientHeight
        ) {
          return true;
        }
        el = el.parentElement;
      }
      return false;
    }

    function tick() {
      current += (target - current) * EASE;
      if (Math.abs(target - current) < 0.5) {
        current = target;
        window.scrollTo(0, current);
        rafId = null;
        return;
      }
      window.scrollTo(0, current);
      rafId = requestAnimationFrame(tick);
    }

    function onWheel(e: WheelEvent) {
      if (isInsideNestedScroller(e.target)) return;

      e.preventDefault();
      target = Math.min(maxScroll(), Math.max(0, target + e.deltaY * WHEEL_MULTIPLIER));
      if (rafId === null) rafId = requestAnimationFrame(tick);
    }

    function syncFromNativeScroll() {
      // Keeps target in sync with keyboard/scrollbar/anchor-jump scrolling that didn't go
      // through onWheel, so the next wheel tick continues smoothly from where the page actually is.
      if (rafId === null) {
        current = window.scrollY;
        target = window.scrollY;
      }
    }

    function onResize() {
      target = Math.min(maxScroll(), target);
    }

    function cancelGlide() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", syncFromNativeScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("click", cancelGlide, true);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", syncFromNativeScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("click", cancelGlide, true);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
