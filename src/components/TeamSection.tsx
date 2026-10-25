import { TEAM, type TeamMember } from "@/lib/team";
import { SectionHeading } from "./SectionHeading";
import { SpeakerPortrait } from "./SpeakerPortrait";

/** Credits for the people behind the festival, shown on the About page. */
export function TeamSection() {
  const [core, ...groups] = TEAM;

  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="scroll-mt-20 px-4 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="team-title" title="Meet Our Team" tone="rani">
          <p>The dedicated individuals working to make this festival a memorable experience</p>
        </SectionHeading>

        <h3 className="sr-only">{core.title}</h3>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {core.members.map((m) => (
            <li key={m.name}>
              <Member member={m} size="lg" />
            </li>
          ))}
        </ul>

        {/* The largest group gets a full row; the rest sit side by side from md up */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {groups.map((group, i) => (
            <div
              key={group.title}
              className={`rounded-3xl bg-haldi px-4 py-8 ${i === 0 ? "md:col-span-2" : ""}`}
            >
              <h3 className="text-center text-2xl text-jamun">{group.title}</h3>
              <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-8">
                {group.members.map((m) => (
                  <li key={m.name} className="w-28 sm:w-32">
                    <Member member={m} size="sm" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Member({ member, size }: { member: TeamMember; size: "lg" | "sm" }) {
  const large = size === "lg";
  return (
    <figure className="group flex flex-col items-center text-center">
      <SpeakerPortrait
        speaker={member}
        sizes={large ? "160px" : "80px"}
        className={`rounded-full ring-4 ${large ? "ring-marigold" : "ring-rani"} ${
          large ? "size-28 sm:size-36" : "size-20"
        }`}
      />
      <figcaption className={large ? "mt-5" : "mt-3"}>
        <p
          className={`font-display font-bold text-jamun ${large ? "text-xl" : "text-base leading-snug"}`}
        >
          {member.name}
        </p>
        {member.roles.map((role) => (
          <p key={role} className="mt-1 text-sm leading-snug text-ink-muted">
            {/* Non-breaking hyphens keep "In-charge" on one line */}
            {role.replaceAll("-", "‑")}
          </p>
        ))}
      </figcaption>
    </figure>
  );
}
