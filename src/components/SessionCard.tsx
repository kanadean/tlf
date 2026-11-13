import { ChevronRight } from "lucide-react";
import { textLang } from "@/lib/languages";
import type { Talk } from "@/lib/markdown";
import { LanguageTag } from "./LanguageTag";
import { SpeakerPortrait } from "./SpeakerPortrait";
import { TimeRange } from "./TimeRange";

type Props = { session: Talk; onOpen: () => void };

// "A", "A & B", "A, B & C"
const joinNames = (people: { name: string }[]) => {
  const names = people.map((p) => p.name);
  return names.length > 1 ? `${names.slice(0, -1).join(", ")} & ${names.at(-1)}` : (names[0] ?? "");
};

/**
 * One programme entry. The title button stretches over the whole card, so any
 * click opens the session dialog while keyboard users get a single tab stop.
 */
export function SessionCard({ session, onOpen }: Props) {
  const people = [...session.speakers, ...session.panelists, ...session.moderators];
  // Thumbnails only for people with a photo; everyone is still named above
  const withPhotos = people.filter((p) => p.photo);
  // Unscheduled sessions skip the time column rather than repeating "TBA" on every row
  const scheduled = Boolean(session.day);

  return (
    <article
      className={`group relative grid gap-x-8 gap-y-2 border-b border-rule py-5 transition-colors hover:bg-parchment/70 sm:px-3 ${
        scheduled ? "sm:grid-cols-[8rem_1fr]" : ""
      }`}
    >
      {scheduled && (
        <div className="flex items-baseline gap-3 sm:flex-col sm:gap-0.5">
          <p className="font-display text-lg text-sindoor">
            <TimeRange item={session} />
          </p>
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
            {session.moderators.length > 0 ? (
              <>
                {" · "}
                <span className="italic">in conversation with</span> {joinNames(session.moderators)}
              </>
            ) : (
              session.moderatorTBA && <span className="italic"> · moderator to be announced</span>
            )}
          </p>

          <div className="mt-3 flex items-center gap-3">
            <LanguageTag language={session.primaryLanguage} />
            {withPhotos.length > 0 && (
              <ul className="flex -space-x-2" aria-hidden="true">
                {withPhotos.map((person) => (
                  <li key={person.slug}>
                    <SpeakerPortrait
                      speaker={person}
                      sizes="32px"
                      className="size-8 rounded-full text-[0.4rem] ring-2 ring-paper"
                    />
                  </li>
                ))}
              </ul>
            )}
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
