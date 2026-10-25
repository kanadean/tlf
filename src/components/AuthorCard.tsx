import { nativeNameLang } from "@/lib/languages";
import type { LineupSpeaker } from "@/lib/markdown";
import { LanguageTag } from "./LanguageTag";
import { SpeakerPortrait } from "./SpeakerPortrait";

type Props = { speaker: LineupSpeaker; index: number };

// Card colours cycle through the palette; each pair passes AA for its text
const TONES = [
  { card: "bg-rani text-white", muted: "text-white/90", arch: "bg-marigold" },
  { card: "bg-jamun text-white", muted: "text-lilac", arch: "bg-rani" },
  { card: "bg-peacock text-white", muted: "text-white/90", arch: "bg-marigold" },
  { card: "bg-marigold text-jamun", muted: "text-jamun", arch: "bg-jamun" },
];

export function AuthorCard({ speaker, index }: Props) {
  const latestBook = speaker.books[0];
  const subtitle = speaker.designation ?? speaker.genre;
  const tone = TONES[index % TONES.length];

  return (
    <article
      className={`group flex h-full flex-col rounded-2xl p-2.5 shadow-[5px_5px_0_var(--color-jamun-deep)] transition hover:-translate-y-1 sm:p-3 ${tone.card}`}
    >
      {/* Arched portrait set on a contrasting colour, like a doorway */}
      <div className={`arch-top p-1.5 ${tone.arch}`}>
        <SpeakerPortrait
          speaker={speaker}
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
          className="arch-top aspect-[4/5] w-full"
        />
      </div>

      <div className="flex flex-1 flex-col px-1 pt-3 text-center">
        <h3 className="text-lg leading-snug sm:text-xl">{speaker.name}</h3>
        {speaker.nameNative && (
          <p lang={nativeNameLang(speaker.language)} className={`text-sm ${tone.muted}`}>
            {speaker.nameNative}
          </p>
        )}
        {subtitle && <p className={`mt-1 text-sm leading-snug ${tone.muted}`}>{subtitle}</p>}

        {latestBook && (
          <p className="mt-3 text-sm">
            <span className="font-bold">Latest: </span>
            <cite>{latestBook}</cite>
          </p>
        )}
        {speaker.excerpt && (
          <p className={`mt-3 line-clamp-4 text-left text-sm leading-relaxed ${tone.muted}`}>
            {speaker.excerpt}
          </p>
        )}

        <div className="mt-auto flex flex-wrap justify-center gap-1.5 pt-4">
          {speaker.language.map((language) => (
            <LanguageTag key={language} language={language} />
          ))}
          {speaker.moderatorOnly && (
            <span className="inline-flex h-6 items-center rounded-full bg-white/90 px-2.5 text-xs font-bold text-jamun">
              Moderator
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
