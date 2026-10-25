# Thane Literature Festival 2026 — Work Summary

Status as of 25 October 2026. The site runs locally (`npm run dev`), builds as a fully static site, and passes lint, typecheck, formatting and content validation. It is not yet a git repository or deployed to Vercel.

## Pages

| Route           | Contents                                                              |
| --------------- | --------------------------------------------------------------------- |
| `/`             | Hero · Tridhara lineup · Programme (schedule) · Venues · Registration |
| `/about`        | Mission, Vision, Festival History, Meet Our Team                      |
| `/competitions` | Five competitions with posters and full details                       |

Shared on every page: sticky header ("Thane _Literature_ Festival", 6 nav links, mobile menu below 1024px), skip link, footer with organiser/sponsor logos, social links and contact email.

## What was built, in order

1. **Scaffold** — Next.js 16.4.3 (App Router, Cache Components), TypeScript, Tailwind CSS v4, Prettier. Chose Next 16 over the 15 originally specified (user approved). Theme tokens for the CLAUDE.md palette plus `ink-muted`, `gold-deep` and `rule`; fonts Playfair Display, Lora, Noto Serif Devanagari and Rozha One via `next/font`; Devanagari line-height handled through `:lang(mr|hi)`.
2. **Content parser** — `src/lib/markdown.ts`: reads `src/content/**/*.md`, validates with zod, renders with marked. Fails the build on bad frontmatter, unknown speaker slugs or missing photos. `npm run content:check` validates without a full build. `_template.md` files document every field.
3. **Content from `Program Schedule.xlsx`** — 41 speaker files and 20 session files (12 English, 7 Marathi, 1 Hindi); 38 speaker photos converted to `public/images/speakers/`. Missing data entered as placeholders.
4. **Home page sections** — hero, filterable lineup, tabbed schedule with accessible session dialog, venues, registration, footer. Verified in headless Chrome at 1440px and 390px: no horizontal scroll, keyboard tabs, dialog focus handling, WCAG AA contrast.
5. **Revisions requested**
   - Removed "Chapter I–IV" labels from section headings.
   - Added the About page with team credits from the previous edition's site (photos and names kept as placeholders).
   - Lineup now opens on **Authors** (28); **All voices** adds the 13 moderator-only speakers; no "show more" cutoff.
   - Header title changed to "Thane Literature Festival"; **Competitions** added to the nav.
   - Competitions page built from the five posters in `ContentReference/Competitions`.
   - A Gadkari Rangayatan photo (Wikimedia Commons, with credit) was added to the hero and then **reverted** at the user's request — the user will supply the image.
6. **CLAUDE.md** brought in line with the implementation (see "Documentation" below).

## Where things live

| What                                                        | Where                                                                  |
| ----------------------------------------------------------- | ---------------------------------------------------------------------- |
| Speakers / sessions                                         | `src/content/speakers/*.md`, `src/content/schedule/*.md`               |
| Dates, venue, registration URL, social links, sponsors, nav | `src/lib/site.ts`                                                      |
| Team credits                                                | `src/lib/team.ts`                                                      |
| Competition details                                         | `src/lib/competitions.ts` (+ posters in `public/images/competitions/`) |
| Images                                                      | `public/images/{speakers,team,logos,competitions}/`                    |
| Components                                                  | `src/components/` (16 components)                                      |

## Placeholders and open items

**Waiting on information**

- Venue name and stage names → `SITE.venue` and each session's `venue`.
- Registration form URL → `SITE.registrationUrl` (button reads "Registration opens soon" until set).
- Day, time and venue for all 20 sessions (all currently under "To be scheduled").
- Titles for 3 sessions: R. Gopalakrishnan, Dr Vinay Sahasrabuddhe, Swanand Kirkire.
- Moderators for 5 sessions: Naresh Fernandes, Deepali Patwadekar, Ketan & Bharati Joshi, Vinay Sahasrabuddhe, Swanand Kirkire. Unnamed "co-travellers & friends" panelists for Beyond the Map.
- Bios and books for all 41 speakers (to come from verified sources only).
- Photos for Gandhali Bhide, A. S. Kumar, Bharati Joshi; higher-resolution photos for 10 speakers whose images are under 300px.
- 2026 sponsor names and logos (footer currently shows Fortress only).
- Gadkari Rangayatan image for the hero (user to supply).
- Updated team photos and names for the About page.
- Thane in Ten Frames: submission email, languages and prizes (not on the poster).
- Competition entry deadlines (not on any poster).
- Higher-resolution Rangmanch poster (current file is 354px).

