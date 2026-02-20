import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

/* ------------------------------------------------------------------ */
/*  Rate limiter — in-memory sliding window per IP                     */
/*  Allows MAX_REQUESTS per WINDOW_MS. Resets automatically.           */
/* ------------------------------------------------------------------ */
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = requestLog.get(ip) ?? [];

  // Drop entries outside the current window
  const recent = timestamps.filter((t) => now - t < WINDOW_MS);
  requestLog.set(ip, recent);

  if (recent.length >= MAX_REQUESTS) return true;

  recent.push(now);
  return false;
}

/* ------------------------------------------------------------------ */
/*  Validation & sanitization helpers                                  */
/* ------------------------------------------------------------------ */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 1000;

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

/** Strip HTML-sensitive chars and collapse any CR/LF to prevent header injection */
function sanitizeInput(str: string): string {
  return str
    .replace(/[\r\n]+/g, ' ')   // prevent email header injection
    .replace(/[<>"'&]/g, '')     // strip HTML-sensitive characters
    .trim();
}

/** HTML-encode a string for safe embedding in an HTML email body */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/** Enforce a max length on any field to prevent oversized payloads */
function clamp(str: string | undefined, max: number): string | undefined {
  return str ? str.slice(0, max) : undefined;
}

/* ------------------------------------------------------------------ */
/*  Allowed origins                                                    */
/*  Set ALLOWED_ORIGINS env var as a comma-separated list, e.g.        */
/*  "https://my-site.run.app,https://example.com"                      */
/*  Falls back to a sensible default for local dev.                    */
/* ------------------------------------------------------------------ */
const ALLOWED_ORIGINS: string[] = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  : ['http://localhost:3000'];

/* ------------------------------------------------------------------ */
/*  POST handler                                                       */
/* ------------------------------------------------------------------ */
export async function POST(request: NextRequest) {
  try {
    // --- Origin validation ---
    const origin = request.headers.get('origin') ?? '';
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // --- Rate limiting ---
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() ?? request.headers.get('x-real-ip') ?? 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // --- Environment check ---
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // --- Parse & enforce body size (reject payloads > 10 KB) ---
    const rawBody = await request.text();
    if (rawBody.length > 10_000) {
      return NextResponse.json(
        { error: 'Request body too large' },
        { status: 413 }
      );
    }

    let data: ContactFormData;
    try {
      data = JSON.parse(rawBody) as ContactFormData;
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      );
    }

    // --- Validate required fields ---
    if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields' },
        { status: 400 }
      );
    }

    if (!validateEmail(data.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // --- Sanitize & clamp all inputs ---
    const sanitizedData = {
      name: sanitizeInput(data.name).slice(0, MAX_FIELD_LENGTH),
      email: sanitizeInput(data.email).slice(0, MAX_FIELD_LENGTH),
      phone: clamp(data.phone, MAX_FIELD_LENGTH),
      subject: data.subject ? sanitizeInput(data.subject).slice(0, MAX_FIELD_LENGTH) : undefined,
      contactMethod: clamp(data.contactMethod, MAX_FIELD_LENGTH),
      contactTime: clamp(data.contactTime, MAX_FIELD_LENGTH),
      socialLinks: data.socialLinks ? sanitizeInput(data.socialLinks).slice(0, MAX_FIELD_LENGTH) : undefined,
      source: clamp(data.source, MAX_FIELD_LENGTH),
      message: sanitizeInput(data.message).slice(0, MAX_MESSAGE_LENGTH),
      copyToSender: data.copyToSender === true,
    };

    const subjectLine = sanitizedData.subject
      ? `Portfolio Contact: ${sanitizedData.subject} from ${sanitizedData.name}`
      : `Portfolio Contact: New Message from ${sanitizedData.name}`;

    // Use escapeHtml for all values interpolated into the HTML email
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
      <p><strong>Name:</strong> ${escapeHtml(sanitizedData.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(sanitizedData.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(sanitizedData.phone || 'Not provided')}</p>
      <p><strong>Subject:</strong> ${escapeHtml(sanitizedData.subject || 'Not specified')}</p>
      <p><strong>Preferred Contact:</strong> ${escapeHtml(sanitizedData.contactMethod || 'Not specified')}</p>
      <p><strong>Best Time:</strong> ${escapeHtml(sanitizedData.contactTime || 'Not specified')}</p>
      <p><strong>Social Links:</strong> ${escapeHtml(sanitizedData.socialLinks || 'Not provided')}</p>
      <p><strong>Found Through:</strong> ${escapeHtml(sanitizedData.source || 'Not specified')}</p>
    </div>

    <div style="margin-top: 20px;">
      <h3 style="color: #2c5282;">Message:</h3>
      <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px;">
        ${escapeHtml(sanitizedData.message).replace(/\n/g, '<br>')}
      </div>
    </div>
  </div>
</body>
</html>
      `.trim(),
    };

    if (sanitizedData.copyToSender) {
      try {
        await transporter.sendMail({
          ...mailOptions,
          to: sanitizedData.email,
          subject: `Copy of your message to Portfolio Contact Form`,
        });
      } catch (error) {
        console.error('Error sending copy to sender:', error);
      }
    }

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
