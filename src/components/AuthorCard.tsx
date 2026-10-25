import { nativeNameLang } from "@/lib/languages";
import type { LineupSpeaker } from "@/lib/markdown";
import { LanguageTag } from "./LanguageTag";
import { SpeakerPortrait } from "./SpeakerPortrait";

type Props = { speaker: LineupSpeaker };

export function AuthorCard({ speaker }: Props) {
  const latestBook = speaker.books[0];
  const subtitle = speaker.designation ?? speaker.genre;

  return (
    <article className="group flex h-full flex-col border border-rule bg-paper p-3 transition-colors hover:border-sindoor/40 sm:p-4">
      <SpeakerPortrait
        speaker={speaker}
        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
        className="aspect-[4/5] w-full"
      />

      <div className="flex flex-1 flex-col pt-4">
        <h3 className="text-lg leading-snug sm:text-xl">{speaker.name}</h3>
        {speaker.nameNative && (
          <p lang={nativeNameLang(speaker.language)} className="text-sm text-ink-muted">
            {speaker.nameNative}
          </p>
        )}
        {subtitle && <p className="mt-1 text-sm leading-snug text-ink-muted italic">{subtitle}</p>}

        {latestBook && (
          <p className="mt-3 text-sm">
            <span className="text-xs tracking-widest text-gold-deep uppercase">Latest · </span>
            <cite>{latestBook}</cite>
          </p>
        )}
        {speaker.excerpt && (
          <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-ink-muted">
            {speaker.excerpt}
          </p>
        )}

        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {speaker.language.map((language) => (
            <LanguageTag key={language} language={language} />
          ))}
          {speaker.moderatorOnly && (
            <span className="inline-flex h-6 items-center bg-parchment px-2 text-xs tracking-wide text-ink-muted italic">
              Moderator
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
