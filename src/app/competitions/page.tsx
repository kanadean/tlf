import type { Metadata } from "next";
import { CompetitionCard } from "@/components/CompetitionCard";
import { Ornament } from "@/components/Ornament";
import { COMPETITIONS, COMPETITION_NOTE } from "@/lib/competitions";

export const metadata: Metadata = {
  title: "Competitions",
  description:
    "Write, photograph or perform — the Thane Literature Festival 2026 competitions in Marathi, Hindi and English.",
};

export default function CompetitionsPage() {
  return (
    <main id="main" className="flex-1">
      <header className="px-4 pt-16 pb-12 text-center sm:px-8 sm:pt-24">
        <h1 className="text-5xl sm:text-7xl">
          <em className="text-sindoor">Competitions</em>
        </h1>
        <Ornament className="mx-auto mt-8" />
        <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-muted">
          Write a story, an essay or what a picture says to you, tell Thane&rsquo;s story in ten
          photographs, or bring a character to life on stage.
        </p>

        <nav aria-label="Competitions" className="mx-auto mt-10 max-w-3xl">
          <ul className="flex flex-wrap justify-center gap-2">
            {COMPETITIONS.map((c) => (
              <li key={c.slug}>
                <a
                  href={`#${c.slug}`}
                  className="inline-block border border-rule px-4 py-1.5 text-sm transition-colors hover:border-sindoor hover:text-sindoor"
                >
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        {COMPETITIONS.map((c, i) => (
          <CompetitionCard key={c.slug} competition={c} index={i} />
        ))}
      </div>

      <section aria-label="Please note" className="bg-parchment px-4 py-14 sm:px-8">
        <p className="mx-auto max-w-2xl text-center font-display text-xl italic">
          {COMPETITION_NOTE}
        </p>
      </section>
    </main>
  );
}
