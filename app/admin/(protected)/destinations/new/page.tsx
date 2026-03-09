import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createDestination } from "./actions";

export default async function NewDestinationPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="container py-12">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/admin/destinations">← All destinations</Link>
      </Button>
      <h1 className="mt-6 text-3xl font-bold text-foreground">
        Add New Destination
      </h1>
      {error && (
        <p className="mt-6 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {decodeURIComponent(error)}
        </p>
      )}
      <form action={createDestination} className="mt-8 max-w-xl space-y-6">
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
            placeholder="e.g. Snowdonia, Wales"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div>
          <label
            htmlFor="location"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="e.g. North Wales, UK"
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
            placeholder="A short description of this destination…"
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
        <div className="flex gap-4">
          <Button type="submit">Add Destination</Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/destinations">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
