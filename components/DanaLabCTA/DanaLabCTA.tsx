import "./DanaLabCTA.css";

/**
 * Dana Labs — Consultation CTA.
 * Headline, subhead, and the four benefit labels are sourced verbatim from the live
 * dana.money/lab page's consultation section ("Ready to Transform Your Financial Services?" /
 * "Schedule a personalized consultation with our fintech experts" / Personalized Strategy, Fast &
 * Seamless Setup, Always-On Support, Bank-Grade Security). The mailto link reuses the real
 * hello@dana.money address already used in Footer.tsx — no invented contact channel.
 *
 * `data-navbar-dark` (design.md §9): this section's --gradient-brand (black -> dark green)
 * background is dark enough to make the default navbar palette unreadable when it scrolls
 * underneath, the same problem the homepage Hero already solved. Navbar.tsx observes every
 * `[data-navbar-dark]` element on the page (not just the Hero anymore) and applies its existing
 * `.navbar--on-dark` white-text/white-logo/lime-CTA treatment for as long as any of them is under
 * the bar — no new navbar styling needed, just widening what triggers the existing one.
 */
const BENEFITS = [
  "Personalized Strategy",
  "Fast & Seamless Setup",
  "Always-On Support (24/7)",
  "Bank-Grade Security",
];

export default function DanaLabCTA() {
  return (
    <section
      className="dana-lab-cta"
      id="dana-lab-cta"
      aria-label="Talk to Dana's fintech experts"
      data-reveal
      data-navbar-dark
    >
      <div className="dana-lab-cta__container">
        <h2 className="dana-lab-cta__headline">Ready to Transform Your Financial Services?</h2>
        <p className="dana-lab-cta__subhead">
          Schedule a personalized consultation with our fintech experts.
        </p>

        <ul className="dana-lab-cta__benefits">
          {BENEFITS.map((benefit) => (
            <li className="dana-lab-cta__benefit" key={benefit}>
              <svg className="dana-lab-cta__check" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 12.5l2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {benefit}
            </li>
          ))}
        </ul>

        <a
          href="mailto:hello@dana.money?subject=Dana%20Labs%20Consultation"
          className="btn dana-lab-cta__button"
        >
          Let&rsquo;s Connect With an Expert
        </a>
      </div>
    </section>
  );
}
