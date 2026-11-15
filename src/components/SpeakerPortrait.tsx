import Image from "next/image";
import type { Speaker } from "@/lib/markdown";

type Props = {
  speaker: Pick<Speaker, "name" | "photo">;
  /** CSS `sizes` hint for next/image. */
  sizes: string;
  className?: string;
  /** "sepia" (default): toned, colouring up on hover/focus. "natural": full colour, always. */
  tone?: "sepia" | "natural";
};

const TONE = {
  sepia:
    "grayscale-[0.6] sepia-[0.35] transition duration-500 group-hover:grayscale-0 group-hover:sepia-0 group-data-[in-focus]:grayscale-0 group-data-[in-focus]:sepia-0",
  natural: "",
};

function initials(name: string) {
  return name
    .replace(/^(Dr|Shri|Smt)\.?\s+/i, "")
    .split(/\s+/)
    .filter((part) => /^[A-Za-z]/.test(part))
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

/**
 * Portrait, sepia-toned by default and warming to full colour on hover (or `tone="natural"`
 * for full colour always). Falls back to a monogram plate when no photo is available yet.
 * Size it with `className`.
 */
export function SpeakerPortrait({ speaker, sizes, className = "", tone = "sepia" }: Props) {
  return (
    <div className={`relative overflow-hidden bg-parchment ${className}`}>
      {speaker.photo ? (
        <Image
          src={speaker.photo}
          alt={`Portrait of ${speaker.name}`}
          fill
          sizes={sizes}
          className={`object-cover object-top ${TONE[tone]}`}
        />
      ) : (
        <div
          role="img"
          aria-label={`${speaker.name} — photo coming soon`}
          className="flex h-full w-full items-center justify-center border border-rule font-display text-[2.5em] text-sindoor/70 italic"
        >
          {initials(speaker.name)}
        </div>
      )}
    </div>
  );
}
