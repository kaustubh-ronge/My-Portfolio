"use server";

import nodemailer from "nodemailer";

export async function sendEmail(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  if (!name || !email || !message) {
    return { success: false, error: "Missing required fields" };
  }

  const { EMAIL_USER, EMAIL_PASS, RECEIVER_EMAIL } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS || !RECEIVER_EMAIL) {
    console.error("Missing email configuration in environment variables");
    return { success: false, error: "Server configuration error" };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${EMAIL_USER}>`, // Must send from authenticated user
      replyTo: email,
      to: RECEIVER_EMAIL,
      subject: subject ? `Portfolio Contact: ${subject}` : `Portfolio Contact from ${name}`,
      html: `
        <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #09090b; color: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid #27272a;">
          <div style="background: linear-gradient(135deg, #6366f1, #d946ef); padding: 32px 24px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">New Message Received</h1>
            <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 15px;">via your portfolio website</p>
          </div>
          
          <div style="padding: 32px 24px;">
            <div style="background-color: #18181b; border-radius: 8px; padding: 20px; border: 1px solid #27272a; margin-bottom: 24px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #27272a; width: 80px; color: #a1a1aa; font-size: 14px;">Name</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #27272a; color: #f8fafc; font-size: 15px; font-weight: 500;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #27272a; color: #a1a1aa; font-size: 14px;">Email</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #27272a; color: #38bdf8; font-size: 15px;">
                    <a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                ${
                  subject
                    ? `<tr>
                        <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;">Subject</td>
                        <td style="padding: 8px 0; color: #f8fafc; font-size: 15px; font-weight: 500;">${subject}</td>
                      </tr>`
                    : ""
                }
              </table>
            </div>

            <h2 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.5px;">Message</h2>
            <div style="background-color: #18181b; border-radius: 8px; padding: 24px; border: 1px solid #27272a; line-height: 1.6; color: #e2e8f0; font-size: 15px; white-space: pre-wrap;">
${message}
            </div>
            
            <div style="margin-top: 32px; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; background: #fafafa; color: #09090b; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 14px; transition: opacity 0.2s;">Reply to ${name}</a>
            </div>
          </div>
          
          <div style="background-color: #09090b; padding: 20px; text-align: center; border-top: 1px solid #27272a;">
            <p style="margin: 0; color: #71717a; font-size: 12px;">This email was sent automatically from your portfolio contact form.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Failed to send email. Please try again later." };
  }
}
