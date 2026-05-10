# TORQ Cymru — Master System Map

**Status:** LOCKED  
**Last Updated:** 2026-05-10  
**Scope:** All three systems (app, website, production)

---

## READ THIS FIRST — Every Session

This document is the **single source of truth** for all TORQ Cymru projects. Before starting ANY work:

1. Read this file (2 min)
2. Identify which system you're working on
3. Read that system's CLAUDE.md (5 min)
4. Execute only that system's tasks
5. Commit & push at end of session

**Non-negotiable.** This prevents context confusion and lost work.

---

## The Three Systems at a Glance

| System | Location | Purpose | Tech Stack | Git Status |
|--------|----------|---------|-----------|-----------|
| **Website** | `/Users/shanestokes/Desktop/my-business-site/` | Marketing site + booking form UI | Static HTML + Tailwind CDN | Committed (no remote) |
| **App** | `/Users/shanestokes/Desktop/torq-app/` | Customer portal + employee dashboard | Next.js 15 + Prisma + Auth.js | **NEW: Initialized Session 6** |
| **Production** | `/Users/shanestokes/Desktop/torq-repo/` | Live system (reference only) | Vanilla JS + Firebase | Committed + pushed to GitHub |

---

## System 1: Website (`my-business-site/`)

**What it is:** Customer-facing marketing site + booking form  
**Status:** Homepage complete, services.html pending  
**When to work on it:** Copy, design, booking form, mobile QA

### Key Files
```
index.html          # Full homepage (939 lines, Session 3 complete)
services.html       # Services detail (not yet built)
assets/
  ├── logo.jpeg
  ├── services/     # 7 service images (MOT prep, brakes, etc.)
  └── work/         # Job photos (1-9)
CLAUDE.md          # Project overview
HANDOVER.md        # Session spec + decisions
.claude/rules/     # Governance (screenshot verification, quality standards, etc.)
netlify.toml       # Deployment config
```

### Critical Rules (Locked)
- **Screenshot verification:** Every visual change verified at 390px/768px/1440px before marking done
- **Quality standard:** Images ≥100KB, no placeholder text, Lighthouse ≥85
- **Design tokens:** Search + verify exact hex codes (`#C1121F`, `#111111`, `#1C1C1C`, etc.)
- **Mobile-first:** Test 390px viewport first, always
- **Brand voice:** Calm authority, no discount language, no "mate" / "best prices"

### Session Protocol (Website)
```
1. cd /Users/shanestokes/Desktop/my-business-site
2. git status (check for uncommitted changes)
3. Read HANDOVER.md (current spec)
4. Read CLAUDE.md (design system)
5. Execute the task
6. Screenshot verify (390px/768px/1440px)
7. git add -A && git commit -m "..."
8. Update HANDOVER.md with session notes
9. Done (no need to push — local OK for now)
```

### Known Issues
- services.html: not yet built
- Booking form: styled but not wired to backend
- Phone number: still placeholder `tel:+441234567890` (needs real number)

### Next Priority
Build services.html using the locked image mapping in `.claude/rules/services-image-mapping-LOCKED.md`

---

## System 2: App (`torq-app/`)

**What it is:** Customer portal + employee dashboard (Next.js + database)  
**Status:** Customer booking slice complete (Session 2)  
**When to work on it:** Backend, API, authentication, dashboard features  

### Key Files
```
app/
  ├── layout.tsx          # Root layout, fonts, dark theme
  ├── page.tsx            # Landing
  ├── book/               # Booking form
  ├── quote/[id]/         # Quote view + confirm
  ├── api/quotes/         # Quote creation API
  ├── api/auth/[...nextauth]/  # Auth.js endpoints
  └── api/pdf/            # Placeholder for PDF export
lib/
  ├── db.ts               # Prisma singleton
  ├── quote-url.ts        # HMAC signing (30-day TTL)
  ├── coverage.ts         # Postcode check
  ├── email.ts            # Nodemailer
  ├── rate-limit.ts       # In-memory MVP (replace with Upstash)
  └── zod-schemas.ts      # Booking validation
prisma/
  ├── schema.prisma       # 12 models, 5 enums
  └── migrations/         # Neon DB initialized
.env.local          # DATABASE_URL + config (NOT committed)
package.json        # Next.js 15 + Prisma + Auth.js
HANDOVER_SESSION_5.md    # Full context + priorities
CLAUDE.md           # Project overview
.claude/rules/      # Rules (model selection, vertical slices, etc.)
```

