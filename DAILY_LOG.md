# TorQ Cymru — Daily Log

Append-only chronological record of meaningful actions. Newest entries at the top.

Each entry: date, lane, action, outcome, follow-ups.

---

## 2026-06-06

**Lane 1 — Website terms + app honesty + contact**
- Added terms.html and linked the booking checkbox wording to the terms page.
- Reworded inert App Store/Google Play buttons from "Notify me" to "Coming soon".
- Confirmed public website email already uses torqcymruautomotive@gmail.com; internal SendGrid planning emails were left untouched.
- Added WhatsApp click-to-chat links to the index.html and services.html footer contact blocks.
- Outcome: implemented on branch content/terms-app-contact. No deploy.
- Follow-up: PR review, then separate merge/deploy gate.

---

## 2026-05-30

**Lane 1 — Twilio Primary Compliance Profile state logged (documentation-only; no API/account changes)**
- Timestamp: 2026-05-30 BST
- Operator: Claude (Lane 1, documentation-only mode)
- Surface: Twilio customer-communication foundations (WhatsApp/voice for TorQ Cymru). No code, no API calls, no number purchase, no deploy.
- Twilio account state confirmed visually:
  - Account active. Available funds shown as £20.00.
  - Primary Compliance Profile exists. Type: Business. Status: In Review / Pending review.
  - Legal business name shown as TorQ Cymru Automotive Ltd. Industry shown as Automotive.
  - Business registration number present. Authorised representative present.
  - Business website shown as https://torqcymru.co.uk. Business phone shown as +442922523485.
  - No visible missing-information warning, rejection, document request, or resubmit button on the profile detail page.
  - The "assigned phone numbers" tab inside the compliance profile area exists but Twilio page text indicates those slots are for US numbers, so this is not the Air Landline path.
- Decision recorded: use the existing Air Landline (+442922523485) as the primary public TorQ Cymru business number for WhatsApp/Twilio sender setup. Twilio-purchased number remains fallback only if Air Landline fails verification or proves unsuitable.
- Gate: Twilio Primary Compliance Profile approval. Until then: no Find-Your-Number flow, no Add-Phone-Numbers click on this profile, no Twilio number purchase, no Twilio/SendGrid/Meta API work.
- Files/commit: docs-only appends to [DAILY_LOG.md](DAILY_LOG.md) and [ISSUE_REGISTER.md](ISSUE_REGISTER.md). No source code, env, secrets, or deploy settings touched. No deploy. Commit pending Shane/ChatGPT approval.
- Parked follow-up: see [ISSUE 7](ISSUE_REGISTER.md).

---

## 2026-05-21

**Lane 1 — job-9 privacy-safe gallery image deployed and verified live**
- Timestamp: 2026-05-21 20:41 BST
- Operator: Codex
- Surface: public website Recent Work image/privacy fix.
- Action: production deploy of `master` to Netlify after Shane approval; live verification of the approved `job-9-gallery-safe.jpeg` image swap.
- Commit deployed: `a1bb66e9f94dc6cbad730dfe0904f868924f8680` (master tip at deploy time). Relevant included commits:
  - `5b09542 fix(work): use privacy-safe job 9 gallery image`
  - `b64b317 docs: log job 9 privacy-safe image workflow`
  - `25d62f6 chore(test): add playwright for visual verification`
  - `a1bb66e docs: log playwright visual verification setup`
- Deploy: yes — Netlify deploy ID `6a0f5fd63599980bbf16b1a6`. Production URL `https://torqcymru.co.uk`; unique deploy URL `https://6a0f5fd63599980bbf16b1a6--eloquent-gelato-d5fe9a.netlify.app`.
- Live verification: cache-busted homepage HTML references `assets/work/job-9-gallery-safe.jpeg`; live image returned HTTP 200 and SHA-256 matched local; dimensions `1200x900`.
- Viewport verification: 390px, 768px, and 1440px screenshots confirmed Mike's head visible and the old registration/redaction area out of frame.
- Source hygiene: original `assets/work/job-9.jpeg` retained; temporary `assets/work/job-9-candidate.jpeg` removed before commit; no app repo touched.

