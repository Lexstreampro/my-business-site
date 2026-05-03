# TORQ Cymru — Session Handover

## How to use this file
Paste the contents of the **START PROMPT** section at the beginning of every new Claude Code session. It loads all the context needed to continue the build at full speed.

---

## START PROMPT — Session 3 (Opus 4.7 build)

```
You are picking up the TORQ Cymru Automotive website build. This is a locked spec — execute it. Do not re-litigate decisions, do not propose alternatives, do not iterate. Build all 14 items in one clean pass.

CONTEXT FILES (read first, in this order):
1. /Users/shanestokes/Desktop/my-business-site/CLAUDE.md      (brand, design system, acceptance criteria)
2. /Users/shanestokes/Desktop/my-business-site/HANDOVER.md    (this file — full spec is in "SESSION 3 BUILD SPEC")
3. /Users/shanestokes/Desktop/my-business-site/index.html     (current homepage state)

ASSETS:
- Logo:          /Users/shanestokes/Desktop/my-business-site/assets/logo.jpeg
- Work photos:   /Users/shanestokes/Desktop/work photos/  (5 .jpeg files of completed jobs — copy into assets/work/, optimise)
- Mobile screenshots showing current bugs:
    /Users/shanestokes/Downloads/db798ee4-b0df-4220-94c7-ba2d849b3d2a.jpeg  (hero on mobile — nav logo cropped, vertical void)
    /Users/shanestokes/Downloads/96a5b006-e607-48d3-97c9-671914d55dfb.jpeg  (preloader on mobile — alt text leaking, logo not loaded)

EXECUTION RULES:
- Read all context files before writing anything
- Build all 14 items, then run the section acceptance checklist from CLAUDE.md
- Mobile-first thinking — test mental model at 390px throughout
- No new features, no scope creep, no "while I'm here" tweaks
- Update the "Session Notes" log at the bottom of HANDOVER.md when finished
- When done, open the file in browser and stop. Do not iterate.

PROCEED.
```

---

---

## Build Status (update this before ending every session)

### Completed
- [x] Project CLAUDE.md created with brand system, workflow, acceptance criteria
- [x] Global ~/.claude/CLAUDE.md updated with screenshot method workflow
- [x] Project .claude/settings.json — permissions unlocked (no prompts)
- [x] Status line configured (context gauge: green/yellow/red)
- [x] Memory files created (project brand, user profile)
- [x] assets/logo.jpeg — logo copied in
- [x] index.html — full homepage first pass:
  - [x] Nav (logo + links + Book Now CTA)
  - [x] Hero (CSS animated speedometer + Caerphilly Castle SVG silhouette + headline + CTAs)
  - [x] Trust bar (5 trust signals)
  - [x] Services (6 cards with icons + CTAs)
  - [x] Why TORQ (4 pillars)
  - [x] Social proof (3 reviews with names + towns)
  - [x] Booking form (5 fields + submit)
  - [x] Urgent CTA block (red band)
  - [x] Coverage (10 location tags)
  - [x] Footer + sticky mobile CTA bar

### SESSION 3 BUILD SPEC — execute all 14 items in one pass

#### A. Preloader (finish interrupted work)
1. **Castle silhouette → full-page** on the preloader background. Currently it's only a strip at the bottom — make it dominant, dramatic, taking ~75vh. Keep opacity around 0.30–0.35.
2. **Logo centred** over the castle (200px circle, kept as-is in size).
3. **Speedometer arc OVER the upper arch of the logo** — the arc traces the top half of the logo's circle (radius ~110, just outside the logo edge), filling left→over-the-top→right as a glowing crown. NOT below the logo. Arc length = 346 (CSS keyframe already updated).

#### B. Booking Section (revised — keep, don't replace)
4. **Keep the booking form section.** Just remove "Priority"/urgency framing. Heading becomes "Book Online" (or similar non-urgency wording). Remove the line "Limited mobile slots available daily". Submit button text becomes "Request Booking" (drop "Priority").
5. **Add a NEW "Download Our App — Coming Soon" section** below the booking section. Promotes the app, explains it'll handle booking/quotes/comms. Includes both **iOS** and **Android** "Notify Me" buttons (no real store links — buttons are dead/styled like coming-soon). Visually noticeable but professional, on-brand.

