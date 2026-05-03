# Session 5 — Firebase Booking Integration (Elite Brief)

## Context
TORQ Cymru Automotive website + app integration. Business partner has built a booking system in Firebase (Firestore). We're building a web booking form (yourwebsite.com/book) that syncs with the app in real-time.

**Status:** Awaiting Firebase information from partner before execution.

---

## Pre-Execution Checklist

Before Claude starts work, verify:
- [ ] Partner sent Firebase config (apiKey, authDomain, projectId, etc.)
- [ ] Partner sent Firestore structure (collection name, field names, types, example booking)
- [ ] Partner confirmed auth method (anonymous? login required? which provider?)
- [ ] Partner clarified availability logic (fixed slots? calendar-based? service-based?)
- [ ] All 4 items documented in shared location or chat

**If ANY item missing:** Do not proceed. Request from partner first.

---

## Workflow

### Phase 1: Plan (30 min, Opus 4.7)
Use `/plan` or suggest EnterPlanMode. Design the following:

**Architectural decisions:**
- Form placement: separate `/book` page or embedded on homepage?
- Authentication: anonymous booking vs login-required? Impact on UX?
- Data flow: form inputs → Firebase fields (1:1 mapping)
- Styling approach: match hero section? New design system?

**Subagent tasks (parallel during planning):**
- **Explore agent:** Search codebase for Tailwind patterns, form components, existing form structure in index.html
  - Look for: `.booking-form`, form field patterns, CTA button styles
  - Extract: colour tokens, spacing, font usage for booking section
- **General-purpose agent:** Research Firebase SDK integration patterns for static HTML + Tailwind (no build step)
  - Find: code examples, authentication flows, Firestore write patterns for vanilla JS

**Skills to activate:**
- CRO (Conversion Rate Optimization) — booking form UX, friction reduction
- Form design best practices — field order, validation, error messaging

**Plan output before proceeding:**
- Form layout (wireframe or description)
- Field mapping (form input → Firebase field)
- Authentication approach
- Styling approach
- Implementation sequence

### Phase 2: Build (1-2 sessions, Opus 4.7)

Execute the plan in one pass:

1. **Create `/book` page** (or embed in index.html as new section)
   - HTML form with fields matching Firestore structure
   - Tailwind styling matching TORQ brand (dark luxury, ≤8px radii, generous spacing)
   - Mobile-first at 390px

2. **Firebase integration** (vanilla JS, no build step)
   - Import Firebase SDK (CDN)
   - Instantiate Firestore client
   - Form submit → writes to Firebase
   - Real-time validation + error handling
   - Success message / booking confirmation

3. **Authentication** (if required)
   - Implement chosen auth method (Google, Email, anonymous)
   - Pre-fill form if user logged in
   - Handle auth errors gracefully

4. **Availability logic**
   - Populate time slot selector from Firebase or hardcoded list
   - Disable booked slots in real-time (if calendar-based)
   - Show service-specific availability (if service-dependent)

5. **Mobile QA**
   - Screenshot at 390px / 768px / 1440px
   - Test form submission on device
   - Verify tap targets ≥44px
   - No horizontal overflow

**Subagent tasks (parallel during build):**
- **General-purpose agent:** Integration testing — verify form writes to Firebase correctly, data appears in app
  - Check: Firestore document created with correct structure
  - Check: Timestamp, all fields populated
  - Check: App sees booking in real-time (if possible to test)

**Skills to activate during build:**
- Email sequences (optional) — if booking confirmation needs email template
- Playwright testing (optional) — end-to-end test: fill form → verify in Firebase

### Phase 3: QA (30 min, Sonnet 4.6 or Haiku 4.5)

**Acceptance checklist before deploy:**

**Design**
- [ ] Colours match TORQ tokens (`#C1121F`, `#111111`, `#F8F8F8`, etc.)
- [ ] Space Grotesk headlines, Inter body
- [ ] Generous spacing, ≤8px corner radii
- [ ] Matches brand aesthetic (dark luxury, not "generic form")

**Mobile (390px / 768px / 1440px)**
- [ ] Form doesn't overflow at any breakpoint
- [ ] All inputs + buttons ≥44px tap targets
- [ ] Labels clear and readable
- [ ] Submit button always visible (sticky if needed on mobile)

**Functionality**
- [ ] Form submits without error
- [ ] Data appears in Firebase (real-time)
- [ ] Success message displays
- [ ] Validation works (required fields, email format, etc.)
- [ ] No console errors

**Copy & UX**
- [ ] Brand voice (calm authority, no fluff)
- [ ] Clear CTA copy ("Request Booking →" or similar)
- [ ] Error messages helpful (not generic)
- [ ] Confirmation message reassuring

**Browser testing**
- [ ] Open in browser at 390px, 768px, 1440px
- [ ] Fill form, submit, check Firebase console
- [ ] Test on real phone if possible
- [ ] Run Lighthouse: Performance ≥85, Accessibility ≥90

### Phase 4: Deploy (when ready)

Once QA passes:
```bash
git add -A
git commit -m "Add Firebase booking form integration"
netlify deploy --prod
```

