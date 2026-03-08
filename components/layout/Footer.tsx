import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/gear", label: "Gear" },
  { href: "/destinations", label: "Destinations" },
  { href: "/about", label: "About" },
];

const socialLinks = [
  { href: "https://instagram.com", label: "Instagram", icon: Instagram },
  { href: "https://youtube.com", label: "YouTube", icon: Youtube },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <p className="text-sm font-bold tracking-tight text-foreground">Outbound</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Gear reviews, trail stories, and destinations worth the journey.
            </p>
          </div>
          {/* Nav */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            {footerLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>
          {/* Social */}
          <div className="flex items-center gap-5">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={label}
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10 border-t border-border/40 pt-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Outbound. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
