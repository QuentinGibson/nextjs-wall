"use server";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_SECRET);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const testEmail = async () => {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "quentingibson94@gmail.com",
      subject: "Hello World",
      html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    });
    return Response.json(data);
  } catch (e) {
    Response.json({ error: e });
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/verify-email?token=${token}`;

  try {
    const data = await resend.emails.send({
      from: "noreply@quentmadeit.com",
      to: email,
      subject: "Verify Your Email",
      html: `<p>Click <a href="${confirmLink}">here</a> to verify your email.</p>`,
    });
    return Response.json(data);
  } catch (e) {
    return Response.json({ error: e });
  }
};
