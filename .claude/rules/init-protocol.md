# When to Run /init

`/init` is a codebase analysis tool that updates the root CLAUDE.md with current architecture and commands. Run it **when required and beneficial** — not every session.

## When to Run /init (Required)

**1. After major codebase changes**
- Added new file types (services.html, styles.css, script.js)
- Changed tech stack (added a build tool, framework, or library)
- Restructured file organization significantly
- Added new external dependencies

**2. After architectural shifts**
- Changed from single-file to multi-file structure
- Added a new major system (e.g., form backend, API integration)
- Changed deployment process or hosting
- Added new development workflow steps

## When to Run /init (Beneficial)

**1. After reviewing the session log**
- Noticed Claude made repeated architecture questions
- Need to document new patterns that emerged
- Existing CLAUDE.md is out of sync with current code

**2. Quarterly maintenance**
- Treat CLAUDE.md as living code, same as regular code review
- Every 3 months, run `/init` to ensure documentation matches reality
- Catch drift early before it causes problems

## When NOT to Run /init

- Small edits (copy changes, colour tweaks, spacing adjustments)
- Bug fixes (doesn't change architecture)
- Adding content or sections (doesn't change structure)
- Token optimization or cosmetic refactors

## /init Workflow

1. Identify the change (see "When to Run" above)
2. Run `/init` — it analyzes the codebase
3. Review the suggestions
4. Approve or modify the updated CLAUDE.md
5. Commit the updated CLAUDE.md to git
6. Session continues with fresh context

## Important

- `/init` does NOT delete or overwrite other sections — it only improves the codebase architecture + commands sections
- The Design System, Brand Voice, and Acceptance Criteria sections are stable and rarely change — `/init` won't touch them
- If you disagree with `/init`'s suggestions, edit manually. CLAUDE.md is your document.
