# Quality Standard — LOCKED RULE

Everything shipped must be of the highest quality. No exceptions.

## Images
- **Minimum quality:** Premium stock photos (Unsplash premium, Pexels premium, or paid tier like iStock/Getty)
- **Minimum file size:** Images ≥100KB (smaller = compressed/low-res)
- **Verification:** Always check file size after download. If <50KB, it failed/corrupted — re-download
- **Resolution:** Minimum 1200px wide for web delivery
- **Testing:** Open every image in browser before shipping to verify it loaded correctly

## Code
- No placeholder text, dead links, or "coming soon" sections
- Every interactive element must be tested and functional
- No hardcoded values that should be configurable
- Type safety: `tsc --noEmit` must pass
- Linting: `npm run lint` must pass

## Design
- Every colour, spacing, font must match design tokens exactly
- No "close enough" — pixel-perfect matters
- Every breakpoint tested (390px, 768px, 1440px minimum)
- Hover states, animations, and transitions all working

## Copy
- No placeholder text, Lorem ipsum, or [EDIT] markers
- Brand voice consistent (calm authority, no discount language)
- Every CTA tested and clickable

## Acceptance
Before marking anything "done":
- Open in browser at all breakpoints
- Test on mobile device or DevTools mobile emulation
- Check console for errors
- Verify all images, links, and CTAs work
- If anything feels off, fix it — don't ship it

## Why This Matters
Half-finished work creates debt. Quality compounds — one sloppy deploy leads to more. We ship excellence or we don't ship.

This is non-negotiable.
