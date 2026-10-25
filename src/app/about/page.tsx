import type { Metadata } from "next";
import { Ornament } from "@/components/Ornament";
import { SectionHeading } from "@/components/SectionHeading";
import { TeamSection } from "@/components/TeamSection";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind the Thane Literature Festival, organised by Rotary Club of Thane Hills in association with NCPA, and the team that brings it to life.",
};

// Mission, vision and history are carried over from the previous edition's
// About page (https://www.thanelitfest.in/about); 2026 is the current edition.
const HISTORY = [
  {
    year: "2026",
    title: "Second Edition",
    text: `The festival returns to Thane, ${SITE.datesLabel}, with three days of sessions in Marathi, Hindi and English.`,
  },
  {
    year: "2025",
    title: "Inaugural Year",
    text: "The first-ever Thane Literature Festival launches with the vision of creating a lasting literary tradition in the city. Featuring renowned authors, interactive workshops, and community engagement activities.",
  },
  {
    year: "2024",
    title: "Conception and Planning Phase",
    text: "The idea was conceived by literature enthusiasts of Rotary Club of Thane Hills and enthusiastically supported by the Club President and RCTH Family. The vision came to fruition through extensive consultations, strategic partnerships, and community outreach initiatives.",
  },
];

export default function AboutPage() {
  return (
    <main id="main" className="flex-1">
      <header className="px-4 pt-16 pb-12 text-center sm:px-8 sm:pt-24">
        <h1 className="text-5xl sm:text-7xl">
          About the <em className="text-sindoor">Festival</em>
        </h1>
        <Ornament className="mx-auto mt-8" />
        <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-muted">
          Discover the story behind Thane Literature Festival and the passionate team bringing
          literary culture to our community
        </p>
        <p className="mx-auto mt-8 max-w-2xl text-sm tracking-[0.2em] text-gold-deep uppercase">
          Organised by Rotary Club of Thane Hills · In association with NCPA
        </p>
      </header>

      <section aria-label="Mission and vision" className="bg-parchment px-4 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-5xl gap-px border border-rule bg-rule md:grid-cols-2">
          {[
            {
              title: "Our Mission",
              text: "To create a vibrant platform that celebrates literature in all its forms, fostering a love for reading, writing, and storytelling within the Thane community. We aim to bridge the gap between established authors and emerging voices while making literature accessible to people of all ages and backgrounds.",
            },
            {
              title: "Our Vision",
              text: "To establish Thane as a recognized literary hub in Maharashtra, where diverse voices come together to share stories, ideas, and experiences. We envision a future where literature thrives in our community, inspiring creativity, critical thinking, and cultural understanding among all residents.",
            },
          ].map(({ title, text }) => (
            <article key={title} className="bg-paper p-8 sm:p-12">
              <h2 className="text-3xl">{title}</h2>
              <p className="mt-5 text-lg leading-relaxed first-letter:float-left first-letter:mr-1.5 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-sindoor">
                {text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="history-title" className="px-4 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading id="history-title" title="Festival History">
            <p>The journey of Thane Literature Festival</p>
          </SectionHeading>
          <ol className="border-l border-gold">
            {HISTORY.map((entry) => (
              <li key={entry.year} className="relative pb-12 pl-8 last:pb-0 sm:pl-12">
                <span
                  aria-hidden="true"
                  className="absolute top-2.5 -left-[5px] size-[9px] rotate-45 bg-sindoor"
                />
                <p className="font-display text-4xl text-sindoor">{entry.year}</p>
                <h3 className="mt-1 text-xl">{entry.title}</h3>
                <p className="mt-3 text-ink-muted">{entry.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="bg-parchment">
        <TeamSection />
      </div>
    </main>
  );
}
