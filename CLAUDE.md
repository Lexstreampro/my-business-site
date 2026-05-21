# TORQ Cymru Automotive — Website

## Project Overview
Premium mobile mechanic website for South Wales. Static HTML, no build step, Netlify deploy.
Goal: most premium mobile mechanic site in Wales — closer to Polestar/Apple than a local garage.
Tagline: **Precision Delivered.**

## Tech Stack
- Static HTML (no build step, no bundler)
- Tailwind CSS via CDN (`<script src="https://cdn.tailwindcss.com"></script>`)
- Space Grotesk (headlines) + Inter (body) via Google Fonts CDN
- Vanilla JS, embedded
- Hosting: Netlify (`netlify deploy --prod`)

## Code Architecture

**Single 939-line index.html with three layers:**

| Layer | Tech | Key Elements |
|-------|------|--------------|
| **Structure** | HTML | 12 semantic sections (Preloader → Footer), each with `id` for nav/targeting. No external files. |
| **Styling** | Tailwind CDN + CSS | Custom colour palette (tc-red, tc-black, etc.), Space Grotesk headlines, Inter body. Animations: castle-rise, hero-in, arc-fill, halo. Mobile-first breakpoints. |
| **Interactivity** | Vanilla JS | Preloader (click-to-skip, auto-dismiss 3s), mobile nav (hamburger + slide panel), Intersection Observer (scroll reveal), Leaflet.js (coverage map). |

**Key:**
- Preloader: `body.entered` class fires when dismissed, triggers hero animation
- Logo preloaded: `<link rel="preload">` in head for instant render
- Mobile nav: `lg:hidden` (shows on small screens only)
- Booking form: styled but non-functional (wired in future session)

## Development Workflow

**Local Testing**
```bash
# Option 1: Open directly in browser
open index.html

# Option 2: Local HTTP server (if you have Python)
python3 -m http.server 8000
# Then visit http://localhost:8000
```

**Visual Verification Tooling**
- Playwright / `@playwright/test` is installed for local viewport and screenshot verification.
- Keep generated screenshots in `/tmp` or another review-safe location unless Shane explicitly approves committing artefacts.
- For visual/image/privacy work, verify at 390px, 768px, and 1440px before declaring GREEN.

**Screenshot Comparison (Nick Saraev Method)**
```bash
# Full-page screenshot for reference comparison
npx puppeteer screenshot index.html --fullpage

# Specific section (example: hero, 800px tall starting at y:0)
npx puppeteer screenshot index.html --clip='{"x":0,"y":0,"width":1440,"height":800}'
```

**Mobile QA (390px breakpoint)**
- Open DevTools (Cmd+Option+I)
- Set device viewport to 390px width
- Test tap targets: all interactive elements ≥44px
- Verify sticky CTA bar visible at bottom
- Check for horizontal overflow (nothing should scroll off-screen)
- Test preloader: should load, show logo, auto-dismiss or click-to-skip

**External Dependencies**
- Leaflet.js v1.9.4 (coverage map): loaded from CDN, no npm install needed
- All other libraries (Tailwind, Google Fonts) via CDN

## File Structure
```
/
├── index.html          # Homepage
├── services.html       # Services detail
├── CLAUDE.md           # This file
└── netlify.toml        # Netlify config
```

## Design System

### Colours
| Token | Hex | Usage |
|-------|-----|-------|
| Dragon Red | `#C1121F` | Primary CTA, action, authority |
| Deep Crimson | `#8E0F19` | Hover states, depth |
| Carbon Black | `#111111` | Primary background |
| Graphite | `#1C1C1C` | Cards, panels, sections |
| Brushed Steel | `#BFC3C7` | Headlines, iconography, lines |
| Alloy Grey | `#8D9398` | Supporting UI tones |
| Clean White | `#F8F8F8` | Body text, readable contrast |
| Welsh Green | `#00843D` | Use sparingly — national identity only |

### Typography
- Headlines: Space Grotesk — modern, engineered, assertive
- Body: Inter — trustworthy, contemporary, readable
- Buttons: Bold uppercase, tight letter-spacing (-0.03em to -0.05em)

### Design Rules
- Dark luxury automotive. Not loud. Not cheap. Not "boy racer". Not generic trade site.
- Large breathing space. Strong grid. Elegant spacing. Premium contrast.
- Corner radii: 4–8px max (squared/luxe aesthetic — no pill buttons)
- Scroll animations: subtle reveal on scroll via Intersection Observer
- Mobile-first. Sticky mobile CTA bar on small screens.

### Never Use
- Greasy garages, cluttered workshops, discount visuals
- Low quality stock photos, messy imagery
- Generic trade website patterns

## Brand Voice
- Calm authority. Professional confidence. No fluff. No shouting.
- Sound like: "We'll handle it." / "Booked. Confirmed. Sorted." / "Professional service at your door."
- Never: "Cheap deals available!!!" / "Best prices guaranteed mate" / "Give us a bell"

## Homepage Blueprint (index.html) — Session 3 Complete