### Critical Rules (Locked)
- **Vertical slices only:** Build one feature end-to-end (booking → quote → confirm → PDF), not horizontal layers
- **Model selection:** Sonnet for building, Opus for design precision, Haiku for research
- **Type safety:** `tsc --noEmit` must pass before committing
- **Linting:** `npm run lint` must pass before committing
- **No hardcoded secrets:** Use .env.local only
- **Git tracking:** Everything in `.next/` and `.env.local` ignored (DO NOT COMMIT)

### Session Protocol (App)
```
1. cd /Users/shanestokes/Desktop/torq-app
2. git status (should be clean or show work-in-progress)
3. Read HANDOVER_SESSION_5.md (full context)
4. Read CLAUDE.md (project overview)
5. npm run dev (start dev server locally)
6. Execute the slice (one feature complete)
7. npm run lint && tsc --noEmit (verify no errors)
8. Test locally: smoke-test the feature (form → submit → DB → confirm)
9. git add <specific-files> && git commit -m "..."
10. git log --oneline (verify commit is there)
11. Done (optional: git push if remote configured)
```

### Known Issues
- Labour lookup: stale data (Session 4 research pending)
- Rate limiter: in-memory MVP, needs Upstash before production
- Employee features: missing (time tracking, job dispatch, inspections)
- Admin area: missing
- PDF export: not implemented
- Tests: none yet (Vitest + Playwright pending)

### Next Priority
Quote PDF export (Slice 2) — install @react-pdf/renderer, build `/api/pdf/quote/[id]`

---

## System 3: Production (`torq-repo/`)

**What it is:** Live production system (reference only, do NOT modify without explicit task)  
**Status:** Running in production (Vanilla JS + Firebase)  
**When to work on it:** Only when explicitly asked, and with extreme caution

### Key Files
```
index.html              # Master app (4,574 lines, Vanilla JS + Firebase)
portal.html             # Customer portal (2,955 lines)
book.html               # Public landing page
app-*.js                # 12 modules (core, jobs, settings, finance, etc.)
database.rules.json     # Firebase security rules
firebase.json           # Firebase config
manifest.json / portal-manifest.json   # PWA manifests
```

### Critical Rules (Locked)
- **Read-only by default:** This is production. Do not touch unless explicitly asked.
- **Backup before changes:** If changes required, create a backup branch first (`git checkout -b backup/YYYYMMDD`)
- **Testing required:** Any changes must be tested against Neon DB before deploying
- **Code review:** Any production changes require explicit user sign-off

### When to Use This
- Reference architecture (how does authentication work?)
- Migrating features from vanilla JS to Next.js
- Debugging live issues
- Compliance/security audits

### Session Protocol (Production — Rare)
```
If you touch this:
1. STOP and ask user first
2. Create backup branch: git checkout -b backup/YYYYMMDD
3. Make minimal changes
4. Test thoroughly
5. Submit for review before pushing
6. Never force-push to main
```

---

## Session Starting Checklist (MANDATORY)

Before EVERY session, run this 60-second checklist:

1. **Identify the task**
   - [ ] User said "fix the website" → System 1 (my-business-site)
   - [ ] User said "build the app" → System 2 (torq-app)
   - [ ] User said "check production" → System 3 (torq-repo, read-only)
   - [ ] Unclear → Ask user which system before proceeding

2. **Navigate to correct directory**
   - [ ] Run `pwd` (should show /Users/shanestokes/Desktop/my-business-site OR torq-app OR torq-repo)
   - [ ] If wrong, `cd /Users/shanestokes/Desktop/[system]/`

