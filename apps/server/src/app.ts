import "dotenv/config";
import { trpcServer } from "@hono/trpc-server";
import { createContext } from "@zentri/api/context";
import { appRouter } from "@zentri/api/routers/index";
import { auth } from "@zentri/auth/server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

export function createServer() {
  const app = new Hono();

  const ORIGIN =
    process.env.CORS_ORIGIN ?? "https://d1dzfk340t5fcj.cloudfront.net";

  app.use(logger());

  app.use(
    "/*",
    cors({
      origin: ORIGIN,
      allowMethods: ["GET", "POST", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  );

  app.options("/api/auth/*", (c) =>
    c.body(null, 204, {
      "Access-Control-Allow-Origin": ORIGIN,
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Max-Age": "600",
    }),
  );

  app.on(["POST", "GET"], "/api/auth/*", async (c) => {
    const res = await auth.handler(c.req.raw);

    const headers = new Headers(res.headers);
    headers.set("Access-Control-Allow-Origin", ORIGIN);
    headers.set("Access-Control-Allow-Credentials", "true");

    return new Response(res.body, { status: res.status, headers });
  });

  app.use(
    "/trpc/*",
    trpcServer({
      router: appRouter,
      createContext: (_opts, context) => createContext({ context }),
    }),
  );

  // Health/root
  app.get("/", (c) => c.text("OK"));

  return app;
}
