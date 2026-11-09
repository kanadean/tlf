import Image from "next/image";
import { SITE } from "@/lib/site";

type Logo = {
  name: string;
  /** Optional caption, e.g. "Book Partner". */
  role?: string;
  logo: string;
  width: number;
  height: number;
  href: string | null;
};

// Rendered height (sm:h-12); intrinsic size is scaled to match so srcset stays small
const LOGO_HEIGHT = 48;

function LogoRow({ title, logos, note }: { title: string; logos: readonly Logo[]; note?: string }) {
  return (
    <div>
      <h2 className="font-sans text-sm font-bold tracking-[0.2em] text-marigold uppercase">
        {title}
      </h2>
      <ul className="mt-4 flex flex-wrap items-start gap-x-6 gap-y-5 rounded-2xl bg-white px-5 py-5">
        {logos.map((l) => {
          const img = (
            <Image
              src={l.logo}
              alt={l.name}
              width={Math.round((l.width / l.height) * LOGO_HEIGHT)}
              height={LOGO_HEIGHT}
              className="h-10 w-auto sm:h-12"
            />
          );
          return (
            <li key={l.name}>
              <figure>
                {l.href ? (
                  <a href={l.href} target="_blank" rel="noopener noreferrer">
                    {img}
                  </a>
                ) : (
                  img
                )}
                {l.role && (
                  <figcaption className="mt-2 text-xs font-bold tracking-[0.15em] text-ink-muted uppercase">
                    {l.role}
                  </figcaption>
                )}
              </figure>
            </li>
          );
        })}
      </ul>
      {note && <p className="mt-3 text-sm text-lilac">{note}</p>}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-jamun-deep text-white">
      <div className="paithani-band" aria-hidden="true" />
      <div className="px-4 pt-16 pb-10 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2">
            <LogoRow title="Presented by" logos={SITE.organisers} />
            <LogoRow
              title="Supported by"
              logos={SITE.sponsors}
              note="More sponsors to be announced."
            />
          </div>

          <div className="mt-14 flex flex-col gap-6 border-t border-white/15 pt-8 md:flex-row md:items-end md:justify-between">
            <div className="flex max-w-xl items-center gap-5 sm:gap-6">
              {/* Festival logo beside its name, on a cream disc so its grey ring shows on jamun.
                  Decorative, as the name is right next to it. */}
              <Image
                src="/images/logos/tlf-logo.png"
                alt=""
                width={128}
                height={128}
                className="size-24 shrink-0 rounded-full bg-cream p-1 ring-4 ring-marigold sm:size-28"
              />
              <div>
                <p className="font-display text-2xl font-bold">
                  {SITE.name} <span className="text-marigold">{SITE.year}</span>
                </p>
                <p className="mt-2 text-sm text-lilac">{SITE.tagline}</p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-3 inline-block text-sm underline underline-offset-4 hover:text-marigold"
                >
                  {SITE.email}
                </a>
              </div>
            </div>

            <nav aria-label="Social media">
              <ul className="flex flex-wrap gap-2 text-sm font-bold">
                {SITE.social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-full border-2 border-white/30 px-4 py-1.5 transition hover:border-marigold hover:bg-marigold hover:text-jamun"
                    >
                      {s.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <p className="mt-10 text-xs text-lilac">
            © {SITE.year} {SITE.name}. Organised by Rotary Club of Thane Hills and NCPA Mumbai.
          </p>
        </div>
      </div>
    </footer>
  );
}
