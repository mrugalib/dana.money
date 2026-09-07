import Image from "next/image";
import "./GetTheApp.css";

/**
 * Dana AI — Get The App (design.md site map item 14's real content, distinct from FinalCTA).
 * Ported from legacy-static-site/components/get-the-app/{get-the-app.html,get-the-app.css}.
 * No interactivity, plain Server Component.
 *
 * Real content used verbatim: "GET THE APP" headline, body copy, both real store URLs. The
 * screenshot (Get-The_App-Screen.webp) is self-framed — transparent corners baked into the image
 * around an already-drawn phone bezel — confirmed via pixel-alpha sampling in the original build,
 * so no separate CSS bezel is composited on top, same as the hero. Real pixel dimensions
 * (640x1285, confirmed via `sips`) passed to next/image instead of guessed values.
 */
export default function GetTheApp() {
  return (
    <section className="get-the-app" id="get-the-app" aria-label="Get the app" data-reveal>
      <div className="get-the-app__container">
        <div className="get-the-app__content">
          <h2 className="get-the-app__headline">
            <span className="get-the-app__line">GET</span>
            <span className="get-the-app__line">THE APP</span>
          </h2>
          <p className="get-the-app__body">
            Download Dana AI to access personalized loans, earn rewards, and boost your financial
            know-how—all in one powerful app.
          </p>
          <div className="get-the-app__buttons">
            <a
              href="https://play.google.com/store/apps/details?id=com.dana.financial"
              className="btn btn--primary get-the-app__store-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="get-the-app__store-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4 3.5v17a1 1 0 0 0 1.5.87l14-8.5a1 1 0 0 0 0-1.74l-14-8.5A1 1 0 0 0 4 3.5Z" />
              </svg>
              Google Play
            </a>
            <a
              href="https://s.dana.money/SBC3fw"
              className="btn btn--primary get-the-app__store-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="get-the-app__store-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16.7 12.4c0-2.7 2.2-4 2.3-4.1-1.3-1.9-3.2-2.1-3.9-2.2-1.7-.2-3.3 1-4.1 1-.9 0-2.2-1-3.6-1-1.9 0-3.6 1.1-4.6 2.7-2 3.4-.5 8.5 1.4 11.3.9 1.4 2 2.9 3.5 2.9 1.4-.1 1.9-.9 3.6-.9s2.1.9 3.6.9c1.5 0 2.5-1.4 3.4-2.8.7-1 1.3-2.1 1.6-3.3-2.1-.8-3.2-2.8-3.2-4.5ZM14 4.4c.7-.9 1.2-2.1 1.1-3.4-1.1.1-2.4.7-3.1 1.6-.7.8-1.3 2.1-1.1 3.3 1.2.1 2.4-.6 3.1-1.5Z" />
              </svg>
              App Store
            </a>
          </div>
        </div>

        <div className="get-the-app__visual">
          <div className="get-the-app__glow" aria-hidden="true"></div>
          <Image
            className="get-the-app__screenshot"
            src="/assets/Get-The_App-Screen.webp"
            alt="Dana app home screen showing the AI chat assistant, cashflow score, and quick-access shortcuts"
            width={640}
            height={1285}
          />
        </div>
      </div>
    </section>
  );
}
