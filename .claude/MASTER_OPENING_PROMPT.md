# TORQ Cymru Session Opening — Copy This Entire Prompt

**Use this as your opening message to continue work. Do NOT modify. Just paste and hit send.**

---

You are picking up the TORQ Cymru Automotive website build. We are at the final stage: email notifications + production deploy.

## Context (Read These First)
1. `/Users/shanestokes/Desktop/my-business-site/CLAUDE.md` — design system, tech stack, acceptance criteria
2. `/Users/shanestokes/Desktop/my-business-site/HANDOVER.md` — full build history (scroll to "Session 10" and "START PROMPT — Session 11")
3. `/Users/shanestokes/Desktop/my-business-site/index.html` — current homepage (booking form at lines ~616–700, Firebase config at end of body)
4. `/Users/shanestokes/Desktop/my-business-site/services.html` — services detail page

## What's Built
- ✅ index.html — full homepage with elite 9-section Why TORQ page, booking form wired to Firebase Realtime Database
- ✅ services.html — 7 detailed service pages with professional images, sticky navigator, animated stats
- ✅ Booking form — collects customer data (name/phone/email/postcode/vehicle/services/date), stores in Firebase `/jobs`
- ✅ Navigation — all links working (desktop + mobile hamburger)
- ✅ Responsive design — tested at 390px/768px/1440px, no overflow, no console errors

## What's Left (3 Tasks)

### Task 1: Firebase Cloud Functions + SendGrid Email
**What:** When a new booking arrives in Firebase `/jobs`, send 2 emails:
1. Customer confirmation ("Thank you! We'll contact you within 24 hours")
2. Partner alert ("New booking: [customer name], [vehicle], [service requested]")

**How:**
- Deploy a Cloud Function in Firebase that triggers on new `/jobs` entry
- Use SendGrid API to send emails
- Cost: Firebase free tier + SendGrid free tier (100 emails/day)

**You provide:**
- SendGrid API key (create free account at sendgrid.com if you don't have one)

### Task 2: Phone Number Swap
**What:** Replace `tel:+441234567890` with real business number

**Where:** Search both `index.html` and `services.html`

**You provide:**
- Real phone number in format: tel:+44XXXXXXXXXX

### Task 3: Production Deploy
**What:** Push the site live via Netlify

**How:**
- Test preview first: `netlify deploy`
- Deploy to production: `netlify deploy --prod`

## Execution Rules
- Read HANDOVER.md Session 11 START PROMPT first (has technical details)
- Do NOT iterate or redesign — execute the spec as written
- Test email before deploy (send test booking from booking form)
- Verify all links work after deploy (click every nav link, test CTAs)
- No new features, no scope creep

## Next Steps
When ready:

**Tell me:**
1. SendGrid API key (or "set up SendGrid first" if you need help)
2. Real phone number

**Ask me to:**
1. Wire Firebase Cloud Functions + SendGrid email notifications
2. Swap phone number across both pages
3. Deploy to production: `netlify deploy --prod`

---

**Copy this entire prompt, paste into Claude Code as your first message, and we'll finish this in one session.**
