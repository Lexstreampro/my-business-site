# Session 6 — Lockdown Protocol

**Date:** 2026-05-10  
**Status:** COMPLETE — All chaos eliminated  
**Scope:** System architecture, git discipline, permanent safeguards

---

## What Was Broken

1. **System confusion** — Three distinct projects (website / app / production) treated as one
2. **Lost work** — torq-app was NOT in git, so changes disappeared between sessions
3. **Wrong links** — Sessions sent incorrect links because they didn't know which system was which
4. **No coordination** — No map of "here's what exists and where"
5. **Context decay** — Each session started blind, causing rework and frustration

---

## What Was Fixed (Session 6)

### 1. **Committed All Uncommitted Work**

**my-business-site:**
- ✅ Committed 40 file changes (service images, rules, screenshots)
- ✅ Working tree clean
- ✅ Latest commit: `d7e0b0d Session 6: Website progress — ...`

**torq-repo:**
- ✅ Committed portal.html changes
- ✅ Pushed to GitHub (origin/main)
- ✅ Working tree clean
- ✅ Latest commit: `ec60661 Session 6: Portal updates — ...`

**torq-app:**
- ✅ **NEW: Initialized git** (was not in version control)
- ✅ Committed initial state + all existing files
- ✅ Working tree clean
- ✅ Initial commit: `a4389bf Initial commit: TORQ Cymru app — ...`

### 2. **Created Master System Map**

**File:** `/Users/shanestokes/Desktop/TORQ_CYMRU_MASTER_CLAUDE.md`

This document:
- Explains what each system is (purpose, tech, location, status)
- Lists critical rules for each system
- Defines session protocol (when to work on which system)
- Provides mandatory checklist before every session
- Describes emergency recovery procedures

**How to use:** Read this at the start of EVERY session, before doing anything else.

### 3. **Locked Project Structure in Memory**

**File:** `~/.claude/projects/-Users-shanestokes/memory/torq-project-structure.md`

This memory:
- Auto-loads in every session (lives in MEMORY.md index)
- Explains why the three systems are separate
- Provides the session protocol in 5 steps
- References the master document

**How to use:** This loads automatically. If confused, check the memory system.

### 4. **Established Mandatory Session Protocol**

**Before EVERY session:**

```
1. Read /Users/shanestokes/Desktop/TORQ_CYMRU_MASTER_CLAUDE.md (2 min)
2. Identify which system (website / app / production)
3. Read that system's CLAUDE.md + HANDOVER files (5 min)
4. Never work on 2+ systems in same session
5. Commit + push before ending
6. Report: git log --oneline (latest commit visible)
```

**This is non-negotiable.** It's what prevents the chaos from repeating.

---

## Safeguards Now in Place

| Safeguard | Why | How it Works |
|-----------|-----|--------------|
| **Git on torq-app** | Work won't disappear between sessions | All changes committed locally; history preserved |
| **Master document** | No system confusion | Single source of truth; read first every session |
| **Memory lock** | Persistent knowledge | Structure auto-loads in every conversation |
| **Session checklist** | Prevents starting wrong | 60-second verification before building |
| **Clean trees** | No lost work | Every session ends with `git status` clean |
| **One system rule** | No parallel confusion | Only build one system per session |

---

## How to Verify Everything is Locked Down

### Test 1: Check All Three Systems Are in Git

```bash
# Website
cd /Users/shanestokes/Desktop/my-business-site && git log --oneline -1
# Expected: d7e0b0d Session 6: Website progress — ...

# App
cd /Users/shanestokes/Desktop/torq-app && git log --oneline -1
# Expected: a4389bf Initial commit: TORQ Cymru app — ...

# Production
cd /Users/shanestokes/Desktop/torq-repo && git log --oneline -1
# Expected: ec60661 Session 6: Portal updates — ...
```

### Test 2: Check All Trees are Clean

```bash
cd /Users/shanestokes/Desktop/my-business-site && git status
cd /Users/shanestokes/Desktop/torq-app && git status
cd /Users/shanestokes/Desktop/torq-repo && git status
# Expected for all: "On branch X ... nothing to commit, working tree clean"
```

### Test 3: Verify Master Document Exists

```bash
ls -la /Users/shanestokes/Desktop/TORQ_CYMRU_MASTER_CLAUDE.md
# Expected: file exists, readable, 4000+ bytes
```

### Test 4: Verify Memory Lock

```bash
cat ~/.claude/projects/-Users-shanestokes/memory/MEMORY.md | head -1
# Expected: First line mentions TORQ Project Structure
```

---

## Protocol for Next Session

When you (Claude) start the next session:

1. **Check memory load** — Is `torq-project-structure.md` visible in MEMORY.md? Yes → proceed
2. **Ask "which system"** — If user doesn't specify, ask before proceeding
3. **Read the master document** — Always: `/Users/shanestokes/Desktop/TORQ_CYMRU_MASTER_CLAUDE.md`
4. **Navigate to correct directory** — Check `pwd` matches the system
5. **Verify git tree** — `git status` (should be clean)
6. **Execute the task** — No confusion, no wrong links, no lost work
7. **Commit at end** — `git add -A && git commit -m "..."` (or specific files)
8. **Verify clean** — Final `git status` before closing session

---

## If Lost Again (Emergency Protocol)

If you get confused mid-session:

1. **STOP WORKING**
2. **Read this file:** `/Users/shanestokes/Desktop/TORQ_CYMRU_MASTER_CLAUDE.md`
3. **Check git history:**
   ```bash
   cd /Users/shanestokes/Desktop && find . -name ".git" -type d | head -5
   for dir in my-business-site torq-app torq-repo; do
     echo "=== $dir ===" && cd $dir && git log --oneline -3 && cd ..
   done
   ```
4. **Check current directory:** `pwd` (where am I?)
5. **Ask user to clarify** if still confused — don't guess

---

## Non-Negotiable Rules (Locked Forever)

1. **Always read the master document first** — Every session
2. **One system per session** — Never build website + app simultaneously
3. **Commit before ending** — `git status` must be clean
4. **No context drift** — If confused, re-read docs instead of guessing
5. **Clear links in responses** — Always show `git log --oneline` output in session summary

---

## What This Prevents

✅ **Lost work** — Everything in git; history preserved  
✅ **System confusion** — Master map makes it clear which is which  
✅ **Wrong links** — Each system knows its own location  
✅ **Circular rework** — Proper handoff between sessions  
✅ **Frustration** — Clear, repeatable protocol = no surprises  

---

## For Shane (You)

### Before Next Session
- You can read `/Users/shanestokes/Desktop/TORQ_CYMRU_MASTER_CLAUDE.md` to brief Claude
- You can also just ask "work on the website" or "build the app" — Claude will use the master document to figure it out
- All your work is now safe in git — changes won't disappear

### If You Forget Which System
- Read the master document (2 min read)
- Or open the memory file in your memory system
- Or ask Claude "which system am I supposed to be working on?"

### Going Forward
- Tell Claude which system (website / app / production)
- Claude reads the system-specific docs (CLAUDE.md + HANDOVER files)
- Work happens
- Claude commits before ending
- No confusion, no lost work, clean handoffs

---

## Session 6 Summary

**What was built:** Infrastructure + documentation  
**What was fixed:** System confusion, lost work risk, git discipline  
**What's now safe:** All three systems in version control, clear protocols, permanent memory  
**What's next:** Build the features with confidence — no more chaos

**Status:** ✅ COMPLETE — Ready for productive work

---

*This protocol is locked and permanent. It applies to all future TORQ Cymru work.*

*Generated: 2026-05-10*
