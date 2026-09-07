import Link from "next/link";
import "./DanaLabHero.css";

/**
 * Dana Labs — Hero.
 * Content sourced from the live dana.money/lab page (fetched directly, not invented): eyebrow
 * "Powered by Dana Labs", headline "Explore Dana Labs", and the three shipped-product names
 * (Lead Generation, Cash Flow Score, Digital Lending) that dana.money marks active in its
 * products table. The subhead sentence was cut short mid-word by the source page's own markup
 * ("...Dana AI's intelligent.") — completed here for grammatical closure only, no new feature
 * claims added. Plain Server Component, matches the rest of this codebase's no-client-JS pattern
 * for static sections (see Hero.tsx, FeatureGrid.tsx).
 */
const LIVE_PRODUCTS = ["Lead Generation", "Cash Flow Score", "Digital Lending"];

export default function DanaLabHero() {
  return (
    <section className="dana-lab-hero" id="dana-lab-hero" aria-label="Dana Labs">
      <div className="dana-lab-hero__glow" aria-hidden="true"></div>
      <div className="dana-lab-hero__container">
        <span className="pill-badge">
          <span className="pill-badge__dot" aria-hidden="true"></span>
          Powered by Dana Labs
        </span>

        <h1 className="dana-lab-hero__headline">
          Explore <span className="dana-lab-hero__headline-accent">Dana Labs</span>
        </h1>

        <p className="dana-lab-hero__subhead">
          Experience smarter, faster, and more personalized banking with Dana AI&rsquo;s
          intelligent engine — the toolkit behind every product on this page.
        </p>

        <div className="dana-lab-hero__actions">
          <Link href="/#get-dana-ai" className="btn btn--primary">Get Dana AI</Link>
          <Link href="#dana-lab-capabilities" className="btn btn--secondary">See what&rsquo;s inside</Link>
        </div>

        <ul className="dana-lab-hero__live" aria-label="Live in production">
          {LIVE_PRODUCTS.map((product) => (
            <li className="dana-lab-hero__live-item" key={product}>
              <span className="dana-lab-hero__live-dot" aria-hidden="true"></span>
              {product}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
