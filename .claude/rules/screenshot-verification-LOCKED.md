# Screenshot Verification — LOCKED RULE

**Effective:** 2026-05-08

All work must be verified complete via screenshot comparison before marking done.

## Definition of "Complete"

Work is complete when:

### 1. **Visual Verification (Required)**
- [ ] Screenshots taken at **all three breakpoints**: 390px, 768px, 1440px
- [ ] Images render **fully visible** in their assigned service sections
- [ ] No broken image icons, no alt-text fallbacks showing
- [ ] Image sizing matches container (no stretching, squishing, or white space)
- [ ] Images positioned in correct order relative to content
- [ ] No layout overflow or horizontal scrolling caused by images

### 2. **Content Alignment**
- [ ] Each image in the correct section (Brakes → 01-brakes-pads, Servicing → 02-servicing, etc.)
- [ ] Image alt text matches section topic
- [ ] Text and image maintain proper visual hierarchy (text readable, image prominent)

### 3. **Responsive Layout**
- [ ] **390px**: Image stacks below text, full-width, no overflow
- [ ] **768px**: Image and text side-by-side or stacked gracefully
- [ ] **1440px**: Full desktop layout, image takes ~50% width, proper spacing

### 4. **Quality Checks**
- [ ] All images ≥100KB (quality threshold)
- [ ] No console errors in DevTools
- [ ] No broken image 404s
- [ ] Loading state: images display eagerly (no `loading="lazy"` unless explicitly required)

## Screenshot Workflow

**Before marking any section complete:**

1. **Capture** — Take screenshots at 390px, 768px, 1440px using browser DevTools or Puppeteer
2. **Compare** — Visual inspection: do all images show in right places?
3. **Test** — Hard refresh (Cmd+Shift+R), scroll through page, verify no layout shifts
4. **Document** — Note in session log: "✅ Screenshot verified at 390px/768px/1440px"

## Minimum Iterations

- **Per section**: minimum 2 screenshot rounds (before and after any fixes)
- **Before deploy**: 1 final full-page screenshot at all breakpoints

## Anti-Pattern (Do Not)

- ❌ Assume images work without screenshotting
- ❌ Screenshot only desktop (390px and 768px equally important)
- ❌ Move on after one screenshot pass (minimum 2 rounds per section)
- ❌ Trust HTTP 200 as proof images render (404 headers lie; visual proof is truth)

## Why This Matters

Images failing to display is the #1 bug that ships to production undetected. Screenshots catch:
- Missing files (404s disguised as successful)
- Wrong filenames or paths
- Container sizing that hides images
- Lazy loading that prevents above-fold display
- Aspect ratio mismatches

**Screenshot verification = zero shipping broken images.**

---

## Session Log Example

✅ **Session 2, 2026-05-08 — Services Images Reorganization**
- Copied 7 images to assets/services/ with locked naming
- Updated 7 HTML src= paths (verified with grep)
- Removed lazy loading to enable eager image display
- **Screenshot verification**: 390px ✅ | 768px ✅ | 1440px ✅
  - All 7 images visible in correct sections
  - No broken icons, no 404s
  - Responsive layout correct at all breakpoints
- **Status**: Ready for production deploy

---

This rule is **non-negotiable**. Every completed task must include screenshot verification before I declare it done.
