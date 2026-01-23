// src/app/api/contact/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure the Nodemailer transporter using your secure environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Email content setup
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'rolandmario2@gmail.com', // The target email address
      subject: `New Contact Form Submission from SmartEnv Website: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #10B981;">New SmartEnv Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Email:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="border: 1px solid #ccc; padding: 15px; border-radius: 5px; background-color: #f9f9f9;">
                ${message.replace(/\n/g, '<br>')}
            </div>
            <p style="margin-top: 20px; font-size: 0.9em; color: #666;">
                This message was sent from the SmartEnv Contact Page.
            </p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Success response
    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Email sending error:', error);
    // Error response
    return NextResponse.json({ 
        message: 'Failed to send email. Check server logs.',
        error: (error as Error).message,
    }, { status: 500 });
  }
}








