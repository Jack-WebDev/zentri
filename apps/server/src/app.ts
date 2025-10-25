import "dotenv/config";
import { trpcServer } from "@hono/trpc-server";
import { createContext } from "@zentri/api/context";
import { appRouter } from "@zentri/api/routers/index";
import { auth } from "@zentri/auth";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

export function createServer() {
  const app = new Hono();

  app.use(logger());

  app.use(
    "/*",
    cors({
      origin: process.env.CORS_ORIGIN || "",
      allowMethods: ["GET", "POST", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  );

  app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

  app.use(
    "/trpc/*",
    trpcServer({
      router: appRouter,
      createContext: (_opts, context) => createContext({ context }),
    }),
  );

  app.get("/", (c) => c.text("OK"));

  return app;
}
