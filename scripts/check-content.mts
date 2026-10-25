// Validates everything under src/content without running a full build.
// Usage: npm run content:check
import { getAllSessions, getAllSpeakers } from "../src/lib/markdown.ts";

try {
  const speakers = getAllSpeakers();
  const sessions = getAllSessions();
  const unscheduled = sessions.filter((s) => !s.day || !s.timeStart || !s.venue);
  const noBio = speakers.filter((s) => !s.bioHtml);
  const noPhoto = speakers.filter((s) => !s.photo);

  console.log(`✓ ${speakers.length} speakers, ${sessions.length} sessions — all valid`);
  if (unscheduled.length) console.log(`  ${unscheduled.length} session(s) missing day/time/venue`);
  if (noBio.length) console.log(`  ${noBio.length} speaker(s) without a bio`);
  if (noPhoto.length) console.log(`  ${noPhoto.length} speaker(s) without a photo`);
} catch (error) {
  console.error(`✖ ${(error as Error).message}`);
  process.exit(1);
}
