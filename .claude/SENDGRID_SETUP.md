# SendGrid Setup — Step-by-Step

## 1. Create SendGrid Account (5 min)

Go to: https://sendgrid.com/

- Click "Sign Up" → Free tier (100 emails/day, plenty for startup volume)
- Email: (your email)
- Password: (create)
- Company: TORQ Cymru
- Confirm email
- Login

---

## 2. Create API Key (2 min)

Once logged in:

1. Left sidebar → **Settings** → **API Keys**
2. Click **Create API Key**
3. Name: `torq-cymru-firebase`
4. **Full Access** (or select: Mail Send)
5. Create and Copy
6. **SAVE THIS IMMEDIATELY** — you'll only see it once

Example format: `SG.xxxxxxxxxxxxx...`

---

## 3. Verify Sender Email (10 min)

**Critical:** SendGrid requires you to verify the sender email before emails can be sent.

1. Left sidebar → **Settings** → **Sender Authentication**
2. Click **Verify a Sender** (or **Create**)
3. Enter:
   - From Email: `noreply@torqcymru.co.uk` (use your actual domain)
   - From Name: `TORQ Cymru`
   - Reply-To: `hello@torqcymru.co.uk` (partner email)
4. Click **Create**
5. SendGrid sends a verification email to `noreply@torqcymru.co.uk`
6. **Check that mailbox** → click verification link in email
7. Status should show ✅ Verified

**If you don't own the domain:**
- Use a free sender email for now (e.g., `hello@torqcymru.co.uk` if that's verified)
- Update the Cloud Function code to use that email

---

## 4. Get Partner Email

Before deploying the Cloud Function, confirm:
- **Customer confirmation sends to:** booking form email field ✓
- **Partner alert sends to:** `hello@torqcymru.co.uk` (or actual business email)

If different, update line 76 in `FIREBASE_CLOUD_FUNCTION.js`:
```javascript
to: 'YOUR_ACTUAL_PARTNER_EMAIL@domain.com',
```

---

## Summary

You now have:
- ✅ SendGrid account
- ✅ API Key (save it!)
- ✅ Verified sender email
- ✅ Partner email address

**Ready for deployment in next session.**

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Invalid API Key" | Check you copied the full key without spaces |
| Emails go to spam | Add SPF/DKIM records (SendGrid shows these in Sender Authentication) |
| "Sender not verified" | Make sure you clicked the verification link in the email SendGrid sent |
| 403 Forbidden | API key might be restricted — regenerate with "Full Access" |
