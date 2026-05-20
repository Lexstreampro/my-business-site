# TORQ Cymru — Next Session Handover

**Written:** 2026-05-20 (end of session)
**For:** the next Claude Code / operator session
**Read this first.** Then read the workflow spine: [EXECUTION_PATTERNS.md](EXECUTION_PATTERNS.md) → [DECISIONS.md](DECISIONS.md) → [ISSUE_REGISTER.md](ISSUE_REGISTER.md) → [DAILY_LOG.md](DAILY_LOG.md) → [QUALITY_CONTROL.md](QUALITY_CONTROL.md). The large legacy `HANDOVER.md` is historical context only.

---

## 1. Current source truth

- **Repo:** `/Users/shanestokes/Desktop/my-business-site`
- **Branch:** `master`
- **Master tip:** `50309ea` — *docs: add TorQ Claude execution protocol*
- **Sync state:** `master == origin/master`. Working tree clean.
- **Recent commits (top 5):**
  - `50309ea` docs: add TorQ Claude execution protocol
  - `d1f3434` docs: add next-session handover with operator/lane rules
  - `e43db20` docs: close lane 1 (deploy fix, plate verified, green-edge resolved)
  - `4679b08` fix(work): remove green edge artefacts from recent work images
  - `d93e894` docs: log lane closure and deployment integrity

## 2. Current live truth

- **Production URL:** https://torqcymru.co.uk
- **Netlify deploy ID:** `6a0cf01a36fd6735753eaab7`
- **Unique deploy URL:** https://6a0cf01a36fd6735753eaab7--eloquent-gelato-d5fe9a.netlify.app
- Live matches source as of this closeout. No drift known.

## 3. Closed Lane 1 work (do not reopen)

The following were investigated, fixed, deployed, and verified live in this session:

1. **Phase 3 / Phase 4 card hover effect** — live on services and homepage.
2. **Recent Work green-edge bleed** — resolved on `job-1.jpeg`, `job-3.jpeg`, `job-4.jpeg`, `job-5.jpeg` (commit `4679b08`); live.
3. **John's van registration plate (`job-9.jpeg`)** — verified unchanged and safe. No further patching needed.
4. **Deploy integrity** — manual Netlify deploy confirmed live state matches master.

Lane 1 is **closed**.

## 4. What must not be reopened without new evidence

Do not re-investigate, re-patch, or "double-check" any of the items in §3 unless the next session brings **fresh, specific evidence** (a new screenshot, a new URL, a new user report, a new diff). General unease, browser-cache-induced doubt, or vague "looks off to me" feelings are **not evidence**.

If you suspect a regression, the required sequence is:

1. Reproduce in a clean cache (see §6).
2. Capture a specific, dated screenshot at a known viewport width.
3. Log the evidence in [ISSUE_REGISTER.md](ISSUE_REGISTER.md) before any code action.

## 5. Manual deploy rule

**This repo does NOT auto-deploy from GitHub.** A `git push` to `origin/master` will not appear on the live site.

After any approved change to master, deploy manually:

```bash
cd /Users/shanestokes/Desktop/my-business-site
netlify deploy --prod
```

Confirm the new deploy ID and verify in incognito before declaring done. Update [DAILY_LOG.md](DAILY_LOG.md) with the new deploy ID.

## 6. Cache warning (read before doubting live state)

`/assets/*` is served with long, immutable cache headers. A normal Chrome window will keep showing old images/CSS/JS for a long time after a successful deploy. Before concluding production is wrong:

1. Open the URL in **Incognito** (`Cmd+Shift+N`), or
2. **Cmd+Shift+R** to hard-reload, or
3. DevTools → Network → **Disable cache** + **Empty Cache and Hard Reload**.

If any of those show the correct asset, production is fine and your default window is stale.

## 7. Next recommended safe work

Pick from this list when starting fresh. None of these touch closed Lane 1 work.

- **Spine doc polish.** Tighten [EXECUTION_PATTERNS.md](EXECUTION_PATTERNS.md) and [QUALITY_CONTROL.md](QUALITY_CONTROL.md) with the manual deploy rule (§5) and cache warning (§6) so they live in the spine, not only here.
- **Higgsfield hero decision.** `origin/visual/higgsfield-asset-sprint` is intentionally preserved pending Shane's push/merge/prod-deploy approval (see §8b). When ready, open a dedicated Lane 1 thread — do not act on it from a docs lane.
- **Lane 1 website improvement** with an explicit brief (e.g. real phone number swap for `tel:+441234567890`). Requires the user to provide the data before a Lane 1 thread can run.

