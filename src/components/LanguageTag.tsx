import { LANGUAGE_META, type SessionLanguage } from "@/lib/languages";

type Props = { language: SessionLanguage; className?: string };

/** Bracketed language marker, e.g. [मराठी] — printed-programme style. */
export function LanguageTag({ language, className = "" }: Props) {
  const { label, lang } = LANGUAGE_META[language];
  return (
    <span
      lang={lang}
      className={`inline-flex h-6 items-center ${lang === "en" ? "" : "pt-0.5"} border border-sindoor/30 bg-paper px-2 text-xs leading-none font-medium tracking-wide text-sindoor ${className}`}
    >
      <span aria-hidden="true">[</span>
      {label}
      <span aria-hidden="true">]</span>
    </span>
  );
}
