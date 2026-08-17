import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// --- Basic in-memory rate limiting (per IP) ---
const RATE_LIMIT_MAX = 5; // requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    // Basic per-IP rate limiting using the proxy IP header.
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message, website } = body;

    // Honeypot field: silently discard bot submissions.
    if (website) {
      return NextResponse.json({ message: "Message received" }, { status: 200 });
    }

    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedSubject = typeof subject === "string" ? subject.trim() : "";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";

    // Validation with length caps.
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }
    if (!isValidEmail(trimmedEmail)) {
      return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
    }
    if (
      trimmedName.length > 200 ||
      trimmedEmail.length > 320 ||
      trimmedMessage.length > 5000
    ) {
      return NextResponse.json({ message: "Input too long" }, { status: 400 });
    }

    // Transporter using an app password / OAuth credential via env vars.
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD ?? process.env.EMAIL_PASS,
      },
    });

    const recipient = process.env.CONTACT_RECIPIENT ?? "info@springsofdivinegrace.com";

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipient,
      replyTo: trimmedEmail,
      subject: `New Contact Form Submission from SODGEM Website: ${trimmedName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #2563EB;">New SODGEM Website Inquiry</h2>
            <p><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>
            <p><strong>Email:</strong> ${escapeHtml(trimmedEmail)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(trimmedSubject || "General inquiry")}</p>
            <p><strong>Message:</strong></p>
            <div style="border: 1px solid #ccc; padding: 15px; border-radius: 5px; background-color: #f9f9f9;">
                ${escapeHtml(trimmedMessage).replace(/\n/g, "<br>")}
            </div>
            <p style="margin-top: 20px; font-size: 0.9em; color: #666;">
                This message was sent from the SODGEM Contact Page.
            </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { message: "Failed to send email. Check server logs." },
      { status: 500 }
    );
  }
}