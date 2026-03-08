import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, slug, image_url, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold text-foreground">Blog</h1>
      <p className="mt-2 text-muted-foreground">
        Stories, trip reports, and tips from the trail.
      </p>
      {!posts?.length ? (
        <p className="mt-8 text-muted-foreground">No posts yet.</p>
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
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
