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
      <div
        role="group"
        aria-label="Filter lineup"
        className="mb-10 flex flex-wrap justify-center gap-x-1 gap-y-2 border-y border-rule py-3"
      >
        {options.map((option) => {
          const active = filter === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(option.value)}
              className={`px-4 py-1.5 text-base transition-colors ${
                active ? "bg-sindoor text-paper" : "text-ink hover:text-sindoor"
              }`}
            >
              <span lang={option.lang}>{option.label}</span>
              <span className={`ml-2 text-xs ${active ? "text-paper/80" : "text-ink-muted"}`}>
                {option.count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {filter === "all" ? "speakers and moderators" : "authors"}
      </p>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {visible.map((speaker) => (
          <li key={speaker.slug}>
            <AuthorCard speaker={speaker} />
          </li>
        ))}
      </ul>
    </div>
  );
}
