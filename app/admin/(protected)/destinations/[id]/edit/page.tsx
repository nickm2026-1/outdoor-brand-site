import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { updateDestination } from "./actions";

export default async function EditDestinationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;

  const supabase = await createClient();
  const { data: dest } = await supabase
    .from("destinations")
    .select("id, name, location, description, image_url")
    .eq("id", id)
    .single();

  if (!dest) notFound();

  const action = updateDestination.bind(null, id);

  return (
    <div className="container py-12">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/admin/destinations">← All destinations</Link>
      </Button>
      <h1 className="mt-6 text-3xl font-bold text-foreground">
        Edit Destination
      </h1>
      {error && (
        <p className="mt-6 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {decodeURIComponent(error)}
        </p>
      )}
      <form action={action} className="mt-8 max-w-xl space-y-6">
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
            defaultValue={dest.name}
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
            defaultValue={dest.location ?? ""}
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
            defaultValue={dest.description ?? ""}
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
            defaultValue={dest.image_url ?? ""}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div className="flex gap-4">
          <Button type="submit">Save changes</Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/destinations">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
