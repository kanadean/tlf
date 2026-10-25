import Image from "next/image";
import { SITE } from "@/lib/site";

type Logo = { name: string; logo: string; width: number; height: number; href: string | null };

// Rendered height (sm:h-12); intrinsic size is scaled to match so srcset stays small
const LOGO_HEIGHT = 48;

function LogoRow({ title, logos, note }: { title: string; logos: readonly Logo[]; note?: string }) {
  return (
    <div>
      <h2 className="text-xs tracking-[0.3em] text-gold-deep uppercase">{title}</h2>
      <ul className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-6">
        {logos.map((l) => {
          const img = (
            <Image
              src={l.logo}
              alt={l.name}
              width={Math.round((l.width / l.height) * LOGO_HEIGHT)}
              height={LOGO_HEIGHT}
              className="h-10 w-auto mix-blend-multiply sm:h-12"
            />
          );
          return (
            <li key={l.name}>
              {l.href ? (
                <a href={l.href} target="_blank" rel="noopener noreferrer">
                  {img}
                </a>
              ) : (
                img
              )}
            </li>
          );
        })}
      </ul>
      {note && <p className="mt-4 text-sm text-ink-muted italic">{note}</p>}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t-4 border-double border-ink bg-parchment px-4 pt-16 pb-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2">
          <LogoRow title="Presented by" logos={SITE.organisers} />
          <LogoRow
            title="Supported by"
            logos={SITE.sponsors}
            note="More sponsors to be announced."
          />
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-rule pt-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            <p className="font-display text-2xl">
              {SITE.name} <span className="text-sindoor">{SITE.year}</span>
            </p>
            <p className="mt-2 text-sm text-ink-muted">{SITE.tagline}</p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-3 inline-block text-sm underline underline-offset-4 hover:text-sindoor"
            >
              {SITE.email}
            </a>
          </div>

          <nav aria-label="Social media">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm tracking-[0.2em] uppercase">
              {SITE.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sindoor"
                  >
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-10 text-xs text-ink-muted">
          © {SITE.year} {SITE.name}. Organised by Rotary Club of Thane Hills and NCPA Mumbai.
        </p>
      </div>
    </footer>
  );
}
