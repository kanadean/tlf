// TLF-2026 viewer galleries (request of 21 Nov 2026). Only facts supplied by the festival —
// add specifics (languages, film titles, exhibits) here as they are confirmed.

export type Motif = "proverbs" | "films" | "frames" | "manuscripts";
export type Tone = "sindoor" | "peacock" | "green" | "gold";

export type Gallery = {
  slug: string;
  /** Small line above the title on the flyer. */
  kicker: string;
  title: string;
  /** Optional Devanagari accent on the flyer. */
  native?: { text: string; lang: "mr" | "hi" };
  tagline: string;
  /** What visitors will see — shown on the flyer and beside it. */
  highlights: string[];
  motif: Motif;
  tone: Tone;
  /** Optional link, e.g. to the related competition. */
  link?: { href: string; label: string };
};

export const GALLERIES: Gallery[] = [
  {
    slug: "proverbs",
    kicker: "Ten languages · one wisdom",
    title: "Proverbs Gallery",
    native: { text: "म्हणी", lang: "mr" },
    tagline: "The wit of a people in a single line",
    highlights: [
      "Proverbs in 10 Indian languages",
      "Scan the QR code beside each proverb to read its meaning in English",
    ],
    motif: "proverbs",
    tone: "sindoor",
  },
  {
    slug: "films-and-books",
    kicker: "From the page to the screen",
    title: "Films & Books Gallery",
    tagline: "Well-known films and the books behind them",
    highlights: ["Well-known films based on books"],
    motif: "films",
    tone: "peacock",
  },
  {
    slug: "thane-in-ten-frames",
    kicker: "Photography",
    title: "Thane In Ten Frames",
    tagline: "The city through the lens of the competition’s winners",
    highlights: ["Photographs by the winners of the Thane in Ten Frames competition"],
    motif: "frames",
    tone: "green",
    link: { href: "/competitions#thane-in-ten-frames", label: "About the competition" },
  },
  {
    slug: "oriental-study",
    kicker: "Special Corner · Institute for Oriental Study",
    title: "Rare Manuscripts & Books",
    tagline: "A rare glimpse of the written heritage",
    highlights: ["Rare manuscripts and books from the Institute for Oriental Study"],
    motif: "manuscripts",
    tone: "gold",
  },
];

export const GALLERY_INFO = {
  when: "Open on all three festival days",
  where: "Exhibition Galleries · Hall next to the lifts, 3rd floor",
  venue: "Dr. Kashinath Ghanekar Auditorium, Thane",
  opening: "Galleries inaugurated on Fri, 4 Dec at 3:45 PM",
};
