"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, X } from "lucide-react";
import { nativeNameLang, speakerTextLang, textLang } from "@/lib/languages";
import type { Speaker, Talk } from "@/lib/markdown";
import { formatTimeRange } from "@/lib/programme";
import { SITE } from "@/lib/site";
import { AwardLine } from "./AwardLine";
import { LanguageTag } from "./LanguageTag";
import { SpeakerPortrait } from "./SpeakerPortrait";

type Props = { session: Talk | null; onClose: () => void };

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
    session ? formatTimeRange(session) : "Time TBA",
    session?.venue ?? SITE.venue ?? "Venue TBA",
  ];

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      // Clicks on the backdrop land on the <dialog> element itself
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      aria-labelledby="session-dialog-title"
      className="m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto border border-rule bg-paper p-0 text-ink shadow-2xl backdrop:bg-ink/60"
    >
      {session && (
        <div className="p-6 sm:p-10">
          <div className="flex items-start justify-between gap-4">
            <LanguageTag language={session.primaryLanguage} />
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Close session details"
              className="-m-2 p-2 text-ink-muted hover:text-sindoor"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <h2
            id="session-dialog-title"
            lang={textLang(session.title, session.primaryLanguage)}
            className="mt-4 text-3xl sm:text-4xl"
          >
            {session.title}
          </h2>
          {session.award && <AwardLine award={session.award} className="mt-3" />}
          {session.highlight && (
            <AwardLine award={session.highlight} icon="book" className="mt-3" />
          )}

          <p className="mt-3 text-sm tracking-wide text-ink-muted">{when.join("  ·  ")}</p>

          {session.summaryHtml && (
            <div
              className="prose-tlf mt-6"
              dangerouslySetInnerHTML={{ __html: session.summaryHtml }}
            />
          )}

          <ParticipantGroup title="Speakers" people={session.speakers} />
          <ParticipantGroup title="Panelists" people={session.panelists} />
          <ParticipantGroup
            title={session.moderatorLabel ?? "Moderator"}
            people={session.moderators}
            placeholder={session.moderatorTBA ? "To be announced." : undefined}
          />

          {SITE.registrationUrl && (
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-rule pt-6">
              <a
                href={SITE.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-sindoor px-6 py-3 text-paper shadow-[4px_4px_0_var(--color-gold)] transition hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_var(--color-gold)]"
              >
                Register for Free <ArrowRight className="size-4" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <span className="text-sm text-ink-muted">Entry on first come first basis.</span>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}

type GroupProps = { title: string; people: Speaker[]; placeholder?: string };

function ParticipantGroup({ title, people, placeholder }: GroupProps) {
  if (people.length === 0 && !placeholder) return null;
  return (
    <section className="mt-8 border-t border-rule pt-6">
      <h3
        lang={/[ऀ-ॿ]/.test(title) ? "hi" : undefined}
        className="text-xs tracking-[0.3em] text-sindoor uppercase [&:lang(hi)]:text-sm [&:lang(hi)]:tracking-normal"
      >
        {title}
      </h3>
      {people.length === 0 && <p className="mt-3 text-ink-muted italic">{placeholder}</p>}
      <ul className="mt-4 space-y-6">
        {people.map((person) => (
          <li key={person.slug} className="group flex gap-4">
            {person.photo && (
              <SpeakerPortrait
                speaker={person}
                sizes="80px"
                className="aspect-[4/5] w-16 shrink-0 text-[0.6rem] sm:w-20"
              />
            )}
            <div className="min-w-0">
              <p className="font-display text-xl">{person.name}</p>
              {person.nameNative && (
                <p lang={nativeNameLang(person.language)} className="text-sm text-ink-muted">
                  {person.nameNative}
                </p>
              )}
              {(person.designation ?? person.genre) && (
                <p
                  lang={speakerTextLang(person.designation ?? person.genre ?? "", person.language)}
                  className="text-sm text-ink-muted italic [&:lang(hi)]:not-italic [&:lang(mr)]:not-italic"
                >
                  {person.designation ?? person.genre}
                </p>
              )}
              {person.bioHtml && (
                <div
                  className="prose-tlf mt-2 text-sm"
                  dangerouslySetInnerHTML={{ __html: person.bioHtml }}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
