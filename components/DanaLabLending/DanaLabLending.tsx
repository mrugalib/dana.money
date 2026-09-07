import "./DanaLabLending.css";

/**
 * Dana Labs — Lending Infrastructure.
 * Title/description/tag copy sourced verbatim from the live dana.money/lab page's "Lending
 * Infrastructure" block (Prospecting + AI Credit Scoring Engine, White-Label BNPL & Embedded
 * Lending, Digital Loan & Credit Card Onboarding, each with its short "Smart Risk Assessment" /
 * "Branded Payment Solutions" / "Instant User Onboarding" sub-label and stat tag). Icons are new,
 * matching the app's existing currentColor/1.75-stroke line style. Plain Server Component.
 */
const LENDING_PRODUCTS = [
  {
    title: "Prospecting + AI Credit Scoring Engine",
    subLabel: "Smart Risk Assessment",
    description: "Automated product guidance with real-time scoring.",
    tag: "Real-time scoring",
    icon: (
      <>
        <path d="M4 15a8 8 0 1 1 16 0" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M12 15l4.5-5.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    title: "White-Label BNPL & Embedded Lending",
    subLabel: "Branded Payment Solutions",
    description: "Launch your branded Buy Now, Pay Later solution in minutes.",
    tag: "Fully customizable",
    icon: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M3 10h18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M7 15h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M15 15h2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Digital Loan & Credit Card Onboarding",
    subLabel: "Instant User Onboarding",
    description: "Onboard users in minutes with automated document verification and KYC.",
    tag: "Minutes to approval",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="9.5" cy="10" r="2" stroke="currentColor" strokeWidth="1.75" />
        <path d="M6.5 16c0-1.93 1.34-3 3-3s3 1.07 3 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M14.5 9.5h3M14.5 12.5h3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </>
    ),
  },
];

export default function DanaLabLending() {
  return (
    <section className="dana-lab-lending" id="dana-lab-lending" aria-label="Dana Labs lending infrastructure">
      <div className="dana-lab-lending__container">
        <span className="pill-badge">
          <span className="pill-badge__dot" aria-hidden="true"></span>
          Lending Infrastructure
        </span>
        <h2 className="dana-lab-lending__headline">Fintech lending, ready to embed</h2>
        <p className="dana-lab-lending__subhead">
          Prospecting, scoring, and onboarding — the full lending stack behind Dana&rsquo;s
          products, built for banks and fintechs to launch fast.
        </p>

        <div className="dana-lab-lending__grid">
          {LENDING_PRODUCTS.map((product) => (
            <div className="dana-lab-lending__item" data-reveal key={product.title}>
              <div className="dana-lab-lending__card">
                <span className="dana-lab-lending__icon-wrap">
                  <svg className="dana-lab-lending__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    {product.icon}
                  </svg>
                </span>
                <span className="dana-lab-lending__sub-label">{product.subLabel}</span>
                <h3 className="dana-lab-lending__title">{product.title}</h3>
                <p className="dana-lab-lending__description">{product.description}</p>
                <span className="dana-lab-lending__tag">{product.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
