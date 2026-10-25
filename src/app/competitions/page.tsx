import type { Metadata } from "next";
import { CompetitionCard } from "@/components/CompetitionCard";
import { Marigold } from "@/components/Marigold";
import { COMPETITIONS, COMPETITION_NOTE } from "@/lib/competitions";

export const metadata: Metadata = {
  title: "Competitions",
  description:
    "Write, photograph or perform — the Thane Literature Festival 2026 competitions in Marathi, Hindi and English.",
};

export default function CompetitionsPage() {
  return (
    <main id="main" className="flex-1">
      <header className="relative overflow-hidden bg-jamun px-4 pt-16 pb-16 text-center text-white sm:px-8 sm:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <Marigold className="absolute top-8 right-[5%] size-14 sm:size-20" tone="peacock" />
          <Marigold className="absolute bottom-8 left-[6%] size-16 sm:size-24" tone="rani" />
        </div>
        <h1 className="relative text-5xl sm:text-7xl">
          <em className="text-marigold">Competitions</em>
        </h1>
        <p className="relative mx-auto mt-6 max-w-2xl text-lg text-lilac">
          Write a story, an essay or what a picture says to you, tell Thane&rsquo;s story in ten
          photographs, or bring a character to life on stage.
        </p>

        <nav aria-label="Competitions" className="relative mx-auto mt-10 max-w-3xl">
          <ul className="flex flex-wrap justify-center gap-2">
            {COMPETITIONS.map((c) => (
              <li key={c.slug}>
                <a
                  href={`#${c.slug}`}
                  className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-bold text-jamun transition-colors hover:bg-marigold"
                >
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="paithani-band" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        {COMPETITIONS.map((c, i) => (
          <CompetitionCard key={c.slug} competition={c} index={i} />
        ))}
      </div>

      <section aria-label="Please note" className="bg-rani px-4 py-14 text-white sm:px-8">
        <p className="mx-auto max-w-2xl text-center font-display text-xl italic">
          {COMPETITION_NOTE}
        </p>
      </section>
    </main>
  );
}