**Lane 2 — Playwright installed for public website visual verification**
- Timestamp: 2026-05-21 20:47 BST
- Operator: Codex
- Surface: public website visual/layout/image verification tooling.
- Files/commit: `package.json`, `package-lock.json`; commit `25d62f6 chore(test): add playwright for visual verification`.
- Summary: added `@playwright/test` as a dev dependency so future website visual checks can use Playwright directly instead of falling back to Puppeteer-only scripts. Verified `playwright`, `@playwright/test`, and `npx playwright --version` locally.
- Deploy: no Netlify deploy was run.

**Lane 2 — Public Website Recent Work privacy-safe image workflow logged**
- Timestamp: 2026-05-21 20:25 BST
- Operator: Codex
- Surface: public website Recent Work image/privacy fix.
- Files/commit: `assets/work/job-9-gallery-safe.jpeg`, `index.html`; commit `5b09542 fix(work): use privacy-safe job 9 gallery image`.
- Summary: replaced the `job-9` Recent Work reference with the approved privacy-safe 4:3 additive asset. Original issue was two-part: desktop gallery crop cut Mike's head, while mobile/privacy presentation made the old plate-redaction area visually obvious. Fix route: approved candidate became `job-9-gallery-safe.jpeg`; original `job-9.jpeg` was not overwritten.
- Push completed: yes — `master == origin/master == 5b09542` after approval.
- Deploy: no Netlify deploy was run.
- Process lesson: for privacy-sensitive website images, use audit-first sibling candidate workflow with review sheets and viewport previews before swapping live references: audit -> sibling candidate -> review sheet/viewport previews -> additive final filename -> one-reference swap -> narrow commit -> push after approval -> no deploy unless separately approved.

## 2026-05-20

**Lane 1 — Recent Work green-edge bleed: diagnosed, fixed, deployed, verified**
- Root cause confirmed: four source JPEGs (`job-1`, `job-3`, `job-4`, `job-5`) had baked-in green/magenta chroma-tear columns at the right edge (G/R ratios 3.4–16.9× on the source rightmost columns). uRGB profile hypothesis and CSS/container hypotheses both rejected — only the 4 affected images showed bleed; the 5 others rendered clean despite identical CSS.
- Fix approach (after one rejected pass): lossless DCT-domain crop with `jpegtran -copy none -optimize -progressive -crop 2970x4000+0+0`. Removes right 30px (well above the detected 13–15px minimum-safe crop) without re-encoding the retained pixels.
- PIL re-encode pass (`quality=82, subsampling=4:2:0`) rejected: produced files 2.3× original size (+1.28 MB total). jpegtran lossless pass produces files only 1.22–1.26× original (+234 KB total — 5.5× smaller delta).
- Branch `fix/recent-work-green-edge-assets` created from `master`, image commit `ed1a899` made, branch rebased onto current master to become `4679b08`, then fast-forward merged into master. Push: `d93e894..4679b08`.
- Doc closure separated from image fix per controller policy: stashed working-tree docs, switched to master, applied stash on master, committed docs-only as `d93e894` ("docs: log lane closure and deployment integrity") and pushed before image-branch rebase. Keeps the image PR diff purely binary.
- Production deploy: `netlify deploy --prod --dir=.` → deploy ID `6a0cf01a36fd6735753eaab7`, state ready, 10 files uploaded, 4.7s build.
- Live verification: all 5 work images (job-1, job-3, job-4, job-5, job-9) md5-match local; right-edge G/R ratios all 0.95–1.01 (was 3.4–16.9× pre-fix on affected files). `job-9.jpeg` md5 `0e7e29aedf76023384fd9614d52ac61a` unchanged from pre-Lane-1 — plate redaction preserved.
- Closes [ISSUE 1](ISSUE_REGISTER.md), [ISSUE 2](ISSUE_REGISTER.md), [ISSUE 3](ISSUE_REGISTER.md).
- New entries recorded in [DECISIONS.md](DECISIONS.md): jpegtran lossless crop pattern, and cross-lane stash-to-master workflow.

