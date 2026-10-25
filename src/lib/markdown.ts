// Loads speaker and schedule content from src/content/**/*.md.
//
// Reads are synchronous on purpose: under Cache Components, readFileSync /
// readdirSync complete during prerender and land in the static shell, so pages
// built from this content stay fully static.
//
// Every file is validated with zod. A typo in frontmatter, an unknown speaker
// slug in a session, or a photo path that doesn't exist in /public fails the
// build with the offending file named — better than a silently broken page.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { z } from "zod";
import { SESSION_LANGUAGES, SPEAKER_LANGUAGES, type SpeakerLanguage } from "./languages.ts";

export * from "./languages.ts";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");
const PUBLIC_DIR = path.join(process.cwd(), "public");

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

const slugList = z.array(z.string().regex(/^[a-z0-9-]+$/, "must be a kebab-case speaker slug"));

const time12h = z
  .string()
  .regex(/^(1[0-2]|0?[1-9]):[0-5]\d\s?(AM|PM)$/i, 'must look like "11:00 AM"');

const publicPath = z
  .string()
  .startsWith("/", 'must be an absolute path under /public, e.g. "/images/speakers/x.jpg"');

const speakerSchema = z.object({
  name: z.string().min(1),
  /** Name in Devanagari, shown alongside `name` for Marathi/Hindi speakers. */
  nameNative: z.string().optional(),
  /** Role or affiliation, e.g. "Secretary, Marathi Language Department". */
  designation: z.string().optional(),
  language: z.array(z.enum(SPEAKER_LANGUAGES)).min(1),
  genre: z.string().optional(),
  photo: publicPath.optional(),
  featured: z.boolean().default(false),
  /** Most recent first — the first entry is shown as "latest book" on cards. */
  books: z.array(z.string()).default([]),
  /** Source URLs the biography was verified against. Not rendered. */
  sources: z.array(z.url()).default([]),
});

const sessionSchema = z
  .object({
    title: z.string().min(1),
    /** Day, time and venue are optional until the programme is finalised. */
    day: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
    timeStart: time12h.optional(),
    timeEnd: time12h.optional(),
    venue: z.string().optional(),
    primaryLanguage: z.enum(SESSION_LANGUAGES),
    /** Guests / main speakers. */
    speakers: slugList.min(1),
    panelists: slugList.default([]),
    moderators: slugList.default([]),
  })
  .refine((s) => !s.timeEnd || s.timeStart, {
    message: "timeEnd is set but timeStart is missing",
    path: ["timeStart"],
  });

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Speaker = z.infer<typeof speakerSchema> & {
  slug: string;
  /** Rendered biography HTML. Empty string until a verified bio is written. */
  bioHtml: string;
  /** Plain-text bio, trimmed for cards. */
  excerpt: string;
};

export type Session = z.infer<typeof sessionSchema> & {
  slug: string;
  summaryHtml: string;
};

/** A session with its speaker slugs resolved to full Speaker records. */
export type ResolvedSession = Omit<Session, "speakers" | "panelists" | "moderators"> & {
  speakers: Speaker[];
  panelists: Speaker[];
  moderators: Speaker[];
};

// ---------------------------------------------------------------------------
// Loading
// ---------------------------------------------------------------------------

type RawEntry = { slug: string; file: string; data: unknown; body: string };

function readCollection(dir: string): RawEntry[] {
  const abs = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(abs)) return [];

  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .sort()
    .map((f) => {
      const file = path.join("src", "content", dir, f);
      const { data, content } = matter(fs.readFileSync(path.join(abs, f), "utf8"));
      // HTML comments mark placeholders ("Bio TBD") and must not count as content
      const body = content.replace(/<!--[\s\S]*?-->/g, "").trim();
      return { slug: f.replace(/\.md$/, ""), file, data, body };
    });
}