**Spellings to confirm** (changed or inferred from the spreadsheet)

- Ayaz Memon (sheet: "Memmon"), Devdutt Pattanaik ("Devdutta"), Bharati Joshi ("Bharathi"/"Bharati"), Satyendra K. Dwivedi (garbled filename), Uttara Mone / उत्तरा मोने (sheet: "उत्तर मोने"), Pranjana Jambhekar (filename: "Prajana").
- Chitrakathi submission address is `register+chitrakathee@thanelitfest.in` exactly as on the poster.

**Decisions for the user**

- Whether the About page's "Moderators" group (from 2025) stays.
- Which speakers are `featured` (lineup currently sorts alphabetically).
- Abdullah Khan and Arti Dwarkadas have photos in `ContentReference` but no session — not added.

**Not yet done**

- `git init`, first commit, and Vercel deployment.
- Dedicated schedule/speaker pages (everything is on the home page for now).
- Previous edition's partners (Brand Masterss, Bargain Book Hut, Hindustan Times) and other sponsors are not shown.

## Documentation

`claude.md` was updated to match the implementation. Drifts corrected:

| Area          | Was                                                                   | Now                                                                                                                                                                                                                                                                                    |
| ------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Commands      | dev / build / typecheck / lint / format                               | adds `format:check`, `content:check`, image-cache note                                                                                                                                                                                                                                 |
| Content layer | ".md/.mdx via Contentlayer or native utilities"; example-only schemas | native `markdown.ts` (gray-matter + zod + marked); actual speaker & session schemas incl. `nameNative`, `designation`, `sources`, `panelists`, `moderators`, optional day/time/venue; `_template.md`, comment placeholders; `site.ts` / `team.ts` / `competitions.ts` / `languages.ts` |
| Tech stack    | next-intl for language switching                                      | no i18n library (English-only site, `lang` attributes); zod/marked/Prettier; Lucide has no brand icons; Next 16 `next/image` notes                                                                                                                                                     |
| Design        | palette + "X or Y" font choices                                       | Tailwind token names, `ink-muted` / `gold-deep` / `rule`, gold decorative-only rule, fixed font choices, `textLang()`; no "Chapter" labels; user-supplied photos only                                                                                                                  |
| Navigation    | Lineup, Schedule, Venues, Registration                                | + Competitions, About; `/#id` links; title "Thane Literature Festival"; menu from 1024px                                                                                                                                                                                               |
| Hero          | location example "Gadkari Rangayatan"                                 | venue TBA placeholder; CTA behaviour                                                                                                                                                                                                                                                   |
| Lineup        | filter by language                                                    | Authors default, language filters, All voices adds moderators                                                                                                                                                                                                                          |
| Schedule      | Day/Venue tabs, example stage names                                   | + "To be scheduled" tab; stage filter only when venues exist; free-text venues                                                                                                                                                                                                         |
| Sections      | numbered 1–4 then 6; footer "sponsor logos"                           | Venues & Registration documented; footer organisers + sponsors + social + email; About and Competitions pages added                                                                                                                                                                    |
| Workflow      | parser first; `ScheduleTab.tsx` example                               | schema-first rule; `ScheduleTabs.tsx`; client components must not import values from `markdown.ts`; full pre-review checklist; not yet a git repo                                                                                                                                      |
| Typos         | "Rangaytan", "channging", "remains"                                   | corrected                                                                                                                                                                                                                                                                              |
