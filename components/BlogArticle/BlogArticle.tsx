import Link from "next/link";
import BlogCard from "@/components/BlogCard/BlogCard";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog-posts";
import "./BlogArticle.css";

/**
 * Dana Blog — single article page (/blog/[slug]). Renders the post body (paragraphs, plus "## "
 * lines as in-article headings) and a "Related articles" grid at the bottom, matched by shared
 * tag via getRelatedPosts (see lib/blog-posts.ts — dana.money's own article pages have no related-
 * posts section, this is new IA built on top of the real content). Plain Server Component.
 */
export default function BlogArticle({ slug }: { slug: string }) {
  const post = getPostBySlug(slug);
  if (!post) return null;

  const related = getRelatedPosts(post);

  return (
    <main className="blog-article">
      <article className="blog-article__container">
        <Link href="/blog" className="blog-article__back">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All articles
        </Link>

        <div className="blog-article__meta">
          <span className="pill-badge">
            <span className="pill-badge__dot" aria-hidden="true"></span>
            {post.tags[0]}
          </span>
          <time>{post.date}</time>
          <span className="blog-article__meta-dot" aria-hidden="true"></span>
          <span>{post.readTimeMinutes} min read</span>
        </div>

        <h1 className="blog-article__title">{post.title}</h1>

        <div className="blog-article__body">
          {post.body.map((paragraph, index) =>
            paragraph.startsWith("## ") ? (
              <h2 className="blog-article__heading" key={index}>
                {paragraph.slice(3)}
              </h2>
            ) : (
              <p key={index}>{paragraph}</p>
            )
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="blog-article__related" aria-label="Related articles">
          <div className="blog-article__related-container">
            <h2 className="blog-article__related-headline">Related articles</h2>
            <div className="blog-article__related-grid">
              {related.map((relatedPost) => (
                <BlogCard
                  key={relatedPost.slug}
                  slug={relatedPost.slug}
                  title={relatedPost.title}
                  date={relatedPost.date}
                  tags={relatedPost.tags}
                  readTimeMinutes={relatedPost.readTimeMinutes}
                  imageUrl={relatedPost.imageUrl}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
