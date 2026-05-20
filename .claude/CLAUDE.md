# TORQ Cymru Automotive Website

Project brief, design system, and homepage blueprint → root `CLAUDE.md`
Full session spec and locked decisions → `HANDOVER.md`
Operational rules for this session → `.claude/rules/`

## Critical Rules
- **Screenshot verification (LOCKED)**: Always verify at 390px/768px/1440px before marking complete. See `.claude/rules/screenshot-verification-LOCKED.md`
- **Image mapping (LOCKED)**: 7 services images locked to exact filenames. See `.claude/rules/services-image-mapping-LOCKED.md`

## Current Build State
- Session 3 complete (2026-04-29) — all 14 items executed
- index.html: full homepage built and QA'd
- services.html: images locked and mapped (2026-05-08)
- Deploy: pending (phone number + form wiring first)

## Next Priorities
1. Visual QA in browser at 390px / 768px / 1440px (screenshot verification)
2. ~~Swap phone placeholder~~ — ✅ complete; live source uses `tel:+442922523485` (029 2252 3485)
3. Wire booking form (Formspree or Netlify Forms)
4. Build services.html
5. Deploy: `netlify deploy --prod`
