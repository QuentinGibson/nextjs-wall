"use server";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_SECRET);

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
