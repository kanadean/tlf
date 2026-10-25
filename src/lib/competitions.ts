// Festival competitions, transcribed from the posters in ContentReference/Competitions.
// Each poster is also shown on the page; this text makes the details readable,
// searchable and accessible. Keep it in sync when a poster changes.

export type Competition = {
  slug: string;
  title: string;
  /** Kind of entry, e.g. "Short story". */
  kind: string;
  tagline: string;
  /** Devanagari tagline, if the poster has one. */
  taglineNative?: { text: string; lang: "mr" | "hi" };
  intro?: string[];
  /** A quoted prompt or the subjects to choose from. */
  prompt?: { label: string; text: string[] };
  facts: { label: string; value: string }[];
  guidelines: string[];
  /** Submission email; null when not yet announced. */
  email: string | null;
  eligibility?: string;
  poster: { src: string; width: number; height: number };
};

const LANGUAGES = "Marathi, Hindi and English";
const PRIZES = "Exciting prizes for the first three winners; participation certificates for all";

export const COMPETITIONS: Competition[] = [
  {
    slug: "meri-story",
    title: "Meri Story",
    kind: "Short story",
    tagline: "Opportunity to showcase your writing skills & win awards!",
    prompt: {
      label: "Opening lines — weave your story from here",
      text: [
        "“6749 – Priyanka hurriedly shared the number with the driver as she sat at the back. She opened her mobile camera, checked on her lip-glow, adjusted her hair, and decided to take a quick nap.”",
      ],
    },
    facts: [
      { label: "Word limit", value: "500 words (excluding the first two lines provided by us)" },
      { label: "Languages", value: LANGUAGES },
      { label: "Prizes", value: PRIZES },
    ],
    guidelines: [
      "The story you write and submit must be written by you without any AI tool support and un-published earlier. You will submit it with due self-certification to that effect.",
    ],
    email: "register+meristory@thanelitfest.in",
    poster: { src: "/images/competitions/meri-story.jpg", width: 1254, height: 1254 },
  },
  {
    slug: "chitrakathi",
    title: "Chitrakathi",
    kind: "Picture-prompt writing",
    tagline: "Picture Speaks — “What does this picture speak to YOU?”",
    intro: [
      "A picture can evoke different emotions, memories, thoughts and stories in different people. Consider any ONE of the two images on the poster. There is no single correct interpretation.",
    ],
    facts: [
      { label: "Word limit", value: "750 words" },
      { label: "Languages", value: LANGUAGES },
      { label: "Prizes", value: PRIZES },
    ],
    guidelines: [],
    email: "register+chitrakathee@thanelitfest.in",
    poster: { src: "/images/competitions/chitrakathi.jpg", width: 1254, height: 1254 },
  },
  {
    slug: "my-dream",
    title: "My Dream Thane / My Dream India",
    kind: "Essay",
    tagline: "Essay competition",
    prompt: {
      label: "Write on any one subject",
      text: ["My Dream Thane and Me", "My Dream India and Me"],
    },
    facts: [
      { label: "Word limit", value: "750 words" },
      { label: "Languages", value: LANGUAGES },
      {
        label: "Prizes",
        value: "Exciting prizes for the top 3 winners; participation certificates for all",
      },
    ],
    guidelines: [
      "Your essay must be written by you, without AI tool support, and unpublished earlier.",
    ],
    email: "register+mydream@thanelitfest.in",
    poster: { src: "/images/competitions/my-dream.jpg", width: 1254, height: 1254 },
  },
  {
    slug: "thane-in-ten-frames",
    title: "Thane in Ten Frames",
    kind: "Photography",
    tagline: "Tell your Thane story in 10 photographs. Your lens. Your perspective. Thane.",
    facts: [
      { label: "Entry", value: "10 photographs with a note of up to 350 words" },
      { label: "Photo size", value: "Not more than 2000 pixels" },
    ],
    guidelines: [
      "Each photo must have been clicked by you after the announcement of this competition, i.e. on and after 1 October, 2026.",
      "Each photo needs to be unpublished in any format anywhere.",
      "A caption to a frame will add value to your story.",
      "Each entry also needs to have a note from you in not more than 350 words sharing the theme and the context of your story. It should also cover why you choose the said theme.",
      "Each photo should not be more than 2000 pixels; any deviation to this will not be considered for the competition.",
    ],
    email: null,
    poster: { src: "/images/competitions/thane-in-ten-frames.jpg", width: 1024, height: 1536 },
  },
  {
    slug: "rangmanch",
    title: "Rangmanch",
    kind: "Performance",
    tagline: "Bring your favourite character to life!",
    taglineNative: { text: "मंच से मन तक!", lang: "hi" },
    facts: [
      { label: "Time limit", value: "10 minutes" },
      { label: "Languages", value: LANGUAGES },
      { label: "Prizes", value: PRIZES },
      {
        label: "Special recognition",
        value:
          "Selected performances may get an opportunity to perform during TLF-2026 (based on entries)",
      },
    ],
    guidelines: [],
    email: "register+rangmanch@thanelitfest.in",
    eligibility: "Only for college students",
    poster: { src: "/images/competitions/rangmanch.jpg", width: 354, height: 354 },
  },
];

/** Shared note printed on several posters. */
export const COMPETITION_NOTE =
  "The competitions are to encourage, acknowledge and appreciate creativity amongst the citizens with no monetary involvement whatsoever.";
