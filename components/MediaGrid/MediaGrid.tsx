import Image from "next/image";
import "./MediaGrid.css";

/**
 * Dana AI — /media page content.
 * Sourced from Dana's own live media API (platform.dana.money/api/v1/media/h, fetched directly —
 * the public dana.money/media page itself renders this client-side via JS, so a plain page fetch
 * only returns a "Loading Media..." shell with no content). All 3 currently-published posts as of
 * this build: real titles, real publish dates, real featured images (downloaded to
 * public/assets/media/ so they don't depend on hotlinking platform.dana.money's storage). Static
 * data, not a live client-side fetch — same "server component with hardcoded data" pattern as
 * every other content page in this migration (ProblemSolution, FeatureGrid, TeamGrid, etc.).
 *
 * Layout: the live site's own "In The News" section uses one large spotlight card (their `center`
 * position) plus two smaller stacked cards (`right-top`/`right-bottom`) — reproduced here as a
 * magazine-style 2-column split. The live site *also* re-renders all posts a second time in an
 * "Other Mentions" grid below (visible in their page bundle) — with exactly 3 posts total, that
 * would just repeat the same 3 cards a second time, so it's intentionally not carried over here;
 * add new posts to MEDIA below and the spotlight layout will need a 4th slot (see comment on
 * OTHER below) once there's a fourth publish.
 */
const SPOTLIGHT = {
  title: "Dana Fintech wins major award for innovation in AI-driven finance",
  blurb:
    "Dana Fintech Ltd. has been honoured with the “FinTech Innovation of the Year – Tech” award at the Mastercard presents 3rd Bangladesh Fintech Award, powered by Prime Bank, in recognition of its pioneering innovation — Dana AI.",
  image: "/assets/media/dana-fintech-award.jpg",
  date: "January 5, 2026",
  readingTime: "1 min read",
};

const SIDE = [
  {
    title: "Dana Wins Fintech Innovation of the Year (Tech)",
    image: "/assets/media/fintech-innovation-award.png",
    date: "January 5, 2026",
    readingTime: "1 min read",
  },
  {
    title: "Dana Fintech launches Bangladesh’s first AI-powered financial assistant",
    image: "/assets/media/dana-launch.jpg",
    date: "January 5, 2026",
    readingTime: "1 min read",
  },
];

export default function MediaGrid() {
  return (
    <section className="media-grid" id="media" aria-label="Dana in the media">
      <div className="media-grid__container">
        <div className="media-grid__intro" data-reveal>
          <span className="pill-badge">
            <span className="pill-badge__dot" aria-hidden="true"></span>
            Media
          </span>
          <h1 className="media-grid__headline">In the News</h1>
          <p className="media-grid__body">
            Press coverage and award recognition for Dana&rsquo;s work in AI-driven financial
            services.
          </p>
        </div>

        <div className="media-grid__spotlight-row">
          <article className="media-grid__spotlight" data-reveal>
            <div className="media-grid__spotlight-photo-frame">
              <Image
                className="media-grid__photo"
                src={SPOTLIGHT.image}
                alt={SPOTLIGHT.title}
                fill
                sizes="(max-width: 810px) 100vw, 60vw"
                priority
              />
            </div>
            <p className="media-grid__meta">
              {SPOTLIGHT.date} &middot; {SPOTLIGHT.readingTime}
            </p>
            <h2 className="media-grid__spotlight-title">{SPOTLIGHT.title}</h2>
            <p className="media-grid__spotlight-blurb">{SPOTLIGHT.blurb}</p>
          </article>

          <div className="media-grid__side-stack">
            {SIDE.map((item, i) => (
              <article
                className="media-grid__side-card"
                data-reveal
                key={item.title}
                style={{ transitionDelay: `${(i + 1) * 100}ms` }}
              >
                <div className="media-grid__side-photo-frame">
                  <Image
                    className="media-grid__photo"
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 810px) 100vw, 35vw"
                  />
                </div>
                <p className="media-grid__meta">
                  {item.date} &middot; {item.readingTime}
                </p>
                <h3 className="media-grid__side-title">{item.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
