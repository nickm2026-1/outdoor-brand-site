import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
              className="group flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-muted">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50" />
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                {product.category && (
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    {product.category}
                  </span>
                )}
                <h2 className="mt-2 text-base font-semibold tracking-tight text-foreground leading-snug">
                  {product.name}
                </h2>
                {product.description && (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {product.description}
                  </p>
                )}
                {product.affiliate_link && (
                  <Button size="sm" className="mt-6 w-full gap-1.5" asChild>
                    <a
                      href={product.affiliate_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Amazon <ArrowRight className="size-3.5" />
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
