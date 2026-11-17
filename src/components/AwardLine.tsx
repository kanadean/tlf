import { Award } from "lucide-react";

type Props = { award: string; className?: string };

/** An award presented during a session, e.g. "TLF-2026 Lifetime Achievement Award – …". */
export function AwardLine({ award, className = "" }: Props) {
  return (
    <p
      lang={/[ऀ-ॿ]/.test(award) ? "mr" : undefined}
      className={`inline-flex items-start gap-2 border-l-4 border-gold bg-haldi px-3 py-1.5 text-sm font-medium text-gold-deep ${className}`}
    >
      <Award className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>{award}</span>
    </p>
  );
}
