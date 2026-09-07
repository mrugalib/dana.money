import Image from "next/image";
import Link from "next/link";
import "./Footer.css";

/**
 * Dana AI — Footer.
 * Recreates the Finorix Framer template's footer design system (finorix.framer.website, footer
 * section: giant low-contrast wordmark on the left, three link columns — Pages / Legal / Social
 * Link — on the right, then a divider + two-sided bottom bar), re-skinned with Dana's real
 * brand/content instead of Finorix's:
 *   - The giant wordmark is Dana's own logo (public/assets/dana_logo_dark.svg — the black variant,
 *     correct for this section's light background) rather than a re-typeset "Dana" wordmark, sized
 *     via the same height-driven clamp() system the original text version used (see
 *     .footer__wordmark in Footer.css) so the footprint is unchanged.
 *   - Column contents map to routes that actually exist in this app (see app/*), not a literal
 *     copy of Finorix's placeholder links (Help Center/Changelog don't exist for Dana). "Legal"
 *     keeps only the two genuinely legal pages; Team/Media/Career — previously grouped under
 *     "About" in the old 4-column footer — now live under "Pages" instead of being force-fit into
 *     "Legal" just to hit a matching item count.
 *   - Social Link lists Dana's three real profiles (LinkedIn/Facebook/YouTube) as plain text,
 *     same as Finorix's own text-only social column — no Twitter/Instagram, Dana doesn't have
 *     those accounts.
 *   - Bottom bar: left keeps the site's existing copyright line; right swaps Finorix's agency
 *     attribution ("All right reserved @ Orbix.studio" — not applicable here) for Dana's real
 *     contact address, already used the same way elsewhere (see mailto link).
 * No client-side behavior (the old newsletter form is gone with this redesign) — plain Server
 * Component.
 */
export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__wordmark" aria-hidden="true">
            <Image
              src="/assets/dana_logo_dark.svg"
              alt=""
              width={480}
              height={180}
              className="footer__wordmark-logo"
            />
          </div>

          <div className="footer__links">
            <div className="footer__column">
              <h3 className="footer__column-title">Pages</h3>
              <ul className="footer__column-list">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/lab">Dana Labs</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/team">Team</Link></li>
                <li><Link href="/career">Career</Link></li>
              </ul>
            </div>
            <div className="footer__column">
              <h3 className="footer__column-title">Legal</h3>
              <ul className="footer__column-list">
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms &amp; Conditions</Link></li>
              </ul>
            </div>
            <div className="footer__column">
              <h3 className="footer__column-title">Social Link</h3>
              <ul className="footer__column-list">
                <li><a href="https://linkedin.com/company/danafintech" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://facebook.com/danafintech" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                <li><a href="https://youtube.com/@danafintechltd" target="_blank" rel="noopener noreferrer">YouTube</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">© 2026 Dana. All rights reserved.</p>
          <a href="mailto:hello@dana.money" className="footer__contact">hello@dana.money</a>
        </div>
      </div>
    </footer>
  );
}
