import { Resend } from "resend";
import env from "../config/env.js";

const resend = new Resend(env.RESEND_API_KEY);

export const sendPasswordResetEmail = async ({
  email,
  name,
  resetUrl,
}) => {
  await resend.emails.send({
    from: env.FROM_EMAIL ?? "onboarding@resend.dev",
    to: email,
    subject: "Reset Your Password — QR Food Ordering",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f9fafb; border-radius: 12px;">
        <h2 style="color: #111827; margin-bottom: 8px;">Reset Your Password</h2>
        <p style="color: #6b7280; margin-bottom: 24px;">Hi ${name}, click the button below to reset your password. This link expires in 15 minutes.</p>
        <a href="${resetUrl}"
           style="display: inline-block; background: #6366f1; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
          Reset Password
        </a>
        <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">
          If you didn't request this, ignore this email.
        </p>
      </div>
    `,
  });
};