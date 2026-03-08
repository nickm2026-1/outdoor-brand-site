import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

export default async function GearPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, name, description, image_url, category, affiliate_link")
    .order("created_at", { ascending: false });

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold text-foreground">Gear</h1>
      <p className="mt-2 text-muted-foreground">
        Kit we use and recommend. Affiliate links support our work.
      </p>
      {!products?.length ? (
        <p className="mt-10 text-muted-foreground">No products yet.</p>
      ) : (
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li
              key={product.id}
              className="overflow-hidden rounded-lg border border-border bg-card"
            >
              {product.image_url ? (
                <div className="relative aspect-square w-full bg-muted">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="aspect-square w-full bg-muted" />
              )}
              <div className="p-5">
                {product.category && (
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {product.category}
                  </span>
                )}
                <h2 className="mt-1 text-lg font-semibold text-foreground">
                  {product.name}
                </h2>
                {product.description && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {product.description}
                  </p>
                )}
                {product.affiliate_link && (
                  <Button
                    size="sm"
                    className="mt-4 w-full"
                    asChild
                  >
                    <a
                      href={product.affiliate_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Amazon
                    </a>
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
