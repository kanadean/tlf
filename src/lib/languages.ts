// Language constants shared by the content parser and client components.
// Kept separate from markdown.ts so client bundles don't pull in node:fs.

export const SPEAKER_LANGUAGES = ["marathi", "hindi", "english"] as const;
export const SESSION_LANGUAGES = [...SPEAKER_LANGUAGES, "multilingual"] as const;

export type SpeakerLanguage = (typeof SPEAKER_LANGUAGES)[number];
export type SessionLanguage = (typeof SESSION_LANGUAGES)[number];

/** Display label and BCP-47 code for each language, used for the [मराठी] style tags. */
export const LANGUAGE_META: Record<SessionLanguage, { label: string; lang: string }> = {
  marathi: { label: "मराठी", lang: "mr" },
  hindi: { label: "हिंदी", lang: "hi" },
  english: { label: "English", lang: "en" },
  multilingual: { label: "Multilingual", lang: "en" },
};

/** `lang` for a speaker's Devanagari name: Hindi if that's their only Indic language, else Marathi. */
export function nativeNameLang(languages: readonly SpeakerLanguage[]): "mr" | "hi" {
  return languages.includes("hindi") && !languages.includes("marathi") ? "hi" : "mr";
}

/**
 * `lang` for a piece of text in a session of the given language. Only text that
 * actually contains Devanagari is tagged mr/hi, so English placeholders like
 * "Title to be announced" keep the Latin fonts.
 */
export function textLang(text: string, language: SessionLanguage): string {
  return /[ऀ-ॿ]/.test(text) ? LANGUAGE_META[language].lang : "en";
}
