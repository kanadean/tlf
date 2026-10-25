import { MapPin } from "lucide-react";
import { SITE } from "@/lib/site";
import { SectionHeading } from "./SectionHeading";

type Props = { venues: string[] };

/** Venue and stage list. Shows an announcement placeholder until the venue is finalised. */
export function VenuesSection({ venues }: Props) {
  return (
    <section
      aria-labelledby="venues-title"
      id="venues"
      className="scroll-mt-20 px-4 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeading id="venues-title" title="Venues" />

        <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
          <div className="bg-paper p-8">
            <MapPin className="size-6 text-sindoor" aria-hidden="true" />
            <h3 className="mt-4 text-2xl">{SITE.venue ?? "Venue to be announced"}</h3>
            <p className="mt-2 text-ink-muted">
              {SITE.city} · {SITE.datesLabel}
            </p>
          </div>
          <div className="bg-parchment p-8">
            <h3 className="text-xs tracking-[0.3em] text-gold-deep uppercase">Stages</h3>
            {venues.length > 0 ? (
              <ul className="mt-4 space-y-2 font-display text-xl">
                {venues.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-ink-muted">
                Stage names and a festival map will be published here once the venue is confirmed.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
