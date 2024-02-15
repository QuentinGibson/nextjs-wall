"use server";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_SECRET);

import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const ses = new AWS.SES({ apiVersion: "latest" });

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
  const domain = process.env.NEXT_PUBLIC_APP_URL;
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

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  message: string;
}

export async function sendEmail({ to, from, subject, message }: EmailParams) {
  const params = {
    Source: from,
    Destination: { ToAddresses: [to] },
    Message: {
      Subject: { Data: subject },
      Body: { Text: { Data: message } },
    },
  };

  try {
    const result = await ses.sendEmail(params).promise();
    console.log("Email sent:", result.MessageId);
    return result.MessageId;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export const sendAWSVerifyEmail = async (email: string, token: string) => {
  const domain = process.env.URL;
  const confirmLink = `${domain}/verifyemail?token=${token}`;
  try {
    await sendEmail({
      to: email,
      from: "noreply@quentmadeit.com",
      subject: "Verify Your Email",
      message: `Please click the following link to verify your email: ${confirmLink}.
      If you did not request this, please ignore this email.
      <p>Click <a href="${confirmLink}">here</a> to verify your email.</p>`,
    });
  } catch (error) {
    // Handle error
  }
};