**Lane 1 — Final state**
- `master` local & origin: `4679b08`
- Production deploy: live at `6a0cf01a36fd6735753eaab7`
- Lane 1 closed. No further outstanding image, deploy, or hover issues.

**Lane 1 — Services Premium Pass: completed, merged, pushed**
- Read-only audit produced under controller-approved scope; identified services-page hero flatness, inconsistent card anatomy, prose-heavy Servicing card, and ~14 MB image payload as top issues.
- Branch `services-premium-pass` created from `master` at `d82dd43`. Single-file scope: `services.html` + screenshot artefacts only.
- Services hero rebuilt to match homepage tier — branded chip badge with red dot, tri-line H1 (`Every service. / At your door. / Across South Wales.`) at `clamp(2.4rem,5vw,4rem)`, gradient/radial depth, `Book Your Vehicle` + `Get Fast Quote` CTA pair.
- Brakes card standardised: removed nested wrapper and two-image grid, dropped reference to `01-brakes-pads-b.jpg` (file retained on disk per lane rules), now matches Diagnostics/Repairs/Batteries/Fleet anatomy exactly.
- Servicing card converted: three prose paragraphs (~120 words each) replaced with a 3-column sub-card grid (`Tier 01/02/03`) on `#141414` background, summaries tightened to ~22 words each.
- Sticky service nav unchanged — audit re-confirmed it already engages immediately under the hero.
- Screenshot artefacts updated at 390/768/1440 (Puppeteer full-page); throwaway resize copies in `.claude/screenshots/review/` not committed.
- Commit `862667c` ("fix(services): improve premium layout and service card consistency") — 4 files, +69 / −60 lines.
- Visual verification by Shane at three breakpoints confirmed before merge.
- Fast-forward merge into `master` (`d82dd43..862667c`), no merge commit. Push `d82dd43..862667c master -> master`. `origin/master` now `862667c`.
- Local branch `services-premium-pass` deleted (merged).
- No production deploy performed in this lane.
- Image optimisation parked as a separate possible next lane — needs tool decision (`sips` JPEG vs `cwebp` WebP).
- Mike's list parked for separate intake — not opened in this thread.
- `origin/visual/higgsfield-asset-sprint` untouched throughout.

**Lane 1 — Services image optimisation: completed, merged, pushed (pre-deploy)**

- Timestamp: 2026-05-20 12:27 UK
- Operator: Claude — Lane 1
- Branch: `services-image-optimisation` (cut from `master` at `862667c`; fast-forward merged into master and pushed; redundant local branch retained pending cleanup decision)
- Action: optimise the six referenced service-card PNGs into JPGs; swap `services.html` `src=` references; retain PNG originals on disk; update one verification screenshot artefact
- Commit: `ed001ed perf(services): optimise service card images` — 8 files changed (`services.html` +6 / −6 = six `src=` swaps), six new JPGs added under `assets/services/` (`01-brakes-pads-a.jpg` 303 KB, `02-servicing.jpg` 381 KB, `03-diagnostics.jpg` 336 KB, `04-repairs.jpg` 331 KB, `05-battery.jpg` 366 KB, `07-fleet.jpg` 337 KB), and one updated tablet screenshot at `.claude/screenshots/services-768px-tablet.png`. The `01-brakes-pads-b.jpg` slot was already JPG and is unreferenced after the Premium Pass restructure.
- Push: yes — `862667c..ed001ed master -> master`. `master == origin/master == ed001ed`.
- Deploy: no. Production is still on the earlier Netlify deploy `6a0cf01a36fd6735753eaab7`; production is now behind `origin/master` by two website commits (`862667c` + `ed001ed`).
- Result: services-page image payload for in-page references reduced from six 2.0–2.3 MB PNGs to six ~300–380 KB JPGs. Visual verification passed at 390 / 768 / 1440 before merge. Closes the "image optimisation parked" follow-up from the prior 2026-05-20 Services Premium Pass entry.
- Next decision needed:
  - Production deploy decision (separate Lane 1 brief; manual `netlify deploy --prod`).
  - Local `services-image-optimisation` branch cleanup once deploy is settled (Lane 2B hygiene).
  - `origin/visual/higgsfield-asset-sprint` remains protected — do not touch.
  - PNG originals and the orphan `06-mot-prep.png` remain on disk; address only in a future dedicated asset-hygiene lane.

