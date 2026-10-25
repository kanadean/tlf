"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { nativeNameLang, textLang } from "@/lib/languages";
import type { ResolvedSession, Speaker } from "@/lib/markdown";
import { SITE } from "@/lib/site";
import { LanguageTag } from "./LanguageTag";
import { SpeakerPortrait } from "./SpeakerPortrait";

type Props = { session: ResolvedSession | null; onClose: () => void };

/**
 * Session details in a native <dialog>: the browser provides focus trapping,
 * Escape to close and focus return to the triggering button.
 */
export function SessionModal({ session, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (session && dialog && !dialog.open) dialog.showModal();
  }, [session]);

  const day = SITE.days.find((d) => d.day === session?.day);
  const when = [
    day ? `${day.label} · ${day.date}` : "Date TBA",
    session?.timeStart
      ? [session.timeStart, session.timeEnd].filter(Boolean).join(" – ")
      : "Time TBA",
    session?.venue ?? "Venue TBA",
  ];

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      // Clicks on the backdrop land on the <dialog> element itself
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      aria-labelledby="session-dialog-title"
      className="m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-3xl border-4 border-jamun bg-cream p-0 text-ink shadow-[8px_8px_0_var(--color-rani)] backdrop:bg-jamun-deep/75"
    >
      {session && (
        <div className="p-6 sm:p-10">
          <div className="flex items-start justify-between gap-4">
            <LanguageTag language={session.primaryLanguage} />
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Close session details"
              className="-m-1 rounded-full bg-jamun p-2 text-white hover:bg-rani"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <h2
            id="session-dialog-title"
            lang={textLang(session.title, session.primaryLanguage)}
            className="mt-4 text-3xl text-jamun sm:text-4xl"
          >
            {session.title}
          </h2>

          <p className="mt-3 inline-block rounded-full bg-haldi px-3 py-1 text-sm font-medium text-jamun">
            {when.join("  ·  ")}
          </p>

          {session.summaryHtml && (
            <div
              className="prose-tlf mt-6"
              dangerouslySetInnerHTML={{ __html: session.summaryHtml }}
            />
          )}

          <ParticipantGroup title="Speakers" people={session.speakers} />
          <ParticipantGroup title="Panelists" people={session.panelists} />
          <ParticipantGroup title="Moderator" people={session.moderators} />
        </div>
      )}
    </dialog>
  );
}

function ParticipantGroup({ title, people }: { title: string; people: Speaker[] }) {
  if (people.length === 0) return null;
  return (
    <section className="mt-8 border-t-2 border-dashed border-jamun/20 pt-6">
      <h3 className="inline-block rounded-full bg-rani px-3 py-0.5 font-sans text-sm tracking-[0.15em] text-white uppercase">
        {title}
      </h3>
      <ul className="mt-4 space-y-6">
        {people.map((person) => (
          <li key={person.slug} className="group flex gap-4">
            <SpeakerPortrait
              speaker={person}
              sizes="80px"
              className="arch-top aspect-[4/5] w-16 shrink-0 text-[0.6rem] sm:w-20"
            />
            <div className="min-w-0">
              <p className="font-display text-xl font-bold text-jamun">{person.name}</p>
              {person.nameNative && (
                <p lang={nativeNameLang(person.language)} className="text-sm text-ink-muted">
                  {person.nameNative}
                </p>
              )}
              {(person.designation ?? person.genre) && (
                <p className="text-sm text-ink-muted">{person.designation ?? person.genre}</p>
              )}
              {person.bioHtml ? (
                <div
                  className="prose-tlf mt-2 text-sm"
                  dangerouslySetInnerHTML={{ __html: person.bioHtml }}
                />
              ) : (
                <p className="mt-2 text-sm text-ink-muted">Biography coming soon.</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
