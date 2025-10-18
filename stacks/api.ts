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
  };

  const api = new sst.aws.ApiGatewayV2("Api", {
    cors: {
      allowOrigins: ["https://d28o0pvx2zsvzm.cloudfront.net"],
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
          args.copyFiles = pulumi.output(args.copyFiles).apply((existing) => [
            ...(existing ?? []),
            {
              from: "packages/infra/certs/af-south-1-bundle.pem",
              to: "certs/af-south-1-bundle.pem",
            },
          ]);
        },
      },
    },
  });

  api.route("ANY /trpc", {
    handler: "apps/server/src/lambda/trpc/server.handler",
    timeout: "60 seconds",
    environment,
    copyFiles: [
      {
        from: "packages/infra/certs/af-south-1-bundle.pem",
        to: "certs/af-south-1-bundle.pem",
      },
    ],
  });

  api.route("ANY /trpc/{proxy+}", {
    handler: "apps/server/src/lambda/trpc/server.handler",
    timeout: "60 seconds",
    environment,
    copyFiles: [
      {
        from: "packages/infra/certs/af-south-1-bundle.pem",
        to: "certs/af-south-1-bundle.pem",
      },
    ],
  });

  api.route("ANY /api/auth/{proxy+}", {
    handler: "apps/server/src/lambda/trpc/server.handler",
    timeout: "60 seconds",
    environment,
    copyFiles: [
      {
        from: "packages/infra/certs/af-south-1-bundle.pem",
        to: "certs/af-south-1-bundle.pem",
      },
    ],
  });

  api.route("ANY /", {
    handler: "apps/server/src/lambda/trpc/server.handler",
    timeout: "60 seconds",
    environment,
    copyFiles: [
      {
        from: "packages/infra/certs/af-south-1-bundle.pem",
        to: "certs/af-south-1-bundle.pem",
      },
    ],
  });

  return api;
}
