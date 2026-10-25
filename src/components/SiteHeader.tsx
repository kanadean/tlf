"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Only real pages get aria-current; "/#section" links are in-page anchors
  const current = (href: string) => (href === pathname ? "page" : undefined);

  return (
    <header className="sticky top-0 z-40 bg-jamun-deep text-white shadow-[0_2px_0_var(--color-marigold)]">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/images/logos/tlf-logo.png"
            alt=""
            width={40}
            height={40}
            className="size-11 rounded-full bg-cream p-0.5"
          />
          <span className="font-display text-lg leading-tight font-semibold">
            Thane <em className="text-marigold">Literature</em> Festival
            <span className="sr-only"> {SITE.year}, home</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 text-[0.95rem] font-medium xl:gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={current(link.href)}
                  className={
                    link.href === "/#registration"
                      ? "ml-2 inline-block rounded-full bg-rani px-5 py-2 font-bold transition hover:bg-white hover:text-rani"
                      : "inline-block rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-marigold aria-[current=page]:bg-marigold aria-[current=page]:text-jamun"
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="-mr-2 p-2 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? (
            <X className="size-6" aria-hidden="true" />
          ) : (
            <Menu className="size-6" aria-hidden="true" />
          )}
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Primary"
        hidden={!open}
        className="border-t border-white/15 bg-jamun-deep px-4 pb-6 lg:hidden"
      >
        <ul className="divide-y divide-white/15">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={current(link.href)}
                onClick={() => setOpen(false)}
                className="block py-4 font-display text-2xl font-semibold hover:text-marigold aria-[current=page]:text-marigold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
