import "./DanaLabCapabilities.css";

/**
 * Dana Labs — Core Capabilities.
 * Category/title/description copy is sourced verbatim from the live dana.money/lab page's three
 * "Explore Dana Labs" feature blocks (Product Discovery, Upsell & Cross-Sell, Customer Service).
 * Icons are new (no icon assets were recoverable from the source page), drawn in the same
 * currentColor/1.75-stroke line style as FeatureGrid's icon set for visual consistency across the
 * app. Plain Server Component — hover motion is pure CSS, same pattern as FeatureGrid.
 */
const CAPABILITIES = [
  {
    color: "blue" as const,
    category: "Product Discovery",
    title: "Lead Generation",
    description:
      "Automatically guide customers to the right banking products — accounts, cards, loans — through contextual conversations.",
    icon: (
      <>
        <path d="M4 5h16l-6 7.5V18l-4 2v-7.5L4 5Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      </>
    ),
  },
  {
    color: "green" as const,
    category: "Upsell & Cross-Sell",
    title: "Smart Recommendations",
    description:
      "Proactively recommend personalized add-ons — like travel insurance with credit cards or savings boosters.",
    icon: (
      <>
        <path d="M12 3.5l8 4.5v8l-8 4.5-8-4.5v-8l8-4.5Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M4 8l8 4.5L20 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12.5V21" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </>
    ),
  },
  {
    color: "blue" as const,
    category: "Customer Service",
    title: "Branch Appointments",
    description:
      "Route queries and schedule in-branch appointments — seamlessly integrated with your CRM.",
    icon: (
      <>
        <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.75" />
        <path d="M3.5 9.5h17" stroke="currentColor" strokeWidth="1.75" />
        <path d="M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M8.5 13.5l2 2 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

export default function DanaLabCapabilities() {
  return (
    <section className="dana-lab-capabilities" id="dana-lab-capabilities" aria-label="Dana Labs core capabilities">
      <div className="dana-lab-capabilities__container">
        <span className="pill-badge">
          <span className="pill-badge__dot" aria-hidden="true"></span>
          Core Capabilities
        </span>
        <h2 className="dana-lab-capabilities__headline">Everything your banking app needs to sell smarter</h2>

        <div className="dana-lab-capabilities__grid">
          {CAPABILITIES.map((item, index) => (
            <div className="dana-lab-capabilities__item" data-reveal key={item.title}>
              <div className={`dana-lab-capabilities__card dana-lab-capabilities__card--${item.color}`}>
                <span className="dana-lab-capabilities__index">{String(index + 1).padStart(2, "0")}</span>
                <span className={`dana-lab-capabilities__icon-wrap dana-lab-capabilities__icon-wrap--${item.color}`}>
                  <svg
                    className={`dana-lab-capabilities__icon dana-lab-capabilities__icon--${item.color}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </svg>
                </span>
                <span className={`dana-lab-capabilities__category dana-lab-capabilities__category--${item.color}`}>
                  {item.category}
                </span>
                <h3 className="dana-lab-capabilities__title">{item.title}</h3>
                <p className="dana-lab-capabilities__description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
