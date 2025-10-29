import { promisify } from "node:util";
import nodemailer, {
  type SendMailOptions as BaseSendMailOptions,
  type Transporter,
} from "nodemailer";

export type MailEnv = {
  host: string;
  port: number;
  fromEmail: string;
  secure?: boolean;
  user?: string;
  password?: string;
};

export type SendMailOptions = BaseSendMailOptions & {
  to: string;
};

export type EmailClient = {
  transporter: Transporter;
  sendMail: (options: SendMailOptions) => Promise<void>;
};

export function createEmailClient(env: MailEnv): EmailClient {
  if (!env.fromEmail) {
    throw new Error("emailkit: 'fromEmail' is required.");
  }

  const auth =
    env.user && env.password
      ? { user: env.user, pass: env.password }
      : undefined;

  const transporter = nodemailer.createTransport({
    host: env.host,
    port: env.port,
    secure: env.secure ?? env.port === 465,
    auth,
    tls: { rejectUnauthorized: false },
  });

  const baseSendMail = promisify(transporter.sendMail).bind(transporter);

  return {
    transporter,
    sendMail: async (options: SendMailOptions) => {
      await baseSendMail({
        ...options,
        from: options.from ?? env.fromEmail,
        to: options.to,
      });
    },
  };
}
