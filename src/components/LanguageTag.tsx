import { LANGUAGE_META, type SessionLanguage } from "@/lib/languages";

type Props = { language: SessionLanguage; className?: string };

/** Language chip, e.g. [मराठी]. White with jamun text so it reads on any card colour. */
export function LanguageTag({ language, className = "" }: Props) {
  const { label, lang } = LANGUAGE_META[language];
  return (
    <span
      lang={lang}
      className={`inline-flex h-6 items-center rounded-full ${lang === "en" ? "" : "pt-0.5"} bg-white px-2.5 text-xs leading-none font-bold text-jamun ring-1 ring-jamun/15 ${className}`}
    >
      <span aria-hidden="true">[</span>
      {label}
      <span aria-hidden="true">]</span>
    </span>
  );
}