3. **Read system-specific context**
   - [ ] System 1 → Read `CLAUDE.md` + `HANDOVER.md`
   - [ ] System 2 → Read `CLAUDE.md` + `HANDOVER_SESSION_5.md`
   - [ ] System 3 → Ask before proceeding

4. **Check git status**
   - [ ] `git status` (should show clean OR minor work-in-progress)
   - [ ] If large uncommitted changes: ask user before proceeding
   - [ ] If changes exist: `git log --oneline -5` (last 5 commits visible?)

5. **Confirm context**
   - [ ] Claude understands which system + what task
   - [ ] User confirms: "Yes, go ahead"
   - [ ] If confusion: stop and clarify

**Do not skip this. This is what prevents the chaos from happening again.**

---

## Critical Rules (All Systems)

### Rule 1: ONE System Per Session
- Don't work on website + app in the same session
- If both need work, ask user which to prioritize
- If user requests both, pick one, finish it, then move to the other in a new session

### Rule 2: Commit Before Leaving
Every session must end with:
```bash
git status (should be clean)
git log --oneline -3 (latest commit visible)
```
If uncommitted changes remain, don't close session — commit them first.

### Rule 3: Links in Responses
When marking work complete, always provide:
- **Local test link:** `http://localhost:XXXX` (if applicable)
- **Git status:** `git log --oneline` (latest 3 commits)
- **Summary:** What was built, what's next

### Rule 4: No Context Drift
If you get confused mid-session:
1. Stop work immediately
2. Re-read this file (TORQ_CYMRU_MASTER_CLAUDE.md)
3. Re-read the system's CLAUDE.md
4. Ask user to clarify if still confused
5. Never guess which system you're in

---

## Emergency Recovery (If Lost Again)

If work disappears or context breaks:

1. **Check git history**
   ```bash
   cd /Users/shanestokes/Desktop/[system]
   git log --oneline -20 (is your work there?)
   git status (any uncommitted changes?)
   ```

2. **Check for branches**
   ```bash
   git branch -a (are there other branches?)
   ```

3. **Check for stashes**
   ```bash
   git stash list (any stashed work?)
   ```

4. **If work is missing:**
   - Check git history across all 3 systems
   - Check Desktop for loose files
   - Review GitHub (torq-repo) for pushed commits

5. **If still lost:**
   - Take a screenshot of what you see
   - Run `git log --all --oneline -20` in each system
   - Share with user + Claude together

**Prevention:** Always commit before ending session. Always.

---

## Safeguards in Place (Session 6+)

1. **This MASTER document** — Single source of truth, prevents system confusion
2. **Git initialization on torq-app** — Work now persists, won't disappear
3. **Commit discipline** — Every session ends with `git status` showing clean or committed work
4. **Memory system** — Structure saved to ~/.claude/projects/-Users-shanestokes/memory/
5. **Session protocol** — 60-second checklist before every session

---

## Locked Decisions

These are non-negotiable unless user explicitly overrides:

1. **Three systems are separate** — Website is NOT the app is NOT the production system
2. **Git is mandatory** — All three systems must be version-controlled
3. **Commits required** — No session ends without `git status` showing clean tree
4. **Model selection matters** — Match model to task (Sonnet for building, Opus for design)
5. **Screenshot verification** — Visual work verified at 390px/768px/1440px before done
6. **One slice per session** — Build features end-to-end, not horizontal layers
7. **Read context first** — Every session starts with reading CLAUDE.md + handover docs

---

## Questions Before Every Session

Claude should ask these if unclear:

- **Which system are you working on today?** (website / app / production)
- **What's the specific task?** (don't assume)
- **Do you want me to commit + push?** (or keep changes local)
- **Any data/keys/passwords needed?** (phone number, API keys, etc.)

---

**This document is your single source of truth. Refer back to it when confused. The chaos stops here.**

*Generated: 2026-05-10*  
*Version 1.0 LOCKED*
