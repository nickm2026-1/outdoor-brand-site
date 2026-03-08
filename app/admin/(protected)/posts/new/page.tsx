import Link from "next/link";
import { createPost } from "./actions";
import { Button } from "@/components/ui/button";
import { RichMarkdownEditor } from "@/components/admin/RichMarkdownEditor";

export default async function NewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <div className="container py-12">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/admin">← Dashboard</Link>
      </Button>
      <h1 className="mt-6 text-3xl font-bold text-foreground">Add New Post</h1>
      <p className="mt-2 text-muted-foreground">
        Slug is generated from the title.
      </p>
      {error && (
        <p className="mt-6 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {decodeURIComponent(error)}
        </p>
      )}
      <form action={createPost} className="mt-8 max-w-xl space-y-6">
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
            className="mt-2"
          />
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
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            If you upload a file, it will be used instead of the URL.
          </p>
        </div>
        <div className="flex gap-4">
          <Button type="submit">Publish post</Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
