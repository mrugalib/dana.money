"use client";

import { useEffect, useRef, useState } from "react";
import "./Testimonials.css";

/**
 * Dana AI — Testimonial Carousel (design.md §8 site map item 11; component spec §5.10).
 * Ported from legacy-static-site/components/testimonials/{testimonials.html,testimonials.css,testimonials.js}.
 *
 * FLAG (carried over verbatim): no real public customer testimonials exist on the live site. Both
 * slides use bracketed placeholder text, unfilled stars, and a visible "Sample content" tag — none
 * of that is softened or filled in with plausible-looking fake content. Replace both slides with
 * real customer testimonials (and remove the sample tag) before launch.
 *
 * Carousel behavior (auto-advance every 6s, pause on hover/focus, manual dots, starts once
 * scrolled into view, respects prefers-reduced-motion by disabling only the automatic advance)
 * is a direct port of testimonials.js's IntersectionObserver + setInterval logic into React state.
 * This session's breakpoint audit enlarged the dot tap targets to 32x32px around an unchanged 8px
 * visual dot (via ::after in Testimonials.css) — preserved unchanged here.
 */
const SLIDES = [
  {
    quote:
      "[Sample testimonial quote will go here — replace with a real customer quote before launch.]",
    name: "[Customer Name]",
    role: "[Role / City]",
  },
  {
    quote: "[Second sample testimonial — swap in real customer feedback before this ships.]",
    name: "[Customer Name]",
    role: "[Role / City]",
  },
] as const;

const AUTO_INTERVAL_MS = 6000;

function StarIcon() {
  return (
    <svg className="testimonials__star" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 2l2.35 5.1 5.65.6-4.2 3.8 1.2 5.5L10 14.9l-5 3.1 1.2-5.5-4.2-3.8 5.65-.6L10 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  function show(index: number) {
    setCurrent(((index % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }

  function handleDotClick(index: number) {
    show(index);
    setHasStarted(true);
  }

  /* ---- Start auto-advance once scrolled into view ---- */
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasStarted(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ---- Auto-advance timer: runs once started, pauses on hover/focus ---- */
  useEffect(() => {
    if (!hasStarted || isPaused || SLIDES.length < 2) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, AUTO_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [hasStarted, isPaused]);

  return (
    <section className="testimonials" id="testimonials" aria-label="Testimonials">
      <div className="testimonials__container">
        <span className="pill-badge">
          <span className="pill-badge__dot" aria-hidden="true"></span>
          Trusted by Users
        </span>
        <h2 className="testimonials__headline">What People Are Saying</h2>

        <div
          ref={carouselRef}
          className="testimonials__carousel"
          data-reveal
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <span className="testimonials__sample-tag">Sample content — not a real testimonial</span>

          <div className="testimonials__track">
            {SLIDES.map((slide, i) => (
              <div className={`testimonials__card${i === current ? " is-active" : ""}`} key={slide.name + i}>
                <div className="testimonials__stars" aria-label="Rating not yet available">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
                <p className="testimonials__quote">&quot;{slide.quote}&quot;</p>
                <div className="testimonials__person">
                  <div className="testimonials__avatar" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="9" r="3.25" stroke="currentColor" strokeWidth="1.75" />
                      <path d="M5 20c0-3.87 3.13-6 7-6s7 2.13 7 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="testimonials__name">{slide.name}</div>
                    <div className="testimonials__role">{slide.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonials__dots" role="tablist" aria-label="Testimonial navigation">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`testimonials__dot${i === current ? " is-active" : ""}`}
                role="tab"
                aria-selected={i === current}
                aria-label={`Show testimonial ${i + 1} of ${SLIDES.length}`}
                onClick={() => handleDotClick(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
