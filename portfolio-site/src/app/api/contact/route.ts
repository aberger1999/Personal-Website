import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // You'll receive the emails
      replyTo: data.email,
      subject: `Portfolio Contact: ${data.subject || 'New Message'} from ${data.name}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Subject: ${data.subject || 'Not specified'}
Contact Method: ${data.contactMethod || 'Not specified'}
Best Time: ${data.contactTime || 'Not specified'}
Social Links: ${data.socialLinks || 'Not provided'}
Source: ${data.source || 'Not specified'}

Message:
${data.message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
<p><strong>Subject:</strong> ${data.subject || 'Not specified'}</p>
<p><strong>Preferred Contact:</strong> ${data.contactMethod || 'Not specified'}</p>
<p><strong>Best Time:</strong> ${data.contactTime || 'Not specified'}</p>
<p><strong>Social Links:</strong> ${data.socialLinks || 'Not provided'}</p>
<p><strong>Found Through:</strong> ${data.source || 'Not specified'}</p>
<h3>Message:</h3>
<p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send copy to sender if requested
    if (data.copyToSender) {
      await transporter.sendMail({
        ...mailOptions,
        to: data.email,
        subject: `Copy of your message to Alex Berger`,
      });
    }

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}