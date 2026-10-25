import { ChevronRight } from "lucide-react";
import { textLang } from "@/lib/languages";
import type { ResolvedSession } from "@/lib/markdown";
import { LanguageTag } from "./LanguageTag";
import { SpeakerPortrait } from "./SpeakerPortrait";

type Props = { session: ResolvedSession; onOpen: () => void };

const joinNames = (people: { name: string }[]) => people.map((p) => p.name).join(" & ");

/**
 * One programme entry. The title button stretches over the whole card, so any
 * click opens the session dialog while keyboard users get a single tab stop.
 */
export function SessionCard({ session, onOpen }: Props) {
  const people = [...session.speakers, ...session.panelists, ...session.moderators];
  // Unscheduled sessions skip the time column rather than repeating "TBA" on every row
  const scheduled = Boolean(session.day);
  const time = session.timeStart
    ? [session.timeStart, session.timeEnd].filter(Boolean).join(" – ")
    : "Time TBA";

  return (
    <article
      className={`group relative grid gap-x-8 gap-y-2 border-b border-rule py-5 transition-colors hover:bg-parchment/70 sm:px-3 ${
        scheduled ? "sm:grid-cols-[8rem_1fr]" : ""
      }`}
    >
      {scheduled && (
        <div className="flex items-baseline gap-3 sm:flex-col sm:gap-0.5">
          <p className="font-display text-lg text-sindoor">{time}</p>
          {session.venue && <p className="text-sm text-ink-muted italic">{session.venue}</p>}
        </div>
      )}

      <div className="flex min-w-0 gap-4">
        <div className="min-w-0 flex-1">
          <h3
            className="text-xl leading-snug sm:text-2xl"
            lang={textLang(session.title, session.primaryLanguage)}
          >
            <button
              type="button"
              onClick={onOpen}
              aria-haspopup="dialog"
              className="text-left group-hover:text-sindoor after:absolute after:inset-0"
            >
              {session.title}
            </button>
          </h3>

          <p className="mt-1 text-base text-ink-muted">
            <span className="text-ink">{joinNames(session.speakers)}</span>
            {session.panelists.length > 0 && <> with {joinNames(session.panelists)}</>}
            {session.moderators.length > 0 && (
              <>
                {" · "}
                <span className="italic">in conversation with</span> {joinNames(session.moderators)}
              </>
            )}
          </p>

          <div className="mt-3 flex items-center gap-3">
            <LanguageTag language={session.primaryLanguage} />
            <ul className="flex -space-x-2" aria-hidden="true">
              {people.map((person) => (
                <li key={person.slug}>
                  <SpeakerPortrait
                    speaker={person}
                    sizes="32px"
                    className="size-8 rounded-full text-[0.4rem] ring-2 ring-paper"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ChevronRight
          className="mt-1.5 size-5 shrink-0 text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-sindoor"
          aria-hidden="true"
        />
      </div>
    </article>
  );
}
