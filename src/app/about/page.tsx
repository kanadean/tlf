import type { Metadata } from "next";
import { Marigold } from "@/components/Marigold";
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
      <header className="relative overflow-hidden bg-jamun px-4 pt-16 pb-16 text-center text-white sm:px-8 sm:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <Marigold className="absolute top-8 left-[5%] size-14 sm:size-20" tone="rani" />
          <Marigold className="absolute right-[6%] bottom-8 size-16 sm:size-24" />
        </div>
        <h1 className="relative text-5xl sm:text-7xl">
          About the <em className="text-marigold">Festival</em>
        </h1>
        <p className="relative mx-auto mt-6 max-w-2xl text-lg text-lilac">
          Discover the story behind Thane Literature Festival and the passionate team bringing
          literary culture to our community
        </p>
        <p className="relative mx-auto mt-8 inline-block rounded-full bg-marigold px-5 py-1.5 text-sm font-bold text-jamun">
          Organised by Rotary Club of Thane Hills · In association with NCPA
        </p>
      </header>

      <div className="paithani-band" aria-hidden="true" />

      <section aria-label="Mission and vision" className="px-4 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {[
            {
              title: "Our Mission",
              text: "To create a vibrant platform that celebrates literature in all its forms, fostering a love for reading, writing, and storytelling within the Thane community. We aim to bridge the gap between established authors and emerging voices while making literature accessible to people of all ages and backgrounds.",
            },
            {
              title: "Our Vision",
              text: "To establish Thane as a recognized literary hub in Maharashtra, where diverse voices come together to share stories, ideas, and experiences. We envision a future where literature thrives in our community, inspiring creativity, critical thinking, and cultural understanding among all residents.",
            },
          ].map(({ title, text }, i) => (
            <article
              key={title}
              className={`rounded-3xl rounded-t-[12rem] px-8 pt-20 pb-10 sm:px-12 ${i === 0 ? "bg-rani text-white" : "bg-peacock text-white"}`}
            >
              <h2 className="text-center text-3xl sm:text-4xl">{title}</h2>
              <p className="mt-5 text-lg leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="history-title" className="bg-marigold px-4 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <SectionHeading id="history-title" title="Festival History" tone="jamun">
            <p>The journey of Thane Literature Festival</p>
          </SectionHeading>
          <ol className="space-y-5">
            {HISTORY.map((entry) => (
              <li
                key={entry.year}
                className="grid gap-x-6 gap-y-2 rounded-3xl border-2 border-jamun bg-white p-6 shadow-[5px_5px_0_var(--color-jamun)] sm:grid-cols-[7rem_1fr] sm:p-8"
              >
                <p className="font-display text-4xl font-bold text-rani">{entry.year}</p>
                <div>
                  <h3 className="text-xl text-jamun">{entry.title}</h3>
                  <p className="mt-2 text-ink-muted">{entry.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="paithani-band" aria-hidden="true" />
      <TeamSection />
    </main>
  );
}
