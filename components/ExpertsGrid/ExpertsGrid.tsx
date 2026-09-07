"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import "./ExpertsGrid.css";

/**
 * Dana AI — "Meet the Experts" card-stack carousel (design.md §8 site map item 9).
 * Rebuilt per explicit design brief: cream section background, wavy accent underline, a
 * horizontally-scrolling card-stack (native CSS scroll-snap — gives smooth touch-swipe and
 * snap-to-card on mobile for free, no gesture library needed) with prev/next buttons, and
 * per-card decorative "doodle" overlays that fade/float in on hover.
 *
 * FLAG (carried over verbatim from the previous version): no name, role, or bio text exists for
 * any of these six people — not on the live site, not supplied with the assets. Photo-only cards,
 * nothing fabricated. Real names + roles are still needed from Dana before this ships with any
 * caption text — see design.md §9.
 */
const EXPERT_PHOTOS = [1, 2, 3, 4, 5, 6].map((n) => `/assets/expert${n}.webp`);

const CARD_WIDTH = 292;
const CARD_GAP = 12;

function DoodleHeart({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 27S4 19.8 4 12.1C4 8 7.1 5 11 5c2.1 0 4 1 5 2.6C17 6 18.9 5 21 5c3.9 0 7 3 7 7.1C28 19.8 16 27 16 27Z"
        stroke="#8FA8C7"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DoodleBird({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 40 32" fill="none" aria-hidden="true">
      <path
        d="M3 20c4-8 10-11 15-9-1-3 0-6 3-8 0 3 1 5 3 6 4 1 7 4 8 9-3-2-6-2-9-1 3 2 5 5 5 9-3-3-6-4-9-4 1 2 1 4 0 6-2-3-4-4-7-4-4 0-7-1-9-4Z"
        stroke="#8FA8C7"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DoodleFrame({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M2 14V2h12" stroke="#8FA8C7" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M46 34v12H34" stroke="#8FA8C7" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="24" cy="24" r="3" stroke="#8FA8C7" strokeWidth="1.5" />
    </svg>
  );
}

export default function ExpertsGrid() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  function updateEdges() {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft >= track.scrollWidth - track.clientWidth - 4);
  }

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * (CARD_WIDTH + CARD_GAP), behavior: "smooth" });
  }

  return (
    <section className="experts" id="experts" aria-label="Meet the Experts">
      <div className="experts__container">
        <span className="pill-badge">
          <span className="pill-badge__dot" aria-hidden="true"></span>
          Meet the Experts
        </span>
        <h2 className="experts__headline">Let Experts Guide You</h2>
      </div>

      <div className="experts__carousel">
        <div
          className="experts__track"
          ref={trackRef}
          onScroll={updateEdges}
          role="list"
        >
          {EXPERT_PHOTOS.map((src, i) => (
            <div className="experts__item" data-reveal key={src} role="listitem">
              <div className="experts__card">
                <Image
                  className="experts__photo"
                  src={src}
                  alt="Dana financial expert"
                  fill
                  sizes="292px"
                />
                <div className="experts__doodles" aria-hidden="true">
                  <DoodleHeart className="experts__doodle experts__doodle--heart" />
                  <DoodleBird className="experts__doodle experts__doodle--bird" />
                  <DoodleFrame className="experts__doodle experts__doodle--frame" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="experts__nav">
          <button
            type="button"
            className="experts__nav-btn"
            aria-label="Previous experts"
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" stroke="#8FA8C7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="experts__nav-btn"
            aria-label="Next experts"
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke="#8FA8C7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
