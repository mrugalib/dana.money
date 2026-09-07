import Image from "next/image";
import Link from "next/link";
import "./BlogCard.css";

/**
 * Dana Blog — shared card, used by both the /blog index grid and the "Related articles" section
 * on each article page. The banner is a real, topically-relevant stock photo (see
 * lib/blog-posts.ts, imageUrlFor/imageKeywords) rather than the earlier flat-color gradient — a
 * dark scrim behind the tag keeps it legible over any photo. The tag's accent color (blue/green)
 * now only drives the hover border, same tokens as before.
 *
 * No excerpt text below the title — dropped deliberately so the photo (the point of adding real
 * images) has a bigger, uncramped banner instead of being squeezed by a paragraph of body copy.
 */
const TAG_COLOR_CYCLE = ["blue", "green"] as const;

function colorForTag(tag: string): (typeof TAG_COLOR_CYCLE)[number] {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = (hash + tag.charCodeAt(i)) % TAG_COLOR_CYCLE.length;
  return TAG_COLOR_CYCLE[hash];
}

export default function BlogCard({
  slug,
  title,
  date,
  tags,
  readTimeMinutes,
  imageUrl,
  featured = false,
}: {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  readTimeMinutes: number;
  imageUrl: string;
  featured?: boolean;
}) {
  const primaryTag = tags[0];
  const color = colorForTag(primaryTag);

  return (
    <Link
      href={`/blog/${slug}`}
      className={`blog-card blog-card--${color}${featured ? " blog-card--featured" : ""}`}
      data-reveal
    >
      <div className="blog-card__banner">
        <Image
          src={imageUrl}
          alt=""
          fill
          sizes={featured ? "(max-width: 810px) 100vw, 50vw" : "(max-width: 810px) 50vw, (max-width: 1200px) 50vw, 33vw"}
          className="blog-card__banner-image"
        />
        <span className="blog-card__banner-scrim" aria-hidden="true"></span>
        <span className="blog-card__banner-tag">{primaryTag}</span>
      </div>
      <div className="blog-card__body">
        <div className="blog-card__meta">
          <time>{date}</time>
          <span className="blog-card__meta-dot" aria-hidden="true"></span>
          <span>{readTimeMinutes} min read</span>
        </div>
        <h3 className="blog-card__title">{title}</h3>
        <span className="blog-card__cta">
          Read article
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
