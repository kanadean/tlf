# CLAUDE.md - Thane Literature Festival aka TLF

## Development Commands
- Start Local Dev Server: `npm run dev`
- Build Project: `npm run build` (then `npm run start` to serve the production build)
- Type Check: `npm run typecheck` (runs `next typegen` first — route types like `LayoutProps` are generated)
- Lint & Format: `npm run lint` / `npm run format` / `npm run format:check`
- Validate Content: `npm run content:check` — parses every speaker/schedule file, fails on schema errors, unknown speaker slugs or missing photos, and lists placeholders still to fill
- After replacing an image in `public/` under the same filename, delete `.next/cache/images` so the local server picks it up

## Content Reference
Content reference is available in 'ContentReference' folder and has README.md for explanation.
- Festival dates: 4–6 December 2026 (Fri–Sun). Venue: not yet finalised. Entry free, prior registration required.
- `Program Schedule.xlsx` is the source for `src/content/`; the markdown files are now the source of truth and are edited directly.
- Bios must come from verified sources only — leave them empty rather than guess.

## Content Architecture (Static Markdown)
Native Next.js server utilities — no Contentlayer. `src/lib/markdown.ts` reads `src/content/**/*.md` synchronously (so pages prerender statically under Cache Components), parses frontmatter with `gray-matter`, validates it with `zod`, and renders bodies with `marked`.
- **Speaker Data Path:** `src/content/speakers/<slug>.md` — photos in `public/images/speakers/<slug>.jpg`
- **Schedule Data Path:** `src/content/schedule/<slug>.md` — slugs are `en-NN-…`, `mr-NN-…`, `hi-NN-…`
- Files starting with `_` are ignored; each folder has a documented `_template.md`.
- `<!-- … -->` comments in a body are stripped — use them for placeholders ("Bio TBD") so they never render.
- A bad field, an unknown speaker slug in a session, or a `photo` path missing from `/public` fails the build with the file named.
- Other site data (not markdown):
  - `src/lib/site.ts` — dates, venue, registration URL, email, social links, organiser & sponsor logos, `NAV_LINKS`. `venue` and `registrationUrl` are `null` until announced; the UI shows placeholders until they are set.
  - `src/lib/team.ts` — About page team credits (carried over from the previous edition).
  - `src/lib/competitions.ts` — competition details transcribed from the posters in `public/images/competitions/`. Keep both in sync.
  - `src/lib/languages.ts` — language constants/helpers shared with client components (must not import `node:fs`).

### Markdown Frontmatter (actual schemas — see `_template.md` in each folder)

#### 1. Speaker Schema (`/speakers/slug.md`)
```yaml
---
name: "Girish Kuber"            # required — Latin spelling, used for sorting/alt text
nameNative: "गिरीश कुबेर"         # optional — Devanagari name
designation: "Secretary, …"      # optional — role/affiliation (shown instead of genre)
language: ["marathi"]            # required — one or more of: marathi, hindi, english
genre: "Journalism"              # optional
photo: "/images/speakers/girish-kuber.jpg"  # optional — must exist in /public; monogram shown if absent
featured: false                  # optional, default false — featured speakers sort first
books: []                        # optional — most recent first; first is shown as "Latest"
sources: []                      # optional — URLs the bio was verified against (not rendered)
---
Biography in markdown (empty until verified).
```

#### 2. Schedule Session Schema (`/schedule/slug.md`)
```yaml
---
title: "स्नेहचित्रे : …"          # required — may be Devanagari
day: 1                           # optional until finalised — 1, 2 or 3
timeStart: "11:00 AM"            # optional — 12-hour format
timeEnd: "12:15 PM"              # optional — requires timeStart
venue: "Stage name"              # optional, free text — stage names not yet decided
primaryLanguage: "marathi"       # required — marathi, hindi, english, multilingual
speakers: ["girish-kuber"]       # required — guests; slugs of speaker files
panelists: []                    # optional — co-panelists
moderators: ["arun-shevate"]     # optional
---
Session summary in markdown.
```
Sessions with no `day` appear under a "To be scheduled" tab. A speaker who appears only in `moderators` is flagged `moderatorOnly` by `getLineup()`.

## Tech Stack & Code Quality
- Framework: Next.js 16 (App Router, Cache Components) + TypeScript — read `node_modules/next/dist/docs/` before using Next APIs (see AGENTS.md). Notable v16 changes in use: `next/image` uses `preload` (not `priority`) and only quality 75 is allowed by default.
- Styling: Tailwind CSS v4 (Mobile-first, high contrast); theme tokens in `src/app/globals.css` `@theme`.
- Content: `gray-matter` + `zod` + `marked`. Formatting: Prettier with `prettier-plugin-tailwindcss`.
- Icons: Lucide React (UI only — v1.x has no brand icons, so social links are small-caps text) + custom SVG (`Ornament.tsx` fleuron).
- No i18n library: the site is English-only. Marathi/Hindi text is marked up with `lang="mr"` / `lang="hi"` so the Devanagari fonts and line-height apply.
- SEO & Performance: every route is statically prerendered; strict image optimisation via `next/image`; per-page `metadata`.
- Accessibility: Semantic HTML (`<main>`, `<article>`, `<section>`), skip link, `aria-current` on the active nav link, `aria-pressed` filter buttons, WAI-ARIA tabs (arrow/Home/End keys) for the schedule, session details in a native `<dialog>` (focus trap, Escape, focus return).

