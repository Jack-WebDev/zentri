import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PgTestContainer, supertestFromHono } from "@zentri/testkit";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg, { type Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const cleanups: Array<() => Promise<void> | void> = [];

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MIGRATIONS_DIR = resolve(
  __dirname,
  "../../../../packages/db/src/db/migrations",
);
if (!existsSync(join(MIGRATIONS_DIR, "meta/_journal.json"))) {
  throw new Error(`Drizzle migrations meta not found at: ${MIGRATIONS_DIR}`);
}

function isPgAdminShutdown(err: unknown): err is { code?: string } {
  return typeof err === "object" && err !== null && "code" in err;
}

function ignorePgShutdown(pool: Pool) {
  pool.on("error", (err) => {
    if (isPgAdminShutdown(err) && err.code === "57P01") return; // expected on container stop
    throw err;
  });
}

describe("tRPC HTTP", () => {
  let pgTC: PgTestContainer;
  let migrationPool: pg.Pool;

  beforeAll(async () => {
    pgTC = new PgTestContainer();
    await pgTC.start();

    // set env BEFORE importing any code that constructs the app pool
    process.env.DATABASE_URL = pgTC.uri;
    process.env.CORS_ORIGIN = "https://example.com";

    // run migrations against the ephemeral DB
    migrationPool = new pg.Pool({ connectionString: pgTC.uri });
    ignorePgShutdown(migrationPool);

    const db = drizzle(migrationPool);
    await migrate(db, { migrationsFolder: MIGRATIONS_DIR });

    // close migration pool first during teardown
    cleanups.push(async () => {
      await migrationPool.end().catch(() => {});
    });

    // also close the app's global pool during teardown (after tests import the app)
    cleanups.push(async () => {
      const { pool: appPool } = await import("@zentri/db");
      await appPool.end().catch(() => {});
    });

    // finally stop the container after pools are closed
    cleanups.push(async () => {
      await pgTC.stop();
    });
  }, 60_000);

  afterAll(async () => {
    for (const fn of cleanups.reverse()) await fn();
  }, 30_000);

  it("GET /trpc/healthCheck -> OK", async () => {
    const { createServer } = await import("../../src/app");
    const app = createServer();

    // attach shutdown ignore to app pool now that app/db has been imported
    const { pool: appPool } = await import("@zentri/db");
    ignorePgShutdown(appPool);

    const req = supertestFromHono(app);
    const res = await req
      .get("/trpc/healthCheck")
      .set("Origin", "https://example.com")
      .expect(200);

    expect(res.body?.result?.data).toBe("OK");
    expect(res.headers["access-control-allow-origin"]).toBe(
      "https://example.com",
    );
  });
});
