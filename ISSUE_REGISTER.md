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

## ISSUE 6 — job-9 Recent Work crop/privacy presentation

- **Status:** Resolved
- **Priority:** Critical / Privacy + visual QA
- **Opened:** 2026-05-21
- **Resolved:** 2026-05-21
- **Resolution:** Root cause was both asset-level and layout-level: the original `job-9.jpeg` was forced into the gallery's 4:3 card crop, which cut Mike's head on desktop and made the old registration/redaction area visually unsafe on mobile. Fix used an audit-first sibling candidate workflow, then committed additive asset `assets/work/job-9-gallery-safe.jpeg` and changed the single homepage Recent Work reference in `index.html` (commit `5b09542`). Original `assets/work/job-9.jpeg` was retained; temporary candidate `assets/work/job-9-candidate.jpeg` was removed before commit. Production deploy `6a0f5fd63599980bbf16b1a6` verified live at 390px, 768px, and 1440px.
- **Notes:** User reported the John van Recent Work image cropped badly on desktop and still exposed the registration/privacy area on mobile.
- **Owner / Lane:** Lane 2 (public website image/privacy workflow)
- **Next action:** None. Re-open only with fresh visual evidence from the live site.

---

## ISSUE 7 — Twilio Primary Compliance Profile pending; Air Landline WhatsApp/Twilio sender setup parked

- **Status:** Waiting for external (Twilio compliance review)
- **Priority:** High
- **Opened:** 2026-05-30
- **Notes:** Twilio Primary Compliance Profile (Business; TorQ Cymru Automotive Ltd; Industry: Automotive; business website https://torqcymru.co.uk; business phone +442922523485; authorised representative + business registration number present) is currently In Review / Pending review. Available funds £20.00. Profile detail page shows no missing-information warning, no rejection, no document request, and no resubmit button. The compliance-profile "assigned phone numbers" tab is for US numbers per Twilio's own page text, so it is not the path for the UK Air Landline. While the profile is under review: do NOT purchase a Twilio number, do NOT run Find-Your-Number, and do NOT click Add-Phone-Numbers on this profile.
- **Owner / Lane:** Awaiting Twilio compliance approval. Then Lane 1 (controller-approved) for sender setup. Lane 1 must not act until approval lands.
- **Next action:** When Twilio Primary Compliance Profile is approved, proceed to register/use the existing Air Landline number (+442922523485) for WhatsApp/Twilio sender setup using voice-call verification. SMS verification only if Air Landline is definitely confirmed to support SMS. Twilio-purchased number remains fallback only if Air Landline fails verification or proves unsuitable. Address may only be used where compliance forms legally require it; do not publish or expose the full business/admin address in public website or customer-facing copy.

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
