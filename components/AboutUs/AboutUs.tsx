import Image from "next/image";
import Link from "next/link";
import "./AboutUs.css";

/**
 * Dana AI — About Us section, placed after TrustBar on the homepage.
 * Two-column layout: eyebrow + headline + body copy on the left, the butterfly.gif motif on the
 * right (public/assets/butterfly.gif — a pre-matted transparent GIF, no background-removal
 * processing needed; verified via PIL that every frame carries a GIF89a transparency index, see
 * build notes). No client-side behavior — plain Server Component. Reuses existing design tokens.
 */
export default function AboutUs() {
  return (
    <section className="about-us" id="about-us" aria-label="About Us">
      <div className="about-us__container">
        <div className="about-us__intro" data-reveal>
          <span className="pill-badge">
            <span className="pill-badge__dot" aria-hidden="true"></span>
            About Us
          </span>

          <h2 className="about-us__headline">
            <span className="about-us__line">Financial matchmaking,</span>
            <span className="about-us__line">built for the underserved.</span>
          </h2>

          <p className="about-us__body">
            Dana AI is an AI-powered financial assistant for personal and business finance,
            tackling the challenge faced by millions in Bangladesh who remain underserved by
            formal credit due to invisibility in traditional systems. By using alternative data
            such as transaction history and digital footprints, Dana instantly assesses
            affordability and matches users with suitable credit, financial products, and trusted
            advisors—offering fast, fair, and personalized financial matchmaking for users, and
            automated, high-intent lead generation for lenders and MFIs. It also provides
            gamified financial literacy with rewards, enabling users to earn cashback while
            learning through short, engaging video content.
          </p>

          <Link href="/team" className="btn btn--secondary about-us__cta">
            More about us
          </Link>
        </div>

        <div className="about-us__visual" data-reveal style={{ transitionDelay: "120ms" }}>
          <Image
            className="about-us__gif"
            src="/assets/butterfly.gif"
            alt=""
            width={500}
            height={500}
            unoptimized
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
