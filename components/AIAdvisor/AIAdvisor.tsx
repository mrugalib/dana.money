"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./AIAdvisor.css";

/**
 * Dana AI — AI Financial Advisor feature block (design.md §8 site map item 5, layout §5.7).
 * Ported from legacy-static-site/components/ai-advisor/{ai-advisor.html,.css,.js}.
 *
 * Two motion modes, switched by viewport width + prefers-reduced-motion (design.md §9):
 *   - Desktop (>810px), motion allowed: pinned scroll-scrub — the section locks in the viewport
 *     and the 4 screens advance one by one as scroll position moves through a tall track.
 *   - Mobile, or prefers-reduced-motion: simple auto-cycling cross-fade (no pin/scroll hijack).
 * Manual dot controls work identically in both modes. Same rAF-throttled-scroll-listener pattern
 * as Navbar's scroll-glass logic, same DESKTOP_BREAKPOINT (810) as the CSS layout breakpoint.
 */

const SCREENS = [
  {
    src: "/assets/Picture1.webp",
    alt: "Dana chat screen: 'Hello! I'm Dana' with quick-start options for cashflow score, loans, and credit cards",
    title: "AI Financial Advisor",
    subhead: "Chat with Dana to understand your finances and unlock smarter, faster money moves.",
  },
  {
    src: "/assets/Picture2.webp",
    alt: "Matched relationship-officer profiles with ratings and a connect option",
    title: "Smart Matchmaking",
    subhead: "Dana connects users with the right loans, products, and sales officers instantly.",
  },
  {
    src: "/assets/Picture3.webp",
    alt: "In-app financial videos and blog articles feed",
    title: "Learn & Earn",
    subhead: "Watch bite-sized videos, read blogs, and soon earn rewards for building money skills.",
  },
  {
    src: "/assets/Picture4.webp",
    alt: "Community forum with financial-advice discussions",
    title: "Community Insights",
    subhead: "Ask questions, share experiences, and learn from real financial conversations.",
  },
];

const AUTO_INTERVAL_MS = 3500;
const DESKTOP_BREAKPOINT = 810;

export default function AIAdvisor() {
  const [current, setCurrent] = useState(0);
  const [isScrubEnabled, setIsScrubEnabled] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const scrubActiveRef = useRef(false);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrubTickingRef = useRef(false);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  function show(index: number) {
    const clamped = Math.min(SCREENS.length - 1, Math.max(0, index));
    currentRef.current = clamped;
    setCurrent(clamped);
  }

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const phone = phoneRef.current;
    if (!track || !stage || !phone) return;

    let intersectionObserver: IntersectionObserver | null = null;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    function prefersReducedMotion() {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function isDesktopWidth() {
      return window.innerWidth > DESKTOP_BREAKPOINT;
    }

    function startAutoAdvance() {
      if (autoTimerRef.current || prefersReducedMotion()) return;
      autoTimerRef.current = setInterval(() => {
        show((currentRef.current + 1) % SCREENS.length);
      }, AUTO_INTERVAL_MS);
    }

    function stopAutoAdvance() {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    }

    function observeForAutoStart() {
      if (intersectionObserver) return;
      if (!("IntersectionObserver" in window)) {
        startAutoAdvance();
        return;
      }
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startAutoAdvance();
              intersectionObserver?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      intersectionObserver.observe(phone!);
    }

    function updateScrub() {
      const scrollable = track!.offsetHeight - stage!.offsetHeight;
      const rect = track!.getBoundingClientRect();
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      const index = Math.min(SCREENS.length - 1, Math.floor(progress * SCREENS.length));
      if (index !== currentRef.current) show(index);
      scrubTickingRef.current = false;
    }

    function onScroll() {
      if (!scrubTickingRef.current) {
        window.requestAnimationFrame(updateScrub);
        scrubTickingRef.current = true;
      }
    }

    function enableScrub() {
      if (scrubActiveRef.current) return;
      scrubActiveRef.current = true;
      setIsScrubEnabled(true);
      window.addEventListener("scroll", onScroll, { passive: true });
      updateScrub();
    }

    function disableScrub() {
      if (!scrubActiveRef.current) return;
      scrubActiveRef.current = false;
      setIsScrubEnabled(false);
      window.removeEventListener("scroll", onScroll);
    }

    function applyMode() {
      if (isDesktopWidth() && !prefersReducedMotion()) {
        stopAutoAdvance();
        enableScrub();
      } else {
        disableScrub();
        show(0);
        observeForAutoStart();
      }
    }

    function handleMouseEnter() {
      stopAutoAdvance();
    }
    function handleMouseLeave() {
      if (!scrubActiveRef.current) startAutoAdvance();
    }
    function handleResize() {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applyMode, 200);
    }

    phone.addEventListener("mouseenter", handleMouseEnter);
    phone.addEventListener("mouseleave", handleMouseLeave);
    phone.addEventListener("focusin", handleMouseEnter);
    phone.addEventListener("focusout", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    applyMode();

    return () => {
      stopAutoAdvance();
      // Reset (not just remove-listener): React 18 StrictMode double-invokes this effect once in
      // dev, and without resetting the ref, the second mount's enableScrub() would see
      // scrubActiveRef.current still true from the first mount and bail out before ever
      // re-attaching the scroll listener — leaving the scroll-scrub permanently inert in dev.
      scrubActiveRef.current = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      phone.removeEventListener("mouseenter", handleMouseEnter);
      phone.removeEventListener("mouseleave", handleMouseLeave);
      phone.removeEventListener("focusin", handleMouseEnter);
      phone.removeEventListener("focusout", handleMouseLeave);
      if (resizeTimer) clearTimeout(resizeTimer);
      intersectionObserver?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDotClick(index: number) {
    show(index);
    if (!scrubActiveRef.current) {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
      autoTimerRef.current = setInterval(() => {
        show((currentRef.current + 1) % SCREENS.length);
      }, AUTO_INTERVAL_MS);
    }
  }

  return (
    <section className="ai-advisor" id="ai-advisor" aria-label="AI Financial Advisor">
      <div className={`ai-advisor__track${isScrubEnabled ? " is-scrub-enabled" : ""}`} ref={trackRef}>
        <div className="ai-advisor__stage" ref={stageRef} data-reveal>
          <div className="ai-advisor__container">
            <div className="ai-advisor__visual">
              <div className="ai-advisor__phone" ref={phoneRef}>
                <div className="ai-advisor__notch" aria-hidden="true"></div>
                {SCREENS.map((screen, i) => (
                  <Image
                    key={screen.src}
                    className={`ai-advisor__screenshot${i === current ? " is-active" : ""}`}
                    src={screen.src}
                    alt={screen.alt}
                    aria-hidden={i === current ? undefined : true}
                    fill
                    sizes="280px"
                  />
                ))}
              </div>
              <div className="ai-advisor__dots" role="tablist" aria-label="AI Advisor screen preview">
                {SCREENS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`ai-advisor__dot${i === current ? " is-active" : ""}`}
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`Show screen ${i + 1} of ${SCREENS.length}`}
                    onClick={() => handleDotClick(i)}
                  />
                ))}
              </div>
            </div>

            <div className="ai-advisor__content">
              <span className="pill-badge">
                <span className="pill-badge__dot" aria-hidden="true"></span>
                Meet Dana
              </span>
              <div className="ai-advisor__content-text" key={current}>
                <h2 className="ai-advisor__headline">{SCREENS[current].title}</h2>
                <p className="ai-advisor__subhead">{SCREENS[current].subhead}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
