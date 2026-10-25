// Festival-wide facts that aren't per-speaker or per-session content.
// Fields set to null are not yet announced; components render a placeholder.

export const SITE = {
  name: "Thane Literature Festival",
  shortName: "TLF",
  edition: "Second Edition",
  year: 2026,
  datesLabel: "4 – 6 December 2026",
  days: [
    { day: 1, label: "Day 1", date: "Fri, 4 Dec" },
    { day: 2, label: "Day 2", date: "Sat, 5 Dec" },
    { day: 3, label: "Day 3", date: "Sun, 6 Dec" },
  ],
  city: "Thane, Maharashtra",
  /** Venue name — not yet finalised. */
  venue: null as string | null,
  /** Registration form URL — not yet available. */
  registrationUrl: null as string | null,
  email: "info@thanelitfest.in",
  tagline:
    "Celebrating the power of words and the magic of storytelling through community, creativity, and literary excellence.",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/thanelitfest/" },
    {
      label: "Facebook",
      href: "https://www.facebook.com/people/Thane-Literature-Festival/61580959521979/",
    },
    { label: "X", href: "https://x.com/thanelitfest" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/rotary-club-of-thane-hills/" },
  ],
  organisers: [
    {
      name: "Rotary Club of Thane Hills",
      logo: "/images/logos/rotary-club-of-thane-hills.png",
      width: 800,
      height: 273,
      href: "https://rcthanehills.rotaryindia.org/",
    },
    {
      name: "NCPA Mumbai",
      logo: "/images/logos/ncpa.png",
      width: 588,
      height: 132,
      href: "https://www.ncpamumbai.com/",
    },
  ],
  sponsors: [
    { name: "Fortress", logo: "/images/logos/fortress.png", width: 840, height: 190, href: null },
  ],
} as const;

// Home sections are linked as "/#id" so the nav also works from other pages
export const NAV_LINKS = [
  { href: "/#lineup", label: "Lineup" },
  { href: "/#schedule", label: "Schedule" },
  { href: "/competitions", label: "Competitions" },
  { href: "/#venues", label: "Venues" },
  { href: "/about", label: "About" },
  // Last: the header renders it as the call-to-action button
  { href: "/#registration", label: "Register" },
] as const;
