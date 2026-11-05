"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

// The keyword burst above the shelf (lg+ only, where that space is empty). Positions are
// percentages of the burst box; each item flies out from BURST, with offsets sized for a
// ~560×300px box — close enough at other widths.
const BURST_AT = 1750;
const STEP = 160;
const BOX = { w: 560, h: 300 };
const BURST = { x: 0.5, y: 0.55 };

type Flying = { x: number; y: number; delay: number };
type BurstWord = Flying & { text: string; lang?: "mr" | "hi"; className: string };

const WORDS: BurstWord[] = [
  {
    text: "नाटक",
    lang: "mr",
    x: 0.3,
    y: 0.02,
    delay: 0,
    className: "font-deva-display text-4xl text-rani",
  },
  {
    text: "Poetry",
    x: 0.05,
    y: 0.18,
    delay: 1,
    className: "font-display text-2xl font-semibold text-peacock italic -rotate-6",
  },
  {
    text: "Memoir",
    x: 0.6,
    y: 0.1,
    delay: 2,
    className: "text-base font-bold tracking-[0.3em] text-jamun uppercase",
  },
  {
    text: "अभंग",
    lang: "mr",
    x: 0.8,
    y: 0.28,
    delay: 3,
    className: "font-deva-display text-3xl text-jamun rotate-3",
  },
  {
    text: "ग़ज़ल",
    lang: "hi",
    x: 0.03,
    y: 0.58,
    delay: 4,
    className: "text-3xl font-bold text-rani rotate-2",
  },
  {
    text: "Fiction",
    x: 0.58,
    y: 0.6,
    delay: 5,
    className: "font-display text-2xl font-semibold text-rani italic",
  },
  {
    text: "कहानी",
    lang: "hi",
    x: 0.3,
    y: 0.8,
    delay: 6,
    className: "font-deva-display text-3xl text-peacock -rotate-2",
  },
  {
    text: "Translation",
    x: 0.64,
    y: 0.88,
    delay: 7,
    className: "text-sm font-bold tracking-[0.3em] text-peacock uppercase",
  },
];

// Sparkles: four-point stars and dots in festival colours
const SPARKS: (Flying & { size: number; color: string; star?: boolean })[] = [
  { x: 0.2, y: 0.08, delay: 0.3, size: 13, color: "text-rani/80", star: true },
  { x: 0.48, y: 0.2, delay: 0.8, size: 7, color: "text-jamun/60" },
  { x: 0.78, y: 0.04, delay: 0.4, size: 11, color: "text-peacock/80", star: true },
  { x: 0.95, y: 0.5, delay: 1.3, size: 8, color: "text-rani/70" },
  { x: 0.42, y: 0.42, delay: 0.1, size: 10, color: "text-cream", star: true },
  { x: 0.18, y: 0.44, delay: 1, size: 7, color: "text-peacock/70" },
  { x: 0.88, y: 0.74, delay: 1.7, size: 12, color: "text-jamun/60", star: true },
  { x: 0.5, y: 0.98, delay: 2, size: 7, color: "text-rani/70" },
  { x: 0.12, y: 0.9, delay: 1.5, size: 11, color: "text-rani/70", star: true },
  { x: 0.66, y: 0.38, delay: 0.6, size: 6, color: "text-cream" },
];

/**
 * Where an item starts (back at the burst point) and how it floats afterwards: a slow drift
 * further outward and back, each at its own pace so the cluster never moves in lockstep.
 */
function motion({ x, y, delay }: Flying, i: number): React.CSSProperties {
  const dx = x - BURST.x;
  const dy = y - BURST.y;
  const len = Math.hypot(dx * BOX.w, dy * BOX.h) || 1;
  const out = 12 + (i % 3) * 4; // px further out at the far end of the drift
  const wobble = (i % 2 ? 1 : -1) * 6; // a little sideways sway
  const enter = BURST_AT + delay * STEP;
  return {
    left: `${x * 100}%`,
    top: `${y * 100}%`,
    "--dx": `${Math.round(-dx * BOX.w)}px`,
    "--dy": `${Math.round(-dy * BOX.h)}px`,
    "--fx": `${Math.round(((dx * BOX.w) / len) * out - ((dy * BOX.h) / len) * wobble)}px`,
    "--fy": `${Math.round(((dy * BOX.h) / len) * out + ((dx * BOX.w) / len) * wobble)}px`,
    "--fd": `${6 + (i % 4) * 1.4}s`,
    animationDelay: `${enter}ms, ${enter + 1800}ms`,
  } as React.CSSProperties;
}

/**
 * Literary forms bursting out of a soft flash, like an anaar on Diwali, then floating gently.
 * The float keeps going, so a pause button is provided (WCAG 2.2.2); visitors who prefer
 * reduced motion see the settled words with no animation at all.
 */
export function KeywordBurst() {
  const [paused, setPaused] = useState(false);

  return (
    <>
      <div
        aria-hidden="true"
        data-paused={paused || undefined}
        className="pointer-events-none absolute top-[6%] right-[3%] left-[57%] hidden h-[40%] lg:block [&[data-paused]_*]:[animation-play-state:paused]"
      >
        <span
          style={{
            left: `${BURST.x * 100}%`,
            top: `${BURST.y * 100}%`,
            animationDelay: `${BURST_AT - 120}ms`,
          }}
          className="absolute -mt-3 -ml-3 size-6 rounded-full bg-cream opacity-0 motion-safe:animate-flash"
        />
        {SPARKS.map((s, i) => (
          <svg
            key={`${s.x}-${s.y}`}
            viewBox="-10 -10 20 20"
            width={s.size}
            height={s.size}
            style={motion(s, i)}
            className={`absolute ${s.color} motion-safe:animate-[burst-in_1.8s_cubic-bezier(0.15,0.8,0.3,1)_both,twinkle_var(--fd)_ease-in-out_infinite_alternate]`}
          >
            {s.star ? (
              <path
                d="M0-10 C1 -2, 2 -1, 10 0 C2 1, 1 2, 0 10 C-1 2, -2 1, -10 0 C-2 -1, -1 -2, 0-10Z"
                fill="currentColor"
              />
            ) : (
              <circle r="10" fill="currentColor" />
            )}
          </svg>
        ))}
        {WORDS.map((w, i) => (
          <span
            key={w.text}
            lang={w.lang}
            style={motion(w, i)}
            className={`absolute whitespace-nowrap motion-safe:animate-[burst-in_1.8s_cubic-bezier(0.15,0.8,0.3,1)_both,drift_var(--fd)_ease-in-out_infinite_alternate] ${w.className}`}
          >
            {w.text}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Play background animation" : "Pause background animation"}
        className="absolute top-3 right-3 hidden size-8 items-center justify-center rounded-full bg-jamun/10 text-jamun transition hover:bg-jamun hover:text-marigold motion-safe:lg:flex"
      >
        {paused ? (
          <Play className="size-3.5" aria-hidden="true" />
        ) : (
          <Pause className="size-3.5" aria-hidden="true" />
        )}
      </button>
    </>
  );
}
