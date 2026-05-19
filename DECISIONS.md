# TorQ Cymru — Decisions Log

Architectural and operating decisions. One decision per entry. Append only.

Format:
- **Date / Decision** — one sentence.
- **Context** — what prompted it.
- **Choice** — what was chosen and what was rejected.
- **Consequence** — what changes because of this.

---

## 2026-05-19 — Adopt parallel-lane workflow (Lane 1 / Lane 2)

- **Context:** Single-thread sessions were burning tokens re-explaining workflow each time, and live-site investigation kept colliding with patch work.
- **Choice:** Split work into named lanes running in parallel worktrees:
  - **Lane 1:** Live Site Truth / Deployment Integrity audit (read-only against production + main).
  - **Lane 2:** Workflow Spine / Issue Register (docs-only worktree).
  - **Lane 0** (implicit): the main worktree at `/Users/shanestokes/Desktop/my-business-site`, the clean master/deploy source.
- **Consequence:** No two code-changing agents work on the same branch or worktree. Each lane has a defined output. Docs spine becomes the cold-start brief for future Claude/ChatGPT/Gemini sessions.

---

## 2026-05-19 — Docs spine lives on `docs/site-execution-patterns` branch

- **Context:** Need a durable place for execution patterns, issue register, daily log without polluting `master` or risking the deploy source.
- **Choice:** Separate worktree at `/Users/shanestokes/Desktop/torq-docs-spine` on branch `docs/site-execution-patterns` from `origin/master`. Docs-only. No website source edits permitted on this branch.
- **Consequence:** Docs evolve independently of site code. Merges into master are deliberate, not accidental. Site deploys are unaffected.

---

## 2026-05-19 — Tailwind owns both resting and hover border states on cards

- **Context:** Earlier patches mixed inline `style="border-color: ..."` with Tailwind hover utilities, breaking hover due to specificity. Result: premium red border was authored but not visible.
- **Choice:** Tailwind classes own both resting and hover border states. Canonical pattern:
  ```
  border border-white/5 hover:border-tc-red/30 transition-all duration-300
  ```
  No inline `border-color`. No `!important` unless explicitly approved.
- **Consequence:** Card hover effects are predictable and survive minification. Any future card patch must follow this pattern (see [EXECUTION_PATTERNS.md](EXECUTION_PATTERNS.md) rule 13).

---

## 2026-05-19 — Agent role boundaries

- **Context:** Multiple AI tools (Claude, Gemini, ChatGPT) need clear non-overlapping roles to avoid duplicate work and merge conflicts.
- **Choice:**
  - **Claude** — implements only in its assigned worktree/branch.
  - **Gemini** — read-only audit unless explicitly promoted.
  - **ChatGPT** — workflow controller, strategic reviewer, decision layer.
- **Consequence:** Only one agent writes per branch at a time. Audits remain audits unless Shane promotes them. ChatGPT decides; Claude executes; Gemini verifies.

---

## 2026-05-19 — Spine merged to `master` via true-merge commit, not squash

