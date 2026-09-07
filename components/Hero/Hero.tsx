import Image from "next/image";
import Link from "next/link";
import "./Hero.css";

/**
 * Dana AI — Hero (design.md §5.4).
 * Ported from legacy-static-site/components/hero/hero.html + hero.css. No client-side behavior
 * (pure CSS on-load reveal animation) — plain Server Component, no "use client" needed.
 *
 * Ships "Option A" only (the real hero.gif visual). The legacy homepage had a demo-only toggle
 * to compare it against a chat-bubble mock ("Option B", hero-visual-chatbubble.html/css) — that
 * toggle was explicitly commented as harness-only, not part of the shipped component, so it is
 * not ported here. hero-visual-chatbubble.* remains available in legacy-static-site/ for
 * reference if Dana wants to revisit that direction later.
 *
 * Background/palette updated per explicit instruction to match Finorix's hero atmosphere: a real
 * dark-green gradient/grid image (public/assets/hero-bg-gradient.webp, supplied by the user) now
 * fills the section, with headline/badge/CTA colors swapped to the light-on-dark treatment that
 * background requires — see Hero.css header comment and design.md §9 for the full rationale,
 * including why the default dark-green primary button and blue radial glow could not be reused
 * as-is against this new background.
 */
export default function Hero() {
  return (
    <section className="hero" id="hero" aria-label="Hero" data-navbar-dark>
      <div className="hero__container">
        <div className="hero__content">
          <span className="pill-badge hero__badge">
            <span className="pill-badge__dot" aria-hidden="true"></span>
            Introducing Dana
          </span>

          <h1 className="hero__headline">
            <span className="hero__line hero__line--light">Your smart</span>
            <span className="hero__line hero__line--accent">Financial AI</span>
            <span className="hero__line hero__line--light">Assistant.</span>
          </h1>

          <div className="hero__actions">
            <Link href="/#get-dana-ai" className="btn hero__cta-primary">Get Dana AI</Link>
            <Link href="/#how-it-works" className="btn hero__cta-secondary">See how it works</Link>
          </div>
        </div>

        <div className="hero__visual">
          <Image
            src="/assets/hero.gif"
            alt="Dana AI chat assistant interface, showing a conversational financial advisor screen on a phone"
            className="hero__device"
            width={500}
            height={1021}
            unoptimized
            priority
          />
        </div>
      </div>
    </section>
  );
}
