"use client";

import Link from "next/link";
import { Recycle, Instagram } from "lucide-react";
import { NewsletterSignup } from "@/components/newsletter-signup";

const linkGroups = [
  {
    title: "Learn",
    links: [
      { href: "/about", label: "About" },
      { href: "/fun-facts", label: "Fun Facts" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Interact",
    links: [
      { href: "/quiz", label: "Quiz" },
      { href: "/games", label: "Games" },
      { href: "/environmental-impact", label: "Impact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/how-to-recycle", label: "How to Recycle" },
      { href: "/myths-vs-facts", label: "Myths vs Facts" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/polystyreneguy",
    icon: Instagram,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@polystyreneguy",
    // Using a simple SVG inline for TikTok since lucide doesn't have it
    icon: null,
    svgPath:
      "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.82a4.84 4.84 0 01-1-.13z",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@polystyreneguy",
    icon: null,
    svgPath:
      "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass border-t border-border/30 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-lg font-bold text-primary"
            >
              <Recycle className="h-6 w-6" />
              <span>@PolystyreneGuy</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Making polystyrene recycling simple, fun, and accessible for everyone.
              One foam cup at a time.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  {link.icon ? (
                    <link.icon className="h-5 w-5 text-primary" />
                  ) : (
                    <svg
                      className="h-5 w-5 text-primary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={link.svgPath} />
                    </svg>
                  )}
                </a>
              ))}
            </div>

            <div className="mt-5">
              <p className="text-sm font-medium mb-2">Stay Updated</p>
              <NewsletterSignup />
            </div>
          </div>

          {/* Link groups */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/30 py-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {currentYear} Made with love by @PolystyreneGuy. Educating the world on polystyrene recycling.
          </p>
        </div>
      </div>
    </footer>
  );
}
