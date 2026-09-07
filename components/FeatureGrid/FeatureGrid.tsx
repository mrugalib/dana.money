import "./FeatureGrid.css";

/**
 * Dana AI — Feature Grid (design.md §8 site map item 6, spec §5.6).
 * Ported from legacy-static-site/components/feature-grid/. No client-side behavior — plain
 * Server Component (hover-lift is pure CSS, scroll-reveal is the shared global observer).
 *
 * Preserves the reveal-wrapper/hover-card split: `.feature-grid__item[data-reveal]` (owns the
 * scroll-reveal fade+translateY+stagger) wraps `.feature-grid__card` (owns the hover lift) as two
 * separate elements — collapsing them into one reintroduces a transition-shorthand cascade
 * collision already fixed once (design.md §9).
 */
const FEATURES = [
  {
    color: "blue" as const,
    title: "Cashflow Score",
    description:
      "An instant affordability read from your real transaction history and digital footprint — no paperwork, no waiting.",
    icon: (
      <>
        <path d="M3 17l5-5 4 4 8-9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 7h5v5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    color: "green" as const,
    title: "Personalized Loans",
    description:
      "Matched to credit and financial products that actually fit your situation, not a one-size-fits-all offer.",
    icon: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M3 10h18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M7 15h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </>
    ),
  },
  {
    color: "blue" as const,
    title: "Learn & Earn Rewards",
    description: "Build financial literacy and earn real cashback for it — gamified, not gimmicky.",
    icon: (
      <>
        <rect x="3" y="9" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M3 13h18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M12 9v12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M12 9c-1.5-3-6-3.5-6-.5 0 1.7 2.5 2 6 .5Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M12 9c1.5-3 6-3.5 6-.5 0 1.7-2.5 2-6 .5Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      </>
    ),
  },
  {
    color: "green" as const,
    title: "Expert Guidance",
    description: "Direct access to trusted financial advisors whenever you need a second opinion.",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.75" />
        <path d="M5 20c0-3.87 3.13-6 7-6s7 2.13 7 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M9.5 15.5l1.75 1.75L15 13.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

export default function FeatureGrid() {
  return (
    <section className="feature-grid" id="feature-grid" aria-label="What Dana does">
      <div className="feature-grid__container">
        <span className="pill-badge">
          <span className="pill-badge__dot" aria-hidden="true"></span>
          What Dana does
        </span>
        <h2 className="feature-grid__headline">Everything Dana does for your money</h2>

        <div className="feature-grid__grid">
          {FEATURES.map((feature) => (
            <div className="feature-grid__item" data-reveal key={feature.title}>
              <div className={`feature-grid__card feature-grid__card--${feature.color}`}>
                <span className={`feature-grid__icon-wrap feature-grid__icon-wrap--${feature.color}`}>
                  <svg
                    className={`feature-grid__icon feature-grid__icon--${feature.color}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    {feature.icon}
                  </svg>
                </span>
                <h3 className="feature-grid__title">{feature.title}</h3>
                <p className="feature-grid__description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
