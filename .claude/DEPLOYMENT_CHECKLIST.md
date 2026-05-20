# Session 11 Deployment Checklist

**Execute in this order. Do not skip steps. Check off as you go.**

---

## PRE-FLIGHT (Before any code changes)

- [ ] Have SendGrid API key ready (from `SENDGRID_SETUP.md`)
- [ ] Confirm partner email address (where alert emails go)
- [ ] Confirm real phone number (to swap into code)
- [ ] Read all files in `.claude/` (this checklist, setup guide, Cloud Function code)

---

## STEP 1: Set Environment Variable in Firebase

In Firebase Console:

1. Go to **Functions** → **Environment**
2. Click **Set Environment Variable**
3. Name: `SENDGRID_API_KEY`
4. Value: (paste your SendGrid API key from step 2 above)
5. Click Save

✅ **Verified:** You see the variable listed

---

## STEP 2: Update Cloud Function Code

In Firebase Console → Functions → Create/Edit `sendBookingEmails`:

1. Replace entire `index.js` with code from `.claude/FIREBASE_CLOUD_FUNCTION.js`
2. Search-and-replace these placeholders:
   - `noreply@torqcymru.co.uk` → your verified SendGrid sender email
   - `hello@torqcymru.co.uk` → actual partner email (line 76)
   - `+44 [PHONE_NUMBER]` → real phone number in customer email (line 137)
3. Run `npm install @sendgrid/mail` in functions directory
4. Click **Deploy**

✅ **Verified:** Deploy succeeds, no errors in logs

---

## STEP 3: Swap Phone Number in Website — ✅ COMPLETE

Live source already uses `tel:+442922523485` (029 2252 3485) across `index.html` and `services.html`. No swap required.

To verify current state:

```bash
cd /Users/shanestokes/Desktop/my-business-site
grep -n "tel:+44" index.html services.html
```

Expected: all hits show `tel:+442922523485`; no `tel:+441234567890` placeholder remains in live source.

---

## STEP 4: Test Booking Form → Firebase → Email

1. Open http://localhost:8000/index.html#booking in browser
2. Fill out booking form:
   - Name: `Test User`
   - Phone: `07700900123`
   - Email: (your email so you can receive the confirmation)
   - Postcode: `CF10 1AA`
   - Vehicle: any make/model
   - Service: select at least one (required)
   - Preferred Date: (optional)
3. Click **Request Booking →**
4. You should see success message: **"Booked. Confirmed."**
5. Check:
   - Firebase Console → Realtime Database → `/jobs` → new entry present ✓
   - Your email inbox → customer confirmation email arrived ✓
   - Partner email inbox → alert email arrived ✓

✅ **Verified:** All 3 checkpoints pass

---

## STEP 5: Production Deploy

Once Step 4 passes:

```bash
cd /Users/shanestokes/Desktop/my-business-site

# Test preview first
netlify deploy

# If preview looks good, go live
netlify deploy --prod
```

✅ **Verified:** Deploy completes, preview/live URL works, all links clickable

---

## STEP 6: Final QA on Live Site

Visit the live URL:

- [ ] Nav links work (Services, Why TORQ, Recent Work, Reviews, Coverage)
- [ ] Mobile hamburger menu opens/closes
- [ ] Booking form loads
- [ ] CTA buttons clickable (Book, Call)
- [ ] Phone number correct on all pages
- [ ] No console errors (F12 → Console tab)

---

## DONE

Site is live with email notifications. **Congratulations!** 🚀

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "Invalid API Key" in Cloud Function logs | Check you pasted the full SendGrid key with no spaces |
| Customer email arrives in spam | Add SPF/DKIM (SendGrid provides these) or use verified domain |
| Partner email never arrives | Check email address in line 76 of Cloud Function is correct |
| "Function deployment failed" | Check `npm install @sendgrid/mail` ran successfully |
| Booking form shows error but no email sent | Check Firebase logs (Functions → Logs) for detailed error |

---

## Environment Variables to Save

For future deployments, save:
- SendGrid API Key: `SG.xxxxx...`
- SendGrid Sender Email: `noreply@torqcymru.co.uk`
- Partner Email: `hello@torqcymru.co.uk`
- TORQ Phone: `+447700900123`

---

**Next session: Copy MASTER_OPENING_PROMPT.md, provide SendGrid key + phone number, execute this checklist.**
