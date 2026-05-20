# TORQ Cymru — Next Session Handover

**Written:** 2026-05-20 (end of session)
**For:** the next Claude Code / operator session
**Read this first.** Then read the workflow spine: [EXECUTION_PATTERNS.md](EXECUTION_PATTERNS.md) → [DECISIONS.md](DECISIONS.md) → [ISSUE_REGISTER.md](ISSUE_REGISTER.md) → [DAILY_LOG.md](DAILY_LOG.md) → [QUALITY_CONTROL.md](QUALITY_CONTROL.md). The large legacy `HANDOVER.md` is historical context only.

---

## 1. Current source truth

- **Repo:** `/Users/shanestokes/Desktop/my-business-site`
- **Branch:** `master`
- **Master tip:** `e43db20` — *docs: close lane 1 (deploy fix, plate verified, green-edge resolved)*
- **Sync state:** `master == origin/master`. Working tree clean at closeout.
- **Recent commits (top 5):**
  - `e43db20` docs: close lane 1 (deploy fix, plate verified, green-edge resolved)
  - `4679b08` fix(work): remove green edge artefacts from recent work images
  - `d93e894` docs: log lane closure and deployment integrity
  - `5268bb4` Merge PR #1 (workflow spine)
  - `ee72da6` docs: add workflow spine and handover pointer

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

- **Resolve `docs/elite-claude-execution-protocol`** (Lane 2C). Branch has 1 unmerged commit, 1,043 lines across three docs. Options: merge to master, move file(s) to `~/.claude/rules/`, or discard. Decide before deleting.
- **Branch hygiene cleanup** (Lane 2B continuation). Four LOW-risk merged branches are safe to delete locally — see §8.
- **Remote branch hygiene pass** (Lane 2D, new). Five `origin/*` branches exist with no local tracking and unknown status — see §8.
- **Spine doc polish.** Tighten [EXECUTION_PATTERNS.md](EXECUTION_PATTERNS.md) and [QUALITY_CONTROL.md](QUALITY_CONTROL.md) based on this session's learnings (manual deploy rule, cache warning).

Do **not** start new website improvement work without an explicit Lane 1 brief.

## 8. Parked hygiene tasks (read-only; do nothing without approval)

### 8a. Local merged branches — safe to delete later

All four have zero unique commits vs master:

- `fix/services-mobile-affordance-breakpoint` (`9028fa6`)
- `polish/homepage-card-hover-rhythm` (`b02706d`)
- `polish/services-card-hover-rhythm` (`5574f6f`)
- `polish/services-top-fold-spacing` (`6da2d99`)

Proposed (not yet approved):

```bash
git branch -d fix/services-mobile-affordance-breakpoint
git branch -d polish/homepage-card-hover-rhythm
git branch -d polish/services-card-hover-rhythm
git branch -d polish/services-top-fold-spacing
```

### 8b. Local branch with unmerged work — decide first

- `docs/elite-claude-execution-protocol` (`7eeaad2`) — 1 commit, 1,043 lines, three docs. **Inspect, then decide. Do not delete blind.**

### 8c. Other worktree — do not touch

- `audit/gemini-live-site-review` (`8e005be`) checked out at `/Users/shanestokes/Desktop/torq-gemini-audit`. Separate audit context. Leave alone.

### 8d. Remote branches without local tracking — out of scope until briefed

- `origin/contact/footer-seo-schema`
- `origin/fix/privacy-job-9-plate`
- `origin/visual/higgsfield-asset-sprint`
- `origin/visual/services-component-foundation`
- `origin/visual/services-density-pass`

A future Lane 2D should classify these. Do not delete, fetch-and-checkout, or merge any of them without explicit brief.

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
- `master == origin/master`, tip = `e43db20` (or further if work has happened since this handover was written).
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
