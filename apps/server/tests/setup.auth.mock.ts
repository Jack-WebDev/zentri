import { vi } from "vitest";

vi.mock("@zentri/auth/server", () => {
  return {
    auth: {
      // Used by app.on(["POST","GET"], "/api/auth/*", ...)
      handler: vi.fn(async () => new Response(null, { status: 200 })),

      // Used by createContext() to get session from request headers
      api: {
        getSession: vi.fn(async () => ({
          user: { id: "user_1", email: "test@example.com", name: "Test User" },
          // add any fields your code reads
        })),
      },
    },
  };
});
