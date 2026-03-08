import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Manage posts, products, and destinations.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="font-semibold text-foreground">Posts</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {postsCount ?? 0} post{(postsCount ?? 0) !== 1 ? "s" : ""}
          </p>
          <Button className="mt-4" asChild>
            <Link href="/admin/posts/new">Add New Post</Link>
          </Button>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="font-semibold text-foreground">Products</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {productsCount ?? 0} product{(productsCount ?? 0) !== 1 ? "s" : ""}
          </p>
          <Button className="mt-4" asChild>
            <Link href="/admin/products/new">Add New Product</Link>
          </Button>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="font-semibold text-foreground">Destinations</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {destinationsCount ?? 0} destination
            {(destinationsCount ?? 0) !== 1 ? "s" : ""}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Manage via Supabase dashboard for now.
          </p>
        </div>
      </div>
      <div className="mt-10 flex gap-4">
        <Button variant="outline" asChild>
          <Link href="/">View site</Link>
        </Button>
      </div>
    </div>
  );
}
