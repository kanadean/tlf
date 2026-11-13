import { LANGUAGE_META, type SessionLanguage } from "@/lib/languages";

type Props = { language: SessionLanguage; className?: string };

// Look 3: each language has its own accent (matches the author cards' top edge)
const TONE: Record<SessionLanguage, string> = {
  marathi: "border-sindoor/40 text-sindoor",
  hindi: "border-peacock/40 text-peacock",
  english: "border-gold-deep/40 text-gold-deep",
  hinglish: "border-gold-deep/40 text-gold-deep",
  multilingual: "border-ink/30 text-ink",
};

/** Bracketed language marker, e.g. [मराठी] — printed-programme style. */
export function LanguageTag({ language, className = "" }: Props) {
  const { label, lang } = LANGUAGE_META[language];
  return (
    <span
      lang={lang}
      className={`inline-flex h-6 items-center ${lang === "en" ? "" : "pt-0.5"} border bg-paper px-2 text-xs leading-none font-medium tracking-wide ${TONE[language]} ${className}`}
    >
      <span aria-hidden="true">[</span>
      {label}
      <span aria-hidden="true">]</span>
    </span>
  );
}
