"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

type Word = {
  text: string;
  lang?: "mr" | "hi";
  /** Position within the cloud box (percent) and styling. */
  x: number;
  y: number;
  className: string;
};

// Literary forms in all three languages, set like clippings beside the tagline (xl+ only,
// where that space is empty). Each pops in, then keeps swaying a little at its own pace.
const WORDS: Word[] = [
  {
    text: "कथा",
    lang: "mr",
    x: 4,
    y: 0,
    className: "font-deva-display text-5xl text-tlf-green/80",
  },
  {
    text: "Poetry",
    x: 34,
    y: 6,
    className: "font-display text-3xl text-sindoor/80 italic -rotate-3",
  },
  { text: "Memoir", x: 72, y: 2, className: "text-sm tracking-[0.35em] text-peacock uppercase" },
  {
    text: "कहानी",
    lang: "hi",
    x: 66,
    y: 30,
    className: "font-deva-display text-4xl text-sindoor/70",
  },
  { text: "Essays", x: 8, y: 50, className: "font-display text-2xl text-gold-deep italic" },
  { text: "संवाद", lang: "mr", x: 38, y: 44, className: "text-3xl text-ink-muted rotate-2" },
  {
    text: "नाटक",
    lang: "mr",
    x: 74,
    y: 66,
    className: "font-deva-display text-4xl text-peacock/80 -rotate-2",
  },
  { text: "Ideas", x: 30, y: 84, className: "text-sm tracking-[0.35em] text-tlf-green uppercase" },
];

const FIRST = 1500; // ms after load, once the title has settled
const STEP = 260;

function motion(i: number): React.CSSProperties {
  // Alternate directions so neighbouring words drift apart rather than in step
  const sx = (i % 2 ? 1 : -1) * (6 + (i % 3) * 3);
  const sy = (i % 3 === 0 ? -1 : 1) * (4 + (i % 4) * 2);
  const enter = FIRST + i * STEP;
  return {
    "--sx": `${sx}px`,
    "--sy": `${sy}px`,
    "--sd": `${5 + (i % 4) * 1.3}s`,
    animationDelay: `${enter}ms, ${enter + 1600}ms`,
  } as React.CSSProperties;
}

/**
 * Floating keyword cloud for the hero. The sway is continuous, so a pause button is
 * provided (WCAG 2.2.2); reduced-motion visitors see the settled words and no button.
 */
export function KeywordCloud({ className = "" }: { className?: string }) {
  const [paused, setPaused] = useState(false);
  return (
    <>
      <ul
        aria-hidden="true"
        data-paused={paused || undefined}
        className={`pointer-events-none absolute hidden xl:block [&[data-paused]_*]:[animation-play-state:paused] ${className}`}
      >
        {WORDS.map((w, i) => (
          <li
            key={w.text}
            lang={w.lang}
            style={{ left: `${w.x}%`, top: `${w.y}%`, ...motion(i) }}
            className={`absolute whitespace-nowrap motion-safe:animate-[diffuse_1.6s_ease-out_both,sway_var(--sd)_ease-in-out_infinite_alternate] ${w.className}`}
          >
            {w.text}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Play background animation" : "Pause background animation"}
        className="absolute top-3 right-3 hidden size-8 items-center justify-center rounded-full border border-rule text-ink-muted transition hover:border-tlf-green hover:text-tlf-green motion-safe:xl:flex"
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
