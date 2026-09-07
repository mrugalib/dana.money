import Image from "next/image";
import "./HowItWorks.css";

/**
 * Dana AI — How It Works (design.md §8 site map item 7; component spec §5.8).
 * Ported from legacy-static-site/components/how-it-works/{how-it-works.html,how-it-works.css}.
 *
 * FLAG (carried over verbatim from the original build): the three step labels are INFERRED from
 * Dana's real product description (team page: chat -> alternative-data cashflow scoring ->
 * matched credit/products/advisors), not sourced from an existing three-step breakdown on the
 * live site — flagging for Dana's own copy review rather than presenting these as verified copy.
 *
 * Screenshots are real assets (how-it-works-screen-1/2/3.webp, 1206x2622 native), displayed via
 * next/image's `fill` mode inside the existing fixed-aspect-ratio phone bezel (`.how-it-works__phone`
 * already has position:relative) — object-fit:cover is already declared on `.how-it-works__screenshot`
 * in CSS and still applies to the Image component's className.
 */
const STEPS = [
  {
    number: "01",
    title: "Chat with Dana about your finances",
    description: "Start a quick, friendly conversation — no forms, no paperwork.",
    screenshot: "/assets/how-it-works-screen-1.webp",
    alt: "Dana chat screen showing the start of a conversation about the user's finances",
  },
  {
    number: "02",
    title: "Dana builds your cashflow score",
    description:
      "Your transaction history and digital footprint are analyzed instantly to assess affordability.",
    screenshot: "/assets/how-it-works-screen-2.webp",
    alt: "Dana screen showing the cashflow score being calculated from transaction data",
  },
  {
    number: "03",
    title: "Get matched to what fits",
    description:
      "Personalized credit, financial products, and trusted advisors — matched to your real profile.",
    screenshot: "/assets/how-it-works-screen-3.webp",
    alt: "Dana screen showing matched credit products and advisor recommendations",
  },
] as const;

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works" aria-label="How It Works">
      <div className="how-it-works__container">
        <span className="pill-badge">
          <span className="pill-badge__dot" aria-hidden="true"></span>
          Getting Started
        </span>
        <h2 className="how-it-works__headline">How It Works</h2>
        <p className="how-it-works__subhead">
          Dana builds your cash flow score through a quick, friendly chat.
        </p>

        <div className="how-it-works__process">
          <div className="how-it-works__line" aria-hidden="true"></div>

          <div className="how-it-works__steps">
            {STEPS.map((step) => (
              <div className="how-it-works__step" data-reveal key={step.number}>
                <span className="how-it-works__number">{step.number}</span>
                <h3 className="how-it-works__title">{step.title}</h3>
                <p className="how-it-works__description">{step.description}</p>
                <div className="how-it-works__phone">
                  <div className="how-it-works__notch" aria-hidden="true"></div>
                  <Image
                    className="how-it-works__screenshot"
                    src={step.screenshot}
                    alt={step.alt}
                    fill
                    sizes="(max-width: 810px) 100vw, 200px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
