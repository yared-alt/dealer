export const runtime = 'nodejs'; 
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, 
  },
});

export async function POST(req: Request) {
  try {
    const formdata = await req.formData(); 
    
    const email = formdata.get("email")?.toString();
    const name = formdata.get("name")?.toString();
    const subject = formdata.get("subject")?.toString();
    const message = formdata.get("message")?.toString();
    
    if (!email || !subject || !message || !name) {
      return NextResponse.json(
        { error: "Form is not valid" },
        { status: 400 }
      );
    }

   await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.MYEMAIL,
      subject: `${subject}`,
      html: `
        <div>
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
      `,
    });
    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: "Connection error occurred, please try again" },
      { status: 500 }
    );
  }
}