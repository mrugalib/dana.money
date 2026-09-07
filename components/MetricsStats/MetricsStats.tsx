"use client";

import { useEffect, useRef, useState } from "react";
import "./MetricsStats.css";

/**
 * Dana AI — Stat / Metrics Section (design.md §8 site map item 10; component spec §5.9).
 * Ported from legacy-static-site/components/metrics/{metrics.html,metrics.css,metrics.js}.
 *
 * FIGURES PENDING (see design.md §9): every `value` below is a placeholder zero, not an invented
 * number — no real public figures exist yet for active users, cashflow scores generated, loans
 * facilitated, or average rating. STATS_CONFIG is the single source of truth for these values,
 * same role the original metrics.js object played — swapping in real numbers later is a one-line
 * edit per stat here, nothing else needs to change. This section should not ship to production
 * showing literal zeros as "our impact."
 */
type StatConfig = {
  key: string;
  label: string;
  value: number;
  decimals: number;
  suffix: string;
};

const STATS_CONFIG: StatConfig[] = [
  { key: "users", label: "Active users", value: 0, decimals: 0, suffix: "+" },
  { key: "cashflow-scores", label: "Cashflow scores generated", value: 0, decimals: 0, suffix: "+" },
  { key: "loans", label: "Loans facilitated", value: 0, decimals: 0, suffix: "+" },
  { key: "rating", label: "Average rating", value: 0, decimals: 1, suffix: "★" },
];

const DURATION_MS = 1200;

// Approximates CSS "ease" (cubic-bezier(0.25,0.1,0.25,1)) closely enough for a decorative
// count-up — exact curve fidelity isn't critical, easeOutCubic reads the same way.
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function formatValue(current: number, decimals: number, suffix: string): string {
  return current.toFixed(decimals) + suffix;
}

function Counter({ config }: { config: StatConfig }) {
  const elRef = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(() => formatValue(0, config.decimals, config.suffix));

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplay(formatValue(config.value, config.decimals, config.suffix));
      return;
    }

    let rafId: number;
    function animate() {
      let start: number | null = null;
      function tick(timestamp: number) {
        if (start === null) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(1, elapsed / DURATION_MS);
        const eased = easeOutCubic(progress);
        setDisplay(formatValue(config.value * eased, config.decimals, config.suffix));
        if (progress < 1) {
          rafId = window.requestAnimationFrame(tick);
        }
      }
      rafId = window.requestAnimationFrame(tick);
    }

    if (!("IntersectionObserver" in window)) {
      animate();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="metrics__item" data-reveal>
      <div ref={elRef} className="metrics__value">{display}</div>
      <div className="metrics__label">{config.label}</div>
    </div>
  );
}

export default function MetricsStats() {
  return (
    <section className="metrics" id="metrics" aria-label="Dana's impact">
      <div className="metrics__container">
        <span className="pill-badge">
          <span className="pill-badge__dot" aria-hidden="true"></span>
          Our Impact
        </span>
        <h2 className="metrics__headline">The Numbers Behind Dana</h2>

        <div className="metrics__grid">
          {STATS_CONFIG.map((config) => (
            <Counter key={config.key} config={config} />
          ))}
        </div>
      </div>
    </section>
  );
}
