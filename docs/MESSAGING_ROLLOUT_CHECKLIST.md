# TORQ Cymru — Messaging Rollout Checklist

**Companion to:** `docs/MESSAGING_PLAN.md`
**Last updated:** 2026-05-19
**Rule:** Each phase requires explicit Shane approval before starting. Do not skip phases. Do not run multiple phases in one session.

---

## Phase 1 — Safe Prep (🟢 do now, no DNS dependency)

No live integrations. No deploys. No secrets handled.

- [x] `.env*` added to root `.gitignore`.
- [x] `docs/MESSAGING_PLAN.md` created.
- [x] `docs/MESSAGING_ROLLOUT_CHECKLIST.md` created (this file).
- [ ] Review and approve customer confirmation and owner alert wording before implementation. See `docs/MESSAGING_PLAN.md` → "Draft SendGrid Email Templates".
- [ ] Confirm backend lane: **Firebase Cloud Functions + SendGrid** (matches existing plan).
- [ ] Confirm Firebase Realtime Database rules: `/jobs` allows write for anonymous users, read restricted. Verify in Firebase console (no code change needed if already correct).
- [ ] Create SendGrid account at https://sendgrid.com (free tier). Do **not** generate or paste an API key yet.
- [ ] Confirm Firebase project (`torqcymru-35abb`) Blaze plan status — Cloud Functions outbound HTTP calls require Blaze (pay-as-you-go) with budget alerts. **Do not upgrade without explicit approval.**

**Exit criteria:** Plan and checklist exist, lane is confirmed, accounts/state are surveyed. No code changes beyond these two docs and `.gitignore`.

---

## Phase 2 — DNS Complete (🟡 blocked on Cloudflare/Netlify)

Cannot start until `torqcymru.co.uk` and `www.torqcymru.co.uk` resolve and HTTPS is live.

