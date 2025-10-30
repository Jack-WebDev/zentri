/// <reference types="sst" />

import * as pulumi from "@pulumi/pulumi";
import { getSecretValues } from "./helpers";

type StorageReturn = ReturnType<typeof import("./storage").Storage>;
type DatabaseReturn = ReturnType<typeof import("./database").Database>;

export function Api({
  bucket,
  db,
}: {
  bucket: StorageReturn;
  db: DatabaseReturn;
}) {
  const auth = getSecretValues("auth", [
    "BETTER_AUTH_SECRET",
    "CORS_ORIGIN",
    "MAIL_FROM_EMAIL",
    "MAIL_PASSWORD",
    "MAIL_PORT",
    "MAIL_HOST",
    "MAIL_USER",
    "MAIL_SECURE",
  ] as const);

  const environment = {
    REGION: $app.providers.aws.region,
    STAGE: $app.stage,
    ATTACHMENTS_BUCKET_NAME: bucket.name,
    ATTACHMENTS_REGION: $app.providers.aws.region,
    DATABASE_URL: db.url,
    SERVER_PORT: "8080",
    BETTER_AUTH_SECRET: auth.BETTER_AUTH_SECRET,
    CORS_ORIGIN: auth.CORS_ORIGIN,
    MAIL_FROM_EMAIL: auth.MAIL_FROM_EMAIL,
    MAIL_PASSWORD: auth.MAIL_PASSWORD,
    MAIL_PORT: auth.MAIL_PORT,
    MAIL_HOST: auth.MAIL_HOST,
    MAIL_USER: auth.MAIL_USER,
    MAIL_SECURE: auth.MAIL_SECURE,
    RDS_CA_SECRET_NAME: pulumi.interpolate`${$app.name}/${$app.stage}/rds-ca`,
  };

  const api = new sst.aws.ApiGatewayV2("Api", {
    cors: {
      allowOrigins: ["https://d1dzfk340t5fcj.cloudfront.net"],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowHeaders: ["content-type", "authorization"],
      allowCredentials: true,
    },
    accessLog: { retention: "1 month" },
    link: [bucket],
    transform: {
      route: {
        handler: (args) => {
          args.environment = { ...environment, ...(args.environment ?? {}) };
          args.timeout ??= "60 seconds";
          // args.copyFiles = pulumi.output(args.copyFiles).apply((existing) => [
          //   ...(existing ?? []),
          //   {
          //     from: "packages/infra/certs/af-south-1-bundle.pem",
          //     to: "certs/af-south-1-bundle.pem",
          //   },
          // ]);
        },
      },
    },
  });

  // tRPC root
  api.route("GET /trpc", {
    handler: "apps/server/src/lambda/trpc/server.handler",
    timeout: "60 seconds",
    environment,
  });
  api.route("POST /trpc", {
    handler: "apps/server/src/lambda/trpc/server.handler",
    timeout: "60 seconds",
    environment,
  });

  // tRPC proxy
  api.route("GET /trpc/{proxy+}", {
    handler: "apps/server/src/lambda/trpc/server.handler",
    timeout: "60 seconds",
    environment,
  });
  api.route("POST /trpc/{proxy+}", {
    handler: "apps/server/src/lambda/trpc/server.handler",
    timeout: "60 seconds",
    environment,
  });

  api.route("GET /api/auth/{proxy+}", {
    handler: "apps/server/src/lambda/trpc/server.handler",
    timeout: "60 seconds",
    environment,
  });
  api.route("POST /api/auth/{proxy+}", {
    handler: "apps/server/src/lambda/trpc/server.handler",
    timeout: "60 seconds",
    environment,
  });

  // Health/root
  api.route("GET /", {
    handler: "apps/server/src/lambda/trpc/server.handler",
    timeout: "60 seconds",
    environment,
  });

  return api;
}
