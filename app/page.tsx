import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { BookOpen, ShoppingBag, MapPin, ArrowRight } from "lucide-react";

export default async function Home() {
  const supabase = await createClient();

  const [postsResult, productsResult, destinationsResult] = await Promise.all([
    supabase
      .from("posts")
      .select("id, title, slug, image_url, created_at")
      .order("created_at", { ascending: false })
      .limit(3),
    supabase
      .from("products")
      .select("id, name, image_url, category, affiliate_link")
      .order("created_at", { ascending: false })
      .limit(3),
    supabase
      .from("destinations")
      .select("id, name, location, image_url")
      .limit(3),
  ]);

  const posts = postsResult.data ?? [];
  const products = productsResult.data ?? [];
  const destinations = destinationsResult.data ?? [];

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] overflow-hidden">
        <Image
          src="/hero-camping.png"
          alt="Camping at sunrise in the mountains"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" aria-hidden />
        <div className="relative z-10 flex min-h-[90vh] flex-col justify-end pb-20 md:pb-28">
          <div className="max-w-7xl mx-auto w-full px-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              The Outbound Journal
            </p>
            <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-white md:text-7xl leading-[1.05]">
              Gear up.<br />Get out.<br />Go further.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">
              Destinations, gear picks, and stories from the trail. Your next
              adventure starts here.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button size="lg" className="gap-2 bg-white text-black hover:bg-white/90" asChild>
                <Link href="/destinations">
                  Explore Destinations <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/10 hover:text-white border border-white/30"
                asChild
              >
                <Link href="/blog">Read the blog</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Introduction ─────────────────────────────────────────── */}
      <section className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Welcome
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              We live for the trail, the summit, and the campfire.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Outbound is an independent journal built by outdoor enthusiasts — hikers, campers, climbers, and anyone who believes the best moments in life happen outside. Here you&apos;ll find honest gear reviews, trip reports from routes worth knowing, and destination guides to places we keep coming back to.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              No sponsored fluff. Just real kit, real trails, and real adventures.
            </p>
          </div>
        </div>
      </section>

      {/* ── Latest from the Blog ─────────────────────────────────── */}
      <section className="bg-muted/30 py-24 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3 flex items-center gap-2">
                <BookOpen className="size-3.5" /> From the journal
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Latest stories
              </h2>
            </div>
            {posts.length > 0 && (
              <Button variant="ghost" className="gap-1 shrink-0 self-start sm:self-auto" asChild>
                <Link href="/blog">All posts <ArrowRight className="size-4" /></Link>
              </Button>
            )}
          </div>
          {posts.length === 0 ? (
            <p className="text-muted-foreground">No posts yet. Check back soon.</p>
          ) : (
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-muted">
                      {post.image_url ? (
                        <Image
                          src={post.image_url}
                          alt=""
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50" />
                      )}
                    </div>
                    <div className="p-5">
                      <time
                        dateTime={post.created_at}
                        className="block text-xs font-medium uppercase tracking-wide text-muted-foreground"
                      >
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      <h3 className="mt-2 text-base font-semibold leading-snug tracking-tight text-foreground group-hover:text-foreground/80 transition-colors">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ── Destinations CTA Hero ─────────────────────────────────── */}
      <section className="relative min-h-[50vh] overflow-hidden flex items-center">
        {/* Gradient background — swap for an image by adding an <Image fill …> here */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-neutral-800 to-stone-700" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,200,100,0.15),_transparent_60%)]" aria-hidden />
        <div className="relative z-10 w-full py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/50 flex items-center gap-2">
                <MapPin className="size-3.5" /> Destinations
              </p>
              <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl leading-tight">
                Where will the trail take you next?
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/70">
                From coastal trails to high-alpine scrambles — explore hand-picked destinations worth the journey.
              </p>
              <Button
                size="lg"
                className="mt-10 gap-2 bg-white text-black hover:bg-white/90"
                asChild
              >
                <Link href="/destinations">
                  View all destinations <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Gear ─────────────────────────────────────────── */}
      <section className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3 flex items-center gap-2">
                <ShoppingBag className="size-3.5" /> Affiliate gear
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Kit we trust on the trail
              </h2>
            </div>
            {products.length > 0 && (
              <Button variant="ghost" className="gap-1 shrink-0 self-start sm:self-auto" asChild>
                <Link href="/gear">All gear <ArrowRight className="size-4" /></Link>
              </Button>
            )}
          </div>
          {products.length === 0 ? (
            <p className="text-muted-foreground">No products yet. Check back soon.</p>
          ) : (
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <li key={product.id}>
                  <div className="group overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col">
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
                    <div className="flex flex-1 flex-col p-5">
                      {product.category && (
                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                          {product.category}
                        </span>
                      )}
                      <h3 className="mt-1.5 text-base font-semibold tracking-tight text-foreground leading-snug">
                        {product.name}
                      </h3>
                      {product.affiliate_link && (
                        <Button size="sm" className="mt-auto pt-4" asChild>
                          <a
                            href={product.affiliate_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 flex items-center gap-1.5"
                          >
                            View on Amazon <ArrowRight className="size-3.5" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
