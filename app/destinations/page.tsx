import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export default async function DestinationsPage() {
  const supabase = await createClient();
  const { data: destinations } = await supabase
    .from("destinations")
    .select("id, name, location, description, image_url")
    .order("name");

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold text-foreground">Destinations</h1>
      <p className="mt-2 text-muted-foreground">
        Places we love to hike, camp, and explore.
      </p>
      {!destinations?.length ? (
        <p className="mt-10 text-muted-foreground">No destinations yet.</p>
      ) : (
        <ul className="mt-10 grid gap-8 md:grid-cols-2">
          {destinations.map((dest) => (
            <li
              key={dest.id}
              className="overflow-hidden rounded-lg border border-border bg-card"
            >
              {dest.image_url ? (
                <div className="relative aspect-[16/10] w-full bg-muted">
                  <Image
                    src={dest.image_url}
                    alt={dest.name}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ) : (
                <div className="aspect-[16/10] w-full bg-muted" />
              )}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-foreground">
                  {dest.name}
                </h2>
                {dest.location && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {dest.location}
                  </p>
                )}
                {dest.description && (
                  <p className="mt-3 text-muted-foreground">
                    {dest.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
