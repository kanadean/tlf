// Festival team credits, carried over verbatim from https://www.thanelitfest.in/about
// (CLAUDE.md: credits and about-us remain the same across editions).

export type TeamMember = {
  name: string;
  /** Omitted until a photo is supplied — initials are shown instead. */
  photo?: string;
  /** One line per role, as listed on the original site. */
  roles: string[];
};

export type TeamGroup = {
  title: string;
  members: TeamMember[];
  /** Kept for later but not shown on the About page for now (15 Nov 2026). */
  hidden?: boolean;
  /** Keep this group on the same row as the next one (they wrap together). */
  pairWithNext?: boolean;
};

const member = (name: string, slug: string, ...roles: string[]): TeamMember => ({
  name,
  photo: `/images/team/${slug}.jpg`,
  roles,
});

export const TEAM: TeamGroup[] = [
  {
    title: "Our Team",
    // Order as requested on 15 Nov 2026
    members: [
      member("Dr. Anagha Karkhanis", "anagha-karkhanis", "President, Rotary Club of Thane Hills"),
      member(
        "Atul Bhide",
        "atul-bhide",
        "Convener, Thane Literature Festival",
        "Past President, Rotary Club of Thane Hills",
      ),
      {
        name: "A S Kumar",
        photo: "/images/speakers/a-s-kumar.jpg",
        roles: ["Co-Convener, Thane Literature Festival"],
      },
      member(
        "Dr. Sujata Jadhav",
        "sujata-jadhav",
        "Head, Library and Documentation Center, National Center for the Performing Arts (NCPA)",
      ),
      member("Vasant Bhat", "vasant-bhat", "Secretary, Rotary Club of Thane Hills"),
    ],
  },
  // Shown below the organising team (16 Nov 2026), in this order
  {
    title: "TLF-2026 Pillars of Support",
    members: [
      member("Samir Limaye", "samir-limaye"),
      member("Vijay Shetty", "vijay-shetty"),
      member("Yashodhara Bhide", "yashodhara-bhide"),
    ],
  },
  {
    title: "Team TLF-2026 Competitions",
    members: [
      member("Sucheta Rege", "sucheta-rege"),
      member("Kalita Subramanian", "kalita-subramanian"),
      member("Nandita Ganguly", "nandita-ganguly"),
      member("Aneetha Shetty", "aneetha-shetty"),
      member("Gautam Banik", "gautam-banik"),
      member("Shrirang Date", "shrirang-date"),
    ],
  },
  {
    title: "Team TLF-2026 Galleries",
    members: [
      member("Manjiri Limaye", "manjiri-limaye"),
      member("Nilima Nagavkar", "nilima-nagavkar"),
      member("Shrirang Date", "shrirang-date"),
      member("Madhavi Naik", "madhavi-naik"),
    ],
  },
  { title: "Logistics In-charge", members: [member("Shrirang Date", "shrirang-date")] },
  {
    title: "Website Design and Creation",
    pairWithNext: true, // always beside Tech Support
    members: [member("Aniket Kanade", "aniket-kanade")],
  },
  { title: "Tech Support", members: [member("Gautam Banik", "gautam-banik")] },
  // 2025 groups, kept for reference but not shown
  {
    title: "Moderators (2025)",
    hidden: true,
    members: [
      member("Sarita Bahl", "sarita-bahl"),
      member("Dr. Suhas Kulkarni", "suhas-kulkarni"),
      member("Dr. Seetha Raju", "seetha-raju"),
      member("Aneetha Satish", "aneetha-satish"),
      member("Harshad Divekar", "harshad-divekar"),
      member("Atul Bhide", "atul-bhide"),
    ],
  },
  {
    title: "Event Management (2025)",
    hidden: true,
    members: [
      member("Shrirang Date", "shrirang-date", "VIP Logistics In-charge"),
      member("Anuja Kulkarni", "anuja-kulkarni", "VIP Management In-charge"),
    ],
  },
];
