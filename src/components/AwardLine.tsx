import { Award, BookOpen } from "lucide-react";

type Props = { award: string; className?: string; icon?: "award" | "book" };

/**
 * A highlighted line on a session: an award presented (default icon) or another highlight
 * such as a book launch (`icon="book"`).
 */
export function AwardLine({ award, className = "", icon = "award" }: Props) {
  const Icon = icon === "book" ? BookOpen : Award;
  return (
    <p
      lang={/[ऀ-ॿ]/.test(award) ? "mr" : undefined}
      className={`inline-flex items-start gap-2 border-l-4 border-gold bg-haldi px-3 py-1.5 text-sm font-medium text-gold-deep ${className}`}
    >
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>{award}</span>
    </p>
  );
}
