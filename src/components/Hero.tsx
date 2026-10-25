import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { Ornament } from "./Ornament";

/** Title page: the festival name set in Devanagari and English, framed like a book cover. */
export function Hero() {
  const meta = [
    { term: "Dates", detail: SITE.datesLabel },
    {
      term: "Venue",
      detail: SITE.venue ? `${SITE.venue}, ${SITE.city}` : `To be announced · ${SITE.city}`,
    },
    { term: "Entry", detail: "Free for all · prior registration required" },
  ];

  return (
    <section aria-labelledby="hero-title" className="px-4 pt-6 pb-16 sm:px-8 sm:pt-10 sm:pb-24">
      {/* Double-ruled frame, like the border of a printed title page */}
      <div className="mx-auto max-w-6xl border border-ink p-1.5">
        <div className="border border-ink/40 px-5 py-10 sm:px-12 sm:py-16">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule pb-4 text-xs tracking-[0.3em] uppercase">
            <span className="text-sindoor">{SITE.edition}</span>
            <span className="text-ink-muted">Vol. II · {SITE.year}</span>
          </div>

          <h1 id="hero-title" className="mt-10 sm:mt-14">
            <span className="sr-only">
              {SITE.name} {SITE.year}
            </span>
            <span aria-hidden="true" className="grid items-end gap-x-6 lg:grid-cols-[auto_1fr]">
              <span
                lang="mr"
                className="font-deva-display text-[clamp(5.5rem,24vw,13rem)] leading-[1.15] text-sindoor"
              >
                ठाणे
              </span>
              <span className="pb-[0.12em] font-display text-[clamp(2.75rem,9vw,6.5rem)] leading-[0.95]">
                <span className="block text-[0.42em] tracking-[0.2em] text-ink-muted uppercase not-italic">
                  Thane
                </span>
                <span className="block italic">Literature</span>
                <span className="block">Festival</span>
              </span>
            </span>
          </h1>

          <Ornament className="mt-10" />

          <p className="mt-6 max-w-xl text-lg sm:text-xl">
            Three days. Three languages —{" "}
            <span lang="mr" className="text-sindoor">
              मराठी
            </span>
            ,{" "}
            <span lang="hi" className="text-sindoor">
              हिंदी
            </span>{" "}
            and <span className="text-sindoor">English</span> — one city&rsquo;s love of the written
            word.
          </p>

          <dl className="mt-10 grid gap-6 border-t border-rule pt-6 sm:grid-cols-3">
            {meta.map(({ term, detail }) => (
              <div key={term}>
                <dt className="text-xs tracking-[0.3em] text-gold-deep uppercase">{term}</dt>
                <dd className="mt-1 font-display text-lg">{detail}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={SITE.registrationUrl ?? "#registration"}
              className="inline-flex items-center gap-2 bg-sindoor px-7 py-3.5 text-base tracking-wide text-paper shadow-[4px_4px_0_var(--color-gold)] transition hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_var(--color-gold)]"
            >
              Register for Free <ArrowRight className="size-4" aria-hidden="true" />
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
