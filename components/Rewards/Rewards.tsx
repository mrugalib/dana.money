import "./Rewards.css";

/**
 * Dana AI — Rewards / Learn & Earn (design.md §8 site map item 8; layout pattern §5.7).
 * Ported from legacy-static-site/components/rewards/{rewards.html,rewards.css}.
 *
 * ASSETS: giftbox.png/spinwheel.png don't exist anywhere in the project (verified again during
 * this migration). CSS/SVG illustration placeholders stand in, with the same visible "swap for
 * real asset" caption as the original build — not removed or softened. Swap in the real files at
 * /assets/giftbox.png and /assets/spinwheel.png once available, and drop this caption then.
 */
export default function Rewards() {
  return (
    <section className="rewards" id="rewards" aria-label="Rewards / Learn and Earn">
      <div className="rewards__container">
        <div className="rewards__content">
          <span className="pill-badge">
            <span className="pill-badge__dot" aria-hidden="true"></span>
            Learn &amp; Earn
          </span>
          <h2 className="rewards__headline">Making Finance Fun, Simple, and Worth Your Time</h2>
          <p className="rewards__body">
            Watch short, bite-sized videos on managing your money — then spin the wheel or open
            your gift box to claim real cashback for what you&apos;ve learned.
          </p>
        </div>

        <div className="rewards__visual">
          <div className="rewards__illustrations">
            <div className="rewards__illustration-card" data-reveal>
              <svg className="rewards__illustration-icon" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <rect x="8" y="26" width="48" height="30" rx="2" stroke="currentColor" strokeWidth="2.25" strokeLinejoin="round" />
                <rect x="4" y="16" width="56" height="12" rx="2" stroke="currentColor" strokeWidth="2.25" strokeLinejoin="round" />
                <path d="M32 16v40" stroke="currentColor" strokeWidth="2.25" />
                <path d="M32 16c-4-10-20-10-20 0" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
                <path d="M32 16c4-10 20-10 20 0" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
              </svg>
              <span className="rewards__illustration-label">Gift Box</span>
            </div>

            <div className="rewards__illustration-card" data-reveal>
              <svg className="rewards__illustration-icon" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <circle cx="32" cy="34" r="22" stroke="currentColor" strokeWidth="2.25" />
                <path d="M32 12v44M10 34h44M17 19l30 30M47 19l-30 30" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="32" cy="34" r="3.5" fill="currentColor" />
                <path d="M32 6l6 9h-12l6-9Z" fill="currentColor" />
              </svg>
              <span className="rewards__illustration-label">Spin Wheel</span>
            </div>
          </div>
          <p className="rewards__placeholder-note">
            Illustration placeholders — swap for the real giftbox.png / spinwheel.png once available.
          </p>
        </div>
      </div>
    </section>
  );
}
