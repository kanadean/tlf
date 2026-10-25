---
# Copy to <slug>.md (kebab-case, e.g. girish-kuber.md). Files starting with "_" are ignored.
# The slug is how schedule sessions refer to this speaker.
name: "Full Name" # English/Latin spelling, used for sorting and alt text
nameNative: "देवनागरी नाव" # optional — Devanagari name for Marathi/Hindi speakers
designation: "Secretary, ..." # optional — role or affiliation
language: ["marathi"] # one or more of: marathi, hindi, english
genre: "Journalism & Non-fiction" # optional
photo: "/images/speakers/<slug>.jpg" # optional — must exist under /public
featured: false # featured speakers sort first in the lineup
books: # optional — most recent first; the first is shown as "latest book"
  - "Title (Year)"
sources: # URLs the bio was verified against (not displayed)
  - "https://example.com/verified-profile"
---

Biography in markdown. Only include facts verifiable from the listed sources. Leave the
body empty rather than guessing — the card simply omits the bio snippet.
