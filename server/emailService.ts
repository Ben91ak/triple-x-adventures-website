import nodemailer, { SentMessageInfo } from 'nodemailer';
import { type Contact } from '@shared/schema';
import { type Adventure } from '@shared/schema';
import DOMPurify from 'dompurify';
import { createHash } from 'crypto';

// Extend the SentMessageInfo to include the previewUrl for Ethereal
interface ExtendedSentMessageInfo extends SentMessageInfo {
  previewUrl?: string;
}

// Sanitize input for email content to prevent XSS and email injection
const sanitizeForEmail = (input: string | null | undefined): string => {
  if (!input) return '';
  return DOMPurify.sanitize(input.trim());
};

// Hash sensitive data for logging
const hashForLogging = (value: string): string => {
  return createHash('sha256').update(value).digest('hex').substring(0, 8) + '...';
};

// Create a transporter for sending emails
// For production, we would use real SMTP settings
// For testing, we'll use a test account
const createTransporter = async () => {
  // For testing purposes only - in production, use real SMTP settings
  // This is a fallback mechanism when no SMTP settings are provided
  try {
    // Use environment variables for SMTP settings if available
    if (process.env.EMAIL_HOST && process.env.EMAIL_PORT) {
      // Log email configuration without exposing credentials
      console.log(`Using configured email settings: ${process.env.EMAIL_HOST}:${process.env.EMAIL_PORT}`);
      if (process.env.EMAIL_USER) {
        console.log(`Email user: ${process.env.EMAIL_USER}`);
      }
      
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT),
        secure: parseInt(process.env.EMAIL_PORT) === 465, // Auto-detect secure based on port
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        // Add TLS options for security
        tls: {
          // Reject unauthorized certificates in production
          rejectUnauthorized: process.env.NODE_ENV === 'production',
          // Minimum TLS version
          minVersion: 'TLSv1.2'
        }
      });
    }

    console.log('No email configuration found, using test account');
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
    
    // Sanitize all input fields to prevent email injection and XSS
    const sanitizedFirstName = sanitizeForEmail(contact.firstName);
    const sanitizedLastName = sanitizeForEmail(contact.lastName);
    const sanitizedEmail = sanitizeForEmail(contact.email);
    const sanitizedPhone = sanitizeForEmail(contact.phone || '');
    const sanitizedVisitDate = sanitizeForEmail(contact.visitDate || '');
    const sanitizedMessage = sanitizeForEmail(contact.message || '');
    
    // Format interests for better readability, sanitizing each item
    const sanitizedInterests = (contact.interests || []).map(interest => sanitizeForEmail(interest));
    const formattedInterests = sanitizedInterests.join(', ');
    
    // Log email sending with masked personal information
    console.log(`Sending contact form email for ${sanitizedFirstName} ${sanitizedLastName.charAt(0)}. (${hashForLogging(contact.email)})`); 
    
    // Construct email content with sanitized inputs
    const mailOptions = {
      from: `"Triple X Adventures Website" <${process.env.EMAIL_USER || 'no-reply@triple-x-adventures.com'}>`,
      to: 'info@triple-x-adventures.com',
      subject: `New Contact Form Submission from ${sanitizedFirstName} ${sanitizedLastName}`,
      text: `
Contact Information:
-------------------
Name: ${sanitizedFirstName} ${sanitizedLastName}
Email: ${sanitizedEmail}
Phone: ${sanitizedPhone || 'Not provided'}
Preferred Visit Date: ${sanitizedVisitDate || 'Not specified'}

Interests: ${formattedInterests || 'None selected'}

Message:
${sanitizedMessage || 'No message provided'}

This email was sent automatically from the Triple X Adventures website contact form.
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #38863C;">New Contact Form Submission</h2>
  
  <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
    <h3 style="margin-top: 0;">Contact Information</h3>
    <p><strong>Name:</strong> ${sanitizedFirstName} ${sanitizedLastName}</p>
    <p><strong>Email:</strong> ${sanitizedEmail}</p>
    <p><strong>Phone:</strong> ${sanitizedPhone || 'Not provided'}</p>
    <p><strong>Preferred Visit Date:</strong> ${sanitizedVisitDate || 'Not specified'}</p>
  </div>
  
  <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
    <h3 style="margin-top: 0;">Selected Interests</h3>
    <p>${formattedInterests || 'None selected'}</p>
  </div>
  
  <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
    <h3 style="margin-top: 0;">Message</h3>
    <p>${sanitizedMessage ? sanitizedMessage.replace(/\n/g, '<br>') : 'No message provided'}</p>
  </div>
  
  <p style="font-size: 12px; color: #666; margin-top: 30px;">
    This email was sent automatically from the Triple X Adventures website contact form.
  </p>
</div>
      `,
      // Add security headers
      headers: {
        'X-Priority': '1', // High priority
        'X-MSMail-Priority': 'High',
        'Importance': 'High'
      }
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
    
    // Sanitize all input fields to prevent email injection and XSS
    const sanitizedFirstName = sanitizeForEmail(adventure.firstName);
    const sanitizedLastName = sanitizeForEmail(adventure.lastName);
    const sanitizedEmail = sanitizeForEmail(adventure.email);
    const sanitizedPhone = sanitizeForEmail(adventure.phone || '');
    const sanitizedStartDate = sanitizeForEmail(adventure.startDate || '');
    const sanitizedEndDate = sanitizeForEmail(adventure.endDate || '');
    const sanitizedDepartureAirport = sanitizeForEmail(adventure.departureAirport);
    const sanitizedPreferredLanguage = sanitizeForEmail(adventure.preferredLanguage);
    const sanitizedAdditionalRequests = sanitizeForEmail(adventure.additionalRequests || '');
    
    // Format selected options for better readability, sanitizing each item
    const sanitizedPackages = (adventure.selectedPackages || []).map(pkg => sanitizeForEmail(pkg));
    const sanitizedAccommodations = (adventure.selectedAccommodations || []).map(acc => sanitizeForEmail(acc));
    const sanitizedActivities = (adventure.selectedActivities || []).map(act => sanitizeForEmail(act));
    
    const formattedPackages = sanitizedPackages.join(', ');
    const formattedAccommodations = sanitizedAccommodations.join(', ');
    const formattedActivities = sanitizedActivities.join(', ');
    
    // Log email sending with masked personal information
    console.log(`Sending adventure package email for ${sanitizedFirstName} ${sanitizedLastName.charAt(0)}. (${hashForLogging(adventure.email)})`); 
    
    // Construct email content with sanitized inputs
    const mailOptions = {
      from: `"Triple X Adventures Website" <${process.env.EMAIL_USER || 'no-reply@triple-x-adventures.com'}>`,
      to: 'info@triple-x-adventures.com',
      subject: `New Adventure Package Request from ${sanitizedFirstName} ${sanitizedLastName}`,
      text: `
Adventure Package Request:
-------------------------
Name: ${sanitizedFirstName} ${sanitizedLastName}
Email: ${sanitizedEmail}
Phone: ${sanitizedPhone || 'Not provided'}
Preferred Language: ${sanitizedPreferredLanguage}

Travel Information:
-----------------
Start Date: ${sanitizedStartDate || 'Not specified'}
End Date: ${sanitizedEndDate || 'Not specified'}
Departure Airport: ${sanitizedDepartureAirport}
Group Size: ${adventure.groupSize} persons

Selected Packages: ${formattedPackages || 'None selected'}
Selected Accommodations: ${formattedAccommodations || 'None selected'}
Selected Activities: ${formattedActivities || 'None selected'}

Additional Requests:
${sanitizedAdditionalRequests || 'No additional requests provided'}

This email was sent automatically from the Triple X Adventures website adventure package form.
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #38863C;">New Adventure Package Request</h2>
  
  <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
    <h3 style="margin-top: 0;">Contact Information</h3>
    <p><strong>Name:</strong> ${sanitizedFirstName} ${sanitizedLastName}</p>
    <p><strong>Email:</strong> ${sanitizedEmail}</p>
    <p><strong>Phone:</strong> ${sanitizedPhone || 'Not provided'}</p>
    <p><strong>Preferred Language:</strong> ${sanitizedPreferredLanguage}</p>
  </div>
  
  <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
    <h3 style="margin-top: 0;">Travel Information</h3>
    <p><strong>Start Date:</strong> ${sanitizedStartDate || 'Not specified'}</p>
    <p><strong>End Date:</strong> ${sanitizedEndDate || 'Not specified'}</p>
    <p><strong>Departure Airport:</strong> ${sanitizedDepartureAirport}</p>
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
    <p>${sanitizedAdditionalRequests ? sanitizedAdditionalRequests.replace(/\n/g, '<br>') : 'No additional requests provided'}</p>
  </div>
  
  <p style="font-size: 12px; color: #666; margin-top: 30px;">
    This email was sent automatically from the Triple X Adventures website adventure package form.
  </p>
</div>
      `,
      // Add security headers
      headers: {
        'X-Priority': '1', // High priority
        'X-MSMail-Priority': 'High',
        'Importance': 'High'
      }
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