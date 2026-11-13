import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { Ornament } from "./Ornament";

type Keyword = { text: string; lang?: "mr" | "hi"; className: string; delay: number };

// Literary forms in all three languages, set like clippings pinned around the
// title. Two clusters: beside the title and beside the tagline (xl screens only,
// where that space is empty). Positions are relative to each cluster's box.
const BESIDE_TITLE: Keyword[] = [
  {
    text: "Poetry",
    className: "top-0 right-[28%] font-display text-2xl text-sindoor/65 italic -rotate-3",
    delay: 1500,
  },
  {
    text: "कथा",
    lang: "mr",
    className: "top-[13%] right-0 font-deva-display text-4xl text-gold-deep/55",
    delay: 1900,
  },
  {
    text: "संवाद",
    lang: "mr",
    className: "top-[44%] right-[42%] text-2xl text-ink-muted/70 rotate-2",
    delay: 2300,
  },
  {
    text: "Memoir",
    className: "top-[62%] right-[4%] text-xs tracking-[0.35em] text-ink-muted uppercase",
    delay: 2700,
  },
  {
    text: "कहानी",
    lang: "hi",
    className: "top-[78%] right-[30%] font-deva-display text-3xl text-sindoor/50 -rotate-2",
    delay: 3100,
  },
];
const BESIDE_TAGLINE: Keyword[] = [
  {
    text: "नाटक",
    lang: "mr",
    className: "top-0 left-[8%] font-deva-display text-3xl text-sindoor/50 rotate-2",
    delay: 2500,
  },
  {
    text: "Essays",
    className: "top-[18%] left-[48%] font-display text-xl text-gold-deep/80 italic",
    delay: 2900,
  },
  {
    text: "कविता",
    lang: "mr",
    className: "top-[58%] left-[26%] text-2xl text-ink-muted/70 -rotate-2",
    delay: 3300,
  },
  {
    text: "Ideas",
    className: "top-[52%] right-[2%] text-xs tracking-[0.35em] text-ink-muted uppercase",
    delay: 3700,
  },
];

function Keywords({ words, className }: { words: Keyword[]; className: string }) {
  return (
    <ul aria-hidden="true" className={`pointer-events-none absolute hidden xl:block ${className}`}>
      {words.map((w) => (
        <li
          key={w.text}
          lang={w.lang}
          style={{ animationDelay: `${w.delay}ms` }}
          className={`absolute whitespace-nowrap motion-safe:animate-diffuse ${w.className}`}
        >
          {w.text}
        </li>
      ))}
    </ul>
  );
}

/**
 * Title page: the festival name set in Devanagari and English, framed like a book cover.
 * On load "ठाणे" spreads in like ink, "Thane" slides in and the keywords surface one by
 * one. Every animation plays once (all settled within ~5s) and is skipped entirely when
 * the visitor prefers reduced motion.
 */
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
    <section
      aria-labelledby="hero-title"
      className="bg-haldi px-4 pt-6 pb-16 sm:px-8 sm:pt-10 sm:pb-24"
    >
      {/* Double-ruled frame, like the border of a printed title page */}
      <div className="mx-auto max-w-6xl border border-ink bg-paper p-1.5 shadow-[8px_8px_0_var(--color-blush)]">
        <div className="relative border border-ink/40 px-5 py-10 sm:px-12 sm:py-16">
          <Keywords words={BESIDE_TITLE} className="top-[24%] right-[4%] h-[34%] w-[17%]" />
          <Keywords words={BESIDE_TAGLINE} className="top-[57%] right-[4%] h-[13%] w-[34%]" />

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
                className="font-deva-display text-[clamp(5.5rem,24vw,13rem)] leading-[1.15] text-sindoor motion-safe:animate-ink-in"
              >
                ठाणे
              </span>
              <span className="pb-[0.12em] font-display text-[clamp(2.75rem,9vw,6.5rem)] leading-[0.95]">
                <span className="block text-[0.42em] tracking-[0.2em] text-peacock uppercase not-italic motion-safe:animate-slide-in motion-safe:[animation-delay:350ms]">
                  Thane
                </span>
                <span className="block italic motion-safe:animate-rise-in motion-safe:[animation-delay:750ms]">
                  Literature
                </span>
                <span className="block motion-safe:animate-rise-in motion-safe:[animation-delay:950ms]">
                  Festival
                </span>
                <span className="block text-sindoor motion-safe:animate-rise-in motion-safe:[animation-delay:1150ms]">
                  {SITE.year}
                </span>
              </span>
            </span>
          </h1>

          <Ornament className="mt-10 origin-left motion-safe:animate-draw motion-safe:[animation-delay:1400ms]" />

          <p className="mt-6 max-w-xl text-lg sm:text-xl">
            Three days. Three languages —{" "}
            <span lang="mr" className="text-sindoor">
              मराठी
            </span>
            ,{" "}
            <span lang="hi" className="text-sindoor">
              हिंदी
            </span>{" "}
            and <span className="text-sindoor">English</span> — one city&rsquo;s love for
            literature.
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
