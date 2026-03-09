import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { PlusCircle, Pencil } from "lucide-react";
import { deleteProduct } from "./actions";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, name, category, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin">← Dashboard</Link>
          </Button>
          <h1 className="mt-4 text-3xl font-bold text-foreground">Products</h1>
          <p className="mt-1 text-muted-foreground">
            {products?.length ?? 0} product{(products?.length ?? 0) !== 1 ? "s" : ""}
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new" className="flex items-center gap-2">
            <PlusCircle className="size-4" /> Add New Product
          </Link>
        </Button>
      </div>

      {!products?.length ? (
        <p className="mt-12 text-muted-foreground">No products yet.</p>
      ) : (
        <div className="mt-8 divide-y divide-border rounded-lg border border-border bg-card">
          {products.map((product) => {
            const deleteAction = deleteProduct.bind(null, product.id);
            return (
              <div
                key={product.id}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">
                    {product.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {product.category
                      ? product.category
                      : "No category"}{" "}
                    ·{" "}
                    {new Date(product.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="flex items-center gap-1.5"
                    >
                      <Pencil className="size-3.5" /> Edit
                    </Link>
                  </Button>
                  <DeleteButton action={deleteAction} itemName={product.name} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
