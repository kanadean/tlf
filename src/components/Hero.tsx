import Image from "next/image";
import { ArrowRight, CalendarDays, MapPin, Ticket } from "lucide-react";
import { SITE } from "@/lib/site";
import { ArchFrame } from "./ArchFrame";
import { Marigold } from "./Marigold";

type Props = { sessionCount: number; speakerCount: number };

// Floating language labels either side of the arch (decorative — repeated in the text)
const FLOATERS = [
  { text: "मराठी", lang: "mr", className: "top-[18%] left-[6%] -rotate-6 bg-marigold text-jamun" },
  { text: "Stories", lang: "en", className: "top-[44%] left-[3%] rotate-3 bg-lilac text-jamun" },
  { text: "हिंदी", lang: "hi", className: "top-[70%] left-[8%] -rotate-3 bg-rani text-white" },
  { text: "English", lang: "en", className: "top-[20%] right-[5%] rotate-6 bg-peacock text-white" },
  { text: "कविता", lang: "mr", className: "top-[47%] right-[3%] -rotate-3 bg-marigold text-jamun" },
  { text: "Ideas", lang: "en", className: "top-[72%] right-[7%] rotate-2 bg-lilac text-jamun" },
] as const;

/** Title page: the festival name inside a scalloped arch on a jamun ground. */
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
    { text: "मराठी", lang: "mr" },
    { text: "हिंदी", lang: "hi" },
    { text: "English" },
    { text: "Free entry" },
  ];

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-jamun">
      {/* Scattered flowers and language labels */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Marigold className="absolute top-10 left-[4%] size-14 sm:size-20" tone="rani" />
        <Marigold className="absolute top-[38%] left-[22%] hidden size-10 lg:block" />
        <Marigold className="absolute bottom-24 left-[12%] size-12 sm:size-16" tone="lilac" />
        <Marigold className="absolute top-16 right-[6%] size-12 sm:size-16" />
        <Marigold className="absolute top-[56%] right-[20%] hidden size-12 lg:block" tone="rani" />
        <Marigold className="absolute right-[4%] bottom-28 size-14 sm:size-20" tone="peacock" />
        <ul className="hidden xl:block">
          {FLOATERS.map((f) => (
            <li
              key={f.text}
              lang={f.lang}
              className={`absolute rounded-full px-5 py-1.5 font-display text-2xl font-semibold shadow-[4px_4px_0_rgb(0_0_0/0.25)] ${f.className}`}
            >
              {f.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mx-auto max-w-3xl px-3 pt-8 sm:px-8 sm:pt-12">
        <ArchFrame
          cap={
            <Image
              src="/images/logos/tlf-logo.png"
              alt=""
              width={120}
              height={120}
              preload
              className="mb-2 size-20 sm:mb-4 sm:size-28"
            />
          }
        >
          <div className="px-4 pt-4 pb-12 text-center sm:px-10 sm:pb-16">
            <p className="text-sm font-bold tracking-[0.25em] text-rani uppercase">
              {SITE.edition} · {SITE.year}
            </p>

            <h1 id="hero-title" className="mt-3">
              <span className="sr-only">
                {SITE.name} {SITE.year}
              </span>
              <span aria-hidden="true" className="block">
                <span
                  lang="mr"
                  className="block font-deva-display text-[clamp(4rem,16vw,7.5rem)] leading-[1.2] text-rani"
                >
                  ठाणे
                </span>
                <span className="block font-display text-[clamp(2rem,7vw,3.75rem)] leading-[1.05] text-jamun">
                  Thane <em className="text-peacock">Literature</em> Festival
                </span>
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-md text-lg text-ink-muted sm:text-xl">
              Three days, three languages, one city&rsquo;s love of the written word.
            </p>

            <ul className="mx-auto mt-7 flex max-w-xl flex-wrap justify-center gap-2">
              {meta.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="inline-flex items-center gap-2 rounded-full bg-haldi px-4 py-1.5 text-sm font-medium text-jamun"
                >
                  <Icon className="size-4 shrink-0 text-rani" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
              <a
                href={SITE.registrationUrl ?? "#registration"}
                className="inline-flex items-center gap-2 rounded-full bg-rani px-7 py-3.5 text-lg font-bold text-white shadow-[4px_4px_0_var(--color-jamun)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--color-jamun)]"
              >
                Register for Free <ArrowRight className="size-5" aria-hidden="true" />
              </a>
              <a
                href="#schedule"
                className="font-bold text-jamun underline decoration-marigold decoration-4 underline-offset-8 hover:text-rani"
              >
                Browse the programme
              </a>
            </div>
          </div>
        </ArchFrame>
      </div>

      {/* Strip of festival facts (repeats the arch's details, so hidden from screen readers) */}
      <div
        aria-hidden="true"
        className="relative overflow-hidden border-y-4 border-jamun-deep bg-marigold py-3 text-jamun"
      >
        <ul className="flex w-max items-center sm:mx-auto">
          {[...strip, ...strip].map((item, i) => (
            <li
              key={i}
              lang={item.lang}
              className="flex items-center gap-5 pr-5 font-display text-xl font-bold whitespace-nowrap sm:text-2xl"
            >
              {item.text}
              <Marigold className="size-6" tone="rani" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
