import { MapPin } from "lucide-react";
import { SITE } from "@/lib/site";
import { SectionHeading } from "./SectionHeading";

type Props = { venues: string[] };

/** Venue and stage list. Shows announcement placeholders until they are set. */
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
              Inside the venue
            </h3>
            <dl className="mt-4 space-y-4">
              {SITE.spaces.map((s) => (
                <div key={s.name}>
                  <dt className="font-display text-xl text-jamun">{s.name}</dt>
                  <dd className="text-ink-muted">{s.where}</dd>
                </div>
              ))}
            </dl>
            {venues.length > 0 && (
              <ul className="mt-4 space-y-1 border-t-2 border-dashed border-jamun/20 pt-4 text-ink-muted">
                {venues.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