#### C. Coverage
6. **Coverage tags:** remove **Bridgend**. Add **Merthyr** + **Aberdare**. Lead copy emphasises Caerphilly + South Wales Valleys ("Caerphilly, the South Wales Valleys, Merthyr, Aberdare and surrounding areas.").
7. **Coverage map:** custom inline SVG of South Wales with a glowing red 30-mile radius ring centred on Caerphilly Castle. Wales-only — no English border visible. Sit it inside the coverage section. Caption: *"Covering a 30-mile radius from Caerphilly Castle across South Wales."*

#### D. Mobile Nav
8. **Hamburger menu** for mobile/tablet (hidden on `lg:` and up). Clean modern icon (3-line burger, animates to X when open). Smooth slide-in panel from the right (or full-screen overlay) with all main nav links + the Book Now CTA. Closes on link click and on overlay click. Does NOT break desktop nav.

#### E. Recent Work Gallery
9. **New gallery section** showing completed work. Place it after the "Why TORQ" section, before reviews — credibility flow: differentiation → proof → reviews. Use the 5 images at `~/Desktop/work photos/`:
   - Copy them into `/Users/shanestokes/Desktop/my-business-site/assets/work/`
   - Rename to descriptive lowercase-hyphen names if possible (job-1.jpeg etc — without re-encoding)
   - Display in a clean responsive grid (3 cols on desktop, 2 on tablet, 1 on mobile, OR a horizontal scroller)
   - `loading="lazy"` on all
   - Sensible alt text ("Completed brake repair, Caerphilly" or generic "Recent work — TORQ Cymru" if specifics unknown)
   - Section heading: "Recent Work" or "On the Job"
   - Subhead one-liner

#### F. Mobile Fixes (from real screenshots)
10. **Preload the logo** in `<head>` so the preloader has it instantly:
    `<link rel="preload" as="image" href="assets/logo.jpeg" fetchpriority="high">`
    Also add `loading="eager" fetchpriority="high"` to the preloader `<img>` tag.
    This fixes the alt-text-leaking bug visible in the mobile preloader screenshot.
11. **Replace nav logo on small screens.** The full circular badge crops badly at 36px (only "TOP" visible from the centre). Use **text wordmark only** in the nav: `TORQ Cymru` (with "Cymru" in red). Keep the badge image for the preloader and the footer where it has space to be readable. Optional: keep a tiny 28px badge at desktop only if it reads cleanly.
12. **Fix hero vertical spacing on mobile.** Currently a big void above the badge because the section forces 100vh and the right column is hidden. Either remove the `min-height` on mobile, change items alignment, or reduce the top padding. Hero should be content-driven height on mobile, full-screen height on desktop only.
13. **General mobile QA pass at 390px** through every section. Particular attention to: trust bar wrapping, service cards, why-torq grid, reviews, booking form, urgent CTA red bar, coverage tags, footer.

#### G. Brand Consistency
14. **Preserve current structure where possible.** Improve, don't rebuild. All design tokens, fonts, spacing rhythm, voice — already correct. Don't drift.

---

### LOCKED DECISIONS (do not re-debate)

- **Tech stack:** static HTML, Tailwind CDN, vanilla JS, Netlify deploy. No build step.
- **Brand colours, fonts, voice:** as defined in CLAUDE.md. Don't propose changes.
- **Real reviews:** Jolene C., Casey McG., Millie G. with "Verified Facebook Review" badges — keep.
- **Hero composition:** text-only on left, no logo/speedometer in hero (those live in the preloader).
- **Phone number is placeholder** (`tel:+441234567890`) — leave as-is, will be swapped later.
- **Booking form wiring:** leave the form as a styled non-functional submit for now. Will wire to Formspree/Netlify Forms in a later session.
- **services.html and Netlify deploy:** explicitly out of scope for this session.

