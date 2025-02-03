import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  contactMethod?: string;
  contactTime?: string;
  socialLinks?: string;
  source?: string;
  message: string;
  copyToSender?: boolean;
}

function validateEmail(email: string): boolean {
  return emailRegex.test(email);
}

function sanitizeInput(str: string): string {
  return str.replace(/[<>]/g, '');
}

export async function POST(request: NextRequest) {
  try {
    // Check environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const data = await request.json() as ContactFormData;

    // Validate required fields
    if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(data.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      ...data,
      name: sanitizeInput(data.name),
      message: sanitizeInput(data.message),
      subject: data.subject ? sanitizeInput(data.subject) : undefined,
      socialLinks: data.socialLinks ? sanitizeInput(data.socialLinks) : undefined,
    };

    // Format subject line
    const subjectLine = sanitizedData.subject 
      ? `Portfolio Contact: ${sanitizedData.subject} from ${sanitizedData.name}`
      : `Portfolio Contact: New Message from ${sanitizedData.name}`;

    // Construct email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: sanitizedData.email,
      subject: subjectLine,
      text: `
Contact Form Submission Details:
=============================
Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Phone: ${sanitizedData.phone || 'Not provided'}
Subject: ${sanitizedData.subject || 'Not specified'}
Contact Method: ${sanitizedData.contactMethod || 'Not specified'}
Best Time: ${sanitizedData.contactTime || 'Not specified'}
Social Links: ${sanitizedData.socialLinks || 'Not provided'}
Source: ${sanitizedData.source || 'Not specified'}

Message:
========
${sanitizedData.message}
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #2c5282; border-bottom: 2px solid #2c5282; padding-bottom: 10px;">New Contact Form Submission</h2>
    
    <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <p><strong>Name:</strong> ${sanitizedData.name}</p>
      <p><strong>Email:</strong> ${sanitizedData.email}</p>
      <p><strong>Phone:</strong> ${sanitizedData.phone || 'Not provided'}</p>
      <p><strong>Subject:</strong> ${sanitizedData.subject || 'Not specified'}</p>
      <p><strong>Preferred Contact:</strong> ${sanitizedData.contactMethod || 'Not specified'}</p>
      <p><strong>Best Time:</strong> ${sanitizedData.contactTime || 'Not specified'}</p>
      <p><strong>Social Links:</strong> ${sanitizedData.socialLinks || 'Not provided'}</p>
      <p><strong>Found Through:</strong> ${sanitizedData.source || 'Not specified'}</p>
    </div>

    <div style="margin-top: 20px;">
      <h3 style="color: #2c5282;">Message:</h3>
      <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px;">
        ${sanitizedData.message.replace(/\n/g, '<br>')}
      </div>
    </div>
  </div>
</body>
</html>
      `.trim(),
    };

    // Send copy to sender if requested
    if (sanitizedData.copyToSender) {
      try {
        await transporter.sendMail({
          ...mailOptions,
          to: sanitizedData.email,
          subject: `Copy of your message to Portfolio Contact Form`,
        });
      } catch (error) {
        console.error('Error sending copy to sender:', error);
        // Continue with the main email even if copy fails
      }
    }

    // Send main email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process your message. Please try again later.' },
      { status: 500 }
    );
  }
}