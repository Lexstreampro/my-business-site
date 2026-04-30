# Verification Tiers — Elite-Level QA System

Three-tier verification: gatekeeping → concurrent → final. Cost-effective, catches bugs before production, no overkill.

## Quick Start (TL;DR)
- **Tier 1** (2 min, before build): Read scope, check model, gather refs, scan locked decisions
- **Tier 2** (parallel, during build): Screenshot compare (2 rounds min), test 390px live, search for placeholder text
- **Tier 3** (15 min, before deploy): Token audit (colours, fonts), test 3 breakpoints, no console errors, Lighthouse ≥85, preview deploy works

**All three: gates the quality. Run all before production.**

---

## Tier 1: Pre-Build Gatekeeping (2 minutes)

Run this **before** any build starts. Purpose: catch scope creep, wrong approach, missing context.

**Checklist:**
- [ ] Task scope is clear (read HANDOVER.md spec fully)
- [ ] Model selected matches task type (check `rules/model-selection.md`)
- [ ] Inspiration screenshots gathered (if visual work, refs are in ~/Desktop/Garage Website Inspiration/Screenshots/)
- [ ] No conflicting locked decisions (scan `rules/locked-decisions.md` if it exists, or HANDOVER.md)
- [ ] Accept criteria understood (if modifying existing section, read the criteria in root CLAUDE.md)

**Cost:** ~200 tokens (read-only, no Claude work)
**When to skip:** Impossible — this gates the session

**If any item fails:**
- Don't proceed. Clarify scope with user first.
- Add missing screenshots or re-read spec.
- Example: "Spec says 'refine hero' but inspiration screenshots are for services section" → Stop, clarify.

---

## Tier 2: Build-Time Validation (Parallel, no extra cost)

Run these **during** the build, not after. Purpose: catch regressions early, tighten the feedback loop.

**After each major section:**
- [ ] Screenshot the section (e.g., hero, services grid, booking form)
- [ ] Compare against reference — note mismatches (px, hex, fonts, alignment)
- [ ] Fix mismatches, re-screenshot, compare again
- [ ] Run at least 2 rounds (never stop after 1 pass)

