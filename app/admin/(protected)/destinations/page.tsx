import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { PlusCircle, Pencil } from "lucide-react";
import { deleteDestination } from "./actions";

export default async function AdminDestinationsPage() {
  const supabase = await createClient();
  const { data: destinations } = await supabase
    .from("destinations")
    .select("id, name, location, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin">← Dashboard</Link>
          </Button>
          <h1 className="mt-4 text-3xl font-bold text-foreground">
            Destinations
          </h1>
          <p className="mt-1 text-muted-foreground">
            {destinations?.length ?? 0} destination
            {(destinations?.length ?? 0) !== 1 ? "s" : ""}
          </p>
        </div>
        <Button asChild>
          <Link
            href="/admin/destinations/new"
            className="flex items-center gap-2"
          >
            <PlusCircle className="size-4" /> Add New Destination
          </Link>
        </Button>
      </div>

      {!destinations?.length ? (
        <p className="mt-12 text-muted-foreground">No destinations yet.</p>
      ) : (
        <div className="mt-8 divide-y divide-border rounded-lg border border-border bg-card">
          {destinations.map((dest) => {
            const deleteAction = deleteDestination.bind(null, dest.id);
            return (
              <div
                key={dest.id}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">
                    {dest.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {dest.location
                      ? dest.location
                      : "No location"}{" "}
                    ·{" "}
                    {new Date(dest.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={`/admin/destinations/${dest.id}/edit`}
                      className="flex items-center gap-1.5"
                    >
                      <Pencil className="size-3.5" /> Edit
                    </Link>
                  </Button>
                  <DeleteButton action={deleteAction} itemName={dest.name} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
