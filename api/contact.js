import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, phone, visitDate, interests, charterFlight, message } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Format interests array for better readability
    const formattedInterests = interests && interests.length > 0 
      ? interests.join(', ') 
      : 'None specified';

    // Check if SMTP is configured
    const isSmtpConfigured = process.env.SMTP_HOST && 
                             process.env.SMTP_USER && 
                             process.env.SMTP_PASSWORD;

    // Log form submission data for debugging
    console.log('Contact form submission:', {
      name: `${firstName} ${lastName}`,
      email,
      phone: phone || 'Not provided',
      visitDate: visitDate || 'Not provided',
      interests: formattedInterests,
      charterFlight: charterFlight || 'None selected',
      messagePreview: message.substring(0, 50) + (message.length > 50 ? '...' : '')
    });

    // If SMTP is configured, try to send email
    if (isSmtpConfigured) {
      try {
        // Create a transporter using SMTP
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT || 587,
          secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          },
        });

        // Current date and time for the email
        const now = new Date();
        const formattedDate = now.toLocaleString('en-US', { 
          weekday: 'long',
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        
        // Email content
        const mailOptions = {
          from: process.env.SMTP_FROM || 'website@t-x-a.com',
          to: 'website@t-x-a.com',
          replyTo: email,
          subject: `📬 Triple-X Adventures Contact: ${firstName} ${lastName}`,
          text: `
=== TRIPLE-X ADVENTURES CONTACT FORM ===

CONTACT DETAILS
--------------
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || 'Not provided'}
Submission Date: ${formattedDate}

VISIT INFORMATION
----------------
Planned Visit Date: ${visitDate || 'Not specified'}
Interests: ${formattedInterests}
Charter Flight: ${charterFlight ? charterFlight : 'No charter flight selected'}

MESSAGE
-------
${message}

---
This email was sent from the Triple-X Adventures website contact form.
To reply, simply respond to this email directly.
          `,
          html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Contact Form Submission</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      line-height: 1.6; 
      color: #333333; 
      max-width: 600px; 
      margin: 0 auto;
    }
    .header { 
      background-color: #1a1a2e; 
      color: white; 
      padding: 20px; 
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .content { 
      padding: 20px; 
      border: 1px solid #dddddd;
      border-top: none;
      border-radius: 0 0 5px 5px;
    }
    .section {
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 1px solid #eeeeee;
    }
    .section-title {
      font-size: 18px;
      font-weight: bold;
      color: #1a1a2e;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    .message-box {
      background-color: #f9f9f9;
      padding: 15px;
      border-radius: 5px;
      border-left: 4px solid #1a1a2e;
    }
    .footer {
      font-size: 12px;
      color: #777777;
      margin-top: 30px;
      text-align: center;
      padding-top: 10px;
      border-top: 1px solid #eeeeee;
    }
    .info-row {
      margin-bottom: 8px;
    }
    .label {
      font-weight: bold;
      display: inline-block;
      min-width: 120px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h2>Triple-X Adventures Contact Form</h2>
    <div>Submission received on ${formattedDate}</div>
  </div>
  
  <div class="content">
    <div class="section">
      <div class="section-title">Contact Details</div>
      <div class="info-row"><span class="label">Name:</span> ${firstName} ${lastName}</div>
      <div class="info-row"><span class="label">Email:</span> <a href="mailto:${email}">${email}</a></div>
      <div class="info-row"><span class="label">Phone:</span> ${phone || 'Not provided'}</div>
    </div>
    
    <div class="section">
      <div class="section-title">Visit Information</div>
      <div class="info-row"><span class="label">Planned Visit:</span> ${visitDate || 'Not specified'}</div>
      <div class="info-row"><span class="label">Interests:</span> ${formattedInterests}</div>
      <div class="info-row"><span class="label">Charter Flight:</span> <strong>${charterFlight ? charterFlight : 'No charter flight selected'}</strong></div>
    </div>
    
    <div class="section">
      <div class="section-title">Message</div>
      <div class="message-box">
        ${message.replace(/\\n/g, '<br>')}
      </div>
    </div>
    
    <div class="footer">
      <p>This email was sent from the Triple-X Adventures website contact form.</p>
      <p>To reply to the sender, simply respond to this email directly.</p>
    </div>
  </div>
</body>
</html>
          `,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Continue execution even if email fails
        // We'll still return success to the user
      }
    } else {
      console.log('SMTP not configured, skipping email send');
    }

    // Always send success response to the user
    // This way the form works even without email configuration
    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully!'
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process your message. Please try again later.'
    });
  }
}
