import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      startDate, 
      endDate, 
      departureAirport,
      groupSize,
      selectedPackages,
      selectedAccommodations,
      selectedActivities,
      additionalRequests,
      preferredLanguage
    } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !departureAirport) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Format arrays for better readability
    const formatArray = (arr) => arr && arr.length > 0 ? arr.join(', ') : 'None specified';
    
    const formattedPackages = formatArray(selectedPackages);
    const formattedAccommodations = formatArray(selectedAccommodations);
    const formattedActivities = formatArray(selectedActivities);

    // Check if SMTP is configured
    const isSmtpConfigured = process.env.SMTP_HOST && 
                             process.env.SMTP_USER && 
                             process.env.SMTP_PASSWORD;

    // Log form submission data for debugging
    console.log('Adventure form submission:', {
      name: `${firstName} ${lastName}`,
      email,
      phone: phone || 'Not provided',
      travelDates: `${startDate || 'Not specified'} to ${endDate || 'Not specified'}`,
      departureAirport,
      groupSize,
      preferredLanguage,
      packages: formattedPackages,
      accommodations: formattedAccommodations,
      activities: formattedActivities,
      requestsPreview: additionalRequests ? 
        (additionalRequests.substring(0, 50) + (additionalRequests.length > 50 ? '...' : '')) : 'None'
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
          subject: `🏔️ Triple-X Adventures Booking: ${firstName} ${lastName}`,
          text: `
=== TRIPLE-X ADVENTURES BOOKING REQUEST ===

CONTACT DETAILS
--------------
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || 'Not provided'}
Submission Date: ${formattedDate}

TRIP DETAILS
-----------
Travel Dates: ${startDate || 'Not specified'} to ${endDate || 'Not specified'}
Departure Airport: ${departureAirport}
Group Size: ${groupSize}
Preferred Language: ${preferredLanguage}

SELECTED PACKAGES
----------------
${formattedPackages}

SELECTED ACCOMMODATIONS
---------------------
${formattedAccommodations}

SELECTED ACTIVITIES
-----------------
${formattedActivities}

ADDITIONAL REQUESTS
-----------------
${additionalRequests || 'None'}

---
This email was sent from the Triple-X Adventures website booking form.
To reply, simply respond to this email directly.
          `,
          html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Adventure Booking Request</title>
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
      min-width: 150px;
    }
    .selection-list {
      background-color: #f5f5f5;
      padding: 10px 15px;
      border-radius: 4px;
      margin-top: 5px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h2>Triple-X Adventures Booking Request</h2>
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
      <div class="section-title">Trip Details</div>
      <div class="info-row"><span class="label">Travel Dates:</span> ${startDate || 'Not specified'} to ${endDate || 'Not specified'}</div>
      <div class="info-row"><span class="label">Departure Airport:</span> ${departureAirport}</div>
      <div class="info-row"><span class="label">Group Size:</span> ${groupSize}</div>
      <div class="info-row"><span class="label">Preferred Language:</span> ${preferredLanguage}</div>
    </div>
    
    <div class="section">
      <div class="section-title">Selected Packages</div>
      <div class="selection-list">${formattedPackages}</div>
    </div>
    
    <div class="section">
      <div class="section-title">Selected Accommodations</div>
      <div class="selection-list">${formattedAccommodations}</div>
    </div>
    
    <div class="section">
      <div class="section-title">Selected Activities</div>
      <div class="selection-list">${formattedActivities}</div>
    </div>
    
    <div class="section">
      <div class="section-title">Additional Requests</div>
      <div class="message-box">
        ${additionalRequests ? additionalRequests.replace(/\\n/g, '<br>') : 'None'}
      </div>
    </div>
    
    <div class="footer">
      <p>This email was sent from the Triple-X Adventures website booking form.</p>
      <p>To reply to the sender, simply respond to this email directly.</p>
    </div>
  </div>
</body>
</html>
          `,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Adventure email sent successfully');
      } catch (emailError) {
        console.error('Error sending adventure email:', emailError);
        // Continue execution even if email fails
        // We'll still return success to the user
      }
    } else {
      console.log('SMTP not configured, skipping adventure email send');
    }

    // Always send success response to the user
    // This way the form works even without email configuration
    return res.status(200).json({
      success: true,
      message: 'Your adventure request has been submitted successfully!'
    });
  } catch (error) {
    console.error('Error processing adventure form:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process your request. Please try again later.'
    });
  }
}
