import Image from "next/image";
import { ArrowRight, CalendarDays, MapPin, Ticket } from "lucide-react";
import { SITE } from "@/lib/site";
import { KeywordCloud } from "./KeywordCloud";
import { Ornament } from "./Ornament";

/**
 * Title page: the festival name set in Devanagari and English in the TLF logo's colours,
 * with the logo beside it, framed like a book cover. On load "ठाणे" spreads in like ink,
 * the English lines rise and the keywords pop in, then sway gently (pause button in the
 * corner). All motion is skipped when the visitor prefers reduced motion.
 */
export function Hero() {
  const meta = [
    { term: "Dates", icon: CalendarDays, detail: SITE.datesLabel },
    {
      term: "Venue",
      icon: MapPin,
      detail: SITE.venue ? `${SITE.venue}, ${SITE.city}` : `To be announced · ${SITE.city}`,
    },
    { term: "Entry", icon: Ticket, detail: "Free for all · prior registration required" },
  ];

  return (
    <section
      aria-labelledby="hero-title"
      className="bg-haldi px-4 pt-6 pb-16 sm:px-8 sm:pt-10 sm:pb-24"
    >
      {/* Double-ruled frame, like the border of a printed title page */}
      <div className="mx-auto max-w-6xl border border-ink bg-paper p-1.5 shadow-[8px_8px_0_var(--color-blush)]">
        <div className="relative border border-ink/40 px-5 py-10 sm:px-12 sm:py-16">
          <KeywordCloud className="top-[50%] right-[3%] h-[16%] w-[38%]" />

          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule pb-4 text-xs tracking-[0.3em] uppercase">
            <span className="text-sindoor">{SITE.edition}</span>
            <span className="text-ink-muted">Vol. II · {SITE.year}</span>
          </div>

          <h1 id="hero-title" className="mt-10 sm:mt-14">
            <span className="sr-only">
              {SITE.name} {SITE.year}
            </span>
            <span
              aria-hidden="true"
              className="grid items-end gap-x-6 gap-y-4 lg:grid-cols-[auto_1fr_auto]"
            >
              <span
                lang="mr"
                className="font-deva-display text-[clamp(5.5rem,22vw,12rem)] leading-[1.15] text-sindoor motion-safe:animate-ink-in"
              >
                ठाणे
              </span>
              {/* Title in the logo's colours: green, gold and the logo's cream on green */}
              <span className="pb-[0.12em] font-display text-[clamp(2.75rem,8vw,5.75rem)] leading-[0.98] text-tlf-green">
                <span className="block motion-safe:animate-rise-in motion-safe:[animation-delay:350ms]">
                  Thane
                </span>
                <span className="block text-gold-deep italic motion-safe:animate-rise-in motion-safe:[animation-delay:600ms]">
                  Literature
                </span>
                <span className="block motion-safe:animate-rise-in motion-safe:[animation-delay:850ms]">
                  Festival
                </span>
                <span className="mt-2 inline-block bg-tlf-green px-3 pt-1 pb-2 text-[0.8em] leading-none text-tlf-gold motion-safe:animate-rise-in motion-safe:[animation-delay:1100ms]">
                  {SITE.year}
                </span>
              </span>
              <Image
                src="/images/logos/tlf-logo.png"
                alt=""
                width={240}
                height={240}
                preload
                className="row-start-1 aspect-square size-28 shrink-0 self-center object-contain sm:size-36 lg:col-start-3 lg:size-32 xl:size-52"
              />
            </span>
          </h1>

          <Ornament className="mt-10 origin-left motion-safe:animate-draw motion-safe:[animation-delay:1300ms]" />

          <p className="mt-6 max-w-xl text-lg sm:text-xl">
            Three days. Three languages —{" "}
            <span lang="mr" className="text-sindoor">
              मराठी
            </span>
            ,{" "}
            <span lang="hi" className="text-sindoor">
              हिंदी
            </span>{" "}
            and <span className="text-sindoor">English</span> — Thane&rsquo;s love for literature.
          </p>

          {/* Key facts, highlighted: each in a haldi block with a logo-green edge */}
          <dl className="mt-10 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {meta.map(({ term, icon: Icon, detail }) => (
              <div key={term} className="flex gap-3 border-l-4 border-tlf-green bg-haldi px-4 py-4">
                <Icon className="mt-1 size-5 shrink-0 text-tlf-green" aria-hidden="true" />
                <div>
                  <dt className="text-xs tracking-[0.3em] text-gold-deep uppercase">{term}</dt>
                  <dd className="mt-1 font-display text-xl leading-snug text-tlf-green">
                    {detail}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={SITE.registrationUrl ?? "#registration"}
              {...(SITE.registrationUrl && { target: "_blank", rel: "noopener noreferrer" })}
              className="inline-flex items-center gap-2 bg-sindoor px-7 py-3.5 text-base tracking-wide text-paper shadow-[4px_4px_0_var(--color-gold)] transition hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_var(--color-gold)]"
            >
              Register for Free <ArrowRight className="size-4" aria-hidden="true" />
              {SITE.registrationUrl && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
            <a
              href="#schedule"
              className="border-b border-ink pb-0.5 hover:border-sindoor hover:text-sindoor"
            >
              Browse the programme
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
