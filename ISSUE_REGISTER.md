# TorQ Cymru — Issue Register

Single source of truth for open, in-progress, and resolved issues across the site.

**Statuses:** Open / In progress / Waiting for user input / Resolved / Won't fix
**Priorities:** Critical / High / Medium / Low

When closing an issue: change status to `Resolved`, add resolution date and the commit/decision that closed it. Do not delete entries.

---

## ISSUE 1 — Phase 3/4 card hover effect may not be live

- **Status:** Resolved
- **Priority:** High
- **Opened:** 2026-05-19
- **Resolved:** 2026-05-19
- **Resolution:** Root cause was deployment drift — `b02706d` and 5 prior commits were never deployed because `my-business-site` is manual-deploy (`git push` does not publish). Manual `netlify deploy --prod` (deploy ID `6a0ce6363e1c1b0d663aa533`) promoted the cached preview-deploy assets. Live verification: homepage `hover:border` token count 28/28, services 15/15 — Phase 3 (services) and Phase 4 (homepage) hover rhythms confirmed live.
- **Notes:** User reports premium red border/hover is not visible on live production.
- **Owner / Lane:** Lane 1 (Live Site Truth audit)
- **Next action:** None.

---

## ISSUE 2 — John's van registration plate may still be visible live

- **Status:** Resolved
- **Priority:** Critical / Privacy
- **Opened:** 2026-05-19
- **Resolved:** 2026-05-19
- **Resolution:** False alarm at audit time — `job-9.jpeg` was already plate-redacted on live. Both redaction commits (`d1e0fec`, `6d46328`) had landed in the 2026-05-19 18:31 UTC production deploy. Live md5 `0e7e29aedf76023384fd9614d52ac61a` matched local. Re-verified post-2026-05-20 deploy: md5 unchanged, asset preserved through subsequent merges.
- **Notes:** User reports live site may still show John's van registration plate.
- **Owner / Lane:** Lane 1 (Live Site Truth audit)
- **Next action:** None.

---

## ISSUE 3 — Recent Work image green edge bleed

- **Status:** Resolved
- **Priority:** Medium / High visual QA
- **Opened:** 2026-05-19
- **Resolved:** 2026-05-20
- **Resolution:** Root cause was baked-in JPEG chroma-tear columns at the right edge of `job-1.jpeg`, `job-3.jpeg`, `job-4.jpeg`, `job-5.jpeg` (source artefact from original export pipeline). CSS and container hypotheses rejected — only 4 of 9 tiles affected. Fix: lossless DCT-domain crop of right 30px via `jpegtran -copy none -optimize -progressive -crop 2970x4000+0+0` on the 4 affected files only. Commit `4679b08` on `master`, deploy ID `6a0cf01a36fd6735753eaab7`. Live G/R right-edge ratios now 0.95–1.01 (was 3.4–16.9× pre-fix). `job-9.jpeg` untouched and verified.
- **Notes:** User reports recent work pictures appear to bleed green around box edges.
- **Owner / Lane:** Lane 1 (Live Site Truth audit)
- **Next action:** None.

---

## ISSUE 4 — Mike's list pending

- **Status:** Waiting for user input
- **Priority:** Unknown
- **Opened:** 2026-05-19
- **Notes:** Shane has a list from Mike to add later.
- **Owner / Lane:** Awaiting Shane
- **Next action:** Shane to provide list. Then triage into new issues.

---

## ISSUE 5 — Workflow instructions currently too repetitive

- **Status:** Resolved
- **Priority:** High
- **Opened:** 2026-05-19
- **Resolved:** 2026-05-19
- **Resolution:** Workflow spine merged to `master` via PR #1 (commits `ee72da6`, merge `5268bb4`). Five spine docs (`EXECUTION_PATTERNS.md`, `DECISIONS.md`, `ISSUE_REGISTER.md`, `DAILY_LOG.md`, `QUALITY_CONTROL.md`) plus a pointer block in `HANDOVER.md` now live in the repo root. Future sessions cold-start from these docs without re-explaining the workflow.
- **Notes:** Need permanent workflow docs to reduce token waste across Claude/ChatGPT/Gemini.
- **Owner / Lane:** Lane 2 (this docs spine)
- **Next action:** None. Re-open only if a future session shows the spine docs are insufficient.

---

## Adding New Issues

Append to the bottom with the next available number. Format:

```
## ISSUE N — Short title

- **Status:** Open
- **Priority:** Critical | High | Medium | Low
- **Opened:** YYYY-MM-DD
- **Notes:** What is wrong, how it was reported, scope.
- **Owner / Lane:** Who/what is working it.
- **Next action:** Concrete next step.
```