function parseOrThrow<T>(schema: z.ZodType<T>, entry: RawEntry): T {
  const result = schema.safeParse(entry.data);
  if (!result.success) {
    throw new Error(`Invalid frontmatter in ${entry.file}:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

function renderMarkdown(body: string): string {
  return body ? (marked.parse(body, { async: false }) as string) : "";
}

function toExcerpt(body: string, maxLength = 180): string {
  const text = body
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // links → text
    .replace(/[#>*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

let speakerCache: Map<string, Speaker> | undefined;
let sessionCache: Session[] | undefined;

function loadSpeakers(): Map<string, Speaker> {
  if (speakerCache) return speakerCache;

  const speakers = new Map<string, Speaker>();
  for (const entry of readCollection("speakers")) {
    const data = parseOrThrow(speakerSchema, entry);
    if (data.photo && !fs.existsSync(path.join(PUBLIC_DIR, data.photo))) {
      throw new Error(`${entry.file}: photo "${data.photo}" not found in /public`);
    }
    speakers.set(entry.slug, {
      ...data,
      slug: entry.slug,
      bioHtml: renderMarkdown(entry.body),
      excerpt: toExcerpt(entry.body),
    });
  }
  return (speakerCache = speakers);
}

function loadSessions(): Session[] {
  if (sessionCache) return sessionCache;

  const speakers = loadSpeakers();
  const sessions = readCollection("schedule").map((entry) => {
    const data = parseOrThrow(sessionSchema, entry);
    const missing = [...data.speakers, ...data.panelists, ...data.moderators].filter(
      (slug) => !speakers.has(slug),
    );
    if (missing.length) {
      throw new Error(
        `${entry.file}: unknown speaker slug(s) ${missing.map((s) => `"${s}"`).join(", ")} — ` +
          `expected matching files in src/content/speakers/`,
      );
    }
    return { ...data, slug: entry.slug, summaryHtml: renderMarkdown(entry.body) };
  });

  return (sessionCache = sessions.sort(compareSessions));
}

// ---------------------------------------------------------------------------
// Sorting helpers
// ---------------------------------------------------------------------------

/** "11:00 AM" → 660. Returns Infinity for unscheduled sessions so they sort last. */
export function timeToMinutes(time?: string): number {
  const match = time?.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
  if (!match) return Infinity;
  const [, h, m, meridiem] = match;
  const hours = (Number(h) % 12) + (meridiem.toUpperCase() === "PM" ? 12 : 0);
  return hours * 60 + Number(m);
}

function compareSessions(a: Session, b: Session): number {
  return (
    (a.day ?? Infinity) - (b.day ?? Infinity) ||
    timeToMinutes(a.timeStart) - timeToMinutes(b.timeStart) ||
    a.slug.localeCompare(b.slug)
  );
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** All speakers, featured first, then alphabetical by name. */
export function getAllSpeakers(): Speaker[] {
  return [...loadSpeakers().values()].sort(
    (a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name),
  );
}

/** A speaker as shown in the lineup grid. */
export type LineupSpeaker = Speaker & {
  /** Appears only as a moderator — never as a guest or panelist. */
  moderatorOnly: boolean;
};

/** All speakers for the lineup, flagged by whether they only moderate. */
export function getLineup(): LineupSpeaker[] {
  const sessions = loadSessions();
  const authors = new Set(sessions.flatMap((s) => [...s.speakers, ...s.panelists]));
  const moderators = new Set(sessions.flatMap((s) => s.moderators));
  return getAllSpeakers().map((s) => ({
    ...s,
    moderatorOnly: moderators.has(s.slug) && !authors.has(s.slug),
  }));
}

export function getSpeaker(slug: string): Speaker | undefined {
  return loadSpeakers().get(slug);
}

export function getSpeakersByLanguage(language: SpeakerLanguage): Speaker[] {
  return getAllSpeakers().filter((s) => s.language.includes(language));
}

/** All sessions with speaker slugs resolved, ordered by day, then start time. */
export function getAllSessions(): ResolvedSession[] {
  const speakers = loadSpeakers();
  const resolve = (slugs: string[]) => slugs.map((slug) => speakers.get(slug)!);
  return loadSessions().map((s) => ({
    ...s,
    speakers: resolve(s.speakers),
    panelists: resolve(s.panelists),
    moderators: resolve(s.moderators),
  }));
}

export function getSessionsByDay(day: 1 | 2 | 3): ResolvedSession[] {
  return getAllSessions().filter((s) => s.day === day);
}

/** Distinct venues in use, in first-appearance order — drives the venue tabs. */
export function getVenues(): string[] {
  return [...new Set(loadSessions().flatMap((s) => (s.venue ? [s.venue] : [])))];
}

/** Sessions a speaker appears in, in any role. */
export function getSessionsForSpeaker(slug: string): ResolvedSession[] {
  return getAllSessions().filter((s) =>
    [...s.speakers, ...s.panelists, ...s.moderators].some((p) => p.slug === slug),
  );
}
