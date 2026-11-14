import Image from "next/image";
import { nativeNameLang, speakerTextLang } from "@/lib/languages";
import type { LineupSpeaker } from "@/lib/markdown";
import { SpeakerPortrait } from "./SpeakerPortrait";

type Props = { speaker: LineupSpeaker };

// Look 3: each card's top edge carries the colour of the speaker's first language
const LANGUAGE_EDGE = {
  marathi: "border-t-sindoor",
  hindi: "border-t-peacock",
  english: "border-t-gold",
};

export function AuthorCard({ speaker }: Props) {
  const latestBook = speaker.books[0];
  const subtitle = speaker.designation ?? speaker.genre;

  return (
    <article
      className={`group flex h-full flex-col border border-t-4 border-rule bg-paper p-3 transition-colors hover:border-sindoor/40 sm:p-4 ${LANGUAGE_EDGE[speaker.language[0]]}`}
    >
      <SpeakerPortrait
        speaker={speaker}
        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
        className="aspect-[4/5] w-full"
      />

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg leading-snug sm:text-xl">{speaker.name}</h3>
          {/* Festival mark, small, in line with the name */}
          <Image
            src="/images/logos/tlf-logo.png"
            alt=""
            width={48}
            height={48}
            className="mt-0.5 size-6 shrink-0 opacity-90 sm:size-7"
          />
        </div>
        {speaker.nameNative && (
          <p lang={nativeNameLang(speaker.language)} className="text-sm text-ink-muted">
            {speaker.nameNative}
          </p>
        )}
        {subtitle && (
          <p
            lang={speakerTextLang(subtitle, speaker.language)}
            className="mt-1 text-sm leading-snug text-ink-muted italic [&:lang(hi)]:not-italic [&:lang(mr)]:not-italic"
          >
            {subtitle}
          </p>
        )}

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

        {speaker.moderatorOnly && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
            <span className="inline-flex h-6 items-center bg-parchment px-2 text-xs tracking-wide text-ink-muted italic">
              Moderator
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
