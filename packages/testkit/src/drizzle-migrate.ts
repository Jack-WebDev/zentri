import path from "node:path";
import { fileURLToPath } from "node:url";

type MigrateFn = (params: { migrationsFolder: string }) => Promise<void>;

/**
 * Run Drizzle migrations for a Node Postgres client.
 * You pass in your app's `db` and the driver's migrate() imported by your app,
 * so testkit stays driver-agnostic.
 */
export async function runDrizzleMigrations(
  migrate: MigrateFn,
  migrationsFolderRelative = "../../drizzle",
) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const migrationsFolder = path.resolve(__dirname, migrationsFolderRelative);
  await migrate({ migrationsFolder });
}