---

## Model Selection

| Task | Model | Why |
|------|-------|-----|
| Planning + architecture | Opus 4.7 | Complex decisions (auth, placement, data flow) |
| Building form + Firebase integration | Opus 4.7 | First-pass quality matters; fewer refinement rounds save tokens |
| Subagent research | Haiku 4.5 (Explore) | Fast pattern/code lookup |
| Subagent integration testing | Sonnet 4.6 | Balanced speed + quality for validation |
| Final QA checklist | Haiku 4.5 | Fast verification against criteria |

**Do not downgrade to Sonnet for the main build.** This is first-pass new feature work — Opus quality pays dividends.

---

## Sub-agents to Use

**Trigger these in parallel during Phase 1 (Planning):**

1. **Explore agent** — find form patterns in codebase
   ```
   Search for booking form patterns in my-business-site codebase.
   Find: existing form component, Tailwind classes, field styling, CTA button patterns.
   Extract: colour tokens used, spacing values, border radii, font sizes.
   Report: code snippets showing current booking form (from index.html).
   ```

2. **General-purpose agent** — research Firebase + vanilla JS
   ```
   Research Firebase Firestore integration patterns for static HTML (no build step).
   Find: CDN SDK import, authentication flows, form submit → Firestore write examples.
   Extract: code patterns for: instantiating Firestore, handling auth, writing documents, error handling.
   Report: best-practice code snippets for vanilla JS + Tailwind.
   ```

3. **General-purpose agent** — integration testing (Phase 2)
   ```
   After the booking form is built, verify Firebase integration works:
   - Open the booking form in browser
   - Fill in test data
   - Submit
   - Check Firestore console: does the new document appear?
   - Verify all fields match expected structure
   - Report: integration working? any data mismatches?
   ```

---

## Skills to Activate

**Phase 1 (Planning):**
- **CRO (Conversion Rate Optimization)** — review booking form UX for friction points
  - What can we remove? What's essential?
  - Button placement, form length, field order

**Phase 2 (Building):**
- **Email sequences** (if booking confirmation needs email) — template for confirmation email
- **Playwright testing** (optional) — automated end-to-end test: fill form → verify in Firebase

**Phase 3 (QA):**
- Run standard TORQ acceptance checklist (from CLAUDE.md)

---

## Locked Decisions (do not re-debate)

- **Tech stack:** Static HTML, Tailwind CDN, vanilla JS, Firebase SDK via CDN. No build step.
- **Brand:** All TORQ design tokens, fonts, voice from existing CLAUDE.md. No changes.
- **Booking data:** Writes to same Firebase as app — real-time sync.
- **Deployment:** Push to git, deploy via Netlify (`netlify deploy --prod`).
- **No scope creep:** Form only. No payment processing, SMS integration, or admin dashboard in this session.

---

## What You Need Before Starting

From partner:
1. Firebase config object (apiKey, authDomain, projectId, etc.)
2. Firestore structure (collection name, field names, types, example booking)
3. Auth method (anonymous? login required? which provider?)
4. Availability logic (how are time slots determined?)

If any missing: **stop and request from partner.** Do not guess or improvise Firebase schema.

---

## Session Success Criteria

✅ Plan approved (form layout, data flow, auth approach decided)
✅ Form built and styled (matches TORQ brand)
✅ Firebase integration working (form writes to Firestore)
✅ Mobile QA passed (390px / 768px / 1440px)
✅ No console errors
✅ Lighthouse ≥85 Performance, ≥90 Accessibility
✅ Git commit + HANDOVER.md updated with session notes
✅ Ready to deploy

---

## Anti-Patterns (do not do)

- Don't build without Firebase info (you'll guess the schema wrong)
- Don't skip plan mode (multiple valid approaches — align first)
- Don't downgrade to Sonnet for the build (false economy)
- Don't add payment processing / admin features (out of scope)
- Don't iterate past the acceptance checklist (build once, QA once, done)
- Don't forget mobile QA at 390px (critical for booking UX)

---

## Next Steps

1. **Partner sends Firebase details** (use the handover document provided)
2. **You share details with Claude** (paste partner's response)
3. **Claude enters plan mode** (designs form, data flow, auth approach)
4. **You approve plan**
5. **Claude builds in one pass** (Opus 4.7)
6. **Subagents run in parallel** (research, integration testing)
7. **QA checklist run** (Haiku 4.5)
8. **Deploy** (git + Netlify)

---

## File References

- **Current site:** `/Users/shanestokes/Desktop/my-business-site/index.html`
- **Brand system:** `/Users/shanestokes/Desktop/my-business-site/CLAUDE.md`
- **Workflow rules:** `/Users/shanestokes/Desktop/my-business-site/.claude/rules/workflow.md`
- **Model selection:** `/Users/shanestokes/Desktop/my-business-site/.claude/rules/model-selection.md`
- **Skills reference:** `/Users/shanestokes/Desktop/my-business-site/.claude/skills-reference.md`
- **Handover (update at end):** `/Users/shanestokes/Desktop/my-business-site/HANDOVER.md`
