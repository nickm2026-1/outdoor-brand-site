import Link from "next/link";
import { createProduct } from "./actions";
import { Button } from "@/components/ui/button";

export default async function NewProductPage({
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
      <h1 className="mt-6 text-3xl font-bold text-foreground">
        Add New Product
      </h1>
      <p className="mt-2 text-muted-foreground">
        Affiliate link will show a &quot;View on Amazon&quot; button.
      </p>
      {error && (
        <p className="mt-6 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {decodeURIComponent(error)}
        </p>
      )}
      <form action={createProduct} className="mt-8 max-w-xl space-y-6">
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div>
          <label
            htmlFor="affiliate_link"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Affiliate link
          </label>
          <input
            id="affiliate_link"
            name="affiliate_link"
            type="url"
            placeholder="https://..."
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div>
          <label
            htmlFor="image_url"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Image URL
          </label>
          <input
            id="image_url"
            name="image_url"
            type="url"
            placeholder="https://..."
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Category
          </label>
          <input
            id="category"
            name="category"
            type="text"
            placeholder="e.g. Tents, Sleeping Bags"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div className="flex gap-4">
          <Button type="submit">Add product</Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
