import { promisify } from "node:util";
import nodemailer, {
  type SendMailOptions as BaseSendMailOptions,
} from "nodemailer";

export function createEmailClient(env: MailOptions): EmailClient {
  const auth =
    env.user && env.password
      ? {
          user: env.user,
          pass: env.password,
        }
      : undefined;

  const transporter = nodemailer.createTransport({
    host: env.host,
    port: env.port,
    secure: env.secure,
    auth,
    tls: {
      rejectUnauthorized: false,
    },
  });

  const baseSendMail = promisify(transporter.sendMail).bind(transporter);

  return {
    sendMail: async (options: SendMailOptions) => {
      await baseSendMail({
        ...options,
        from: env.fromEmail,
        to: options.to,
      });
    },
  };
}

export type SendMailOptions = BaseSendMailOptions & {
  to: string;
};

export type EmailClient = {
  sendMail: (options: SendMailOptions) => Promise<void>;
};

type MailOptions = {
  host: string;
  port: number;
  fromEmail?: string;
  secure?: boolean;
  user?: string;
  password?: string;
};
