import Image from "next/image";
import "./CareerInfo.css";

/**
 * Dana AI — /career page content.
 * Benefit copy is adapted from the reference employee-offerings page the team pointed to
 * (braincraftapps.com/work-with-us) — same categories (compensation, time off, perks, culture,
 * growth) restated in Dana's own voice. Not literally quoted; specifics (leave days, hours,
 * meals) are carried over as given. No client-side behavior — plain Server Component. Card
 * treatment matches the established FeatureGrid/DanaLabCapabilities pattern (alternating
 * accent-primary/accent-secondary, i.e. black/dark-green — see globals.css §9 on the blue accent
 * removal). The intro row reuses the same butterfly.gif motif as the homepage About Us section, in
 * the blank space to the right of the "Life at Dana" copy — placement confirmed against a
 * screenshot the team marked up (same two-column pattern as AboutUs.tsx).
 */
const BENEFITS = [
  {
    color: "blue" as const,
    title: "Competitive Compensation",
    description: "A competitive salary package, reviewed to stay aligned with market standards.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
        <path d="M12 7v10M9.5 9.5c0-1.4 1.2-2.2 2.5-2.2s2.5.9 2.5 2c0 2.7-5 1.5-5 4.2 0 1.1 1.2 2 2.5 2s2.5-.8 2.5-2.2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    color: "green" as const,
    title: "Retirement Plan",
    description: "A structured employee retirement program to support your long-term financial security.",
    icon: (
      <>
        <path d="M4 20V10l8-6 8 6v10" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      </>
    ),
  },
  {
    color: "blue" as const,
    title: "Generous Paid Time Off",
    description: "30 days of annual paid leave, plus two weekly off-days and all government holidays.",
    icon: (
      <>
        <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.75" />
        <path d="M3.5 9.5h17" stroke="currentColor" strokeWidth="1.75" />
        <path d="M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </>
    ),
  },
  {
    color: "green" as const,
    title: "Balanced Work Hours",
    description: "A steady 11 AM – 8 PM schedule that supports a healthy work-life rhythm.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
        <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    color: "blue" as const,
    title: "Meals & Refreshments",
    description: "Complimentary lunch, snacks, tea, and coffee provided every working day.",
    icon: (
      <>
        <path d="M6 3v7a2 2 0 0 0 2 2v9M6 3v9M9 3v7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 3c-1.5 0-2.5 1.5-2.5 4s1 4 2.5 4v10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    color: "green" as const,
    title: "Team Tours & Tournaments",
    description: "Regular tours, tournaments, and casual celebrations that keep the team connected.",
    icon: (
      <>
        <path d="M4 21c2-2 4-3 8-3s6 1 8 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="8" r="4.5" stroke="currentColor" strokeWidth="1.75" />
        <path d="M9.5 8l1.7 1.7L14.5 6.3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

export default function CareerInfo() {
  return (
    <>
      <section className="career-info" id="career-info" aria-label="Careers at Dana">
        <div className="career-info__container">
          <div className="career-info__intro-row">
            <div className="career-info__intro" data-reveal>
              <span className="pill-badge">
                <span className="pill-badge__dot" aria-hidden="true"></span>
                About
              </span>
              <h1 className="career-info__headline">Life at Dana</h1>
              <p className="career-info__body">
                Dana is built by a small, hands-on team working at the intersection of finance and
                AI. We aim for a hygienic, respectful workplace — no bullying, no coercive
                management — where people early in their careers work alongside proven performers,
                and where academic knowledge turns into real, shipped work.
              </p>
            </div>

            <div className="career-info__visual" data-reveal style={{ transitionDelay: "120ms" }}>
              <Image
                className="career-info__gif"
                src="/assets/butterfly.gif"
                alt=""
                width={500}
                height={500}
                unoptimized
              />
            </div>
          </div>

          <div className="career-info__grid">
            {BENEFITS.map((benefit, i) => (
              <div
                className="career-info__item"
                data-reveal
                key={benefit.title}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`career-info__card career-info__card--${benefit.color}`}>
                  <span className={`career-info__icon-wrap career-info__icon-wrap--${benefit.color}`}>
                    <svg
                      className={`career-info__icon career-info__icon--${benefit.color}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      {benefit.icon}
                    </svg>
                  </span>
                  <h3 className="career-info__title">{benefit.title}</h3>
                  <p className="career-info__description">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="career-notice" aria-label="Current hiring status">
        <div className="career-notice__container" data-reveal>
          <span className="pill-badge">
            <span className="pill-badge__dot" aria-hidden="true"></span>
            Hiring status
          </span>
          <h2 className="career-notice__heading">Not hiring right now</h2>
          <p className="career-notice__body">
            Dana isn&rsquo;t recruiting for any positions at the moment. This page will list open
            roles here as soon as that changes — check back soon.
          </p>
        </div>
      </section>
    </>
  );
}