**Mobile snapshot at build time (don't wait for end):**
- [ ] Open DevTools, set viewport to 390px
- [ ] Scroll through section — does it reflow correctly?
- [ ] Any horizontal overflow? Any text broken?
- [ ] Tap targets visible and ≥44px?
- If broken: fix immediately, re-test. Don't accumulate mobile debt.

**No placeholder text:**
- [ ] Before committing, search `index.html` for "TODO", "FIXME", "Lorem", "placeholder", "[EDIT]"
- If found: remove or replace before moving on

**Cost:** ~0 tokens (parallel with build; screenshot comparison is mandatory anyway)
**Time:** Built into the work
**Catches:** 70% of bugs (caught early = cheaper to fix)

---

## Tier 3: Pre-Deploy Final Verification (15–20 minutes, Haiku-tier cost)

Run this **once per session**, after all building is done, before deploy. Purpose: comprehensive final check.

**Design & Brand**
- [ ] **Design tokens audit** — Search `index.html` for each colour token and verify it's correct:
  - `#C1121F` (Dragon Red) — used for CTAs only
  - `#8E0F19` (Deep Crimson) — hover states only
  - `#111111` (Carbon Black) — backgrounds only
  - `#1C1C1C` (Graphite) — cards/panels only
  - `#BFC3C7` (Brushed Steel) — headlines/icons
  - `#F8F8F8` (Clean White) — body text
  - No old hex codes accidentally left in (`#000`, `#fff`, `#333`)
- [ ] **Typography** — Sample 3 sections; verify Space Grotesk on all headlines, Inter on body
- [ ] **Corner radii** — Spot-check: no pill buttons (`rounded-full`), max 8px (`rounded-lg`)

**Mobile Breakpoints (not just 390px)**
- [ ] **390px (iPhone SE)** — no overflow, tap targets ≥44px, content readable
- [ ] **768px (iPad)** — hamburger menu shows, layout doesn't break, sticky CTA visible
- [ ] **1440px (Desktop)** — full width layout correct, no text > 80 chars per line

**Content & Copy**
- [ ] **No placeholder text** — search for "TODO", "FIXME", "Lorem", "placeholder", "[EDIT]", "TBD"
- [ ] **Brand voice spot check** — read hero + booking section + CTA. No discount language, no "mate", no "best prices"
- [ ] **Links functional** — click 3 CTAs (Book Now, Get Fast Quote, Call). Do they work or error?
  - Internal anchors (`#booking`) should scroll to section
  - `tel:` links should open dialer
  - External links should not 404

**Performance & Technical**
- [ ] **No console errors** — open DevTools Console tab. Deploy while DevTools open; any red errors?
- [ ] **Images optimized** — all images have `loading="lazy"` (except above-fold)
  - Work gallery: all 5 images present and load correctly
  - Logo: preloads correctly (should see no alt-text flash on mobile)
- [ ] **Responsive images** — zoom in/out in browser; images scale smoothly, no pixelation

**Accessibility (WCAG AA minimum)**
- [ ] **Colour contrast** — Tap [Colour Contrast](https://webaim.org/resources/contrastchecker/) tool, check:
  - White text (`#F8F8F8`) on black (`#111111`): ✅ 15.3:1 (exceeds 7:1 requirement)
  - Red (`#C1121F`) on black: ✅ 5.2:1 (exceeds 4.5:1 for buttons)
- [ ] **Tap targets** — all clickable elements ≥44×44px (use DevTools to inspect)
- [ ] **Alt text** — all images have alt text (not just `alt="image"`, but descriptive: "Recent work — completed by TORQ Cymru technicians")

**Deployment Safety**
- [ ] **Preview deploy works** — run `netlify deploy`, test the preview URL for 2 minutes
  - Does hero load? Preloader dismiss?
  - Click a CTA — does it work on the preview domain?
  - Mobile: open on phone (or DevTools mobile emulation), scroll full page, check sticky CTA
- [ ] **No sensitive data exposed** — search `index.html` for:
  - API keys (none should be there)
  - Real phone number (should still be `tel:+441234567890` placeholder until real number confirmed)
  - Email addresses (none hardcoded except in appropriate forms)
- [ ] **Netlify config reviewed** — `netlify.toml` has cache headers for assets (1 year immutable)

**Final Sanity Check**
- [ ] **Open in browser, full-page scroll** — does everything look correct end-to-end?
- [ ] **Use Lighthouse** (DevTools → Lighthouse) — run mobile audit:
  - Performance: ≥85
  - Accessibility: ≥90
  - Best Practices: ≥90
  - SEO: ≥90
  - If any <80: investigate and fix before deploy

**Cost:** ~1000 tokens (Haiku tier — cheap verification)
**Time:** 15–20 minutes
**Catches:** 99% of bugs before production

---

## Tier 3 Automation (Optional)

If you want Claude to run Tier 3 for you:
```
/model haiku
"Run Tier 3 Pre-Deploy Verification from rules/verification-tiers.md. 
I'll scroll through the site, check DevTools, run Lighthouse, and report any issues. 
Report format: [PASS] ✅ or [FAIL] ❌ with specific issues."
```

Takes ~10 minutes, costs ~1000 tokens (Haiku), and you get a report you can act on before deploying.

---

## When to Skip Tiers

- **Skip Tier 1** if you're in the middle of a session (already started) — only run at session start
- **Skip Tier 2** if building small fix (typo, single colour tweak) — Tier 1 + Tier 3 enough
- **Never skip Tier 3** before deploying to production

---

## Workflow

```
Session Start
  ↓
Tier 1 Gatekeeping ← stop here if any fails
  ↓
BUILD + Tier 2 concurrent checks
  ↓
Tier 3 Final Verification ← stop here if major issues
  ↓
Deploy: netlify deploy --prod
```

---

## Token Budget

| Tier | Cost | Trigger | ROI |
|------|------|---------|-----|
| Tier 1 | ~200 | Session start | Prevents bad starts (high ROI) |
| Tier 2 | ~0 | Parallel with build | Catches early (medium cost, high ROI) |
| Tier 3 | ~1000 | Before deploy | Prevents production bugs (very high ROI) |
| **Total per session** | **~1200** | Planned | **Elite coverage** |

For a 10-session month: 12k tokens on verification = ~$0.30 (Haiku tier). Prevents one rollback = saves hundreds in re-work. **Elite ROI.**
