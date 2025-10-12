import type * as pulumi from "@pulumi/pulumi";
import { getSecretValues } from "./helpers";

type StorageReturn = ReturnType<typeof import("./storage").Storage>;
type DatabaseReturn = ReturnType<typeof import("./database").Database>;

export function Migration({
  bucket,
  db,
}: {
  bucket: StorageReturn;
  db: DatabaseReturn;
}) {
  const auth = getSecretValues("zentri/prod/auth", [
    "BETTER_AUTH_SECRET",
    "CORS_ORIGIN",
  ] as const);

  const environment: Record<string, pulumi.Input<string>> = {
    REGION: $app.providers.aws.region,
    STAGE: $app.stage,
    ATTACHMENTS_BUCKET_NAME: bucket.name,
    ATTACHMENTS_REGION: $app.providers.aws.region,
    DATABASE_URL: db.url,
    SERVER_PORT: "8080",
    BETTER_AUTH_SECRET: auth.BETTER_AUTH_SECRET,
    CORS_ORIGIN: auth.CORS_ORIGIN,
  };

  const migrate = new sst.aws.Function("DbMigrate", {
    handler: "apps/server/src/lambda/db/migrate.handler",
    nodejs: {
      install: ["pg", "drizzle-orm"],
    },

    copyFiles: [
      { from: "packages/db/src/db/migrations", to: "drizzle" }, 
    ],
    environment,
  });

  return { migrate };
}
