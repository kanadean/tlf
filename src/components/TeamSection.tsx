import { TEAM, type TeamGroup, type TeamMember } from "@/lib/team";
import { SectionHeading } from "./SectionHeading";
import { SpeakerPortrait } from "./SpeakerPortrait";

/** Credits for the people behind the festival, shown on the About page. */
export function TeamSection() {
  const [core, ...rest] = TEAM;
  const groups = rest.filter((g) => !g.hidden);
  // Groups marked pairWithNext travel with the following group as one unit
  const units: TeamGroup[][] = [];
  for (let i = 0; i < groups.length; i++) {
    units.push(groups[i].pairWithNext && groups[i + 1] ? [groups[i], groups[++i]] : [groups[i]]);
  }

  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="scroll-mt-20 px-4 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="team-title" title="Meet Our Team">
          <p>The dedicated individuals working to make this festival a memorable experience</p>
        </SectionHeading>

        <h3 className="sr-only">{core.title}</h3>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-10 sm:gap-x-10">
          {core.members.map((m) => (
            <li key={m.name} className="w-40 sm:w-48">
              <Member member={m} size="lg" />
            </li>
          ))}
        </ul>

        {/* Each team takes only the width it needs, so smaller teams share a row on desktop */}
        {units.length > 0 && (
          <div className="mt-16 flex flex-wrap justify-center gap-x-12 gap-y-14 border-t border-rule pt-12">
            {units.map((unit) => (
              <div
                key={unit[0].title}
                className="flex flex-wrap justify-center gap-x-12 gap-y-14 sm:flex-nowrap"
              >
                {unit.map((group) => (
                  <Group key={group.title} group={group} />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Group({ group }: { group: TeamGroup }) {
  return (
    <div>
      <h3 className="text-center text-xs tracking-[0.3em] text-gold-deep uppercase">
        {group.title}
      </h3>
      <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-8">
        {group.members.map((m) => (
          <li key={m.name} className="w-28 sm:w-32">
            <Member member={m} size="sm" />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Member({ member, size }: { member: TeamMember; size: "lg" | "sm" }) {
  const large = size === "lg";
  return (
    <figure className="flex flex-col items-center text-center">
      {/* Team photos keep their natural colours — no sepia or hover effect */}
      <SpeakerPortrait
        tone="natural"
        speaker={member}
        sizes={large ? "160px" : "112px"}
        className={`rounded-full ring-1 ring-rule ring-offset-4 ring-offset-haldi ${
          large ? "size-28 sm:size-36" : "size-20 sm:size-24"
        }`}
      />
      <figcaption className={large ? "mt-5" : "mt-3"}>
        <p className={`font-display ${large ? "text-xl" : "text-base leading-snug"}`}>
          {/* Non-breaking hyphen keeps double-barrelled names together */}
          {member.name.replaceAll("-", "‑")}
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
