/**
 * TORQ Cymru — Firebase Cloud Function: Send Email on New Booking
 *
 * Trigger: Realtime Database `/jobs` → onWrite
 * Action: Send 2 emails (customer confirmation + partner alert) via SendGrid
 *
 * Setup:
 * 1. Create in Firebase Console → Functions → Create Function
 * 2. Replace this code in index.js
 * 3. Set environment variable: SENDGRID_API_KEY (from SendGrid console)
 * 4. Deploy with: firebase deploy --only functions
 * 5. Test: create new booking from booking form
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Cloud Function: Sends emails when new booking created in /jobs
 */
exports.sendBookingEmails = functions.database
  .ref('/jobs/{jobId}')
  .onCreate(async (snapshot, context) => {
    try {
      const booking = snapshot.val();
      const jobId = context.params.jobId;

      // Validate required fields
      if (!booking.name || !booking.email || !booking.phone) {
        console.log('Incomplete booking data, skipping email:', jobId);
        return null;
      }

      // Prepare email data
      const customerEmail = booking.email;
      const customerName = booking.name;
      const vehicleInfo = `${booking.year} ${booking.make} ${booking.model}`.trim();
      const serviceRequested = Array.isArray(booking.services)
        ? booking.services.join(', ')
        : booking.services || 'Unspecified';
      const preferredDate = booking.preferredDate || 'No preference';

      // 1. Send Customer Confirmation Email
      const customerEmailData = {
        to: customerEmail,
        from: 'noreply@torqcymru.co.uk', // Change to your verified SendGrid sender
        subject: 'Booking Confirmed — TORQ Cymru',
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #C1121F; color: white; padding: 20px; text-align: center; border-radius: 4px; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { padding: 20px 0; }
    .section { margin: 20px 0; }
    .label { font-weight: bold; color: #111111; margin-top: 12px; }
    .value { color: #666; margin-top: 4px; }
    .footer { border-top: 1px solid #eee; margin-top: 20px; padding-top: 20px; font-size: 12px; color: #999; text-align: center; }
    .cta { background: #C1121F; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Booking Confirmed</h1>
      <p>Thank you for choosing TORQ Cymru</p>
    </div>

    <div class="content">
      <p>Hi ${customerName},</p>

      <p>Your booking request has been received. We'll contact you within 24 hours to confirm your appointment and discuss your vehicle's needs.</p>

      <div class="section">
        <div class="label">Your Details:</div>
        <div class="value">
          <p><strong>Vehicle:</strong> ${vehicleInfo}</p>
          <p><strong>Service:</strong> ${serviceRequested}</p>
          <p><strong>Preferred Date:</strong> ${preferredDate}</p>
          <p><strong>Contact:</strong> ${booking.phone}</p>
        </div>
      </div>

      <div class="section">
        <p>In the meantime, if you have any questions, reply to this email or call us at <strong>+44 [PHONE_NUMBER]</strong>.</p>
        <p>We look forward to serving you.</p>
      </div>

      <p><strong>TORQ Cymru</strong><br>
      Premium Mobile Mechanics — South Wales<br>
      <a href="https://torqcymru.co.uk">torqcymru.co.uk</a></p>
    </div>

    <div class="footer">
      <p>This is an automated email. Please do not reply to this address.</p>
    </div>
  </div>
</body>
</html>
        `,
      };

      // 2. Send Partner Alert Email
      const partnerEmailData = {
        to: 'hello@torqcymru.co.uk', // Change to actual partner email
        from: 'noreply@torqcymru.co.uk',
        subject: `New Booking: ${customerName}`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #C1121F; color: white; padding: 20px; text-align: center; border-radius: 4px; }
    .header h1 { margin: 0; font-size: 20px; }
    .content { padding: 20px; background: #f9f9f9; border-radius: 4px; margin-top: 20px; }
    .field { margin: 10px 0; }
    .label { font-weight: bold; color: #111111; }
    .value { color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Booking Alert</h1>
    </div>

    <div class="content">
      <div class="field">
        <span class="label">Customer Name:</span><br>
        <span class="value">${customerName}</span>
      </div>

      <div class="field">
        <span class="label">Phone:</span><br>
        <span class="value">${booking.phone}</span>
      </div>

      <div class="field">
        <span class="label">Email:</span><br>
        <span class="value">${customerEmail}</span>
      </div>

      <div class="field">
        <span class="label">Postcode:</span><br>
        <span class="value">${booking.postcode || 'Not provided'}</span>
      </div>

      <div class="field">
        <span class="label">Vehicle:</span><br>
        <span class="value">${vehicleInfo}</span>
      </div>

      <div class="field">
        <span class="label">Reg:</span><br>
        <span class="value">${booking.reg || 'Not provided'}</span>
      </div>

      <div class="field">
        <span class="label">Service Requested:</span><br>
        <span class="value">${serviceRequested}</span>
      </div>

      <div class="field">
        <span class="label">Preferred Date:</span><br>
        <span class="value">${preferredDate}</span>
      </div>

      <div class="field">
        <span class="label">Fuel Type:</span><br>
        <span class="value">${booking.fuel || 'Not provided'}</span>
      </div>

      <div class="field">
        <span class="label">Notes:</span><br>
        <span class="value">${booking.notes || 'None'}</span>
      </div>

      <div class="field">
        <span class="label">Booking ID:</span><br>
        <span class="value" style="font-family: monospace; font-size: 12px;">${jobId}</span>
      </div>
    </div>
  </div>
</body>
</html>
        `,
      };

      // Send both emails in parallel
      await Promise.all([
        sgMail.send(customerEmailData),
        sgMail.send(partnerEmailData),
      ]);

      console.log(`✅ Emails sent for booking ${jobId}`);
      return { success: true, jobId };

    } catch (error) {
      console.error('❌ Error sending emails:', error);
      // Don't throw — log and continue to avoid blocking the booking write
      return { error: error.message };
    }
  });
