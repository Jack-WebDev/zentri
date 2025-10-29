import { render } from "@react-email/render";
import { createEmailClient, ForgotPasswordEmail } from "@zentri/emailkit";

import React from "react";

const {
  MAIL_HOST,
  MAIL_PORT = "587",
  MAIL_SECURE = "false",
  MAIL_USER,
  MAIL_PASSWORD,
  MAIL_FROM_EMAIL,
} = process.env;

export const emailkit = createEmailClient({
  host: MAIL_HOST,
  port: Number(MAIL_PORT),
  secure: MAIL_SECURE === "true",
  user: MAIL_USER,
  password: MAIL_PASSWORD,
  fromEmail: MAIL_FROM_EMAIL,
});

export async function sendReactEmail<TProps>(opts: {
  to: string;
  subject: string;
  component: React.ComponentType<TProps>;
  from?: string;
}) {
  const element = React.createElement(opts.component);
  const html = await render(element, { pretty: true });
  const text = await render(element, { plainText: true });

  await emailkit.sendMail({
    to: opts.to,
    from: opts.from ?? MAIL_FROM_EMAIL,
    subject: opts.subject,
    html,
    text,
  });
}

export async function sendPasswordResetEmail({ to }: { to: string }) {
  await sendReactEmail({
    to,
    subject: "Reset your password",
    component: ForgotPasswordEmail,
  });
}

export const sendEmail = emailkit.sendMail;
