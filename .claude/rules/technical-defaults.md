# Technical Defaults

## Stack (locked — do not change)
- Static HTML, no build step, no bundler
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Space Grotesk + Inter via Google Fonts CDN
- Vanilla JS embedded in HTML
- Netlify hosting

## File Structure
```
/Users/shanestokes/Desktop/my-business-site/
├── index.html              # Homepage (all sections — fully built)
├── services.html           # Services detail (not yet built)
├── assets/
│   ├── logo.jpeg           # TORQ Cymru badge logo
│   └── work/               # job-1.jpeg through job-5.jpeg
├── CLAUDE.md               # Project brief + design system
├── HANDOVER.md             # Session spec + locked decisions + session log
├── netlify.toml            # Netlify config
└── .claude/
    ├── CLAUDE.md           # Session context pointer
    ├── CLAUDE.local.md     # Personal notes (gitignored)
    ├── settings.json       # Project permissions (committed)
    ├── settings.local.json # Personal overrides (gitignored)
    └── rules/              # This folder
```

## Deploy Commands
```bash
netlify deploy --prod   # push to production
netlify deploy          # preview deploy
```

## Common Task Patterns
| Task | How |
|------|-----|
| Add a review | Find `.reviews-grid`, add `.review-card` (name, town, stars, body text) |
| Add a service | Find `.services-grid`, add `.service-card` (icon, title, desc, CTA) |
| Update primary colour | Search `#C1121F` |
| Update hover colour | Search `#8E0F19` |
| Update background | Search `#111111` |
| Update phone number | Current live value: `tel:+442922523485` (029 2252 3485). Search `tel:+44` to find all occurrences before replacing. |
| Wire booking form | Find `<form` in booking section, add `action="https://formspree.io/..."` |

## Asset Locations
- Logo: `assets/logo.jpeg`
- Work photos (site): `assets/work/job-1.jpeg` through `job-5.jpeg`
- Work photos (originals): `~/Desktop/work photos/`
- Inspiration screenshots: `~/Desktop/Garage Website Inspiration/Screenshots/`
- Mobile bug screenshots: `~/Downloads/db798ee4-*.jpeg`, `~/Downloads/96a5b006-*.jpeg`
