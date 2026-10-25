// Festival team credits, carried over verbatim from https://www.thanelitfest.in/about
// (CLAUDE.md: credits and about-us remain the same across editions).

export type TeamMember = {
  name: string;
  photo: string;
  /** One line per role, as listed on the original site. */
  roles: string[];
};

export type TeamGroup = { title: string; members: TeamMember[] };

const member = (name: string, slug: string, ...roles: string[]): TeamMember => ({
  name,
  photo: `/images/team/${slug}.jpg`,
  roles,
});

export const TEAM: TeamGroup[] = [
  {
    title: "Our Team",
    members: [
      member(
        "Samir Limaye",
        "samir-limaye",
        "Initiator, Thane Literature Festival",
        "President, Rotary Club of Thane Hills",
      ),
      member(
        "Dr. Sujata Jadhav",
        "sujata-jadhav",
        "Head, Library and Documentation Center, National Center for the Performing Arts (NCPA)",
      ),
      member("Nilesh Pitale", "nilesh-pitale", "Secretary, Rotary Club of Thane Hills"),
      member(
        "Atul Bhide",
        "atul-bhide",
        "Convener, Thane Literature Festival",
        "Past President, Rotary Club of Thane Hills",
      ),
    ],
  },
  {
    title: "Moderators",
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
    title: "Event Management",
    members: [
      member("Shrirang Date", "shrirang-date", "VIP Logistics In-charge"),
      member("Anuja Kulkarni", "anuja-kulkarni", "VIP Management In-charge"),
    ],
  },
  {
    title: "Tech Team",
    members: [
      member("Gautam Banik", "gautam-banik"),
      member("Aniket Kanade", "aniket-kanade"),
      member("Akanksha Ghotkar", "akanksha-ghotkar"),
    ],
  },
];
