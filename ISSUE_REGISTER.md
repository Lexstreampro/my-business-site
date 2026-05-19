# TorQ Cymru — Issue Register

Single source of truth for open, in-progress, and resolved issues across the site.

**Statuses:** Open / In progress / Waiting for user input / Resolved / Won't fix
**Priorities:** Critical / High / Medium / Low

When closing an issue: change status to `Resolved`, add resolution date and the commit/decision that closed it. Do not delete entries.

---

## ISSUE 1 — Phase 3/4 card hover effect may not be live

- **Status:** Open
- **Priority:** High
- **Opened:** 2026-05-19
- **Notes:** User reports premium red border/hover is not visible on live production. Could be because production has not been deployed after `b02706d`, or wrong deploy/caching/source issue.
- **Owner / Lane:** Lane 1 (Live Site Truth audit)
- **Next action:** Verify whether `b02706d` is deployed to Netlify production; compare live HTML against local. Check for CDN cache, wrong source HTML, or Tailwind class stripping. See Tailwind card-hover rule in [EXECUTION_PATTERNS.md](EXECUTION_PATTERNS.md).

---

## ISSUE 2 — John's van registration plate may still be visible live

- **Status:** Open
- **Priority:** Critical / Privacy
- **Opened:** 2026-05-19
- **Notes:** User reports live site may still show John's van registration plate. Needs live-vs-local-vs-preview verification.
- **Owner / Lane:** Lane 1 (Live Site Truth audit)
- **Next action:** Diff live image set vs local; confirm whether replacement image was deployed. If still live: blur/replace and redeploy as priority.

---

## ISSUE 3 — Recent Work image green edge bleed

- **Status:** Open
- **Priority:** Medium / High visual QA
- **Opened:** 2026-05-19
- **Notes:** User reports recent work pictures appear to bleed green around box edges. Needs visual comparison and source diagnosis.
- **Owner / Lane:** Lane 1 (Live Site Truth audit)
- **Next action:** Screenshot at 390/768/1440. Inspect element to identify source: image asset edge, container border, box-shadow, or hover state remnant.

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