- **Context:** Lane 2 needed to land six docs (five new + HANDOVER pointer) on `master` while preserving the spine commit's identity for future audit/git-blame.
- **Choice:** `gh pr merge 1 --merge` (true merge commit `5268bb4` with parents `b02706d` + `ee72da6`). Rejected `--squash` (would have collapsed the spine commit's SHA, breaking the `ee72da6` reference in [DAILY_LOG.md](DAILY_LOG.md) and [ISSUE_REGISTER.md](ISSUE_REGISTER.md)) and `--rebase` (no value for a single-commit docs PR).
- **Consequence:** `ee72da6` remains a first-class commit on `master`. Future docs PRs that contain a single semantic commit should use `--merge`; multi-commit cleanup PRs may use `--squash` if the individual SHAs are not referenced elsewhere.

---

## 2026-05-19 — `gh pr merge --delete-branch` caveat with multiple worktrees

- **Context:** Running `gh pr merge 1 --merge --delete-branch` from inside the docs worktree failed with `fatal: 'master' is already used by worktree at '/Users/shanestokes/Desktop/my-business-site'`. The remote merge succeeded; the branch-deletion side-effect did not. Remote branch was also left in place.
- **Choice:** Document the limitation and use a two-step cleanup when multiple worktrees exist:
  1. Merge from any worktree: `gh pr merge <N> --merge` (no `--delete-branch`).
  2. Delete remote: `git push origin --delete <branch>`.
  3. Delete local branch + worktree from the **main** worktree (the one holding `master`): `git worktree remove <path>` then `git branch -d <branch>`.
- **Consequence:** Avoids a partial-cleanup state where the PR is merged but the branch lingers on the remote. Update the same playbook into any future deploy/merge runbook. Rejected: switching the docs worktree to a temp branch first — adds steps for no benefit when the two-step cleanup is faster.

---

## 2026-05-19 — Lane 2 closed; spine is the canonical operating brief

- **Context:** Spine merged, cleanup complete, no remaining Lane 2 work items. Need to make it unambiguous that future sessions read the spine rather than ad-hoc instructions.
- **Choice:** Lane 2 is **closed** as of 2026-05-19. The five spine files + HANDOVER pointer are the canonical cold-start brief. Any new "how the workflow works" question is answered by amending [EXECUTION_PATTERNS.md](EXECUTION_PATTERNS.md), not by long prompts. Re-opening Lane 2 requires an explicit controller decision and a new branch.
- **Consequence:** Future sessions boot from the spine in seconds. Repetitive workflow prompts are no longer required. [ISSUE 5](ISSUE_REGISTER.md) closed.

---

## 2026-05-20 — Lossless `jpegtran` crop is the canonical fix for JPEG edge artefacts

- **Context:** Four Recent Work source JPEGs had baked-in green/magenta chroma-tear columns at the right edge (Apr 29 batch). First repair pass used PIL re-encode (`quality=82`, `subsampling=4:2:0`) — produced files 2.3× original size (+1.28 MB total page weight) because PIL/libjpeg-turbo can't match the original `mozjpeg`-style compression. Controller rejected. Second pass used `jpegtran` lossless DCT-domain crop, which keeps the original DCT coefficients of the retained region untouched and only rewrites the JPEG container.
- **Choice:** Canonical command for JPEG edge fixes on this site:
  ```
  jpegtran -copy none -optimize -progressive -crop WxH+0+0 -outfile <out> <in>
  ```
  - `-copy none` strips ICC + EXIF; browsers default to sRGB which matches all current source images. Required to keep file growth at ~+25% instead of ~+80% with `-copy all`.
  - `-optimize -progressive` rebuilds the Huffman table for smaller output.
  - Crop X/Y must be MCU-aligned on the top/left (multiples of 16 for 4:2:0 JPEGs); right/bottom can be arbitrary. Using `+0+0` always satisfies the constraint when removing right/bottom only.
  - Verify removal with edge-pixel G/R ratio: should sit near 1.0 (`(R, G, B)` mean of rightmost 3px column).
- **Consequence:** No lossy re-encoding on top of already-lossy source. File growth bounded to ~+25% per image. Rejected: PIL re-encode (lossy, much larger files), `-copy all` (preserves ICC but +80% size; not needed when source is already sRGB), installing `mozjpeg` (extra dependency without controller approval).

---

## 2026-05-20 — Cross-lane stash-to-master workflow when working tree carries another lane's docs

- **Context:** Lane 2 closure docs (DAILY_LOG.md, DECISIONS.md, ISSUE_REGISTER.md) appeared in the working tree of the Lane 1 fix branch because Lane 1 was the checked-out branch when Lane 2 finished. Mixing them into the Lane 1 image-only commit would have re-blended what the controller had explicitly separated.
- **Choice:** Documented separation procedure:
  1. From the contaminated branch, stash *only the foreign-lane paths* explicitly: `git stash push -m "<reason>" -- <path1> <path2> ...`.
  2. `git checkout master && git pull --ff-only origin master`.
  3. `git stash pop` (will apply unstaged onto master).
  4. Stage only the foreign-lane paths, commit with a clear `docs:` prefix, push.
  5. Return to the original feature branch: `git checkout <feature-branch>`.
  6. Rebase the feature branch onto the new master tip and `git push --force-with-lease`.
- **Consequence:** Each commit on master carries exactly one lane's intent. PR diffs stay minimal and reviewable. Rejected: amending the foreign-lane docs into the Lane 1 commit (re-mixes lanes), creating a separate PR branch for the docs (overkill for a docs-only commit that has no review surface), or asking the user to manually relocate the edits.

---

## Adding New Decisions

Append below with date heading. Never edit or remove past decisions — supersede them with a new entry that references the old one ("Supersedes 2026-05-19 — Adopt …").
