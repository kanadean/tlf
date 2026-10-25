import { Hero } from "@/components/Hero";
import { LineupGrid } from "@/components/LineupGrid";
import { RegistrationSection } from "@/components/RegistrationSection";
import { ScheduleTabs } from "@/components/ScheduleTabs";
import { SectionHeading } from "@/components/SectionHeading";
import { VenuesSection } from "@/components/VenuesSection";
import { getAllSessions, getLineup, getVenues } from "@/lib/markdown";

export default function Home() {
  const speakers = getLineup();
  const sessions = getAllSessions();

  return (
    <main id="main" className="flex-1">
      <Hero />

      <section
        id="lineup"
        aria-labelledby="lineup-title"
        className="scroll-mt-20 bg-parchment px-4 py-20 sm:px-8 sm:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            id="lineup-title"
            title="Tridhara"
            native={{ text: "त्रिधारा", lang: "mr" }}
          >
            <p>
              Three streams, one festival — writers, journalists, thinkers and performers across
              Marathi, Hindi and English.
            </p>
          </SectionHeading>
          <LineupGrid speakers={speakers} />
        </div>
      </section>

      <section
        id="schedule"
        aria-labelledby="schedule-title"
        className="scroll-mt-20 px-4 py-20 sm:px-8 sm:py-28"
      >
        <div className="mx-auto max-w-4xl">
          <SectionHeading id="schedule-title" title="The Programme">
            <p>
              {sessions.length} sessions across three days. Select a session for speakers and
              details.
            </p>
          </SectionHeading>
          <ScheduleTabs sessions={sessions} />
        </div>
      </section>

      <VenuesSection venues={getVenues()} />
      <RegistrationSection />
    </main>
  );
}
