// Validates everything under src/content without running a full build.
// Usage: npm run content:check
import { getAllSessions, getAllSpeakers, isTalk } from "../src/lib/markdown.ts";

try {
  const speakers = getAllSpeakers();
  const items = getAllSessions();
  const talks = items.filter(isTalk);
  const unscheduled = items.filter((s) => !s.day || !s.timeStart);
  const noModerator = talks.filter((s) => s.moderators.length === 0 && !s.moderatorTBA);
  const moderatorTBA = talks.filter((s) => s.moderatorTBA);
  const tba = items.filter((s) => s.kind === "tba");
  const noBio = speakers.filter((s) => !s.bioHtml);
  const noPhoto = speakers.filter((s) => !s.photo);

  console.log(
    `✓ ${speakers.length} speakers, ${talks.length} talks + ${items.length - talks.length} other programme items — all valid`,
  );
  if (unscheduled.length) console.log(`  ${unscheduled.length} item(s) missing day/time`);
  if (moderatorTBA.length) console.log(`  ${moderatorTBA.length} talk(s) with moderator TBA`);
  if (noModerator.length) console.log(`  ${noModerator.length} talk(s) without a moderator`);
  if (tba.length) console.log(`  ${tba.length} slot(s) still to be announced`);
  if (noBio.length) console.log(`  ${noBio.length} speaker(s) without a bio`);
  if (noPhoto.length) console.log(`  ${noPhoto.length} speaker(s) without a photo`);
} catch (error) {
  console.error(`✖ ${(error as Error).message}`);
  process.exit(1);
}
