// Festival-wide facts that aren't per-speaker or per-session content.
// Fields set to null are not yet announced; components render a placeholder.

export const SITE = {
  name: "Thane Literature Festival",
  shortName: "TLF",
  edition: "Second Edition",
  year: 2026,
  datesLabel: "4th, 5th and 6th December 2026",
  days: [
    { day: 1, label: "Day 1", date: "Fri, 4 Dec" },
    { day: 2, label: "Day 2", date: "Sat, 5 Dec" },
    { day: 3, label: "Day 3", date: "Sun, 6 Dec" },
  ],
  city: "Thane, Maharashtra",
  /** Venue name; set to null to show "To be announced". */
  venue: "Dr. Kashinath Ghanekar Auditorium" as string | null,
  /** Where things happen inside the venue (shown in the Venues section). */
  spaces: [
    { name: "Exhibition Galleries", where: "Hall, next to the lifts, 3rd floor" },
    { name: "Literary Sessions", where: "Mini Auditorium, 3rd floor" },
  ],
  /** Registration form (Google Form); set to null to show "Registration opens soon". */
  registrationUrl: "https://forms.gle/Wa9yXTfcKdbwGygT6" as string | null,
  email: "info@thanelitfest.in",
  tagline:
    "Celebrating the power of words and the magic of storytelling through community, creativity, and literary excellence.",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/thanelitfest/" },
    {
      label: "Facebook",
      href: "https://www.facebook.com/people/Thane-Literature-Festival/61580959521979/",
    },
    // Official channel: hosts the 2025 festival livestreams
    { label: "YouTube", href: "https://www.youtube.com/@ThaneLitFest" },
    { label: "X", href: "https://x.com/thanelitfest" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/rotary-club-of-thane-hills/" },
  ],
  organisers: [
    {
      name: "Rotary Club of Thane Hills",
      logo: "/images/logos/rotary-club-of-thane-hills.png",
      width: 1015,
      height: 293,
      href: "https://rcthanehills.rotaryindia.org/",
      scale: 1.375, // two-line wordmark reads small beside NCPA: 125% plus another 10%
    },
  ],
  /** "In association with" row. */
  associates: [
    {
      name: "NCPA Mumbai",
      logo: "/images/logos/ncpa.png",
      width: 588,
      height: 132,
      href: "https://www.ncpamumbai.com/",
    },
    {
      name: "Page to Stage",
      logo: "/images/logos/page-to-stage.png",
      width: 600,
      height: 378,
      href: null,
    },
  ],
  /** Shown at the foot of the hero: "With the generous support of" + logo (28 Nov). Set to null to hide. */
  heroSupporter: {
    label: "Generously Supported By",
    name: "Prashant Corner",
    logo: "/images/logos/prashant-corner-hero.png", // transparent version for the paper ground
    width: 461,
    height: 338,
    href: null as string | null,
  } as {
    label: string;
    name: string;
    logo: string;
    width: number;
    height: number;
    href: string | null;
  } | null,
  /** "Sponsored by" row. */
  sponsors: [
    {
      name: "Fortress",
      logo: "/images/logos/fortress.png",
      width: 840,
      height: 190,
      href: null,
    },
  ],
  /** "Supported by" row, each captioned with its role. */
  partners: [
    {
      name: "Crossword",
      role: "Book Partner",
      logo: "/images/logos/crossword.jpg",
      width: 800,
      height: 238,
      href: "https://www.crossword.in/",
    },
    {
      name: "WordPinchh",
      role: "Social Media Design Support",
      logo: "/images/logos/wordpinchh.png",
      width: 1200,
      height: 268,
      href: null,
    },
    {
      name: "Kuvega",
      role: "AV Support",
      logo: "/images/logos/kuvega.png",
      width: 612,
      height: 444,
      href: null,
      scale: 1.5, // compact emblem: larger so the wordmark reads
    },
  ],
} as const;

// Home sections are linked as "/#id" so the nav also works from other pages
export type NavLink = { href: string; label: string; external?: boolean };

export const NAV_LINKS: readonly NavLink[] = [
  { href: "/#lineup", label: "Lineup" },
  { href: "/#schedule", label: "Schedule" },
  { href: "/competitions", label: "Competitions" },
  { href: "/galleries", label: "Galleries" },
  { href: "/#venues", label: "Venues" },
  { href: "/#registration", label: "Registration" },
  { href: "/about", label: "About" },
  // Archived site of the previous edition; opens in a new tab
  { href: "https://tlf2025.thanelitfest.in", label: "TLF-2025", external: true },
];
