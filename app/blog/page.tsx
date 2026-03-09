import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag: activeTag } = await searchParams;
  const supabase = await createClient();

  // Fetch all posts to build the tag list
  const { data: allPosts } = await supabase
    .from("posts")
    .select("tags");

  const allTags = Array.from(
    new Set((allPosts ?? []).flatMap((p) => p.tags ?? []))
  ).sort();

  // Fetch posts, optionally filtered by tag
  let query = supabase
    .from("posts")
    .select("id, title, slug, image_url, created_at, tags")
    .order("created_at", { ascending: false });

  if (activeTag) {
    query = query.contains("tags", [activeTag]);
  }

  const { data: posts } = await query;

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold text-foreground">Blog</h1>
      <p className="mt-2 text-muted-foreground">
        Stories, trip reports, and tips from the trail.
      </p>

      {/* Tag filter bar */}
      {allTags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            href="/blog"
            className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
              !activeTag
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-muted-foreground hover:border-foreground/50 hover:text-foreground"
            }`}
          >
            All
          </Link>
          {allTags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
                activeTag === tag
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-muted-foreground hover:border-foreground/50 hover:text-foreground"
              }`}
            >
              {tag}
            </Link>
          ))}
        </div>
      )}

      {!posts?.length ? (
        <p className="mt-8 text-muted-foreground">
          {activeTag ? `No posts tagged "${activeTag}".` : "No posts yet."}
        </p>
      ) : (
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-lg border border-border bg-card transition-colors hover:bg-muted/50"
              >
                {post.image_url ? (
                  <div className="relative aspect-video w-full bg-muted">
                    <Image
                      src={post.image_url}
                      alt=""
                      fill
                      unoptimized
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-muted" />
                )}
                <div className="p-4">
                  <h2 className="font-semibold text-foreground group-hover:underline">
                    {post.title}
                  </h2>
                  <time
                    dateTime={post.created_at}
                    className="mt-1 block text-sm text-muted-foreground"
                  >
                    {new Date(post.created_at).toLocaleDateString()}
                  </time>
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
