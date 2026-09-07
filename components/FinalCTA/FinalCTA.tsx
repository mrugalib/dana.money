import "./FinalCTA.css";

/**
 * Dana AI — Final CTA Banner (design.md §5.13, site map item 14b).
 * Ported from legacy-static-site/components/final-cta/{final-cta.html,final-cta.css}. Generic,
 * reused chrome per design.md — imported by both the homepage and /pricing composition, not
 * duplicated markup. No interactivity, plain Server Component.
 *
 * Background is a user-supplied image (public/assets/final-cta-bg.webp) — replaces the old solid
 * --color-primary fill + a separate --gradient-glow div, since the image already has its own
 * radial glow, decorative arcs, and grid pattern baked in. See FinalCTA.css and design.md §9.
 *
 * KNOWN, ALREADY-FLAGGED ISSUE (unchanged by this port or the background swap): the ghost/outline
 * CTA button uses `--color-border-subtle`, a black-based border calibrated for light backgrounds,
 * against this banner's own dark background — it reads as close to invisible. Implemented exactly
 * as instructed in an earlier session; still flagged in design.md §9 as needing real-browser
 * verification and likely a lighter, banner-specific border value. Not resolved here.
 */
export default function FinalCTA() {
  return (
    <section className="final-cta" id="final-cta" aria-label="Get Dana AI" data-reveal>
      <div className="final-cta__container">
        <h2 className="final-cta__headline">Ready to take control of your finances?</h2>
        <p className="final-cta__body">
          Chat with Dana, build your cashflow score, and get matched with the right financial
          products — all in one app.
        </p>
        <a href="/#get-dana-ai" className="btn final-cta__cta">Get Dana AI</a>
      </div>
    </section>
  );
}
