"use client";

import { useState } from "react";
import { LANGUAGE_META, SPEAKER_LANGUAGES, type SpeakerLanguage } from "@/lib/languages";
import type { LineupSpeaker } from "@/lib/markdown";
import { AuthorCard } from "./AuthorCard";

/**
 * "authors" (default) and the language filters show guests and panelists only;
 * "all" adds the moderators after them.
 */
type Filter = "authors" | SpeakerLanguage | "all";

type Props = { speakers: LineupSpeaker[] };

export function LineupGrid({ speakers }: Props) {
  const [filter, setFilter] = useState<Filter>("authors");

  const authors = speakers.filter((s) => !s.moderatorOnly);
  const moderators = speakers.filter((s) => s.moderatorOnly);
  const byLanguage = (language: SpeakerLanguage) =>
    authors.filter((s) => s.language.includes(language));

  const visible =
    filter === "authors"
      ? authors
      : filter === "all"
        ? [...authors, ...moderators]
        : byLanguage(filter);

  const options: { value: Filter; label: string; lang: string; count: number }[] = [
    { value: "authors", label: "Authors", lang: "en", count: authors.length },
    ...SPEAKER_LANGUAGES.map((language) => ({
      value: language,
      label: LANGUAGE_META[language].label,
      lang: LANGUAGE_META[language].lang,
      count: byLanguage(language).length,
    })),
    { value: "all", label: "All voices", lang: "en", count: speakers.length },
  ];

  return (
    <div>
      <div role="group" aria-label="Filter lineup" className="mb-10 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = filter === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(option.value)}
              className={`rounded-full border-2 px-4 py-1.5 text-base font-bold transition-colors ${
                active
                  ? "border-jamun bg-jamun text-white"
                  : "border-jamun/25 bg-white text-jamun hover:border-jamun"
              }`}
            >
              <span lang={option.lang}>{option.label}</span>
              <span
                className={`ml-2 rounded-full px-1.5 text-xs ${active ? "bg-marigold text-jamun" : "bg-haldi text-jamun"}`}
              >
                {option.count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {filter === "all" ? "speakers and moderators" : "authors"}
      </p>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {visible.map((speaker, i) => (
          <li key={speaker.slug}>
            <AuthorCard speaker={speaker} index={i} />
          </li>
        ))}
      </ul>
    </div>
  );
}
