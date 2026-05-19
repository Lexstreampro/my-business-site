# TORQ Cymru — Messaging Plan

**Status:** Planning only. No live messaging code exists yet.
**Last updated:** 2026-05-19

---

## Current State

- Static marketing site (`index.html`, `services.html`) deployed to Netlify (manual CLI deploy).
- Public contact today is **static links only**:
  - `tel:+442922523485` (phone, multiple locations)
  - `mailto:torqcymruautomotive@gmail.com` (footer)
- Booking form on `index.html` writes directly to **Firebase Realtime Database** at `/jobs` via the Firebase Web SDK (client-side anonymous auth).
- When a booking is submitted, **no automatic email, SMS, or WhatsApp notification is sent** — to either the customer or the owner. The data simply lands in Firebase and waits to be checked manually.
- No SendGrid, Twilio, or WhatsApp code exists in the repo. The `.claude/FIREBASE_CLOUD_FUNCTION.js` file is a planning reference, **not deployed**.

---

## Chosen Backend Lane

**Firebase Cloud Functions + SendGrid (HTTP API).**

Triggered on a new write to Firebase `/jobs`, the function sends two emails:

1. **Customer confirmation** — to the email address submitted in the booking form.
2. **Owner alert** — to `torqcymruautomotive@gmail.com`.

The website itself stays pure static. The function lives in the Firebase project and deploys via the Firebase CLI, independently of Netlify.

### Why this lane

| Reason | Detail |
|---|---|
| Data already in Firebase | The booking write is the natural trigger. No second source of truth. |
| Keeps Netlify static | No backend or build step added to the marketing site — deploy risk stays low. |
| SendGrid is the documented choice | All existing planning docs (`.claude/SENDGRID_SETUP.md`, `HANDOVER.md`, `DEPLOYMENT_CHECKLIST.md`) already specify SendGrid. |
| Free-tier compatible | Firebase Cloud Functions free tier + SendGrid 100 emails/day free tier comfortably cover startup volume. |
| Synchronous + simple | SendGrid HTTP API is synchronous and well-documented; no queue/async complexity needed for two emails per booking. |
| No vendor lock to Netlify Functions | Netlify Functions would mean duplicating Firebase logic or refactoring the booking write path. Firebase Cloud Functions match the existing architecture. |

### Lane rejected: Netlify Functions

Would require either (a) moving the booking write through a Netlify Function instead of direct-to-Firebase, or (b) running two backends. Both add complexity for no benefit.

---

## Customer Confirmation Email — Purpose

- Acknowledges the booking was received.
- Reduces anxiety / "did it go through?" calls.
- Reinforces brand voice: calm authority.
- Confirms expected next step (e.g. "We'll be in touch within 24 hours to confirm time and quote").
- Includes booking summary (name, vehicle, service, postcode, preferred time).

**Sender:** `noreply@torqcymru.co.uk` (requires verified SendGrid sender — blocked until DNS).
**Tone:** Professional. No discount language. No urgency tricks.

---

## Owner Alert Email — Purpose

- Notifies TorQ Cymru immediately when a new booking arrives.
- Removes reliance on actively checking the Firebase console or the app.
- Contains all booking detail in a single readable email for triage.
- Recipient: `torqcymruautomotive@gmail.com`.

**Tone:** Internal / functional. Subject line should make it scannable (e.g. `New booking — [Name] — [Service] — [Postcode]`).

---

## Draft SendGrid Email Templates

These are the proposed first-version templates. Wording must be reviewed and approved before any implementation work begins. Placeholders are written as `{{name}}` and will be replaced at send time from the Firebase `/jobs/{jobId}` record.

### 1. Customer confirmation email

**Subject:**

```
Booking request received — TORQ Cymru
```

**Body:**

```
Hi {{customerName}},

Thanks for contacting TORQ Cymru. We've received your booking request and one of the team will review the details promptly.

Your request summary:

Service requested: {{serviceRequested}}
Vehicle: {{vehicleDetails}}
Preferred date: {{preferredDate}}
Postcode area: {{postcode}}

What happens next:

We'll check the information you've provided, confirm whether we can help, and contact you using the phone number or email address supplied with your request.

If your issue is urgent, you can also call us directly on 029 2252 3485.

Thanks again,

TORQ Cymru
Mobile mechanic services across Caerphilly and South Wales
029 2252 3485
torqcymruautomotive@gmail.com
```

### 2. Owner alert email

**Subject:**

```
New TORQ Cymru booking request — {{customerName}}
```

**Body:**

```
New booking request received.

Customer details:

Name: {{customerName}}
Phone: {{customerPhone}}
Email: {{customerEmail}}
Postcode: {{postcode}}

Vehicle details:

Vehicle: {{vehicleDetails}}
Registration: {{vehicleRegistration}}
Mileage: {{mileage}}

Job details:

Service requested: {{serviceRequested}}
Preferred date: {{preferredDate}}
Preferred time: {{preferredTime}}
Customer notes: {{customerNotes}}

Admin check:

Source: Website booking form
Firebase path: /jobs/{{jobId}}
Submitted at: {{submittedAt}}

Recommended next step:

Contact the customer, confirm the job details, check availability, and agree the next action before confirming the booking.
```

