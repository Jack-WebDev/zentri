import { afterAll, beforeAll, vi } from "vitest";

process.env.NODE_ENV ??= "test";

// Restore real timers globally
vi.useRealTimers();

// silence noisy logs during tests
beforeAll(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterAll(() => {
  vi.restoreAllMocks();
});

// Example: global fetch mock (Vitest docs)
if (!globalThis.fetch) {
  globalThis.fetch = vi.fn(
    async () =>
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
  ) as unknown as typeof fetch;
}
