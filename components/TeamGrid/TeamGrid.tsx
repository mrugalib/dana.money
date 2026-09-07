import Image from "next/image";
import "./TeamGrid.css";

/**
 * Dana AI — /team page content: real founder bios, replacing the previous ComingSoon placeholder
 * now that Dana has supplied names/titles/photos/copy (see app/team/page.tsx history for the
 * prior "no content exists" flag — no longer true). No client-side behavior — plain Server
 * Component. Reuses existing design tokens only (card treatment matches why-dana/pricing cards:
 * --color-bg-elevated fill, --color-border-subtle border, --radius-lg, --shadow-card). Each card
 * also reuses the About Us butterfly.gif as a small decorative accent pinned to a top corner.
 */
const TEAM = [
  {
    name: "Gazi Yar Mohammed",
    title: "CEO & Co-founder, Dana",
    photo: "/assets/Gazi-Yaar-Mohammad-image.png",
    bio: "Gazi Yar Mohammed is a veteran banker with over 20 years of experience in banking and fintech. As a former C-level banking executive for 18 years, he has a proven track record in retail and digital banking, digital lending, alternate credit scoring, digital payments, and fintech innovation.",
  },
  {
    name: "Zia Hassan Siddique",
    title: "COO & Co-founder, Dana",
    photo: "/assets/ZIa-Hassan_Siddique-image.jpeg",
    bio: "Zia Hassan Siddique has 10+ years of experience in retail banking and 9+ years in software technology and IT-enabled services. A former banker turned entrepreneur, he worked with global financial institutions like Standard Chartered Bank, leading large-scale projects in branch banking, product management, business finance, and performance optimization.",
  },
];

export default function TeamGrid() {
  return (
    <section className="team-grid" id="team" aria-label="Meet the team">
      <div className="team-grid__container">
        <div className="team-grid__intro" data-reveal>
          <span className="pill-badge">
            <span className="pill-badge__dot" aria-hidden="true"></span>
            About
          </span>
          <h1 className="team-grid__headline">Meet the team</h1>
        </div>

        <div className="team-grid__grid">
          {TEAM.map((member, i) => (
            <div
              className="team-grid__item"
              data-reveal
              key={member.name}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="team-grid__card">
                <Image
                  className="team-grid__butterfly"
                  src="/assets/butterfly.gif"
                  alt=""
                  width={96}
                  height={96}
                  unoptimized
                  aria-hidden="true"
                />
                <div className="team-grid__photo-frame">
                  <Image
                    className="team-grid__photo"
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(max-width: 810px) 160px, 200px"
                  />
                </div>
                <h2 className="team-grid__name">{member.name}</h2>
                <p className="team-grid__title">{member.title}</p>
                <p className="team-grid__bio">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
