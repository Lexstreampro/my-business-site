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

## Adding New Decisions

Append below with date heading. Never edit or remove past decisions — supersede them with a new entry that references the old one ("Supersedes 2026-05-19 — Adopt …").