- [ ] `dig +short www.torqcymru.co.uk` returns Netlify IPs.
- [ ] `dig +short torqcymru.co.uk` returns Netlify IPs.
- [ ] `curl -I https://www.torqcymru.co.uk/` returns `HTTP/2 200`.
- [ ] `curl -I https://torqcymru.co.uk/` returns `HTTP/2 200` (or redirects to www).
- [ ] Netlify HTTPS certificate provisioned (Let's Encrypt, automatic).
- [ ] Email DNS records added at Cloudflare:
  - [ ] SPF record (`v=spf1 include:sendgrid.net ~all`)
  - [ ] DKIM CNAMEs (SendGrid provides three CNAMEs after Sender Authentication setup)
  - [ ] DMARC record (`v=DMARC1; p=none; rua=mailto:...`) — start in monitor mode

**Exit criteria:** Domain resolves over HTTPS, mail records are live, SendGrid sees the domain as verified.

---

## Phase 3 — SendGrid Verified (🟡 requires Phase 2)

- [ ] In SendGrid: Settings → Sender Authentication → Authenticate Your Domain → `torqcymru.co.uk`.
- [ ] DNS CNAMEs from previous phase propagate; SendGrid confirms domain authenticated.
- [ ] Create sender identity: `noreply@torqcymru.co.uk` (or `bookings@torqcymru.co.uk` — decide).
- [ ] Verify sender (SendGrid sends a confirmation email; click the link).
- [ ] Generate **restricted-scope** API key (Mail Send permission only — not Full Access).
- [ ] **Store the API key in a chmod-600 local file** (e.g. `~/.torq/sendgrid.key`). **Never** print to terminal where it'd land in transcript.
- [ ] Verify the key works: a single `curl` test from local terminal sending a test email to your own inbox. **Do not paste the key into chat.**

**Exit criteria:** Domain authenticated, sender verified, key exists locally and proven to work.

---

## Phase 4 — Firebase Function Implementation (🔴 requires Phase 3 + explicit approval)

This is the first phase that touches code. Treat as a controlled implementation step.

- [ ] Create `functions/` directory in Firebase project (separate location from website repo — likely `~/Desktop/torq-repo` per existing project structure).
- [ ] `firebase init functions` if not already initialised.
- [ ] `npm install @sendgrid/mail` in `functions/`.
- [ ] Author `sendBookingEmails` function (Realtime Database `onCreate` trigger on `/jobs/{jobId}`).
- [ ] Function reads SendGrid key via `functions.config().sendgrid.key` — **never inline**.
- [ ] Set the config:
  ```
  firebase functions:config:set sendgrid.key="$(cat ~/.torq/sendgrid.key)"
  ```
  (Reads from file; does not echo the key.)
- [ ] Author both email templates (customer confirmation, owner alert) — plain text + minimal HTML.
- [ ] Local emulator test: `firebase emulators:start --only functions,database`.
- [ ] Write a test booking via emulator; confirm both emails are attempted (use SendGrid sandbox mode for the test).

**Exit criteria:** Function works in local emulator with sandboxed SendGrid. No production deploy yet.

---

## Phase 5 — Test Booking (🔴 requires Phase 4 + explicit approval)

First contact with real SendGrid + real Firebase. Still no public-facing change.

- [ ] Deploy function to **Firebase** (not Netlify — this is independent):
  ```
  firebase deploy --only functions:sendBookingEmails
  ```
- [ ] Submit one test booking using a personal email and a personal phone number.
- [ ] Verify customer confirmation email arrives (check spam folder too).
- [ ] Verify owner alert email arrives at `torqcymruautomotive@gmail.com`.
- [ ] Check Firebase Cloud Function logs — no errors.
- [ ] Check SendGrid Activity feed — both emails delivered.
- [ ] Confirm the booking write still succeeds in Firebase even if SendGrid were to fail (test by temporarily breaking the key — booking should still land).
- [ ] Delete test booking from Firebase.

**Exit criteria:** Two real emails delivered cleanly, no spam-foldering, no function errors, isolation confirmed.

---

## Phase 6 — Production Activation (🔴 requires Phase 5 + explicit approval)

This is the live cutover. No website file changes are required for the email flow itself — the function listens to existing writes.

- [ ] Confirm Phase 5 has been clean for at least one real-world cycle.
- [ ] Set Firebase budget alert (e.g. £5/month) and SendGrid usage alert.
- [ ] Confirm SendGrid daily quota covers expected booking volume × 2 emails per booking.
- [ ] **Announce active monitoring window** — first 48 hours, check function logs and SendGrid activity daily.
- [ ] No `netlify deploy --prod` needed unless website content changed alongside.
- [ ] If website changes did stack up: standard pre-deploy verification (3 breakpoints, console clean, links work, no placeholder copy) → `netlify deploy` (preview) → review → `netlify deploy --prod`.

**Exit criteria:** Live bookings produce live emails. Logs clean. Customers receive confirmation. Owner receives alert.

---

## Phase 7 — Later Twilio / WhatsApp Options (🔴 separate future phase)

Do not start until Phase 6 has been stable for at least one calendar month and Shane explicitly opens this phase.

### Option A — WhatsApp Click-to-Chat (lightest)
- [ ] Add `https://wa.me/442922523485` as an additional CTA option somewhere in the contact stack.
- [ ] No API. No backend. Pure deep link. Reversible in one commit.

### Option B — Twilio SMS confirmation
- [ ] Purchase UK Twilio number.
- [ ] Complete A2P 10DLC / UK regulatory registration (Twilio guides through this).
- [ ] Same architecture as email: Firebase Cloud Function adds Twilio SDK, sends SMS alongside the SendGrid emails on `/jobs` create.
- [ ] Same secret-handling rules apply (Account SID + Auth Token via `firebase functions:config:set`, never inline).

### Option C — WhatsApp Business API
- [ ] Verify Meta business account.
- [ ] Apply for WhatsApp Business API access (via Twilio or Meta direct).
- [ ] Submit message templates for approval (24-hour window rules apply).
- [ ] Heaviest setup; defer unless customer demand justifies it.

**Exit criteria:** Whichever option is chosen, mirrors Phases 4–6 in structure (implement → test → activate, with explicit approval at each gate).

---

## Universal Rules (Apply to Every Phase)

- No phase starts without explicit Shane approval at the gate.
- No phase merges with another. One phase per session.
- No secrets printed, pasted, committed, or shared.
- No `netlify deploy --prod` unless the phase explicitly calls for it.
- Every phase has a rollback: the website continues working even if the entire messaging layer fails.
- Update this checklist as phases complete (tick the boxes). Treat it as the source of truth.
