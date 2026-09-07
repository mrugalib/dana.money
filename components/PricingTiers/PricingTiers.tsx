import "./PricingTiers.css";

/**
 * Dana AI — Pricing page content (design.md §5.11, site map item 12).
 * Ported from legacy-static-site/components/pricing/{pricing.html,pricing.css}. No interactivity
 * beyond CSS :hover, so this stays a plain Server Component.
 *
 * Reveal-wrapper/static-transform split preserved exactly: `.pricing-tiers__item` (outer,
 * `data-reveal`) wraps `.pricing-tiers__card` (inner, owns the featured tier's static
 * translateY(-8px) raise) — two elements, not one, to avoid a transition-shorthand cascade
 * collision (design.md §9). The `@media (max-width: 1200px)` 2-column tablet tier is this
 * session's breakpoint-audit fix, preserved unchanged.
 */

type Tier = {
  name: string;
  price: string;
  period: string;
  description?: string;
  features: string[];
  featured?: boolean;
  cta: { label: string; href?: string; disabled?: boolean };
};

const userTiers: Tier[] = [
  {
    name: "Basic",
    price: "Free",
    period: "/month",
    description: "Free plan with basic features for getting started",
    features: [
      "5 AI queries per day",
      "2 sales officer requests per month",
      "Reach up to 3 officers per request",
    ],
    cta: { label: "Get Started Free", href: "/#get-dana-ai" },
  },
  {
    name: "Perk",
    price: "৳99.00",
    period: "/month",
    description: "Enhanced plan with more features for growing businesses",
    features: [
      "Everything in Basic",
      "20 AI queries per day",
      "5 sales officer requests per month",
      "Reach up to 5 officers per request",
    ],
    cta: { label: "Coming Soon", disabled: true },
  },
  {
    name: "Ultra",
    price: "৳299.00",
    period: "/month",
    description: "Premium plan with advanced features for established businesses",
    features: [
      "Everything in Perk",
      "100 AI queries per day",
      "7 sales officer requests per month",
      "Reach up to 7 officers per request",
    ],
    featured: true,
    cta: { label: "Coming Soon", disabled: true },
  },
];

const officerTiers: Tier[] = [
  {
    name: "Basic",
    price: "Free",
    period: "/month",
    features: ["1 campaign per 1 day", "Reach up to 3 users per campaign"],
    cta: { label: "Get Started Free", href: "/#get-dana-ai" },
  },
  {
    name: "Perk Plus",
    price: "৳499.00",
    period: "/month",
    features: [
      "Everything in Basic",
      "3 campaigns per 3 days",
      "Reach up to 5 users per campaign",
    ],
    cta: { label: "Coming Soon", disabled: true },
  },
  {
    name: "Ultra Plus",
    price: "৳999.00",
    period: "/month",
    features: [
      "Everything in Perk Plus",
      "5 campaigns per 5 days",
      "Reach up to 7 users per campaign",
    ],
    featured: true,
    cta: { label: "Coming Soon", disabled: true },
  },
];

function CheckIcon() {
  return (
    <svg className="pricing-tiers__check" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  return (
    <div className="pricing-tiers__item" data-reveal>
      <div className={`pricing-tiers__card${tier.featured ? " pricing-tiers__card--featured" : ""}`}>
        {tier.featured && <span className="pricing-tiers__featured-tag">Recommended</span>}
        <h3 className="pricing-tiers__name">{tier.name}</h3>
        <div className="pricing-tiers__price">
          <span className="pricing-tiers__amount">{tier.price}</span>
          <span className="pricing-tiers__period">{tier.period}</span>
        </div>
        {tier.description && <p className="pricing-tiers__description">{tier.description}</p>}
        <ul className="pricing-tiers__features">
          {tier.features.map((feature) => (
            <li key={feature}>
              <CheckIcon />
              {feature}
            </li>
          ))}
        </ul>
        {tier.cta.disabled ? (
          <button type="button" className="btn btn--secondary pricing-tiers__cta" disabled aria-disabled="true">
            {tier.cta.label}
          </button>
        ) : (
          <a href={tier.cta.href} className="btn btn--primary pricing-tiers__cta">
            {tier.cta.label}
          </a>
        )}
      </div>
    </div>
  );
}

export default function PricingTiers() {
  return (
    <>
      <section className="pricing-header" id="pricing-header" aria-label="Pricing">
        <div className="pricing-header__container">
          <h1 className="pricing-header__headline">Choose Your Membership Plan</h1>
          <p className="pricing-header__subhead">
            Join our platform with plans designed for users and sales officers. Choose the perfect
            membership tier for your needs.
          </p>
        </div>
      </section>

      <section className="pricing-tiers" id="user-plans" aria-label="User Membership Plans">
        <div className="pricing-tiers__container">
          <h2 className="pricing-tiers__group-title">User Membership Plans</h2>
          <p className="pricing-tiers__group-subhead">Your starter plan for exploring AI financial tools</p>
          <div className="pricing-tiers__grid">
            {userTiers.map((tier) => (
              <TierCard key={tier.name} tier={tier} />
            ))}
          </div>
        </div>
      </section>

      <section className="pricing-tiers pricing-tiers--alt" id="officer-plans" aria-label="Sales Officer Membership Plans">
        <div className="pricing-tiers__container">
          <h2 className="pricing-tiers__group-title">Sales Officer Membership Plans</h2>
          <p className="pricing-tiers__group-subhead">Professional plans for sales officers</p>
          <div className="pricing-tiers__grid">
            {officerTiers.map((tier) => (
              <TierCard key={tier.name} tier={tier} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
