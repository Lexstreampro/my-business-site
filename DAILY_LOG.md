# TorQ Cymru — Daily Log

Append-only chronological record of meaningful actions. Newest entries at the top.

Each entry: date, lane, action, outcome, follow-ups.

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