## Design Identity & Aesthetic Guardrails
- **Core Vibe:** Elegant, intellectual, celebratory, and deeply rooted in Thane's historic literary culture (evoking Gadkari Rangayatan, Thane Marathi Granth Sangrahalay, Kashinath Ghanekar Natyagruha etc.).
- **Anti-AI Slop Rule:** Strictly no modern corporate tech aesthetics, generic neon blobs, or abstract 3D shapes. Lean into editorial, print-inspired design layouts that resemble literary journals, book covers, and vintage typography.
- **No "Chapter I / II…" labels** above section headings.
- **Imagery:** the user supplies photos (e.g. Gadkari Rangayatan). Do not add third-party/stock photos that need on-page credits.
- **Color Palette** (Tailwind names in brackets):
  * Background Primary: `#FDFBF7` (Warm Book Paper/Off-white) [`paper`]
  * Background Secondary: `#FAF6EE` (Soft Cream/Parchment) [`parchment`]
  * Text Primary: `#1E1E1E` (Ink Black) [`ink`]; secondary text `#4A4540` [`ink-muted`]
  * Accent Primary: `#7C1C2B` (Deep Crimson / Sindoor Red) [`sindoor`]
  * Accent Secondary: `#D4AF37` (Muted Gold) [`gold`] — **decorative only** (2.0:1 on paper); use `#7A5F12` [`gold-deep`] for gold-toned text
  * Hairline rules/borders: `#E6DCCB` [`rule`]
- **Typography** (loaded via `next/font` in `layout.tsx`):
  * Headings: `Playfair Display` [`font-display`]
  * Body text (English): `Lora` [`font-serif`]
  * Marathi / Hindi script: `Noto Serif Devanagari` for text [`font-deva`], `Rozha One` for Devanagari headings and the hero [`font-deva-display`]
  * Devanagari matras: `:lang(mr)` / `:lang(hi)` get line-height 1.85 (1.5 for headings). Use `textLang()` for titles so English placeholder text in a Marathi/Hindi session keeps the Latin fonts.

## Pages & Feature Requirements

### Site-wide
- **Header** (`SiteHeader.tsx`): TLF logo + "Thane *Literature* Festival". Primary navigation: Lineup, Schedule, Competitions, Venues, Registration, About. Home sections are linked as `/#id` so links work from every page. Full menu from `lg` (1024px); hamburger menu below.
- **Footer** (`SiteFooter.tsx`): "Presented by" organiser logos (Rotary Club of Thane Hills, NCPA), "Supported by" sponsor logos (currently Fortress — sponsor names and logos will change; edit `SITE.sponsors`), social links (Instagram, Facebook, X, LinkedIn), contact email.
- This is not a multi-lingual website — content is English except the Marathi and Hindi sessions themselves.

### Home page (`/`), top to bottom
1. **Editorial Hero:** text-focused title page in a double-ruled frame; "ठाणे" in Rozha One beside "Thane / *Literature* / Festival". Meta: Dates, Venue (shows "To be announced · Thane" until `SITE.venue` is set), Entry. Primary CTA **"Register for Free"** (links to `SITE.registrationUrl`, or the Registration section until it exists).
2. **"Tridhara" Lineup Grid:** reads `getLineup()`. Sepia/monochrome portraits (colour on hover), monogram when no photo, latest book and bio snippet when present. Filters: **Authors** (default — guests & panelists), मराठी / हिंदी / English (authors only), **All voices** (adds moderator-only speakers, tagged "Moderator"). All cards visible — no "show more".
3. **Interactive Schedule:** tabs Day 1 / Day 2 / Day 3 (with dates) plus "To be scheduled" while sessions lack a day; stage filter appears once a day has more than one venue. Every session shows a `[मराठी]` / `[हिंदी]` / `[English]` tag, participants with portraits, and opens a details dialog with speaker bios.
4. **Venues:** venue card + stage list; placeholder until the venue is confirmed.
5. **Registration:** free-entry message, "Register for Free" button once `SITE.registrationUrl` is set ("Registration opens soon" until then), contact email.

### About page (`/about`)
- Mission, Vision and Festival History carried over verbatim from the previous edition's About page, plus the 2026 entry.
- "Meet Our Team": core team, Moderators, Event Management, Tech Team (`src/lib/team.ts`). Photos and names are placeholders from the previous edition and will be replaced.

### Competitions page (`/competitions`)
- One card per competition: poster (opens full size) beside transcribed details — prompt, word/time limit, languages, prizes, guidelines, eligibility, submission email (or "Submission details to be announced").
- Current competitions: Meri Story, Chitrakathi, My Dream Thane / My Dream India, Thane in Ten Frames, Rangmanch.

## Step-by-Step AI Workflow Rules
1. **Parser First:** Content goes through `src/lib/markdown.ts`; extend its zod schemas (and the `_template.md` files) before using a new field in UI.
2. **Language Spacing:** Verify that layout spacing accommodates both English and Devanagari characters gracefully before finalising any UI container dimensions.
3. **Component Separation:** Fully isolated, reusable components in `src/components/` (e.g. `AuthorCard.tsx`, `ScheduleTabs.tsx`, `SessionModal.tsx`). Client components import from `@/lib/languages`, never values from `@/lib/markdown` (types only).
4. **Pre-Review Check:** Before asking the user for feedback, verify contrast ratios for text on cream backgrounds (WCAG AA ≥ 4.5:1), ensure mobile viewport padding (`px-4` minimum) and no horizontal scroll at 390px, and run `npm run content:check`, `lint`, `typecheck` and `build`.
5. **Build Rules:** Build the website to run locally first, later it needs to be hosted on Vercel (the project is not yet a git repository).

## Reference
This website will be live at https://www.thanelitfest.in/ The website at the address currently is for last years edition. It can be used for reference as specifics are changing this year, but attributions such as sponsors, credits, about us page etc. remain the same.
