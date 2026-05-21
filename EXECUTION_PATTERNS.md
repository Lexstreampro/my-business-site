# TorQ Cymru — Execution Patterns

The permanent operating spine. Future Claude/ChatGPT/Gemini sessions read this first so the workflow does not need to be re-explained every time.

If a rule below conflicts with an ad-hoc instruction, surface the conflict — do not silently override the rule.

---

## Core Operating Rules

1. **One branch, one task, one result, one decision.**
2. **Main worktree** `/Users/shanestokes/Desktop/my-business-site` is the **clean master/deploy source**. Treat it as production-adjacent.
3. **No production deploy** unless Shane explicitly says **"deploy production now"**.
4. **Preview deploy before production** for any visual change.
5. **Audit before patch.** Read the current file/state before editing. Do not patch from memory.
6. **Stop before commit** unless commit is explicitly approved.
7. **Merge / push only after review.** No silent merges to master.
8. **Every meaningful action gets logged** in [DAILY_LOG.md](DAILY_LOG.md).
9. **Claude implements only in its assigned worktree/branch.** Do not reach across lanes.
10. **Gemini is read-only audit** unless explicitly promoted to implement.
11. **ChatGPT is workflow controller**, strategic reviewer, and decision layer.
12. **No two code-changing agents work on the same branch/worktree.** One writer per branch.
13. **Tailwind card-hover rule:**
    - Tailwind must own **both** resting and hover border states.
    - Correct pattern:
      ```
      border border-white/5 hover:border-tc-red/30 transition-all duration-300
      ```
    - Do **not** leave inline `border-color` on hover cards — inline specificity blocks Tailwind hover.
    - Do **not** use `!important` unless explicitly approved.
14. **Screenshot artefacts must not be committed.** Keep them out of `git status`; add to `.gitignore` if a screenshot pipeline drops files into the repo.
15. **Parked workstreams** — do not touch unless explicitly activated:
    - Work gallery
    - Hero visuals
    - App UI/UX
    - Messaging integrations
    - MOT wording investigation

---

## Lane Map

| Lane   | Worktree                                              | Branch                          | Role                                            |
|--------|-------------------------------------------------------|---------------------------------|-------------------------------------------------|
| Lane 0 | `/Users/shanestokes/Desktop/my-business-site`         | `master`                        | Clean deploy source. Manual Netlify deploys.    |
| Lane 1 | (separate session)                                    | read-only audit                 | Live Site Truth / Deployment Integrity audit.   |
| Lane 2 | `/Users/shanestokes/Desktop/torq-docs-spine`          | `docs/site-execution-patterns`  | Docs-only spine (this directory).               |

Other worktrees may exist (e.g. Gemini audit, stash, visual sprint). Do not enter them unless that lane is yours.

---

## Agent Role Boundaries

- **Claude** — Implements in assigned worktree only. Stops before commit. Surfaces conflicts with rules above instead of silently overriding.
- **Gemini** — Read-only audit. Generates findings; does not write code unless Shane explicitly promotes it for a task.
- **ChatGPT** — Workflow controller. Decides scope, sequences lanes, reviews output, approves deploys.

---

## Deploy Mechanics (Quick Reference)

- `my-business-site` website → **Manual** Netlify deploy: `netlify deploy --prod` from main worktree. `git push` does NOT deploy.
- TorQ portal (separate repo, `~/Desktop/torq-repo`) → CI auto-deploys to Firebase.
- This spine repo / branch (`docs/site-execution-patterns`) → never deploys. Docs only.

See user memory for full deploy directory.

---

## Privacy-Sensitive Image Workflow

For any image that may expose a registration plate, address, private person, or other sensitive detail:

1. Audit first: identify the exact asset, page reference, crop CSS, and affected breakpoints.
2. Create a sibling review candidate instead of overwriting the live asset.
3. Use review sheets and viewport previews before swapping any live reference.
4. Prefer a natural crop/reframe or clean gallery-ready replacement over obvious blur boxes.
5. Use an additive final filename, then change one explicit reference.
6. Keep the original asset unless Shane approves removal.
7. Commit only the final asset/reference swap after review.
8. Push only after approval; deploy only after explicit deploy approval.
9. Verify live with cache-busted HTML, direct asset checks, and 390px / 768px / 1440px screenshots.
10. Log the issue, fix route, deploy ID, and reusable lesson.

This pattern came from the `job-9-gallery-safe.jpeg` workflow and should become the default for privacy-sensitive website imagery.

---

## Cold-Start Brief for a New Session

A future session can boot from these five docs alone:

1. **[EXECUTION_PATTERNS.md](EXECUTION_PATTERNS.md)** (this file) — the rules.
2. **[DECISIONS.md](DECISIONS.md)** — why the rules exist and what has been chosen.
3. **[ISSUE_REGISTER.md](ISSUE_REGISTER.md)** — what is open right now.
4. **[DAILY_LOG.md](DAILY_LOG.md)** — what happened recently.
5. **[QUALITY_CONTROL.md](QUALITY_CONTROL.md)** — the gates before commit / preview / production.

Read those, then ask Shane for the specific task. Do not re-derive the workflow from prompts.

---

## Definition of "Meaningful Action" (worth logging)

- Any commit, push, merge, deploy, or Netlify command.
- Any worktree create / remove.
- Any file rename, image swap, or content change visible to users.
- Opening, closing, or changing the priority of an issue in [ISSUE_REGISTER.md](ISSUE_REGISTER.md).
- Any decision that future sessions will need to know about → also write it into [DECISIONS.md](DECISIONS.md).

Trivial actions (linting, formatting, re-reading a file) do not need a log entry.
