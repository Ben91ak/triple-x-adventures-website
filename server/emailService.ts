import nodemailer, { SentMessageInfo } from 'nodemailer';
import { type Contact } from '@shared/schema';
import { type Adventure } from '@shared/schema';

// Extend the SentMessageInfo to include the previewUrl for Ethereal
interface ExtendedSentMessageInfo extends SentMessageInfo {
  previewUrl?: string;
}

// Create a transporter for sending emails
// For production, you would use real SMTP settings
// For testing, we'll use a test account
const createTransporter = async () => {
  // For testing purposes only - in production, use real SMTP settings
  // This is a fallback mechanism when no SMTP settings are provided
  try {
    // Use environment variables for SMTP settings if available
    if (process.env.SMTP_HOST && process.env.SMTP_PORT) {
      return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    }

    // Fallback to Ethereal for development/testing
    const testAccount = await nodemailer.createTestAccount();
    
    // Create a test SMTP transporter
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } catch (error) {
    console.error('Failed to create email transporter:', error);
    throw new Error('Email service configuration failed');
  }
};

export const sendContactEmail = async (contact: Contact): Promise<{ success: boolean; message: string; previewUrl?: string }> => {
  try {
    const transporter = await createTransporter();
    
    // Format interests for better readability
    const formattedInterests = (contact.interests || []).join(', ');
    
    // Construct email content
    const mailOptions = {
      from: '"Triple X Adventures Website" <no-reply@triple-x-adventures.com>',
      to: 'info@triple-x-adventures.com',
      subject: `New Contact Form Submission from ${contact.firstName} ${contact.lastName}`,
      text: `
Contact Information:
-------------------
Name: ${contact.firstName} ${contact.lastName}
Email: ${contact.email}
Phone: ${contact.phone || 'Not provided'}
Preferred Visit Date: ${contact.visitDate || 'Not specified'}

Interests: ${formattedInterests || 'None selected'}

Message:
${contact.message || 'No message provided'}

This email was sent automatically from the Triple X Adventures website contact form.
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #38863C;">New Contact Form Submission</h2>
  
  <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
    <h3 style="margin-top: 0;">Contact Information</h3>
    <p><strong>Name:</strong> ${contact.firstName} ${contact.lastName}</p>
    <p><strong>Email:</strong> ${contact.email}</p>
    <p><strong>Phone:</strong> ${contact.phone || 'Not provided'}</p>
    <p><strong>Preferred Visit Date:</strong> ${contact.visitDate || 'Not specified'}</p>
  </div>
  
  <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
    <h3 style="margin-top: 0;">Selected Interests</h3>
    <p>${formattedInterests || 'None selected'}</p>
  </div>
  
  <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
    <h3 style="margin-top: 0;">Message</h3>
    <p>${contact.message ? contact.message.replace(/\n/g, '<br>') : 'No message provided'}</p>
  </div>
  
  <p style="font-size: 12px; color: #666; margin-top: 30px;">
    This email was sent automatically from the Triple X Adventures website contact form.
  </p>
</div>
      `,
    };
    
    // Send the email
    const info = await transporter.sendMail(mailOptions) as SentMessageInfo & { previewUrl?: string };
    
    console.log('Contact form email sent successfully');
    
    // For test accounts, include the preview URL
    if (info.messageId && info.previewUrl) {
      console.log('Preview URL: %s', info.previewUrl);
      return { 
        success: true, 
        message: 'Email sent successfully', 
        previewUrl: info.previewUrl
      };
    }
    
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return { success: false, message: 'Failed to send email' };
  }
};

export const sendAdventureEmail = async (adventure: Adventure): Promise<{ success: boolean; message: string; previewUrl?: string }> => {
  try {
    const transporter = await createTransporter();
    
    // Format selected options for better readability
    const formattedPackages = (adventure.selectedPackages || []).join(', ');
    const formattedAccommodations = (adventure.selectedAccommodations || []).join(', ');
    const formattedActivities = (adventure.selectedActivities || []).join(', ');
    
    // Construct email content
    const mailOptions = {
      from: '"Triple X Adventures Website" <no-reply@triple-x-adventures.com>',
      to: 'info@triple-x-adventures.com',
      subject: `New Adventure Package Request from ${adventure.firstName} ${adventure.lastName}`,
      text: `
Adventure Package Request:
-------------------------
Name: ${adventure.firstName} ${adventure.lastName}
Email: ${adventure.email}
Phone: ${adventure.phone || 'Not provided'}
Preferred Language: ${adventure.preferredLanguage}

Travel Information:
-----------------
Start Date: ${adventure.startDate || 'Not specified'}
End Date: ${adventure.endDate || 'Not specified'}
Departure Airport: ${adventure.departureAirport}
Group Size: ${adventure.groupSize} persons

Selected Packages: ${formattedPackages || 'None selected'}
Selected Accommodations: ${formattedAccommodations || 'None selected'}
Selected Activities: ${formattedActivities || 'None selected'}

Additional Requests:
${adventure.additionalRequests || 'No additional requests provided'}

This email was sent automatically from the Triple X Adventures website adventure package form.
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #38863C;">New Adventure Package Request</h2>
  
  <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
    <h3 style="margin-top: 0;">Contact Information</h3>
    <p><strong>Name:</strong> ${adventure.firstName} ${adventure.lastName}</p>
    <p><strong>Email:</strong> ${adventure.email}</p>
    <p><strong>Phone:</strong> ${adventure.phone || 'Not provided'}</p>
    <p><strong>Preferred Language:</strong> ${adventure.preferredLanguage}</p>
  </div>
  
  <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
    <h3 style="margin-top: 0;">Travel Information</h3>
    <p><strong>Start Date:</strong> ${adventure.startDate || 'Not specified'}</p>
    <p><strong>End Date:</strong> ${adventure.endDate || 'Not specified'}</p>
    <p><strong>Departure Airport:</strong> ${adventure.departureAirport}</p>
    <p><strong>Group Size:</strong> ${adventure.groupSize} persons</p>
  </div>
  
  <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
    <h3 style="margin-top: 0;">Selected Packages</h3>
    <p>${formattedPackages || 'None selected'}</p>
  </div>
  
  <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
    <h3 style="margin-top: 0;">Selected Accommodations</h3>
    <p>${formattedAccommodations || 'None selected'}</p>
  </div>
  
  <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
    <h3 style="margin-top: 0;">Selected Activities</h3>
    <p>${formattedActivities || 'None selected'}</p>
  </div>
  
  <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
    <h3 style="margin-top: 0;">Additional Requests</h3>
    <p>${adventure.additionalRequests ? adventure.additionalRequests.replace(/\n/g, '<br>') : 'No additional requests provided'}</p>
  </div>
  
  <p style="font-size: 12px; color: #666; margin-top: 30px;">
    This email was sent automatically from the Triple X Adventures website adventure package form.
  </p>
</div>
      `,
    };
    
    // Send the email
    const info = await transporter.sendMail(mailOptions) as SentMessageInfo & { previewUrl?: string };
    
    console.log('Adventure package email sent successfully');
    
    // For test accounts, include the preview URL
    if (info.messageId && info.previewUrl) {
      console.log('Preview URL: %s', info.previewUrl);
      return { 
        success: true, 
        message: 'Email sent successfully', 
        previewUrl: info.previewUrl
      };
    }
    
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Failed to send adventure email:', error);
    return { success: false, message: 'Failed to send email' };
  }
};