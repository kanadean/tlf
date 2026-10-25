import Image from "next/image";
import type { Speaker } from "@/lib/markdown";

type Props = {
  speaker: Pick<Speaker, "name" | "photo">;
  /** CSS `sizes` hint for next/image. */
  sizes: string;
  className?: string;
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
 * Black-and-white portrait that turns to full colour on hover. Falls back to a
 * monogram plate when no photo is available yet. Size it with `className`.
 */
export function SpeakerPortrait({ speaker, sizes, className = "" }: Props) {
  return (
    <div className={`relative overflow-hidden bg-lilac ${className}`}>
      {speaker.photo ? (
        <Image
          src={speaker.photo}
          alt={`Portrait of ${speaker.name}`}
          fill
          sizes={sizes}
          className="object-cover object-top grayscale transition duration-500 group-hover:grayscale-0"
        />
      ) : (
        <div
          role="img"
          aria-label={`${speaker.name} — photo coming soon`}
          className="flex h-full w-full items-center justify-center font-display text-[2.5em] font-bold text-jamun italic"
        >
          {initials(speaker.name)}
        </div>
      )}
    </div>
  );
}