**Lane 1 — Services production deploy verified live**

- Timestamp: 2026-05-20 12:32 UK (deploy time)
- Operator: Claude — Lane 1
- Branch: `master`
- Action: production deploy of `master` to Netlify; live verification of Services Premium Pass + JPG optimisation; regression check on prior-lane closed items
- Commit deployed: `6ab97ddf5218975423c226116be852e05e893ead` (master tip). Website changes published since the prior production deploy:
  - `862667c fix(services): improve premium layout and service card consistency`
  - `ed001ed perf(services): optimise service card images`
  - Docs-only pre-deploy log carried in the same deploy: `6ab97dd docs: log services-image-optimisation lane (pre-deploy)`
- Push: n/a — already at `origin/master` before deploy.
- Deploy: yes — Netlify deploy ID `6a0d9bcc09781d10103ff647`, supersedes prior prod deploy `6a0cf01a36fd6735753eaab7`. 13 assets uploaded; deploy live in 5.7s. Production URL `https://torqcymru.co.uk` verified; services URL `https://torqcymru.co.uk/services.html` verified.
- Result — Premium Pass verified live:
  - Branded services hero rendering with red-dot chip badge.
  - Tri-line H1 live: `Every service.` / `At your door.` / `Across South Wales.`
  - `Book Your Vehicle` and `Get Fast Quote` CTAs present.
  - Servicing card showing Tier 01 / Tier 02 / Tier 03 sub-cards.
  - Brakes card on single-image anatomy (matches Diagnostics/Repairs/Batteries/Fleet).
- Result — JPG optimisation verified live:
  - All six service JPGs return HTTP 200 (`01-brakes-pads-a.jpg`, `02-servicing.jpg`, `03-diagnostics.jpg`, `04-repairs.jpg`, `05-battery.jpg`, `07-fleet.jpg`).
  - Total in-page service JPG payload ≈ 2.0 MB (down from the prior ~14 MB PNG payload).
  - No legacy service `*.png` references remain in the live services HTML.
- Regression checks (live):
  - Phone unchanged: `029 2252 3485` / `tel:+442922523485`.
  - Old placeholder `tel:+441234567890` not present.
  - MOT / legacy service wording not present.
  - Recent Work green-edge fix preserved; `job-9.jpeg` plate-redaction preserved (no work-image asset changed in this deploy).
- Next decisions:
  - Local `services-image-optimisation` branch cleanup (Lane 2B hygiene) — branch still mirrors master at `ed001ed`.
  - `origin/visual/higgsfield-asset-sprint` remains protected — do not touch.
  - PNG originals and orphan `06-mot-prep.png` remain on disk for a future dedicated asset-hygiene lane.

---

## 2026-05-19

**Lane 0 — Site / Card Hover Rhythm**
- Phase 3 (Services) card hover rhythm completed and pushed (commits `ca98712`, `5574f6f`).
- Phase 4 (Homepage) card hover rhythm completed and pushed (commit `b02706d`).
- Tailwind-owned border states pattern locked in (see [EXECUTION_PATTERNS.md](EXECUTION_PATTERNS.md) — Tailwind card-hover rule).

