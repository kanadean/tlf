---
# Copy to <slug>.md (kebab-case). Files starting with "_" are ignored.
# Talks: en-NN-…, mr-NN-…, hi-NN-…   Other programme items: interlude-dN-NN-…
kind: "session" # optional — session (a talk, the default), reading, performance, break, ceremony or tba (empty slot)
title: "Session title" # may be in Devanagari for Marathi/Hindi sessions
day: 1 # optional until finalised — 1, 2 or 3 (4, 5, 6 December 2026)
timeStart: "11:00 AM" # optional — 12-hour format
timeEnd: "12:15 PM" # optional — requires timeStart
venue: "Stage name" # optional until venues are finalised
primaryLanguage: "english" # required for talks — marathi, hindi, english or multilingual
speakers: # guests — slugs of files in src/content/speakers/ (a talk needs at least one)
  - "speaker-slug"
panelists: [] # optional — co-panelists
moderators: [] # optional
moderatorTBA: false # optional — true shows "moderator to be announced"
---

Session summary in markdown. For non-talk items it is shown inline in the schedule.
