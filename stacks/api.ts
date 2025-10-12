/// <reference types="sst" />

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
        },
      },
    },
  });

  // const identityAuth = api.addAuthorizer({
  // 	name: "IdentityAuthorizer",
  // 	lambda: {
  // 		function: {
  // 			handler: "apps/server/src/lambda/authorizer/identity.handler",
  // 			link: [bucket],
  // 			environment,
  // 			name: `${$app.name}-${$app.stage}-identity-authorizer`,
  // 		},
  // 		response: "iam",
  // 	},
  // });

  api.route(
    "ANY /trpc",
    {
      handler: "apps/server/src/lambda/trpc/server.handler",
      timeout: "60 seconds",
      environment,
    }
    // { auth: { lambda: identityAuth.id } },
  );

  api.route(
    "ANY /trpc/{proxy+}",
    {
      handler: "apps/server/src/lambda/trpc/server.handler",
      timeout: "60 seconds",
      environment,
    }
    // { auth: { lambda: identityAuth.id } },
  );

  api.route("ANY /api/auth/{proxy+}", {
    handler: "apps/server/src/lambda/trpc/server.handler",
    timeout: "60 seconds",
    environment,
  });

  api.route("ANY /", {
    handler: "apps/server/src/lambda/trpc/server.handler",
    timeout: "60 seconds",
    environment,
  });

  return api;
}
