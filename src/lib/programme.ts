// Programme item kinds and helpers shared with client components (no node:fs).
import type { ResolvedSession } from "./markdown.ts";
import type { SessionLanguage } from "./languages.ts";

export const PROGRAMME_KINDS = ["session", "reading", "performance", "break", "ceremony"] as const;
export type ProgrammeKind = (typeof PROGRAMME_KINDS)[number];

/** Label shown beside non-talk items in the schedule. */
export const KIND_LABEL: Record<ProgrammeKind, string> = {
  session: "Session",
  reading: "Reading",
  performance: "Performance",
  break: "Break",
  ceremony: "Ceremony",
};

/** A talk: has speakers and a language, and opens the session dialog. */
export type Talk = ResolvedSession & { kind: "session"; primaryLanguage: SessionLanguage };

export function isTalk(item: ResolvedSession): item is Talk {
  return item.kind === "session";
}

/** "11:40 AM – 12:25 PM", or just the start time when no end is given. */
export function formatTimeRange(item: Pick<ResolvedSession, "timeStart" | "timeEnd">): string {
  return item.timeStart ? [item.timeStart, item.timeEnd].filter(Boolean).join(" – ") : "Time TBA";
}