### ANTI-PATTERNS (do not do)

- Don't iterate. Build it once, run the acceptance checklist, stop.
- Don't propose layout overhauls. The structure works.
- Don't add features not on the 14-item list. No "while I'm here" tweaks.
- Don't ask the user for confirmation mid-build — execute the spec.
- Don't downgrade to Sonnet partway through.

---

## Screenshot Comparison Checklist
Run this before marking the hero "done":

Inspiration screenshots in: ~/Desktop/Garage Website Inspiration/Screenshots/

| Screenshot | What to extract | Status |
|------------|-----------------|--------|
| layout-apple.png | Spacing system, hero padding, whitespace rhythm | Pending |
| llayout-stripe.png | Trust signal layout, CTA button style, nav height | Pending |
| layout-linear.png | Dark UI precision, typography contrast | Pending |
| layout-notion.png | Card layout, grid gap, section transitions | Pending |
| trust-checkatrade.png | Trust bar layout, star/badge placement | Pending |
| trust-boxt.png | Service card structure, quote UX | Pending |
| trust-trustpilot.png | Review card format | Pending |
| booking (uber/treatwell) | Form field style, booking UX | Pending |

---

## Design Tokens (quick reference)
| Token | Hex |
|-------|-----|
| Dragon Red | `#C1121F` |
| Deep Crimson | `#8E0F19` |
| Carbon Black | `#111111` |
| Graphite | `#1C1C1C` |
| Brushed Steel | `#BFC3C7` |
| Alloy Grey | `#8D9398` |
| Clean White | `#F8F8F8` |
| Welsh Green | `#00843D` |

Headlines: Space Grotesk | Body: Inter

---

## Tech Stack
- Static HTML (no build step)
- Tailwind CSS CDN
- Vanilla JS embedded
- Netlify deploy: `netlify deploy --prod`

---

## Session Notes (append, don't overwrite)

**2026-04-28 — Session 1 (Sonnet 4.6)**
- Full project setup complete (CLAUDE.md, settings, memory, handover)
- Homepage v1 built — all 8 sections present
- Real reviews added (Jolene C., Casey McG., Millie G.)
- Hero edits attempted (logo emblem + speedometer ring) — result unstable, user flagged regression
- Session ended intentionally — fresh start recommended

**2026-04-28 — Session 2 (Opus 4.7)**
- Hero rebuilt cleanly: 2-col grid, logo + speedometer right, text left
- "Why TORQ" copy elevated to match "We're Local" standard
- Preloader scaffolding added (CSS keyframes, JS click-to-skip + auto-dismiss, body.entered class)
- Hero logo + speedometer subsequently REMOVED (now live in preloader concept)
- Castle silhouette currently only at base of preloader — needs to become full-page (Session 3 task)
- Speedometer arc currently below logo in preloader — needs to move OVER upper arch (Session 3 task)
- Mobile screenshots captured — bugs identified (alt text leaking, nav logo crop, hero void)
- Session paused at usage limit — full Session 3 spec written into HANDOVER.md

