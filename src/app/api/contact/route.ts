import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import { isIP } from 'node:net';

/* ------------------------------------------------------------------ */
/*  Rate limiting                                                      */
/*  In-memory sliding windows with periodic cleanup to avoid unbounded */
/*  memory growth from random/spoofed identifiers.                     */
/* ------------------------------------------------------------------ */
const IP_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_IP = 5;

const EMAIL_WINDOW_MS = 30 * 60 * 1000; // 30 minutes
const MAX_REQUESTS_PER_EMAIL = 3;

const GLOBAL_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_GLOBAL_REQUESTS = 40;

const MAX_TRACKED_KEYS = 5000;
const CLEANUP_EVERY_N_REQUESTS = 200;

interface RateBucket {
  timestamps: number[];
  lastSeen: number;
}

const ipRequestLog = new Map<string, RateBucket>();
const emailRequestLog = new Map<string, RateBucket>();
const globalRequestLog = new Map<string, RateBucket>();

let requestCounter = 0;

function isRateLimited(
  requestLog: Map<string, RateBucket>,
  key: string,
  windowMs: number,
  maxRequests: number
): boolean {
  const now = Date.now();
  const bucket = requestLog.get(key) ?? { timestamps: [], lastSeen: now };

  // Drop entries outside the current window
  bucket.timestamps = bucket.timestamps.filter((timestamp) => now - timestamp < windowMs);
  bucket.lastSeen = now;
  requestLog.set(key, bucket);

  if (bucket.timestamps.length >= maxRequests) return true;

  bucket.timestamps.push(now);
  return false;
}

function cleanupRateLog(log: Map<string, RateBucket>, windowMs: number) {
  const now = Date.now();

  for (const [key, bucket] of log.entries()) {
    if (now - bucket.lastSeen > windowMs * 2) {
      log.delete(key);
    }
  }

  // Keep an upper bound in case attackers spray random identifiers.
  if (log.size <= MAX_TRACKED_KEYS) return;

  const oldestFirst = [...log.entries()].sort((a, b) => a[1].lastSeen - b[1].lastSeen);
  const excess = log.size - MAX_TRACKED_KEYS;
  for (let i = 0; i < excess; i += 1) {
    log.delete(oldestFirst[i][0]);
  }
}

function maybeCleanupRateLogs() {
  requestCounter += 1;
  if (requestCounter % CLEANUP_EVERY_N_REQUESTS !== 0) return;

  cleanupRateLog(ipRequestLog, IP_WINDOW_MS);
  cleanupRateLog(emailRequestLog, EMAIL_WINDOW_MS);
  cleanupRateLog(globalRequestLog, GLOBAL_WINDOW_MS);
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
  website?: string; // Honeypot field (must remain empty)
  message: string;
  copyToSender?: boolean;
}

function validateEmail(email: string): boolean {
  return emailRegex.test(email);
}

