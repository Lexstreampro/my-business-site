# Services Page Image Mapping — LOCKED PROCEDURE

**Status:** Final. Non-negotiable. Single-pass execution required.

**Date Established:** 2026-05-08

---

## Exact File Mapping (7 Services)

| Service Section | Source File (Desktop) | Target Filename | File Size | Quality Check |
|---|---|---|---|---|
| **Brakes & Pads** | `brakes 1 new.png` | `01-brakes-pads.png` | 2.0M | ✓ ≥100KB |
| **Servicing** | `servicing new.png` | `02-servicing.png` | 2.1M | ✓ ≥100KB |
| **Diagnostics** | `08-diagnostics.png` | `03-diagnostics.png` | 2.0M | ✓ ≥100KB |
| **Repairs** | `nicks work.png` | `04-repairs.png` | 563K | ⚠️ Check quality |
| **Batteries** | `battery new.png` | `05-battery.png` | 2.1M | ✓ ≥100KB |
| **MOT Preparation** | `mot prep new.png` | `06-mot-prep.png` | 2.3M | ✓ ≥100KB |
| **Fleet Support** | `fleet service new.png` | `07-fleet.png` | 2.0M | ✓ ≥100KB |

---

## Execution Procedure (Step-by-Step)

### Step 1: Copy & Rename Files to assets/services/
```bash
cp ~/Desktop/"brakes 1 new.png" /Users/shanestokes/Desktop/my-business-site/assets/services/01-brakes-pads.png
cp ~/Desktop/"servicing new.png" /Users/shanestokes/Desktop/my-business-site/assets/services/02-servicing.png
cp ~/Desktop/"08-diagnostics.png" /Users/shanestokes/Desktop/my-business-site/assets/services/03-diagnostics.png
cp ~/Desktop/"nicks work.png" /Users/shanestokes/Desktop/my-business-site/assets/services/04-repairs.png
cp ~/Desktop/"battery new.png" /Users/shanestokes/Desktop/my-business-site/assets/services/05-battery.png
cp ~/Desktop/"mot prep new.png" /Users/shanestokes/Desktop/my-business-site/assets/services/06-mot-prep.png
cp ~/Desktop/"fleet service new.png" /Users/shanestokes/Desktop/my-business-site/assets/services/07-fleet.png
```

### Step 2: Verify All Files Copied
```bash
ls -lh /Users/shanestokes/Desktop/my-business-site/assets/services/
```
Expected: 7 files, all ≥500KB

### Step 3: Update HTML Image References
Edit `services.html` — update all `<img src="assets/services/...">` tags:

| Service | Old Src | New Src |
|---|---|---|
| Brakes & Pads | `assets/services/01-close-up-brake-pads.png` | `assets/services/01-brakes-pads.png` |
| Servicing | `assets/services/06-mobile-mechanic-engine-service.png` | `assets/services/02-servicing.png` |
| Diagnostics | `assets/services/08-diagnostics.png` | `assets/services/03-diagnostics.png` |
| Repairs | `assets/services/05-hands-on-engine-work.jpg` | `assets/services/04-repairs.png` |
| Batteries | `assets/services/09-battery.png` | `assets/services/05-battery.png` |
| MOT Prep | `assets/services/04-two-techs-vehicle-inspection.png` | `assets/services/06-mot-prep.png` |
| Fleet Support | `assets/services/03-multiple-vehicles-lot-inspection.png` | `assets/services/07-fleet.png` |

### Step 4: Verify HTML Matches Files
```bash
grep -o "src=\"assets/services/[^\"]*\"" services.html | sort
```
Expected output:
```
src="assets/services/01-brakes-pads.png"
src="assets/services/02-servicing.png"
src="assets/services/03-diagnostics.png"
src="assets/services/04-repairs.png"
src="assets/services/05-battery.png"
src="assets/services/06-mot-prep.png"
src="assets/services/07-fleet.png"
```

### Step 5: Test in Browser
- Open `http://localhost:8000/services.html`
- Test at 390px, 768px, 1440px
- **Verify:** All 7 images load, no broken image icons, no console errors

### Step 6: Pre-Deploy QA
- [ ] No placeholder text (search: TODO, FIXME, Lorem)
- [ ] All 7 images visible and sharp
- [ ] Design tokens match (#C1121F red, #111111 black, etc.)
- [ ] CTAs clickable
- [ ] No console errors

### Step 7: Deploy to Netlify Preview
```bash
netlify deploy
# Test the preview URL
```

### Step 8: Deploy to Production
```bash
netlify deploy --prod
```

---

## Quality Assurance Checklist

**Before committing files:**
- [ ] All 7 source files exist on Desktop with exact names above
- [ ] All 7 files copied to assets/services/ with correct target names
- [ ] All file sizes ≥500KB (quality threshold)
- [ ] HTML references updated (7 src= lines match target filenames)
- [ ] No old image files remain in assets/services/

**Before deploying:**
- [ ] Lighthouse audit ≥85 performance
- [ ] No console errors at any breakpoint
- [ ] All images load at 390px, 768px, 1440px
- [ ] Mobile CTA sticky bar visible
- [ ] Phone number placeholder still in place (will be swapped in next session)

---

## Why This Matters

- **One source of truth:** 7 files, 7 services, 7 mappings. No ambiguity.
- **Quality locked:** All files ≥500KB minimum. No low-res images.
- **Verification step:** HTML grep check ensures no typos in src paths.
- **Non-negotiable:** Single pass. No rework. Done right the first time.

---

## If Something Goes Wrong

| Problem | Fix |
|---|---|
| Image doesn't load in browser | Check filename case sensitivity + extensions (.png vs .jpg) |
| Wrong image on service section | Verify src= path matches target filename in Step 3 table |
| Broken image icon in browser | File didn't copy successfully — re-run Step 1 copy command |
| Console errors | Check for typos in src paths — must be exact match to filenames |

---

## Locked Decision

**This procedure is non-negotiable.** No variations. No shortcuts. Follow exactly as written.

Once executed successfully, this becomes the model for all future image updates to services.html.
