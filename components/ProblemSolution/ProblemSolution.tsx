import "./ProblemSolution.css";

/**
 * Dana AI — "Why Dana" section (design.md §8 site map item 4).
 * Ported from legacy-static-site/components/problem-solution/, redesigned as a Finorix-style
 * eyebrow + headline + asymmetric 5-card grid (2 larger cards / row 1, 3 smaller cards / row 2).
 * No client-side behavior — plain Server Component. Reuses only existing design tokens (color,
 * radius, spacing, type scale) — no new tokens introduced.
 */
const REASONS = [
  {
    size: "lg" as const,
    title: "No Credit History Needed",
    description:
      "Dana reads real transaction and digital-footprint signals instead of a formal credit file, so being new to banking is never a dead end.",
    icon: (
      <>
        <circle cx="12" cy="12" r="3" stroke="var(--color-text-primary)" strokeWidth="1.75" />
        <path
          d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"
          stroke="var(--color-text-muted)"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    size: "lg" as const,
    title: "Instant Decisions, Not Weeks",
    description:
      "AI-driven scoring turns what used to be a weeks-long paperwork cycle into an affordability read you get in seconds.",
    icon: (
      <>
        <path
          d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
          stroke="var(--color-text-primary)"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    size: "sm" as const,
    title: "Bank-Grade Security",
    description: "Every signal Dana reads is encrypted end-to-end and never sold or shared.",
    icon: (
      <>
        <path
          d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3Z"
          stroke="var(--color-text-primary)"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path d="M9 12l2 2 4-4" stroke="var(--color-text-muted)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    size: "sm" as const,
    title: "Transparent, No Hidden Fees",
    description: "The rate and terms you see quoted are exactly what you pay — nothing buried in fine print.",
    icon: (
      <>
        <path
          d="M3 12 12 3h6v6l-9 9-6-6Z"
          stroke="var(--color-text-primary)"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <circle cx="15" cy="6" r="1.5" fill="var(--color-text-muted)" />
      </>
    ),
  },
  {
    size: "sm" as const,
    title: "AI + Human Support",
    description: "A financial AI assistant on tap 24/7, backed by real advisors whenever you need a second opinion.",
    icon: (
      <>
        <path
          d="M4 5h16v10H9l-5 4V5Z"
          stroke="var(--color-text-primary)"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M16 3l.7 1.6L18.3 5l-1.6.4L16 7l-.7-1.6L13.7 5l1.6-.4L16 3Z"
          fill="var(--color-text-muted)"
        />
      </>
    ),
  },
];

export default function ProblemSolution() {
  return (
    <section className="why-dana" id="why-dana" aria-label="Why Dana">
      <div className="why-dana__container">
        <div className="why-dana__intro" data-reveal>
          <span className="pill-badge">
            <span className="pill-badge__dot" aria-hidden="true"></span>
            Why Dana
          </span>

          <h2 className="why-dana__headline">
            <span className="why-dana__line">Invisible to banks.</span>
            <span className="why-dana__line">Not to Dana.</span>
          </h2>

          <p className="why-dana__body">
            Millions of people in Bangladesh have no formal credit history — Dana reads real
            transaction and digital-footprint signals instead, to assess affordability instantly.
          </p>
        </div>

        <div className="why-dana__grid">
          {REASONS.map((reason, i) => (
            <div
              className={`why-dana__item why-dana__item--${reason.size}`}
              data-reveal
              key={reason.title}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="why-dana__card">
                <div className="why-dana__icon-frame" aria-hidden="true">
                  <span className="why-dana__icon-dot why-dana__icon-dot--tl"></span>
                  <span className="why-dana__icon-dot why-dana__icon-dot--tr"></span>
                  <span className="why-dana__icon-dot why-dana__icon-dot--bl"></span>
                  <span className="why-dana__icon-dot why-dana__icon-dot--br"></span>
                  <svg className="why-dana__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    {reason.icon}
                  </svg>
                </div>
                <h3 className="why-dana__title">{reason.title}</h3>
                <p className="why-dana__description">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
