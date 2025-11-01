import { PgTestContainer, supertestFromHono } from "@zentri/testkit";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

let stopPg: (() => Promise<void>) | null = null;

describe("server / and CORS", () => {
  beforeAll(async () => {
    // Start Postgres first so env is ready before importing server/db
    const pg = new PgTestContainer();
    await pg.start();
    process.env.DATABASE_URL = pg.uri;

    // Set a stable CORS origin for assertions
    process.env.CORS_ORIGIN = "https://example.com";

    // (Lazy) give a disposer
    stopPg = async () => {
      await pg.stop();
    };
  }, 60_000);

  afterAll(async () => {
    if (stopPg) await stopPg();
  }, 20_000);

  it("GET / returns OK", async () => {
    const { createServer } = await import("../../src/app");
    const app = createServer();
    const req = supertestFromHono(app);

    const res = await req
      .get("/")
      .set("Origin", "https://example.com")
      .expect(200);

    expect(res.text).toBe("OK");
    expect(res.headers["access-control-allow-origin"]).toBe(
      "https://example.com",
    );
  });
});
