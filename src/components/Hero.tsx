import { ArrowRight, CalendarDays, MapPin, Ticket } from "lucide-react";
import { SITE } from "@/lib/site";
import { Marigold } from "./Marigold";

type Props = { sessionCount: number; speakerCount: number };

type Spine = {
  text: string;
  lang?: "mr" | "hi";
  tone: string;
  /** Height as a percentage of the shelf; width in shelf units. */
  height: number;
  width: number;
  /** Hidden on phones to keep the shelf within the screen. */
  wide?: boolean;
  lean?: boolean;
};

// A shelf of books — the forms and languages of the festival on their spines
const SPINES: Spine[] = [
  { text: "कथा", lang: "mr", tone: "bg-jamun text-marigold", height: 86, width: 5 },
  { text: "Stories", tone: "bg-rani text-white", height: 74, width: 5.5 },
  { text: "कविता", lang: "mr", tone: "bg-peacock text-white", height: 95, width: 4.5 },
  { text: "Ideas", tone: "bg-cream text-jamun", height: 68, width: 6 },
  { text: "हिंदी", lang: "hi", tone: "bg-jamun-deep text-lilac", height: 82, width: 5 },
  { text: "Essays", tone: "bg-lilac text-jamun", height: 77, width: 4.5, wide: true },
  { text: "मराठी", lang: "mr", tone: "bg-rani text-white", height: 100, width: 6 },
  { text: "English", tone: "bg-peacock text-white", height: 80, width: 5.5, wide: true },
  { text: "संवाद", lang: "mr", tone: "bg-blush text-rani", height: 88, width: 5, lean: true },
];

/** Title page: the festival name beside a bookshelf, above the ripples of Thane's lakes. */
export function Hero({ sessionCount, speakerCount }: Props) {
  const meta = [
    { icon: CalendarDays, text: SITE.datesLabel },
    {
      icon: MapPin,
      text: SITE.venue ? `${SITE.venue}, ${SITE.city}` : "Venue to be announced · Thane",
    },
    { icon: Ticket, text: "Free entry · registration required" },
  ];
  const strip = [
    { text: SITE.datesLabel },
    { text: `${sessionCount} sessions` },
    { text: `${speakerCount} voices` },
    { text: "मराठी · हिंदी · English", lang: "mr" },
    { text: "Free entry" },
  ];

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-marigold">
      <div className="mx-auto grid max-w-6xl items-end gap-x-10 gap-y-12 px-4 pt-10 sm:px-8 sm:pt-14 lg:grid-cols-[1.15fr_1fr]">
        <div className="pb-4 lg:pb-12">
          <p className="inline-block rounded-full bg-jamun px-4 py-1 text-sm font-bold tracking-[0.2em] text-marigold uppercase">
            {SITE.edition} · {SITE.year}
          </p>

          <h1 id="hero-title" className="mt-4">
            <span className="sr-only">
              {SITE.name} {SITE.year}
            </span>
            <span aria-hidden="true" className="block">
              <span
                lang="mr"
                className="block font-deva-display text-[clamp(5rem,18vw,8.5rem)] leading-[1.1] text-rani"
              >
                ठाणे
              </span>
              <span className="block font-display text-[clamp(2.4rem,7vw,3.9rem)] leading-[1.12] text-jamun">
                Thane{" "}
                <em className="underline decoration-rani decoration-wavy decoration-[3px] underline-offset-[0.14em] [text-decoration-skip-ink:none]">
                  Literature
                </em>
                <br />
                Festival
              </span>
            </span>
          </h1>

          <p className="mt-6 max-w-md text-lg font-medium text-jamun sm:text-xl">
            Three days, three languages, one city&rsquo;s love of the written word.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {meta.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-1.5 text-sm font-medium text-jamun"
              >
                <Icon className="size-4 shrink-0 text-rani" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={SITE.registrationUrl ?? "#registration"}
              className="inline-flex items-center gap-2 rounded-full bg-rani px-7 py-3.5 text-lg font-bold text-white shadow-[4px_4px_0_var(--color-jamun)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--color-jamun)]"
            >
              Register for Free <ArrowRight className="size-5" aria-hidden="true" />
            </a>
            <a
              href="#schedule"
              className="font-bold text-jamun underline decoration-jamun/40 decoration-2 underline-offset-8 hover:decoration-rani"
            >
              Browse the programme
            </a>
          </div>
        </div>

        {/* The bookshelf (decorative) */}
        <div aria-hidden="true" className="relative mx-auto w-full max-w-md lg:max-w-none">
          <Marigold className="absolute -top-2 right-[8%] size-16 sm:size-20" tone="rani" />
          <ul
            className="flex h-60 items-end gap-1 pr-10 sm:h-80 sm:gap-1.5 lg:h-[22rem]"
            style={{ "--u": "clamp(0.5rem, 1.05vw, 0.95rem)" } as React.CSSProperties}
          >
            {SPINES.map((s) => (
              <li
                key={s.text}
                lang={s.lang}
                style={{ height: `${s.height}%`, width: `calc(var(--u) * ${s.width})` }}
                className={`flex shrink-0 flex-col items-center justify-between rounded-t-md py-3 shadow-[inset_-6px_0_0_rgb(0_0_0/0.12)] ${s.tone} ${
                  s.wide ? "max-sm:hidden" : ""
                } ${s.lean ? "ml-2 origin-bottom-left rotate-[9deg]" : ""}`}
              >
                <span className="h-1.5 w-full bg-current opacity-35" />
                <span className="rotate-180 font-display text-lg font-bold whitespace-nowrap [writing-mode:vertical-rl] sm:text-2xl">
                  {s.text}
                </span>
                <span className="h-1.5 w-full bg-current opacity-35" />
              </li>
            ))}
          </ul>
          {/* Shelf plank */}
          <p className="relative rounded-sm bg-jamun-deep py-1.5 text-center text-xs font-bold tracking-[0.3em] text-marigold uppercase shadow-[0_6px_0_rgb(0_0_0/0.15)] sm:text-sm">
            Thane · City of Lakes
          </p>
        </div>
      </div>

      {/* Lake ripples running into the facts strip */}
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="mt-10 block h-12 w-full sm:h-20"
        aria-hidden="true"
      >
        <path
          d="M0 30 Q 90 5 180 30 T 360 30 T 540 30 T 720 30 T 900 30 T 1080 30 T 1260 30 T 1440 30 V90 H0Z"
          fill="var(--color-peacock)"
        />
        <path
          d="M0 52 Q 120 30 240 52 T 480 52 T 720 52 T 960 52 T 1200 52 T 1440 52 V90 H0Z"
          fill="var(--color-lilac)"
        />
        <path
          d="M0 70 Q 72 56 144 70 T 288 70 T 432 70 T 576 70 T 720 70 T 864 70 T 1008 70 T 1152 70 T 1296 70 T 1440 70 V90 H0Z"
          fill="var(--color-jamun)"
        />
      </svg>

      {/* Strip of festival facts (repeats the details above, so hidden from screen readers) */}
      <div aria-hidden="true" className="bg-jamun px-4 py-3 text-marigold sm:px-8">
        {/* One centred row from lg; below that items wrap, so the flower separators are dropped */}
        <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-1 lg:flex-nowrap lg:gap-x-5">
          {strip.map((item, i) => (
            <li
              key={item.text}
              lang={item.lang}
              className="flex items-center gap-5 font-display text-lg font-bold whitespace-nowrap sm:text-xl xl:text-2xl"
            >
              {i > 0 && <Marigold className="hidden size-6 lg:block" tone="rani" />}
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
