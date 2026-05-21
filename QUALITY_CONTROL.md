# TorQ Cymru — Quality Control

Standing quality gates. Apply before commit, before preview, before production deploy.

---

## Pre-Commit Checklist

- [ ] **Audit before patch** — read the file you are about to change first; do not patch from memory.
- [ ] **Scope confirmed** — only the files in the assigned task are modified.
- [ ] **No screenshot artefacts staged** — `*.png`, `*.jpg`, `*.jpeg` from screenshot runs are not in `git status`.
- [ ] **No inline `border-color` on hover cards** — Tailwind owns both states (see [EXECUTION_PATTERNS.md](EXECUTION_PATTERNS.md) rule 13).
- [ ] **No `!important`** added unless explicitly approved.
- [ ] **No secrets** — API keys, tokens, plates, phone numbers not visible by mistake.
- [ ] **No production deploy** has happened.
- [ ] **`git diff --check`** clean (no whitespace errors / conflict markers).
- [ ] **`git diff --stat`** matches the scope you expected.
- [ ] **Stop before commit** unless commit is explicitly approved by Shane.

---

## Pre-Preview-Deploy Checklist

- [ ] All pre-commit items pass.
- [ ] Visual changes screenshotted at **390px / 768px / 1440px**.
- [ ] Screenshots compared against reference / previous state — note specific mismatches (px, hex, font-size).
- [ ] At least **2 comparison rounds** for visual work; never stop after one pass.
- [ ] Browser console clean — zero red errors.
- [ ] Images load fully — no broken icons, no alt-text fallbacks.
- [ ] No horizontal scroll at any tested breakpoint.

---

## Pre-Production-Deploy Checklist

- [ ] All preview checks pass.
- [ ] Shane has explicitly said **"deploy production now"** — no implicit go-ahead.
- [ ] Preview deploy was reviewed by Shane (or ChatGPT acting as reviewer).
- [ ] Open issues in [ISSUE_REGISTER.md](ISSUE_REGISTER.md) that affect this change are resolved or knowingly accepted.
- [ ] Action logged in [DAILY_LOG.md](DAILY_LOG.md) at deploy time.

Reminder: `my-business-site` is **manual deploy via Netlify CLI**. `git push` does NOT deploy. Use `netlify deploy --prod`.

---

## Visual QA — Three-Breakpoint Rule

| Breakpoint | Device         | Focus                                                  |
|-----------:|----------------|--------------------------------------------------------|
| 390px      | iPhone SE      | Mobile stack, tap targets ≥44px, no overflow           |
| 768px      | iPad / tablet  | Responsive transitions, menu behaviour, wrapping       |
| 1440px     | Desktop        | Full-width layout, line length, spacing                |

Code inspection is insufficient. Visual proof is truth.

---

## Image Quality Bar

- File size ≥ 100KB (smaller = compressed/low-res).
- Width ≥ 1200px for web delivery.
- Verify in browser, not just by HTTP 200.
- Discard and re-source anything under 50KB.

---

## Privacy Image Checklist

- [ ] No readable vehicle registration plates at 390px, 768px, or 1440px.
- [ ] No exposed private addresses, admin locations, invoices, dashboards, or customer details.
- [ ] Check reflections, background signage, mirrors, glass, and cropped edges.
- [ ] Avoid obvious blur rectangles unless the only goal is emergency containment.
- [ ] Prefer a natural 4:3 gallery-ready crop/reframe or approved replacement asset.
- [ ] If creating candidates, keep review sheets and temporary files out of the final commit.
- [ ] Use additive filenames for approved replacements; do not overwrite originals without approval.
- [ ] Confirm the live page references the approved asset after deploy.

---

## What Fails Quality

- Half-finished work shipped to production.
- "It looked fine locally" without screenshots at the three breakpoints.
- Inline `border-color` mixed with Tailwind hover utilities.
- Committed screenshot artefacts.
- Deploy without explicit approval.
- A patch that touches files outside the assigned task.
