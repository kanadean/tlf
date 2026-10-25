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
      className="scroll-mt-20 px-4 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeading id="venues-title" title="Venues" tone="peacock" />

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-3xl rounded-t-[10rem] bg-peacock px-8 pt-14 pb-10 text-center text-white">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-marigold">
              <MapPin className="size-7 text-jamun" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-3xl">{SITE.venue ?? "Venue to be announced"}</h3>
            <p className="mt-2 text-white/90">
              {SITE.city} · {SITE.datesLabel}
            </p>
          </div>
          <div className="rounded-3xl border-2 border-jamun bg-white p-8 shadow-[5px_5px_0_var(--color-jamun)]">
            <h3 className="inline-block rounded-full bg-haldi px-3 py-0.5 font-sans text-sm font-bold tracking-[0.15em] text-jamun uppercase">
              Stages
            </h3>
            {venues.length > 0 ? (
              <ul className="mt-4 space-y-2 font-display text-xl text-jamun">
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
