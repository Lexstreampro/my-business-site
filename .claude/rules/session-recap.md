# Session Recap Rule

**Every session must end with a shareable recap in HANDOVER.md.**

## Format (Always Use This Structure)

Add a "SESSION START PROMPT" section at the end of HANDOVER.md (right after the Session Notes). This recap is designed to be readable/shareable without copy-paste — Shane can read it on screen and reference it in the next thread's opening message.

## Template

```
---

## START PROMPT — Session N+1 (Ready for [Phase])

**What's Built:**
- ✅ [Feature 1]
- ✅ [Feature 2]
- ⚠️ [Known issue or pending item]

**Current State:**
- [Tech stack status]
- [Design verified]
- [Test coverage]

**What's Left ([N] Tasks):**

1. **Task 1** — [What to do]
   - Action: [specific step]
   - Depends on: [anything blocked]

2. **Task 2** — [What to do]
   - Action: [specific step]
   - You provide: [user input needed]

**Context Files (Read in Order):**
1. `/Users/shanestokes/Desktop/my-business-site/CLAUDE.md`
2. `/Users/shanestokes/Desktop/my-business-site/HANDOVER.md`
3. `.claude/rules/` (relevant rule files)

**Next Thread Opening:**
Ask me to:
- [ ] Task 1
- [ ] Task 2
- [ ] [Final action]

Provide: [Any data/keys/numbers needed]
```

## When to Create It

After every session:
- Before marking work "complete"
- After running final QA/Tier 3 verification
- Before the user ends the session

## Why This Matters

- No copy-paste needed — Shane reads it and references in next thread
- Clear, scannable format
- Specifies what user needs to provide (SendGrid key, phone number, etc.)
- Next session starts immediately without clarification questions
- Ensures continuity across threads

## Example (From Session 9)

```
## START PROMPT — Session 10 (Email + Deploy)

**What's Built:**
- ✅ index.html (full homepage, nav fixed)
- ✅ services.html (7 services, responsive, images aligned)
- ✅ Booking form (wired to Firebase)

**Current State:**
- Both pages responsive 390px/768px/1440px
- No console errors
- Design tokens verified

**What's Left (3 Tasks):**

1. **Phone Number Swap** — `tel:+441234567890` → real number
   - Search both HTML files
   - You provide: real phone number

2. **Email Setup** — Firebase Cloud Functions + SendGrid
   - Deploy Cloud Function
   - Wire SendGrid API
   - You provide: SendGrid API key

3. **Production Deploy** — `netlify deploy --prod`
   - Test preview first
   - Deploy to live

**Next Thread Opening:**
Provide: SendGrid API key + real phone number
Ask me to: Swap phone, wire email, deploy to production
```

## Non-Negotiable

This rule is **locked**. Every session recap goes in HANDOVER.md using this format. No exceptions.
