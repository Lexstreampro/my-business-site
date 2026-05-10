# TORQ Cymru — Session 12 Plan Mode (Critical)

**Copy this entire prompt. Paste as first message in NEW fresh Claude Code session. This launches plan mode.**

---

## Context

You are planning a major refinement phase for TORQ Cymru website + portal. User has identified 10 issues from recent review. This session is PLANNING ONLY — no implementation yet. Design the approach, identify blockers, create execution roadmap.

---

## Issues to Address (In Priority Order)

### Batch 1: Service Structure Overhaul
1. **Service tiers restructure** — Change from flat list to: Interim, Basic, Full (remove "Manufacturer schedule" reference)
   - Affects: services.html (7 service cards), index.html service cards
   - Scope: Rewrite service card layout + copy to reflect tiers

2. **Remove MOT Prep entirely** — Delete from:
   - services.html section
   - index.html services card grid
   - Nav links
   - Footer
   - Any other references
   - Scope: Search + delete, no replacement

3. **Brakes naming** — Change "Brakes & Pads" → "Brakes" everywhere
   - Affects: services.html, index.html, nav, recent work (if mentioned)
   - Scope: Search-replace + copy update

4. **Remove time scales from descriptions** — Delete service duration mentions
   - Examples to remove: "30 mins", "1–2 hours", "same day"
   - Reason: Duration varies per customer
   - Scope: Edit copy in 7 service descriptions

### Batch 2: UX Improvements
5. **Sticky service buttons/dropdown** — Service navigation buttons must stay visible when scrolling
   - Current state: services.html has sticky navigator (already working?)
   - Issue: Need confirmation on what's broken + exact desired behavior
   - Scope: JavaScript sticky positioning + dropdown on scroll

6. **Portal services sync to master settings API** — Services dropdown pulls from `https://api.torqcymru.com/services`
   - Current state: Portal shows "No services configured yet"
   - Desired: Auto-populate from master settings, auto-update when changed
   - Scope: Frontend fetch + dropdown population

### Batch 3: Copy Updates
7. **24 months → 12 months** — Change aftercare guarantee
   - Affects: Anywhere "24 months" appears (likely Cloud Function email templates, FAQs, copy)
   - Scope: Search-replace

8. **Update service descriptions** — Rewrite to match new Interim/Basic/Full structure
   - Affects: services.html 7 service sections
   - Scope: Copy revision (no code changes)

### Batch 4: Asset Management
9. **Clean up 7 duplicate photos** — From ~/Downloads (21:43 timestamp)
   - Issue: Some duplicates, unclear which are master copies
   - Desired: Single clean set, properly named, organized
   - Scope: Manual review + cleanup

### Batch 5: New Feature (Deferred)
10. **Direct messaging** — Add to portal + app
    - Scope: Large, separate feature
    - Decision: Plan for Session 13+, not Session 12

---

## Questions to Answer During Planning

1. **Service tiers positioning** — Are Interim/Basic/Full:
   - Three separate services? (3 different booking options)
   - Or packages within each service? (e.g., "Brakes: Interim, Basic, Full")
   - How should they appear in booking form?

2. **Sticky buttons behavior** — Exact requirement:
   - Should buttons stay sticky at top while scrolling down services?
   - Should they be a dropdown menu?
   - Should clicking a button scroll to that service section?

3. **Photo cleanup** — Which 7 photos from Downloads are the master set?
   - Do they need to be renamed/reorganized?
   - Where do they go? (assets/services/)

4. **Aftercare guarantee** — Is it 12 months everywhere, or context-specific?
   - Search for "24" and "guarantee" and "month" to find all references

5. **MOT Prep removal** — Is it truly gone forever, or might return later?
   - If returning later: mark as "commented out" instead of deleted
   - If gone: clean delete

---

## Planning Scope

**DO:**
- Read all context files (CLAUDE.md, HANDOVER.md, index.html, services.html)
- Map all 10 issues in a prioritized roadmap
- Identify dependencies (e.g., service structure change affects Portal API call)
- Assess implementation effort for each
- Identify blockers or clarifications needed
- Design execution order
- Specify what user needs to provide (photo cleanup, tier structure details, etc.)

**DO NOT:**
- Implement anything yet
- Write code
- Make design decisions
- Assume details not provided

---

## Expected Output (When You Exit Plan Mode)

A comprehensive **Implementation Plan** that includes:

1. **Issue Breakdown** — Each issue: what it is, why it matters, what breaks if skipped
2. **Dependency Map** — Which issues must be done first, what blocks what
3. **Execution Roadmap** — Step-by-step order to tackle all 10 issues
4. **Effort Estimate** — Time for each batch + total
5. **Blockers & Clarifications** — What we need from user before executing
6. **Batch 1–4 Detailed Specs** — For Session 12 execution (Batch 5 deferred)
7. **Success Criteria** — How to verify each issue is fixed

---

## Context Files (Read First)

1. `/Users/shanestokes/Desktop/my-business-site/CLAUDE.md` — brand system, tech stack
2. `/Users/shanestokes/Desktop/my-business-site/HANDOVER.md` — full build history, current state
3. `/Users/shanestokes/Desktop/my-business-site/index.html` — homepage (services section, nav)
4. `/Users/shanestokes/Desktop/my-business-site/services.html` — 7 service pages
5. `/Users/shanestokes/Desktop/my-business-site/.claude/DEPLOYMENT_CHECKLIST.md` — Cloud Function references (24 months, services)
6. `/Users/shanestokes/Desktop/my-business-site/.claude/FIREBASE_CLOUD_FUNCTION.js` — Email templates (update references)

---

## Critical Constraints

- No new dependencies
- No breaking changes to Firebase schema
- Services must still sync to Portal API
- Design tokens unchanged (#C1121F, #111111, etc.)
- Brand voice locked (calm authority, zero discount language)
- Mobile-first responsive design maintained (390px/768px/1440px)

---

## User Inputs Needed (Before Session 12 Execution)

1. **Service tier structure** — Interim/Basic/Full details (what they include, pricing tier, etc.)
2. **Photo cleanup** — Which 7 photos from Downloads are master copies
3. **Sticky buttons behavior** — Exact UX desired (dropdown? smooth scroll? always visible?)
4. **MOT Prep confirmation** — Delete forever, or comment out temporarily?
5. **Aftercare guarantee** — Is 12 months the universal standard everywhere?

---

## Next Steps

1. **Enter plan mode** → Design comprehensive implementation plan
2. **Request user clarifications** on 5 questions above
3. **Exit plan mode** → User reviews plan, approves/adjusts
4. **Session 12** → Execute plan (fix issues 1–9, then email setup)
5. **Session 13** → Direct messaging feature + any adjustments

---

## Important

**This is critical planning work.** Do not skip steps. The plan will determine if Session 12 is smooth execution or chaos. Take time, be thorough, ask clarifications.

**Start plan mode immediately after pasting this prompt.**

---

**Ready. Copy entire prompt, paste into fresh Claude Code session, hit send.**
