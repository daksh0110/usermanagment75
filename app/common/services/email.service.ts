import nodemailer, { Transporter } from "nodemailer";
import { SentMessageInfo } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const EmailModule = async (email: string, name: string, token: string): Promise<void> => {
  try {
    const transporter: Transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/api/users/reset-password/${token}`;
    const mailOptions = {
      from: `"Your App Name" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Set Your Password",
      html: `
        <p>Hi ${name},</p>
        <p>You've been invited to join our platform. Please click the link below to set your password:</p>
        <a href="${resetPasswordUrl}">Set Password</a>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    };

    const info: SentMessageInfo = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
