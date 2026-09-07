import Image from "next/image";
import "./TrustBar.css";

/**
 * Dana AI — Trust Bar, partner logo strip (design.md §5.5).
 * Ported from legacy-static-site/components/trust-bar/. No client-side behavior — plain Server
 * Component. Previously a "pending" stat-strip (dashed border + "—") because no partner logos
 * existed yet — see git history / design.md §9. Logos below are the real partners listed on
 * https://dana.money/lab ("Trusted by Leading Financial Institutions"), sourced from
 * dana.money/partner_logos/*.png.
 */
const PARTNERS = [
  { name: "LightCastle Partners", file: "LCP.png" },
  { name: "LankaBangla Finance", file: "LankaBangla.png" },
  { name: "UCB", file: "UCB.png" },
  { name: "SSLCommerz", file: "ssl.png" },
  { name: "SAJIDA Foundation", file: "sajida.png" },
];

export default function TrustBar() {
  return (
    <section className="trust-bar" id="trust-bar" aria-label="Trusted by leading financial institutions">
      <div className="trust-bar__container">
        <p className="trust-bar__heading">Trusted by leading financial institutions</p>
        <div className="trust-bar__grid">
          {PARTNERS.map((partner) => (
            <div className="trust-bar__card" data-reveal key={partner.name}>
              <Image
                className="trust-bar__logo"
                src={`/partner_logos/${partner.file}`}
                alt={`${partner.name} logo`}
                width={96}
                height={32}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