### 3. Function behaviour notes

- The customer email must say **received**, not **confirmed**. We are not auto-confirming the booking.
- Do not promise attendance, availability, or a specific time slot in the customer email.
- The **owner alert must still send even if the customer email fails**, and vice versa — the two sends are independent, neither blocks the other.
- The **booking record in Firebase `/jobs` must remain saved even if email sending fails entirely**. The website's success state is independent of the email layer.
- Logs must not print API keys, auth tokens, full email bodies, or any personal data beyond what is strictly needed for debugging (e.g. log the `jobId` and a SendGrid response code — not the customer's full details).
- **Sender** should eventually be `TORQ Cymru <noreply@torqcymru.co.uk>` — only after SendGrid sender + domain verification is complete (Phase 3). Until then, no live sends.
- **Reply-to** should be `torqcymruautomotive@gmail.com` so customer replies land in the existing inbox without needing a new mailbox on `noreply@`.
- Missing placeholder values must render as a clean fallback (e.g. blank line or `—`), never as the literal `{{placeholder}}` text in a sent email.

---

## What Waits for DNS

The following cannot proceed until `torqcymru.co.uk` resolves via Cloudflare/Netlify and HTTPS is live:

- **SendGrid sender verification** for `noreply@torqcymru.co.uk` (requires a working domain mailbox or SPF/DKIM records).
- **SPF / DKIM / DMARC records** at Cloudflare for email deliverability (without these, mail goes to spam).
- **Branded reply-to** addresses (`bookings@torqcymru.co.uk`, etc.) if added later.
- **Twilio number provisioning** + A2P 10DLC registration (deferred phase — domain helps establish brand trust).
- **WhatsApp Business API** enrolment via Meta (domain verification is part of the flow).

---

## What Waits for Explicit Approval

No live messaging change happens without Shane's explicit, scoped approval. Specifically:

- Installing `@sendgrid/mail` in any `functions/` directory.
- Deploying any Firebase Cloud Function to the live project.
- Sending the first test email (even to a personal inbox).
- Switching the booking form to depend on the function for any user-visible behaviour.
- Any production deploy of the website that touches the booking-related JS.
- Any later integration of Twilio, SMS, or WhatsApp.

---

## Secret Handling Rules

These are non-negotiable. Apply to SendGrid API keys, Twilio Account SID / Auth Token, WhatsApp tokens, and any future credentials.

1. **Never paste a secret into chat.** Not in any agent transcript, not in commit messages, not in PR descriptions.
2. **Never commit a secret.** `.env*` is now gitignored at the repo root.
3. **Never hardcode a secret** in `index.html`, `services.html`, any JS file, any Cloud Function source file, or any documentation.
4. **Set via Firebase config**, not inline:
   ```
   firebase functions:config:set sendgrid.key="..."   # set once, locally
   ```
   The function reads via `functions.config().sendgrid.key`.
5. **If a secret is ever exposed** (committed, pasted, screenshotted) — **rotate it immediately** in the provider dashboard, then purge from git history if committed.
6. **No screenshots of dashboards** that show full keys, even partial.
7. **Firebase web `apiKey` in `index.html` is NOT a secret** — it's a public project identifier. Security depends on Firebase Database Rules being locked down. Do not treat it as a leak.

---

## Rollback & Safety Notes

- **The website does not depend on the Cloud Function.** If the function fails, breaks, or is removed, the booking form continues to write to Firebase as it does today. Customers still get a success confirmation in the UI; only the emails stop. This is a deliberate isolation choice.
- **The function can be disabled** by either: (a) removing the trigger via `firebase deploy --only functions:disable`, or (b) deleting the function entirely in the Firebase console.
- **SendGrid rate limit hit** → function logs the error but does not break the booking write. Customer flow remains intact.
- **Sender unverified / DNS not ready** → emails will fail silently from SendGrid's side. Function logs the error. **No customer-visible impact.**
- **Cost cap** → Firebase Cloud Functions free tier (2M invocations/month) and SendGrid free tier (100/day) cover expected volume by a wide margin. Set budget alerts in both consoles before going live.

---

## Twilio / SMS / WhatsApp — Parked

Deferred to a later phase. Reasons:

- Email is the lowest-friction confirmation channel and covers the main pain point (no notification at all today).
- SMS via Twilio requires a UK number purchase, A2P 10DLC registration, and ongoing per-message cost — heavier setup than email.
- WhatsApp Business API requires Meta business verification, template approval, and 24-hour customer-initiated session windows — non-trivial onboarding.
- WhatsApp Click-to-Chat (`https://wa.me/442922523485`) is a much cheaper first step and could be added to the CTA stack at any time. It is **not** a real API integration — just a deep link.

When this phase opens, the same architecture applies: Firebase Cloud Function triggered on `/jobs` write, sending via Twilio SDK. Same secret-handling rules.

---

## Out of Scope (For This Phase)

- Marketing email broadcasts / newsletters.
- Two-way customer chat (the existing app already covers this).
- Booking reminders / day-before nudges (later phase — needs scheduled functions).
- Review-request follow-ups (later phase).
- Any payment / quote-acceptance email flow.
