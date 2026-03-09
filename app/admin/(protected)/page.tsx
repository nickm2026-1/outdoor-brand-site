import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { PlusCircle, LayoutList } from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const [
    { count: postsCount },
    { count: productsCount },
    { count: destinationsCount },
  ] = await Promise.all([
    supabase.from("posts").select("id", { count: "exact", head: true }),
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("destinations").select("id", { count: "exact", head: true }),
  ]);

  const cards = [
    {
      label: "Posts",
      count: postsCount ?? 0,
      unit: "post",
      listHref: "/admin/posts",
      newHref: "/admin/posts/new",
    },
    {
      label: "Products",
      count: productsCount ?? 0,
      unit: "product",
      listHref: "/admin/products",
      newHref: "/admin/products/new",
    },
    {
      label: "Destinations",
      count: destinationsCount ?? 0,
      unit: "destination",
      listHref: "/admin/destinations",
      newHref: "/admin/destinations/new",
    },
  ];

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Manage posts, products, and destinations.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ label, count, unit, listHref, newHref }) => (
          <div key={label} className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-semibold text-foreground">{label}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {count} {unit}{count !== 1 ? "s" : ""}
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Button asChild>
                <Link href={listHref} className="flex items-center gap-2">
                  <LayoutList className="size-4" /> Manage {label}
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={newHref} className="flex items-center gap-2">
                  <PlusCircle className="size-4" /> Add New {unit.charAt(0).toUpperCase() + unit.slice(1)}
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 flex gap-4">
        <Button variant="outline" asChild>
          <Link href="/">View site</Link>
        </Button>
      </div>
    </div>
  );
}
