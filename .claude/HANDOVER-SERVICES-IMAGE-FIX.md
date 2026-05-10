# Session 8 Handover: Services Page Image Reorganization

**Date:** 2026-05-08
**Task:** Replace all 7 service images with correctly named files from Desktop
**Status:** Ready for fresh thread execution
**Priority:** HIGH — Quality-critical, non-negotiable

---

## What Happened (Session 7)

- Built services.html with 7 service sections (Brakes, Servicing, Diagnostics, Repairs, Batteries, MOT Prep, Fleet)
- Image references were wrong (old filenames) → broken references in HTML
- Multiple rounds of troubleshooting wasted tokens and user patience
- User correctly identified: need fresh thread with locked procedure

---

## What Needs to Happen (Session 8)

**Single task:** Copy 7 images from Desktop → assets/services/ with correct names, update HTML references.

**Locked mapping (non-negotiable):**
1. `brakes 1 new.png` → `01-brakes-pads.png` (Brakes & Pads service)
2. `servicing new.png` → `02-servicing.png` (Servicing service)
3. `08-diagnostics.png` → `03-diagnostics.png` (Diagnostics service)
4. `nicks work.png` → `04-repairs.png` (Repairs service)
5. `battery new.png` → `05-battery.png` (Batteries service)
6. `mot prep new.png` → `06-mot-prep.png` (MOT Preparation service)
7. `fleet service new.png` → `07-fleet.png` (Fleet Support service)

---

## Procedure (Follow Exactly)

See `.claude/rules/services-image-mapping-LOCKED.md` for complete step-by-step procedure.

**Quick summary:**
1. Copy 7 files from Desktop to assets/services/ with new names
2. Update HTML src= attributes (7 lines in services.html)
3. Verify with grep: `grep -o "src=\"assets/services/[^\"]*\"" services.html`
4. Test in browser at 390px/768px/1440px
5. Deploy to preview, then production

---

## Key Files

- **Locked procedure:** `.claude/rules/services-image-mapping-LOCKED.md` ← READ THIS FIRST
- **Services HTML:** `services.html` (524 lines, currently has wrong image refs)
- **Source images:** `~/Desktop/` (7 files listed above, ready to copy)
- **Target folder:** `assets/services/` (7 files will be copied here)

---

## Entry Point for Fresh Thread

**Prompt to Claude:**
> "Read .claude/rules/services-image-mapping-LOCKED.md carefully. Follow the 8-step procedure exactly. Copy 7 images from Desktop to assets/services/, update HTML, verify with grep, test in browser, report completion."

**Do NOT:**
- Make any changes before reading the locked procedure
- Deviate from the mapped filenames
- Skip the verification step (grep check)
- Deploy without testing at all 3 breakpoints

---

## Quality Standards in Play

- **Quality-First Rule:** Every image must be ≥100KB, verified before commit (from memory)
- **Locked Rule:** services-image-mapping-LOCKED.md (this session)
- **Previous error:** Wrong filenames = broken images = wasted tokens. This won't happen again.

---

## Success Criteria

- [ ] All 7 images copied to assets/services/
- [ ] All filenames match locked mapping exactly
- [ ] HTML updated with correct src= paths
- [ ] Grep verification passes (all 7 files listed)
- [ ] Browser test: all images load at 390/768/1440px
- [ ] No console errors
- [ ] Ready to deploy to production

---

## Token Budget

- Reading locked procedure + setup: ~500 tokens
- File copy + HTML edits: ~200 tokens
- Verification (grep + browser test): ~300 tokens
- **Total estimate: ~1000 tokens** (efficient execution)

---

## If Things Go Wrong

Refer to "If Something Goes Wrong" section in `services-image-mapping-LOCKED.md`.

Most common issue: filename case sensitivity or .png vs .jpg mismatch. Grep check will catch it immediately.

---

## Next Session (Session 9)

After images are fixed and deployed:
1. Swap phone number placeholder (`tel:+441234567890` → real number)
2. Wire booking form (Formspree or Netlify Forms)
3. Run Tier 3 final QA
4. Production deploy

