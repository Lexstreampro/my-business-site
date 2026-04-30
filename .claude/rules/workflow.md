# Build Workflow

## Session Start Protocol (60 seconds)

**Step 0: Verify Directory (10 seconds)**
- Check the file tree (left sidebar): should say "my-business-site"
- If it says anything else (extensions, Documents, etc.): **STOP**
- Navigate to correct folder: `~/Desktop/my-business-site`
- If unclear, ask Claude: "What directory am I in?" (Claude will tell you immediately)

**Step 1: Identify the task**
- Read `HANDOVER.md` spec — what are you building/fixing?
- Map task to `rules/model-selection.md` decision tree
- Note which model is required

**Step 2: Verify model (30 seconds)**
- Run `/model` to check current model
- If current ≠ required, switch: `/model opus` (or sonnet/haiku)
- Example: "Screenshot comparison" → need Opus → `/model opus`

**Step 3: Read context**
1. Root `CLAUDE.md` — brand, design system, acceptance criteria
2. `HANDOVER.md` — current spec, locked decisions, session log
3. `index.html` — current state (if editing)
4. Relevant rules files (`design-rules.md`, `technical-defaults.md`, etc.)

**Step 4: Execute**
- Build/fix the full spec in one pass
- Run the acceptance checklist when done
- Update `HANDOVER.md` session log before ending
- Do not iterate past the checklist

## Screenshot Build Method (Nick Saraev)
When building or refining any section:
1. Generate the HTML
2. Screenshot with Puppeteer (`npx puppeteer screenshot index.html --fullpage`)
3. Compare against reference — note exact mismatches (px spacing, hex values, font sizes, alignment)
4. Fix every mismatch
5. Re-screenshot and compare again
6. Repeat until ≤2–3px deviation everywhere

**Minimum 2 comparison rounds per section. Never stop after one pass.**
Inspiration screenshots: `~/Desktop/Garage Website Inspiration/Screenshots/`

## Execution Rules
- Read all context files before writing anything
- Execute the full spec in one pass, then run the acceptance checklist
- Mobile-first — test mental model at 390px throughout
- No scope creep, no "while I'm here" additions
- No new features not in the spec
- Append a "Session Notes" entry to `HANDOVER.md` when the session ends
- When done, open in browser. Stop. Do not iterate.

## Acceptance Checklist (run before marking any section done)

**Design**
- [ ] Colours match brand tokens exactly (`#C1121F`, `#111111`, `#1C1C1C`, `#BFC3C7`, `#F8F8F8`)
- [ ] Headlines Space Grotesk, body Inter
- [ ] Generous spacing — nothing cramped
- [ ] Corner radii ≤8px (no pill shapes)
- [ ] Matches inspiration screenshot within ~3px

**Mobile**
- [ ] Tested at 390px — nothing overflows or breaks
- [ ] Tap targets ≥44px
- [ ] Sticky CTA visible on mobile

**Content**
- [ ] Brand voice: calm authority, no discount language
- [ ] CTA uses approved copy bank (see design-rules.md)
- [ ] No placeholder text left in

**Conversion**
- [ ] Trust signals present where relevant
- [ ] Clear next action obvious at all times

**Screenshot check**
- [ ] Minimum 2 rounds completed against reference
- [ ] No visible mismatches remain
