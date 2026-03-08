import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/gear", label: "Gear" },
  { href: "/destinations", label: "Destinations" },
  { href: "/about", label: "About" },
];

export async function Navigation() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <nav className="max-w-7xl mx-auto px-6 flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-base font-bold tracking-tight text-foreground hover:text-foreground/80 transition-colors"
        >
          Outbound
        </Link>
        <div className="flex items-center gap-0.5">
          {navLinks.map(({ href, label }) => (
            <Button key={href} variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-foreground" asChild>
              <Link href={href}>{label}</Link>
            </Button>
          ))}
          {user && (
            <Button variant="outline" size="sm" className="ml-2" asChild>
              <Link href="/admin">Admin</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