1. **Preloader** — Full-page castle silhouette (0.35 opacity), centred logo (200px), speedometer arc over upper logo arch, glowing halo. Click-to-skip or auto-dismiss 3s.
2. **Nav** — Text wordmark "TORQ Cymru" on mobile (lg:hidden), full badge on desktop. Sticky "Book Now" button (Dragon Red). Hamburger menu on mobile with slide-in nav panel.
3. **Hero** — "Premium Mobile Mechanics Across Wales" headline, subhead, [Book Your Vehicle] [Get Fast Quote] CTAs. Text-left layout. Content-driven height on mobile, `calc(100vh-112px)` on desktop.
4. **Trust Bar** — 5 signals: ★★★★★ Rated | Mobile Service Across South Wales | Transparent Quotes | Qualified Technicians | Fast Response
5. **Services** — 6 cards: Brakes & Pads / Servicing / Diagnostics / Repairs / Batteries / MOT Preparation / Fleet Support (each with CTA)
6. **Why TORQ Cymru** — 4-pillar grid: We Come To You | We Respect Time | We Do It Properly | We're Local
7. **Recent Work Gallery** — 5 photos (job-1.jpeg through job-5.jpeg) in responsive grid (3 cols lg, 2 cols sm, 1 col mobile). Lazy-loaded. Hover scale animation.
8. **Social Proof** — Real reviews: Jolene C., Casey McG., Millie G. with town names and "Verified Facebook Review" badges.
9. **Booking Section** — "Request a Booking" form with Name / Vehicle / Issue / Postcode / Preferred Time fields → "Request Booking →" button. Non-functional (wired in future session).
10. **App CTA Section** — "Download Our App — Coming Soon" with iOS + Android "Notify Me" buttons (dead, styled). Animated phone mockup.
11. **Urgent CTA Block** — Red band: "Brake warning light? Need same-day support?" → [Call Now]
12. **Coverage Map** — Custom inline SVG: South Wales landmass, 30-mile radius ring from Caerphilly Castle, 10 town markers, distance rings, "30 MILES" label. Leaflet.js backup.
13. **Coverage Tags** — Caerphilly, Merthyr, Aberdare, Cardiff, Newport, Swansea, Bridgend, Pontyprydd, Vale of Glamorgan, Barry. Lead copy emphasises Caerphilly + South Wales Valleys.
14. **Footer** — Full badge logo, nav links, copyright. Sticky mobile CTA bar (lg:hidden) with tap-to-call + Book Now button.

## Conversion Psychology
- Price justified through: convenience, speed, professionalism, trust — never through parts cost
- Urgency framing: "Limited mobile slots daily"
- Risk reversal: "Transparent estimates before work begins"
- Friction removal: Tap-to-call, WhatsApp CTA, 2-min quote form
- Trust mechanics: real reviews, technician names, arrival times, clean invoices, guarantees

## CTA Copy Bank
- Book Your Vehicle
- Get Fast Quote
- Call Local Experts
- Request Same-Day Help
- Request Priority Booking

## Screenshot Build Workflow (Nick Saraev Method)
When building or refining sections using reference screenshots:
1. Generate section HTML
2. Screenshot rendered output
3. Compare against reference — note exact mismatches (px spacing, hex colours, font sizes, alignment)
4. Fix every mismatch found
5. Re-screenshot and compare again
6. Repeat until ≤2–3px deviation everywhere
**Minimum 2 comparison rounds per section. Never stop after one pass.**

## Inspiration References (What to Extract)
| Site | Extract |
|------|---------|
| Apple | Spacing system, hero padding, whitespace rhythm, copy hierarchy |
| Stripe | Trust signal layout, card structure, CTA confidence, clean nav |
| Linear | Dark UI precision, typography weight contrast, grid discipline |
| Polestar | Automotive dark luxury aesthetic, full-bleed imagery, colour restraint |
| Boxt | Service card UX, quote form structure, mobile simplicity |
| Checkatrade | Review/trust signal placement, star ratings, credibility badges |

Screenshots in: `~/Desktop/Garage Website Inspiration/Screenshots/`

## Section Acceptance Criteria
Before marking any section complete, verify all of the following:

**Design**
- [ ] Colours match brand tokens exactly (`#C1121F`, `#111111`, `#1C1C1C`, `#BFC3C7`, `#F8F8F8`)
- [ ] Headlines in Space Grotesk, body in Inter
- [ ] Spacing feels premium — generous padding, no cramped elements
- [ ] Corner radii ≤8px (no pills except secondary badge elements)
- [ ] Matches the relevant inspiration screenshot within ~3px

**Mobile**
- [ ] Tested at 390px (iPhone) — nothing overflows or breaks
- [ ] Tap targets ≥44px
- [ ] Sticky CTA visible on mobile

**Content**
- [ ] Copy matches brand voice (calm authority — no discount language)
- [ ] CTA present and uses approved copy bank
- [ ] No placeholder text left in

**Conversion**
- [ ] Trust signals present where relevant (stars, credentials, guarantees)
- [ ] Friction is minimised (clear next action obvious at all times)

**Screenshot check**
- [ ] Minimum 2 comparison rounds completed against reference
- [ ] No visible mismatches remain

---

## Common Tasks

### Update Colours
Search hex codes across index.html. Primary: `#C1121F`. Hover: `#8E0F19`. Background: `#111111`.

### Update CTA Links
Search `tel:` and `#booking` — replace with live numbers/form targets.

### Add Review
Find `.reviews-grid` — add new `.review-card` with name, town, star rating, body text.

### Add Service Card
Find `.services-grid` — add new `.service-card` with icon, title, description, CTA link.

## Deployment

**Preview Deploy (staging)**
```bash
netlify deploy
# Returns a preview URL like: https://xxx--eloquent-gelato-d5fe9a.netlify.app
```

**Production Deploy**
```bash
netlify deploy --prod
# Deploys to: https://eloquent-gelato-d5fe9a.netlify.app (or live domain when configured)
```

**What gets deployed:**
- Everything in the project root (`.`, not a build folder)
- Assets folder and all images
- Netlify caching headers: assets/ cached for 1 year (immutable)
- HTML files served fresh (no cache)

**Requirements:**
- Netlify CLI installed: `npm install -g netlify-cli`
- Authenticated: `netlify login`

**Important:** Test in browser at 390px, 768px, and 1440px before deploying to production.
