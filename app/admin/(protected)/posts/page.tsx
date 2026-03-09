import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { PlusCircle, Pencil } from "lucide-react";
import { deletePost } from "./actions";

export default async function AdminPostsPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, slug, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin">← Dashboard</Link>
          </Button>
          <h1 className="mt-4 text-3xl font-bold text-foreground">Posts</h1>
          <p className="mt-1 text-muted-foreground">
            {posts?.length ?? 0} post{(posts?.length ?? 0) !== 1 ? "s" : ""}
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new" className="flex items-center gap-2">
            <PlusCircle className="size-4" /> Add New Post
          </Link>
        </Button>
      </div>

      {!posts?.length ? (
        <p className="mt-12 text-muted-foreground">No posts yet.</p>
      ) : (
        <div className="mt-8 divide-y divide-border rounded-lg border border-border bg-card">
          {posts.map((post) => {
            const deleteAction = deletePost.bind(null, post.id);
            return (
              <div
                key={post.id}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">
                    {post.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    · /{post.slug}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="flex items-center gap-1.5"
                    >
                      <Pencil className="size-3.5" /> Edit
                    </Link>
                  </Button>
                  <DeleteButton action={deleteAction} itemName={post.title} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
