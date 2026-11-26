import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Sparkles } from "lucide-react";
import { GalleryFlyer } from "@/components/GalleryFlyer";
import { Ornament } from "@/components/Ornament";
import { GALLERIES, GALLERY_INFO } from "@/lib/galleries";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Galleries",
  description:
    "Proverbs in ten languages, films born of books, Thane in ten frames and rare manuscripts — the Thane Literature Festival 2026 galleries.",
};

export default function GalleriesPage() {
  const info = [
    { icon: CalendarDays, text: `${GALLERY_INFO.when} — ${SITE.datesLabel}` },
    { icon: MapPin, text: `${GALLERY_INFO.where}, ${GALLERY_INFO.venue}` },
    { icon: Sparkles, text: GALLERY_INFO.opening },
  ];

  return (
    <main id="main" className="flex-1">
      <header className="bg-haldi px-4 pt-16 pb-12 text-center sm:px-8 sm:pt-24">
        <h1 className="text-5xl sm:text-7xl">
          TLF <em className="text-sindoor">Galleries</em>
        </h1>
        <Ornament className="mx-auto mt-8" />
        <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-muted">
          Between sessions, wander through four galleries — proverbs from ten languages, films born
          of books, Thane in ten frames, and rare manuscripts.
        </p>

        <nav aria-label="Galleries" className="mx-auto mt-10 max-w-3xl">
          <ul className="flex flex-wrap justify-center gap-2">
            {GALLERIES.map((g) => (
              <li key={g.slug}>
                <a
                  href={`#${g.slug}`}
                  className="inline-block border border-peacock/40 bg-paper px-4 py-1.5 text-sm text-peacock transition-colors hover:border-sindoor hover:text-sindoor"
                >
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* When and where, once for all galleries */}
      <section
        aria-label="Visiting the galleries"
        className="border-y border-rule bg-paper px-4 py-6 sm:px-8"
      >
        <ul className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-3">
          {info.map(({ icon: Icon, text }) => (
            <li key={text} className="flex gap-3 border-l-4 border-tlf-green bg-haldi px-4 py-3">
              <Icon className="mt-0.5 size-5 shrink-0 text-tlf-green" aria-hidden="true" />
              <span className="text-sm leading-snug">{text}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mx-auto grid max-w-6xl gap-x-10 gap-y-16 px-4 py-14 sm:px-8 sm:py-20 md:grid-cols-2">
        {GALLERIES.map((g) => (
          <article
            key={g.slug}
            id={g.slug}
            aria-labelledby={`${g.slug}-title`}
            className="flex scroll-mt-24 flex-col"
          >
            {g.poster ? (
              <>
                <div className="border border-ink/70 bg-parchment p-1.5">
                  <Image
                    src={g.poster.src}
                    alt={g.poster.alt}
                    width={g.poster.width}
                    height={g.poster.height}
                    sizes="(min-width: 1152px) 524px, (min-width: 768px) 45vw, 100vw"
                    className="h-auto w-full"
                  />
                </div>
                <p className="mt-6 text-xs tracking-[0.25em] text-gold-deep uppercase">
                  {g.kicker}
                </p>
                <h2 id={`${g.slug}-title`} className="mt-1 text-2xl sm:text-3xl">
                  {g.title}
                </h2>
              </>
            ) : (
              <GalleryFlyer gallery={g} titleId={`${g.slug}-title`} />
            )}
            <ul className={`${g.poster ? "mt-3" : "mt-6"} space-y-2`}>
              {g.highlights.map((h) => (
                <li key={h} className="relative pl-5 text-ink-muted">
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.7em] left-0 size-1.5 rotate-45 bg-gold"
                  />
                  {h}
                </li>
              ))}
            </ul>
            {g.link && (
              <Link
                href={g.link.href}
                className="mt-4 self-start border-b border-ink pb-0.5 text-sm hover:border-sindoor hover:text-sindoor"
              >
                {g.link.label}
              </Link>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
