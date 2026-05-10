# Phone Number Swap — Quick Reference

**When:** Session 11, after Cloud Function is deployed

**What:** Replace placeholder `tel:+441234567890` with real TORQ Cymru phone number

---

## One-Command Swap

```bash
cd /Users/shanestokes/Desktop/my-business-site

# Replace in both files
sed -i '' 's/tel:+441234567890/tel:YOUR_REAL_NUMBER/g' index.html
sed -i '' 's/tel:+441234567890/tel:YOUR_REAL_NUMBER/g' services.html

# Verify
grep -n "tel:+44" index.html
grep -n "tel:+44" services.html
```

Replace `YOUR_REAL_NUMBER` with actual number (e.g., `+447700900123`)

---

## Manual Swap (if needed)

If commands above don't work:

1. Open `index.html` in text editor
2. Find → Replace: `tel:+441234567890` → `tel:+447700900123`
3. Replace All (should find 3+ instances)
4. Save
5. Repeat for `services.html`
6. Verify: `grep -n "tel:+44" index.html services.html`

---

## Verification

After swap, you should see:

```
index.html:284:      <a href="tel:+447700900123" ...
index.html:318:      <a href="tel:+447700900123" ...
index.html:899:        <a href="tel:+447700900123" ...
services.html:... (3+ matches)
```

No `+441234567890` should remain in either file.

---

## Test

1. Open http://localhost:8000 in browser
2. Click "Call Us" button
3. Phone should dial (or show dial prompt if not on phone)
4. Number should be correct

✅ Done.
