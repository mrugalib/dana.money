import Link from "next/link";
import "./ComingSoon.css";

/**
 * Honest placeholder for routes with no real content anywhere in this project (/team, /lab —
 * see design.md §9). No bios/feature copy are fabricated; this just says so plainly and offers
 * a way back, rather than shipping an empty-looking page or invented marketing filler.
 */
export default function ComingSoon({
  eyebrow,
  heading,
  body,
}: {
  eyebrow: string;
  heading: string;
  body: string;
}) {
  return (
    <main className="coming-soon">
      <span className="pill-badge">
        <span className="pill-badge__dot" aria-hidden="true" />
        {eyebrow}
      </span>
      <h1 className="coming-soon__heading">{heading}</h1>
      <p className="coming-soon__body">{body}</p>
      <Link href="/" className="btn btn--secondary">Back to home</Link>
    </main>
  );
}
