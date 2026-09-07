import BlogCard from "@/components/BlogCard/BlogCard";
import { getAllPosts } from "@/lib/blog-posts";
import "./BlogIndex.css";

/**
 * Dana Blog — index page (/blog). Lists every post as a card; the most recent post runs as a
 * wide "featured" card above the grid. Content comes from lib/blog-posts.ts (real dana.money
 * articles — see that file's header for sourcing/fidelity notes). Plain Server Component.
 */
export default function BlogIndex() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <main className="blog-index">
      <section className="blog-index__hero" aria-label="Dana Blog">
        <div className="blog-index__hero-container">
          <span className="pill-badge">
            <span className="pill-badge__dot" aria-hidden="true"></span>
            Dana Blog
          </span>
          <h1 className="blog-index__headline">Ideas on money, fintech, and the future of banking</h1>
          <p className="blog-index__subhead">
            Straight talk on spending psychology, AI-driven lending, and building smarter financial
            habits — from the team building Dana.
          </p>
        </div>
      </section>

      <section className="blog-index__content" aria-label="All articles">
        <div className="blog-index__container">
          {featured && (
            <BlogCard
              slug={featured.slug}
              title={featured.title}
              date={featured.date}
              tags={featured.tags}
              readTimeMinutes={featured.readTimeMinutes}
              imageUrl={featured.imageUrl}
              featured
            />
          )}

          <div className="blog-index__grid">
            {rest.map((post) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                date={post.date}
                tags={post.tags}
                readTimeMinutes={post.readTimeMinutes}
                imageUrl={post.imageUrl}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
