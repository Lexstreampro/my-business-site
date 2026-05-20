# TorQ Cymru — Elite Claude Execution Protocol

**Version:** 1.0
**Repo:** my-business-site (https://www.torqcymru.co.uk/)
**Audience:** Any Claude instance working on the TorQ Cymru website, brand assets, or related collateral.

---

## Purpose

This protocol exists to make Claude work like a controlled senior product team, not a loose coding assistant.

It protects:

- **Brand quality** — premium, honest, Welsh, trustworthy, not generic
- **Git safety** — no accidental commits, no scope creep, no stray files
- **Visual consistency** — design system maintained across pages
- **Privacy** — no customer plates, faces, or addresses ever ship
- **Conversion quality** — every change earns its place commercially
- **Deployment discipline** — local ≠ committed ≠ pushed ≠ deployed
- **Token efficiency** — review-size images, not 4MB screenshots, into context
- **Shane's one-step-at-a-time workflow** — no batched surprises

If a Claude session does not honour this protocol, the work is not finished — it is reckless.

---

## Operating Principle

Claude must always separate these stages and pause between each:

1. **Audit** — read current state, no edits
2. **Recommendation** — propose the smallest high-impact move
3. **Approval** — Shane confirms the move
4. **Implementation** — make the change, scoped
5. **Verification** — visual + functional + git evidence
6. **Commit** — staged file by file, message reviewed
7. **Push** — only on explicit approval
8. **Deploy** — only on explicit approval, manual

**Never collapse these steps unless Shane explicitly says so.**

The default is: stop after every stage. Report. Wait.

---

## Layer 1 — Safety and Control Skills

### 1. Branch Scope Lock

- **Purpose:** Prevent a branch from absorbing unrelated work.
- **When triggered:** Every session start; every new file Claude is about to touch.
- **Required actions:**
  - State the branch's intent in one sentence at session start.
  - Before editing any file, ask: does this edit fit the stated intent? If no, stop.
  - Maintain a running "in-scope files" list in the response.
- **Forbidden actions:** Editing files outside the stated scope without re-approval.
- **Pass/fail:** PASS if every file touched maps cleanly to the branch intent. FAIL if scope drifted.

### 2. Read-Only Audit Mode

- **Purpose:** Force inspection before action.
- **When triggered:** Any audit, review, or "what's wrong with X" request.
- **Required actions:**
  - Use `Read`, `grep`, `git status`, screenshots — never `Edit` or `Write`.
  - End the audit with a numbered recommendation list, not a code change.
- **Forbidden actions:** Any file mutation during audit.
- **Pass/fail:** PASS if zero files modified. FAIL if any edit happened.

### 3. Commit Hygiene

- **Purpose:** Every commit must be intentional, scoped, and signed off.
- **When triggered:** Before every `git commit`.
- **Required actions:**
  - Run `git status -sb`, `git diff --stat`, `git diff --cached --name-only`.
  - Stage files explicitly by name (never `git add .` or `git add -A`).
  - Report the staged list to Shane and wait for approval before commit.
  - Commit messages: conventional prefix (`fix:`, `feat:`, `docs:`, `chore:`), present tense, scope in parens.
- **Forbidden actions:** Staging screenshots, untracked customer images, unrelated docs, deployment artifacts, secrets.
- **Pass/fail:** PASS if `git diff --cached --name-only` matches the approved list exactly.

### 4. Binary Asset Safety Mode

- **Purpose:** Protect image files from accidental overwrite or destructive edit.
- **When triggered:** Any task touching `assets/`, especially `assets/work/`, `assets/services/`, hero imagery.
- **Required actions:**
  - List existing files in the target directory first.
  - Confirm a backup or git-tracked baseline exists before any image operation.
  - Prefer additive filenames (`job-9-v2.jpeg`) over overwrites until Shane approves the swap.
- **Forbidden actions:** Overwriting an existing image without explicit approval; deleting failed image attempts without listing them first.
- **Pass/fail:** PASS if originals are intact or recoverable from git. FAIL if any baseline was destroyed.

### 5. Privacy Sweep Mode

- **Purpose:** No customer-identifying detail ever ships.
- **When triggered:** Any real-world / work / job / customer / van image considered for publication.
- **Required actions:** Inspect for:
  - Vehicle registration plates
  - Faces
  - House numbers
  - Street signs / road names
  - Customer names on documents
  - Personal belongings, prescriptions, mail
  - Visible business addresses (other businesses)
  - Reflections that reveal any of the above
- **Output:** RED / AMBER / GREEN classification.
  - **GREEN** — safe to publish as-is.
  - **AMBER** — safe after crop, reframe, or natural inpaint.
  - **RED** — do not use; request a replacement.
- **Premium rule:** Always prefer crop / reframe / natural inpaint over black-box redaction or ugly blur. Black boxes look amateur and signal "we got caught with sensitive content."
- **Pass/fail:** PASS only if classification is documented and an AMBER/RED was actioned before any publish step.

### 6. Deployment Gate Rule

- **Purpose:** Claude never deploys autonomously.
- **When triggered:** Any task that could reach production.
- **Required actions:** Recognise four distinct states and surface which one is current:
  1. Local edit (uncommitted)
  2. Local commit
  3. Pushed to origin
  4. Production deploy
- **Forbidden actions:** Running `netlify deploy --prod`, `firebase deploy`, `git push` to main, or merging to a deploy branch without explicit Shane approval per action.
- **Pass/fail:** PASS if every state transition was approved separately.

### 7. Screenshot Review Optimisation

- **Purpose:** Save tokens and reviewer attention by inspecting downscaled review copies before originals.
- See dedicated section below.

### 8. Rollback Discipline

- **Purpose:** Every change must be reversible inside 30 seconds.
- **When triggered:** Before any commit; before any deploy.
- **Required actions:**
  - State the rollback command before the action ("if this breaks, run `git revert <sha>` / `netlify deploy --prod --dir=...` of previous build").
  - Confirm prior good state is reachable.
- **Forbidden actions:** Destructive history rewrites on shared branches (`push --force`, `reset --hard origin/...`).
- **Pass/fail:** PASS if a one-line rollback exists and was stated before the action.

---

## Layer 2 — Premium Execution Skills

### 1. Intent Preservation

- **Purpose:** Keep the brand's original creative direction across iterations.
- **When triggered:** Any visual or copy change to homepage, services, hero, or above-the-fold content.
- **Inspect:** The current intent — what is this section trying to make a Caerphilly customer feel in the first 2 seconds?
- **Challenge:** Does the proposed change strengthen or dilute that feeling?
- **Weak answer:** "Looks cleaner." "More modern."
- **Premium answer:** "The current hero says 'real local mechanic, calm authority.' The proposed banner adds polish but risks looking like a stock-photo car dealer. Keep the existing hero; address premium-feel via typography and spacing instead."

### 2. Premium Taste Filter

- **Purpose:** Filter out generic / stocky / over-marketed output.
- **When triggered:** Any new visual, copy block, CTA, or section.
- **Inspect:** Does it look like every other mechanic site? Does it use cliché ("Your trusted partner", "We go the extra mile")? Does it use stock imagery vibes?
- **Challenge:** Replace with one specific, true, Welsh-rooted detail.
- **Weak answer:** "Professional mobile mechanic services across South Wales."
- **Premium answer:** "Diagnostics and repairs on your driveway in Caerphilly, Newport, and the valleys. No garage queue. Plate-in, quote-out in 60 seconds."

### 3. Design System Consistency

- **Purpose:** Pages share rhythm, type scale, spacing, and component patterns.
- **When triggered:** Any change to a recurring component (cards, CTAs, section headers, image frames).
- **Inspect:** Where else does this component appear? Will the change ripple?
- **Challenge:** Is this a system change (touch the source) or a one-off override (justify the divergence)?
- **Weak answer:** Style edit in one file with no audit of siblings.
- **Premium answer:** "This card style appears on services.html and index.html. Updating the radius from 8px to 12px needs both pages re-screenshotted at 390/768/1440."

### 4. Asset System Thinking

- **Purpose:** Images, icons, and media are a system, not one-offs.
- **When triggered:** Adding or replacing any image asset.
- **Inspect:** Naming convention, folder structure, aspect ratios, format (WebP/AVIF/JPEG), responsive variants, alt text discipline.
- **Challenge:** Does this new asset match the existing system or create a new orphan pattern?
- **Weak answer:** Drops `hero-v2-final-FINAL.png` into `assets/`.
- **Premium answer:** "Use `assets/work/job-10.jpeg`, 1600w JPEG, paired with WebP variant, matching `job-9.jpeg` aspect ratio and naming."

### 5. Creative Direction Lock

- **Purpose:** Once a direction is approved (hero treatment, palette, voice), unrelated patches do not redesign it.
- **When triggered:** Any change that could alter an approved direction (e.g., the Higgsfield hero, services image framing).
- **Required:** Quote the approved direction back to Shane and confirm the patch respects it.
- **Pass/fail:** PASS if approved direction is preserved or change is explicitly authorised.

### 6. Mobile-First Reality Check

- **Purpose:** 70%+ of mechanic searches are mobile. Mobile is the canonical view.
- **When triggered:** Every visual or layout change.
- **Required actions:**
  - Screenshot at 390px first.
  - Verify tap targets ≥44px.
  - Verify no horizontal overflow.
  - Verify sticky CTA visible.
- **Pass/fail:** PASS only if 390px is verified before 1440px is shown to Shane.

### 7. Above-the-Fold Command

- **Purpose:** The first viewport must do three things — say who, where, and what to do next.
- **When triggered:** Hero, top of services, top of contact, top of any landing page.
- **Inspect:** Does the first 800px of mobile viewport contain: brand promise, location proof (South Wales / Caerphilly), and one CTA (call or quote)?
- **Weak answer:** Logo + tagline + scroll.
- **Premium answer:** "TorQ Cymru — Mobile mechanic, South Wales. Call 029 2252 3485" + sticky CTA, visible without scroll.

### 8. Visual Before/After Evidence

- **Purpose:** Claims about visual change must be evidenced.
- **When triggered:** Any visual edit.
- **Required:** Side-by-side screenshots (or paired files) at 390/768/1440, before and after. Inspect review-size copies first.
- **Weak answer:** "I improved the spacing."
- **Premium answer:** "Before: 48px section padding. After: 64px. Screenshots: `.claude/screenshots/review/services-before-*.png` vs `services-after-*.png`."

---

## Layer 3 — Commercial Sharpness Skills

### 1. Conversion Path Skill

- **Purpose:** Every page has one job. Trace it.
- **When triggered:** Any page audit or new section proposal.
- **Questions:**
  - What is this page's primary conversion action? (Call / quote / book / message)
  - How many taps from arrival to that action on mobile?
  - Is the CTA visible in the first viewport and sticky?
- **Output format:** A 3-line trace: `Arrive → [section] → CTA action`. Note the friction.

### 2. Friction Hunt

- **Purpose:** Remove anything that delays or confuses the conversion.
- **Trigger:** Audits, RC reviews.
- **Questions:** What pulls focus away from the CTA? Long copy blocks? Carousels? Cookie banners? Slow images?
- **Output:** A ranked list of friction items with one-line fixes.

### 3. Proof Density

- **Purpose:** Trust is built per square inch.
- **Trigger:** Any page that asks for action.
- **Questions:** How many proof signals (reviews, photos of real work, response time, areas covered, accreditations) are visible without scrolling? Are they specific or generic?
- **Output:** Inventory of proof signals + a "next proof to add" recommendation.

### 4. Competitor-Level Challenge

- **Purpose:** TorQ Cymru should look stronger than the typical South Wales mobile mechanic.
- **Trigger:** Premium-feel audits.
- **Questions:** Pick three competitors in the same area. What do they do better? What do we do better? What's the smallest move that closes the gap?
- **Output:** Three named gaps + the highest-ROI gap to close first.

### 5. Ruthless De-Slop

- **Purpose:** Cut filler copy, generic stock vibes, AI cliché.
- **Trigger:** Copy reviews, hero reviews, services intros.
- **Banned phrases (non-exhaustive):** "Your trusted partner", "We pride ourselves", "Bringing solutions", "In today's fast-paced world", "Cutting-edge", "Seamless experience".
- **Output:** Marked-up copy with substitutions.

### 6. One Strong Move

- **Purpose:** When unsure, do less, better.
- **Trigger:** Any "should we do A, B, and C?" question.
- **Output:** Name the single highest-leverage change. Defer the rest to the parked register.

### 7. Park or Proceed

- **Purpose:** Force a decision per item — do it now, park it, or reject it.
- **Trigger:** End of audit, end of session.
- **Output:** For each candidate change: `PROCEED` (with branch + scope), `PARK` (added to register with reason), or `REJECT` (with reason).

### 8. Release Candidate Review

- **Purpose:** Before any deploy approval, run a full RC pass.
- **Required checks:**
  - Mobile/tablet/desktop screenshots
  - Conversion path trace
  - Privacy sweep on any new imagery
  - Copy de-slop
  - Console errors
  - Lighthouse or visual perf check
  - Rollback command stated
- **Output:** RC report with PASS/FAIL per check and an overall recommendation.

---

## Mandatory Screenshot Review Optimisation

**Standing rule.** Applies to every visual audit, every visual change, every RC review.

### Why

Full-res screenshots are 2–8MB each. Sending three of them into context for a single review burns tokens with no quality benefit — Claude can read layout, rhythm, spacing, and most colour issues from a 1000px-wide review copy. Originals are kept on disk and consulted only when a specific pixel-level detail is in question.

### Folders

- **Original screenshots:** `.claude/screenshots/`
- **Review copies:** `.claude/screenshots/review/`

Create them if missing. Never commit either folder (add to `.gitignore` if not already excluded).

### Workflow

1. **Capture** full-res screenshots at the three canonical breakpoints (390 / 768 / 1440).
2. **Preserve originals** — never overwrite them.
3. **Generate review copies** via `sips` (Mac default) or `magick`:

```bash
mkdir -p .claude/screenshots/review

sips -Z 390  .claude/screenshots/services-390px-mobile.png  --out .claude/screenshots/review/services-390px-mobile-review.png
sips -Z 768  .claude/screenshots/services-768px-tablet.png  --out .claude/screenshots/review/services-768px-tablet-review.png
sips -Z 1000 .claude/screenshots/services-1440px-desktop.png --out .claude/screenshots/review/services-1440px-desktop-review.png
```

If ImageMagick is present, `magick` is acceptable:

```bash
magick .claude/screenshots/services-1440px-desktop.png -resize 1000x .claude/screenshots/review/services-1440px-desktop-review.png
```

4. **Inspect review copies first.** Only escalate to originals if a specific detail (sub-pixel alignment, exact hex sampling, fine text rendering) cannot be judged from the review copy.
5. **Report:**
   - Original path + dimensions
   - Review path + dimensions
   - Which image was actually inspected
   - Why originals were (or were not) escalated to

### Forbidden

- Committing screenshots (originals or reviews) without explicit Shane approval.
- Inspecting full-res originals when a review copy would suffice.
- Capturing only one breakpoint when the change affects layout.

---

## Mandatory Image / Customer Privacy Rules

Before any real work / customer image ships:

1. Run the **Privacy Sweep** checklist (see Layer 1, Skill 5).
2. Classify **GREEN / AMBER / RED**.
3. For AMBER: prefer **crop, reframe, or natural inpaint**. Black-box redaction is a last resort and signals amateurism.
4. Verify the redacted/cropped result visually at all three breakpoints.
5. Document the classification in the commit message or PR notes.

**TorQ-specific reminders:**

- Customer vans, driveways, and house numbers are the most common AMBER triggers.
- Welsh place-name street signs can identify a specific home — treat as RED unless the customer has approved.
- Reflections in chrome and glass have leaked plates before — check them.

---

## Mandatory Git Rules

### Before any edit

```bash
git status -sb
git branch --show-current
```

Confirm branch matches intent. Confirm working tree state is understood.

### Before any commit

```bash
git status -sb
git diff --stat
git diff --cached --stat
git diff --cached --name-only
```

Stage explicitly:

```bash
git add path/to/file1 path/to/file2
```

Never:

- `git add .`
- `git add -A`
- `git add *`

### Never stage

- Screenshots (originals or reviews)
- Temporary files (`.DS_Store`, `*.tmp`, editor swap files)
- Failed image attempts (e.g., `job-9-plate-masked.jpeg`, `job-9-redacted.jpeg` when superseded)
- Unrelated docs
- Untracked customer images not yet privacy-cleared
- Deployment artifacts (`dist/`, `.netlify/`, `firebase-debug.log`)
- Secrets, `.env`, credential files

### After commit

```bash
git status -sb
git log --oneline -3
```

Confirm:
- The commit landed.
- Nothing unexpected is staged or modified.
- The log entry reads as intended.

---

## Mandatory Deployment Rules

Four distinct states. Each transition needs separate Shane approval.

| State | Command (example) | Approval gate |
|---|---|---|
| 1. Local edit | `Edit` / `Write` | Stated scope only |
| 2. Local commit | `git commit` | "Approved to commit" |
| 3. Pushed to origin | `git push` | "Approved to push" |
| 4. Production deploy | `netlify deploy --prod` | "Approved to deploy" |

Claude **never** transitions state 3 → 4 autonomously. Deploys are manual, with Shane present.

**Repo-specific:**
- `my-business-site` (this repo) deploys to Netlify **manually**. `git push` does not auto-deploy.
- The TorQ portal (`~/Desktop/torq-repo`) auto-deploys via CI — confirm which repo you are in before any push.

---

## Mandatory Parked Work Register

At the end of every working session, Claude must produce a register of parked items in this format:

| Item | Why parked | Risk if ignored | Suggested branch | When to revisit |
|---|---|---|---|---|
| (one line per item) | | | | |

Parked items live in the session handover. They are not committed to the repo unless Shane requests a `PARKED.md`.

---

## Short Start-of-Thread Version

Paste this into any new TorQ Cymru Claude thread:

> Use the TorQ Cymru Elite Claude Execution Protocol (`docs/CLAUDE_ELITE_EXECUTION_PROTOCOL.md`). Work one step at a time. Start with `git status -sb` and a branch/scope statement. Do not edit any file until scope is locked and approved. Do not commit, push, or deploy without explicit per-action approval. Apply: Premium Taste Filter, Privacy Sweep, Screenshot Review Optimisation, Mobile-First Reality Check, and Parked Work Register where relevant. Default to Park or Proceed framing. Default to RED/AMBER/GREEN for privacy. Prefer crop/reframe over black-box redaction. Use review-size screenshot copies before originals.

---

## End of Protocol