**Lane 0 — Account**
- User upgraded Claude to Max 5x.

**Lane 0 — Workflow**
- New parallel-lane workflow chosen:
  - **Lane 1:** Live Site Truth / Deployment Integrity audit (separate session).
  - **Lane 2:** Workflow Spine / Issue Register docs-only worktree (this session).
- Lane 2 worktree created: `/Users/shanestokes/Desktop/torq-docs-spine` on branch `docs/site-execution-patterns` from `origin/master`.

**Lane 2 — Docs Spine**
- Created: `DAILY_LOG.md`, `ISSUE_REGISTER.md`, `DECISIONS.md`, `QUALITY_CONTROL.md`, `EXECUTION_PATTERNS.md`.
- HANDOVER.md left untouched (existing file, not required for spine).
- No website source files changed. No commit. No deploy.

**Open live-site concerns logged**
- See [ISSUE_REGISTER.md](ISSUE_REGISTER.md):
  - ISSUE 1 — Phase 3/4 card hover effect may not be live.
  - ISSUE 2 — John's van registration plate may still be visible live (privacy critical).
  - ISSUE 3 — Recent Work image green edge bleed.
  - ISSUE 4 — Mike's list pending.
  - ISSUE 5 — Workflow instructions currently too repetitive (this spine addresses it).

**Lane 1 — Deployment Integrity Restored**
- Production manually deployed to Netlify at deploy ID `6a0ce6363e1c1b0d663aa533`.
- Live hover-token verification passed: homepage 28/28, services 15/15.
- `job-9.jpeg` plate-redacted asset remains live and md5 matches local.
- Local repo remains clean at `b02706d`.
- Remaining open issue: Recent Work green edge bleed, now treated as separate asset-quality investigation, not deployment drift.

**Lane 2 — Workflow Spine Endpoint Reached**
- Spine commit `ee72da6` ("docs: add workflow spine and handover pointer") opened as PR #1 against `master`.
- PR #1 reviewed (6 files, +369 / −0, MERGEABLE) and merged via `gh pr merge 1 --merge` → merge commit `5268bb4`.
- `gh pr merge --delete-branch` failed local cleanup because `master` was checked out in the main worktree at the time. Remote branch deletion was a side-effect skip, not a true failure.
- Manual cleanup completed: `git push origin --delete docs/site-execution-patterns`, `git worktree remove /Users/shanestokes/Desktop/torq-docs-spine`, `git branch -d docs/site-execution-patterns`.
- Main worktree fast-forwarded `b02706d..5268bb4`; working tree clean, in sync with `origin/master`.
- Final state — five spine docs (`DAILY_LOG.md`, `ISSUE_REGISTER.md`, `DECISIONS.md`, `QUALITY_CONTROL.md`, `EXECUTION_PATTERNS.md`) + `HANDOVER.md` pointer block now live on `master` in the main worktree and on GitHub.
- Closes [ISSUE 5](ISSUE_REGISTER.md) — Workflow instructions too repetitive.
- New entry recorded in [DECISIONS.md](DECISIONS.md) covering the `gh pr merge --delete-branch` caveat for future sessions.
- No deploy, no Netlify command, no website source touched in Lane 2.

**Lane 2 — Stale local branches (flagged, not touched)**
- The following local branches remain after Lane 2 cleanup and may be candidates for separate review:
  - `docs/elite-claude-execution-protocol`
  - `fix/services-mobile-affordance-breakpoint`
  - `polish/homepage-card-hover-rhythm`
  - `polish/services-card-hover-rhythm`
  - `polish/services-top-fold-spacing`
- Out of Lane 2 scope. No action taken.

---

## Log Format Going Forward

```
## YYYY-MM-DD

**Lane N — Topic**
- Action taken (file, commit, deploy).
- Outcome (verified / pending / blocked).
- Follow-up (link to ISSUE_REGISTER.md entry if open).
```

Do not delete past entries. Append only.