/** Strip HTML-sensitive chars and collapse any CR/LF to prevent header injection */
function sanitizeInput(str: string): string {
  return str
    .replace(/[\r\n]+/g, ' ') // prevent email header injection
    .replace(/[<>"'&]/g, '') // strip HTML-sensitive characters
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

function sanitizeAndClamp(str: string | undefined, max: number): string | undefined {
  return str ? sanitizeInput(str).slice(0, max) : undefined;
}

function readString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

function isSenderCopyEnabled(): boolean {
  const rawValue = process.env.ENABLE_SENDER_COPY;
  if (rawValue === undefined) return true; // Safe default: honor checkbox behavior unless explicitly disabled.

  const normalized = rawValue.trim().toLowerCase();
  return normalized !== 'false' && normalized !== '0' && normalized !== 'no' && normalized !== 'off';
}

function redactEmailForLogs(email: string): string {
  const [localPart, domain] = email.split('@');
  if (!localPart || !domain) return '[invalid-email]';

  const visiblePrefix = localPart.slice(0, 2);
  return `${visiblePrefix}***@${domain}`;
}

function getSafeErrorMeta(error: unknown) {
  if (!(error instanceof Error)) {
    return { message: 'Unknown non-Error throw value' };
  }

  const maybeNodemailerError = error as Error & {
    code?: string;
    command?: string;
    responseCode?: number;
  };

  return {
    name: error.name,
    message: error.message,
    code: maybeNodemailerError.code,
    command: maybeNodemailerError.command,
    responseCode: maybeNodemailerError.responseCode,
  };
}

/* ------------------------------------------------------------------ */
/*  Allowed origins                                                    */
/*  Set ALLOWED_ORIGINS env var as a comma-separated list, e.g.        */
/*  "https://my-site.run.app,https://example.com"                      */
/*  Falls back to a sensible default for local dev.                    */
/* ------------------------------------------------------------------ */
function getAllowedOrigins(request: NextRequest): Set<string> {
  const allowedOrigins = new Set<string>();
  const envOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
    : [];

  for (const origin of envOrigins) {
    allowedOrigins.add(origin);
  }

  // Always allow the current host origin for same-site requests.
  if (request.nextUrl.origin) {
    allowedOrigins.add(request.nextUrl.origin);
  }

  if (process.env.NODE_ENV !== 'production') {
    allowedOrigins.add('http://localhost:3000');
  }

  return allowedOrigins;
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ipCandidate = forwarded?.split(',')[0]?.trim() ?? realIp?.trim() ?? 'unknown';

  // Ignore malformed values so spoofed garbage does not create endless map keys.
  return isIP(ipCandidate) ? ipCandidate : 'unknown';
}

/* ------------------------------------------------------------------ */
/*  POST handler                                                       */
/* ------------------------------------------------------------------ */
export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();

  try {
    // --- Origin validation ---
    const allowedOrigins = getAllowedOrigins(request);
    const origin = request.headers.get('origin');
    if (!origin || !allowedOrigins.has(origin)) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    const contentType = request.headers.get('content-type') ?? '';
    if (!contentType.toLowerCase().startsWith('application/json')) {
      return NextResponse.json(
        { error: 'Unsupported media type' },
        { status: 415 }
      );
    }

    // --- Rate limiting ---
    const ip = getClientIp(request);

    const globallyLimited = isRateLimited(
      globalRequestLog,
      'global',
      GLOBAL_WINDOW_MS,
      MAX_GLOBAL_REQUESTS
    );
    const ipLimited = isRateLimited(ipRequestLog, ip, IP_WINDOW_MS, MAX_REQUESTS_PER_IP);
    maybeCleanupRateLogs();

    if (globallyLimited || ipLimited) {
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
    const name = readString(data.name);
    const email = readString(data.email);
    const message = readString(data.message);
    const website = readString(data.website);

    // Honeypot field: bots often fill hidden fields; real users should leave it empty.
    if (website && website.trim().length > 0) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      );
    }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields' },
        { status: 400 }
      );
    }

    const normalizedEmail = sanitizeInput(email).slice(0, MAX_FIELD_LENGTH).toLowerCase();
    if (!validateEmail(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // --- Sanitize & clamp all inputs ---
    const sanitizedData = {
      name: sanitizeInput(name).slice(0, MAX_FIELD_LENGTH),
      email: normalizedEmail,
      phone: sanitizeAndClamp(readString(data.phone), MAX_FIELD_LENGTH),
      subject: sanitizeAndClamp(readString(data.subject), MAX_FIELD_LENGTH),
      contactMethod: sanitizeAndClamp(readString(data.contactMethod), MAX_FIELD_LENGTH),
      contactTime: sanitizeAndClamp(readString(data.contactTime), MAX_FIELD_LENGTH),
      socialLinks: sanitizeAndClamp(readString(data.socialLinks), MAX_FIELD_LENGTH),
      source: sanitizeAndClamp(readString(data.source), MAX_FIELD_LENGTH),
      message: sanitizeInput(message).slice(0, MAX_MESSAGE_LENGTH),
      copyToSender: data.copyToSender === true,
    };

    const emailLimited = isRateLimited(
      emailRequestLog,
      sanitizedData.email,
      EMAIL_WINDOW_MS,
      MAX_REQUESTS_PER_EMAIL
    );
    maybeCleanupRateLogs();

    if (emailLimited) {
      return NextResponse.json(
        { error: 'Too many requests from this email address. Please try again later.' },
        { status: 429 }
      );
    }

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

    const allowSenderCopy = isSenderCopyEnabled();
    if (!allowSenderCopy && sanitizedData.copyToSender) {
      console.info('Sender copy skipped: feature disabled by config', {
        requestId,
        recipient: redactEmailForLogs(sanitizedData.email),
      });
    }

    if (allowSenderCopy && sanitizedData.copyToSender) {
      console.info('Sender copy requested', {
        requestId,
        recipient: redactEmailForLogs(sanitizedData.email),
      });

      try {
        await transporter.sendMail({
          ...mailOptions,
          to: sanitizedData.email,
          subject: `Copy of your message to Portfolio Contact Form`,
        });
        console.info('Sender copy sent', { requestId });
      } catch (error) {
        console.error('Error sending copy to sender:', {
          requestId,
          error: getSafeErrorMeta(error),
        });
      }
    }

    await transporter.sendMail(mailOptions);
    console.info('Contact email delivered', { requestId });

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', {
      requestId,
      error: getSafeErrorMeta(error),
    });
    return NextResponse.json(
      { error: 'Failed to process your message. Please try again later.' },
      { status: 500 }
    );
  }
}