Do **not** start new website improvement work without an explicit Lane 1 brief. Previous branch-hygiene items (Lane 2B local merges, Lane 2C elite-protocol branch, Lane 2D remote orphans) are complete — see §8.

## 8. Branch & worktree state (verified post-cleanup)

Branch hygiene is **complete**. Current verified state:

### 8a. Worktrees

- Only the main repo at `/Users/shanestokes/Desktop/my-business-site` (on `master`). No auxiliary worktrees remain.

### 8b. Preserved remote branch — Higgsfield hero, awaiting decision

- `origin/visual/higgsfield-asset-sprint` is intentionally retained pending Shane's push / merge / prod-deploy approval for the Seedream hero + T0RQ 2026 plate asset. **Do not delete, fetch-and-checkout, or merge** without an explicit Lane 1 Higgsfield brief.

### 8c. Completed cleanups (recorded for trace, no action remaining)

- **Lane 1 (Gemini audit closeout):** worktree `/Users/shanestokes/Desktop/torq-gemini-audit` removed; local branch `audit/gemini-live-site-review` deleted. The branch was fully contained in `master` at closeout.
- **Lane 2B (local merged branches):** `fix/services-mobile-affordance-breakpoint`, `polish/homepage-card-hover-rhythm`, `polish/services-card-hover-rhythm`, `polish/services-top-fold-spacing`, `fix/recent-work-green-edge-assets` — all deleted, both local and (where applicable) remote.
- **Lane 2C (`docs/elite-claude-execution-protocol`):** resolved; content landed on master as `50309ea` ("docs: add TorQ Claude execution protocol"); local + remote branch gone.
- **Lane 2D (remote orphans):** `origin/contact/footer-seo-schema`, `origin/fix/privacy-job-9-plate`, `origin/visual/services-component-foundation`, `origin/visual/services-density-pass` — all deleted.

Net remaining: `master` (local) and `origin/master` + `origin/visual/higgsfield-asset-sprint` (remote). Nothing else.

## 9. First command for next session

```bash
cd /Users/shanestokes/Desktop/my-business-site
git status -sb
git branch --show-current
git log --oneline -5
git fetch --all --prune
git status -sb
```

Confirm:

- Branch is `master`.
- Working tree is clean.
- `master == origin/master`, tip = `50309ea` (or further if work has happened since this handover was last polished).
- No surprise changes appeared during the gap between sessions.

Then read this file, the spine docs (top of this file), and proceed only with a clearly stated lane and task.

## 10. Operator and Lane Rules

These rules govern every TorQ Cymru session from this point forward. They are non-negotiable and apply before any other workflow step.

- **Operator + Lane header is mandatory.** Every future TorQ Cymru response or instruction must start with the operator (e.g. *Operator: Claude — Lane 2 Docs / Workflow Executor*) and the lane it is operating in. No exceptions.
- **Lane 2 must never relabel itself as Lane 1.** A docs / workflow thread cannot silently promote itself into a live-site or deployment thread.
- **Lane 2 may prepare handoff instructions for Lane 1, but must not act as Lane 1 inside a Lane 2 thread.** Documentation, planning, and lane preparation are in scope; source edits, asset edits, deploys, merges, pushes, and branch/worktree mutations are not.
- **Pre-action declaration.** Before any repo instruction is acted on, the operator must state, in order: the lane, the allowed scope, the forbidden scope, and the stop condition. If those four are not present, do not proceed.
- **Cross-lane requests trigger a stop and handoff.** If a requested action belongs to another lane (e.g. a Lane 1 deploy fix appears mid-Lane 2 docs work), stop immediately and produce a handoff brief for the correct lane. Do not "just quickly" cross lanes.

These rules exist to preserve closeout truth between sessions. Mixing lanes is how verified state gets corrupted.

## 11. Session closeout note (2026-05-20)

- Lane 1 closed: hover effects live, green-edge bleed fixed and deployed, plate confirmed safe, deploy integrity verified.
- Lane 2A complete: workflow spine docs landed on master (commit `5268bb4`).
- Lane 2B paused mid-session: Branch Hygiene Register produced and accepted; no branches deleted because the working tree was holding Lane 1 WIP at that point. WIP since committed and merged; cleanup now safe but still requires explicit approval — see §8a.
- Lane 2B-handover (this file): created.
- No deploys, merges, branch deletions, or website-source edits made in this docs-only step.
- Next session: start clean from §9.
