import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { RichMarkdownEditor } from "@/components/admin/RichMarkdownEditor";
import { updatePost } from "./actions";

export default async function EditPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;

  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("id, title, content, image_url, slug, tags")
    .eq("id", id)
    .single();

  if (!post) notFound();

  const action = updatePost.bind(null, id);

  return (
    <div className="container py-12">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/admin/posts">← All posts</Link>
      </Button>
      <h1 className="mt-6 text-3xl font-bold text-foreground">Edit Post</h1>
      <p className="mt-2 text-muted-foreground">
        Slug <code className="rounded bg-muted px-1 py-0.5 text-xs">/{post.slug}</code> is preserved to avoid breaking live URLs.
      </p>
      {error && (
        <p className="mt-6 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {decodeURIComponent(error)}
        </p>
      )}
      <form action={action} className="mt-8 max-w-xl space-y-6">
        <div>
          <label
            htmlFor="title"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={post.title}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Content (Markdown)
          </label>
          <RichMarkdownEditor
            name="content"
            id="content"
            required
            defaultValue={post.content}
            className="mt-2"
          />
        </div>
        <div>
          <label
            htmlFor="tags"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Tags
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            placeholder="hiking, gear, review"
            defaultValue={(post.tags ?? []).join(", ")}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Separate multiple tags with commas.
          </p>
        </div>
        <div>
          <label
            htmlFor="image_url"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Image (upload) or Image URL
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-2 file:text-sm file:font-medium file:text-foreground hover:file:bg-muted/70"
          />
          <input
            id="image_url"
            name="image_url"
            type="url"
            placeholder="https://..."
            defaultValue={post.image_url ?? ""}
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Upload a new file to replace the current image, or update the URL. Leave both empty to keep the existing image.
          </p>
        </div>
        <div className="flex gap-4">
          <Button type="submit">Save changes</Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/posts">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
