"use client";

import Link from "next/link";
import { Recycle } from "lucide-react";

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
    ],
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
              <span>PolyRecycle</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Making polystyrene recycling accessible to everyone. Learn, play,
              and make a difference for our planet.
            </p>
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
            &copy; {currentYear} PolyRecycle. Built to educate and inspire
            polystyrene recycling efforts worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