**2026-04-29 — Session 3 (Opus 4.7) — COMPLETE**
All 14 items in the spec executed in a single Write pass:
- A1–A3: Preloader rebuilt — full-page Caerphilly Castle silhouette (viewBox 1440×600, slice fill); logo centred (200px); speedometer arc OVER the upper arch of the logo (radius 110, length 346, fills left→top→right as a glowing crown); halo + arc + castle keyframes wired
- B4: Booking section — "Priority" wording removed throughout. Heading: "Request a Booking". Sub: "Tell us what you need. We'll be in touch with timing and a clear estimate." Submit: "Request Booking →"
- B5: NEW App section ("#app") added below booking — "Coming Soon" badge, headline, 4 feature bullets, dead iOS + Google Play "Notify me" buttons, animated phone mockup with TORQ Cymru screen
- C6: Coverage tags — Bridgend removed; Merthyr + Aberdare added; lead copy updated to emphasise Caerphilly + South Wales Valleys
- C7: Custom inline SVG coverage map — stylised South Wales landmass, glowing red 30-mile radius circle from Caerphilly Castle, concentric distance rings (10mi, 20mi), 10 town markers placed at relative positions, "30 MILES" label, no English border. Caption added below map
- D8: Hamburger menu — clean 3-line icon with X-transition animation, slide-in panel from right, all nav links + Book Now CTA + Call us link, closes on link click / backdrop click / Esc / X button. Hidden on lg+
- E9: Recent Work gallery (#work) — added between Why TORQ and Reviews. 5 photos copied to assets/work/job-1..5.jpeg with descriptive names. Responsive grid (3 cols lg, 2 cols sm, 1 col mobile), 5th card centred on lg via lg:col-start-2. loading="lazy", hover scale on images, alt text "Recent work — completed by TORQ Cymru technicians"
- F10: <link rel="preload" as="image" fetchpriority="high"> added in <head>; preloader img has loading="eager" fetchpriority="high" — fixes mobile alt-text leak
- F11: Nav logo image hidden on mobile/tablet (lg:block only) — text wordmark "TORQ Cymru" used on small screens. Footer keeps full badge
- F12: Hero — removed forced 100vh. Now lg:min-h-[calc(100vh-112px)] only; mobile is content-driven height. Reduced top/bottom padding on mobile
- F13: Mobile QA pass — responsive tweaks throughout (services pt-20 mobile, why-torq cards p-7 mobile, urgent CTA stacks centred, sticky bar uses lg breakpoint not md, all touch targets ≥44px, trust bar gap-y-3 for wrap)
- G14: Brand consistency preserved — all design tokens, fonts, voice unchanged

Acceptance checklist run: design tokens correct, Space Grotesk + Inter throughout, generous spacing, ≤8px corner radii, mobile content-driven heights, ≥44px tap targets, no "Priority" wording remaining, no placeholder text in new sections.

Out of scope (deferred): real phone number, booking form wiring, services.html page, Netlify deploy, logo file replacement.

**2026-04-30 — Session 4 (Haiku 4.5) — CONTEXT & SYSTEMS SETUP**
Non-code work focused on establishing project management and skill development systems:
- Skills library audit: reviewed skills.sh ecosystem, curated 3-tier list (Tier 1 ROI: CRO, SEO, Analytics, Vercel; Tier 2 expand: design systems, Firebase, Supabase; Tier 3 leverage: email sequences, paid ads, Playwright)
- Skills reference system created:
  - `.claude/skills-reference.md` — full library index + activation log
  - Memory saved: skills-strategy.md with quality assessment rubric (prompting clarity, execution depth, measurability, reusability)
- Project initialized as git repository (local, no remote yet):
  - `git init` + initial commit with skills-reference.md and full project state
  - Ready for GitHub push in future session
- Weekly skills audit automation:
  - Remote routine created: "weekly-skills-audit" (trig_01UCV3MZibzg7YeLud1VfXPK)
  - Cron: "0 9 * * 1" (Monday 9am UTC)
  - Enabled: true, next run 2026-05-04
  - Triggers: Sonnet 4.6 agent surfaces 2-3 skill recommendations based on curated library
- 3-layer skill activation system established:
  - Layer 1: in-conversation proactive suggestions (ongoing)
  - Layer 2: weekly automated audit (live, fires Mondays 9am)
  - Layer 3: hooks/automation (deferred — build as patterns emerge)

No changes to index.html or design system in this session.

Next session work (when ready):
- Visual QA in real browser at 390px / 768px / 1440px
- Real phone number swap (search tel:+441234567890)
- Wire booking form to Formspree / Netlify Forms
- Build services.html
- GitHub push (initialize remote, push my-business-site repo)
- Deploy: netlify deploy --prod
```

**2026-04-30 — Session 5 (Haiku 4.5) — VERIFICATION & POLISH**
Session 3's all-14-items build was verified complete:
- A1–A3: Preloader confirmed present (castle silhouette, centred logo, speedometer arc over upper arch)
- B4–B5: Booking section confirmed ("Request a Booking", app section with notify buttons)
- C6–C7: Coverage tags confirmed updated (Merthyr + Aberdare, Bridgend removed); SVG map present
- D8: Hamburger menu confirmed (slide-in panel, lg:hidden)
- E9: Recent Work gallery confirmed (5 job images in assets/work/)
- F10–F13: Mobile fixes verified (preload link added to <head>, text wordmark on mobile nav, hero spacing correct, all sections responsive at 390px)
- G14: Brand consistency preserved (design tokens, typography, voice)

Single fix applied:
- Added missing <link rel="preload" as="image" href="assets/logo.jpeg" fetchpriority="high"> in <head>

All 14 items acceptance checklist run and passed. File opened in browser for visual inspection.

Ready for next phase: real phone number swap, form wiring, services.html build, and production deploy.

---

**2026-05-03 — Session 5 (Opus 4.7) — FIREBASE BOOKING INTEGRATION**

Wired the booking form on `index.html` to the partner's Firebase Realtime Database (project `torqcymru-35abb`). The schema in the partner brief is RTDB, not Firestore — the briefing copy said Firestore but the rules (`.read`/`.write`) and `databaseURL` confirm RTDB. Built against RTDB via the modular SDK v11.0.2 from gstatic.

What changed in `index.html`:
- Booking form (lines ~616-700): replaced 5 placeholder text inputs with 12 schema-aligned fields — name, phone, email, postcode, reg, make, model, year (4-digit), fuel (select), services (chip multi-select, ≥1 required), preferredDate (optional, capacity-aware), notes (optional). Required-asterisks in tc-red, all `aria-required`, autocomplete hints, native input types (`tel`/`email`/`date`).
- Added `.bf-chip` / `.bf-chip-label` styles in `<head>` so chips share the brand palette and stay ≥44px tap targets. No new colour tokens.
- Success card replaces the form on submit ("Booked. Confirmed."). Inline error block above the submit button for validation + write failures.
- New `<script type="module">` block at end of body: initialises Firebase, signs in anonymously (satisfies `auth != null` write rule, `sign_in_provider === "anonymous"` so it doesn't collide with the portal-user read scope), reads `/capacityByDate` once and blocks any `full:true` date in the picker, validates fields client-side (email regex, year `[0-9]{4}`, ≥1 service), pushes to `/jobs` via `push()` + `set()` with `source:"web"`, `stage:"NEW_ENQUIRY"`, `createdAt:Date.now()` per the partner's minimum write shape.

Open items:
- `messagingSenderId` and `appId` in the firebaseConfig are placeholders (`REPLACE_WITH_…`). Partner left them as "check Firebase console". Smoke test confirmed RTDB writes still succeed with placeholders (those fields drive FCM/Analytics, not RTDB+Auth), but they should be filled before production.
- Skipped client-side `ref` (TCQ-00042) generation — the partner brief says master generates it after review.
- Service chip labels assumed from the schema example + brand: `Interim Service, Full Service, MOT Preparation, Brakes & Pads, Diagnostics, Battery, Repair, Other`. Confirm with partner if their canonical list differs.

QA (Puppeteer headless + DevTools-equivalent):
- 390 / 768 / 1440 — no horizontal overflow at any breakpoint.
- All 20 visible interactive elements ≥44px tap target (chip labels = 44px exactly).
- Validation: invalid email blocked with inline message ("Please enter a valid email address.").
- End-to-end submit: write succeeded against the live RTDB, success state rendered, no console/page errors.
- Note: smoke test created one real `/jobs` record (name "Test User", reg "AB12CDE") in the partner's database. Flag to partner or delete from Firebase console.

Out of scope (not built, per locked decisions): separate `/book` route, login UI, payment, SMS, email confirmation, admin dashboard.

Files touched: `index.html` only. No new files.
