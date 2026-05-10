# Testing Links Rule

**Effective:** 2026-05-08

Always provide a testable link at the end of any verification or QA session.

## Rule

When completing visual verification, screenshot comparison, or functional testing:
1. **Provide local link** for immediate testing: `http://localhost:8000/[page]`
2. **Deploy to Netlify preview** for shareable testing: `netlify deploy` → preview URL
3. **Add links to response** before marking task complete

## Example Format

```
✅ Verification complete.

Test links:
- Local: http://localhost:8000/services.html
- Preview: https://[random]--[project].netlify.app/services.html
```

## Why

- Local link: immediate validation without deploy friction
- Preview link: shareable with team/stakeholders, no auth needed
- Clear testing surface: gives user obvious place to verify the work

## Exception

If Netlify auth is not configured, note it in the response:
```
Preview deploy requires: netlify login
Run: netlify deploy
```
