import { describe, expect, it } from "vitest";
import type { Context } from "../src/context";
import { appRouter } from "../src/routers";

const fakeDb = {} as unknown as Context["db"];

describe("appRouter", () => {
  it("healthCheck works", async () => {
    const caller = appRouter.createCaller({
      session: null,
      db: fakeDb,
    } as Context);
    const res = await caller.healthCheck();
    expect(res).toBe("OK");
  });

  it("privateData requires session", async () => {
    const caller = appRouter.createCaller({
      session: null,
      db: fakeDb,
    } as Context);
    await expect(caller.privateData()).rejects.toMatchObject({
      code: "UNAUTHORIZED",
    });
  });

  it("privateData returns user when session present", async () => {
    const caller = appRouter.createCaller({
      session: { user: { id: "u1", email: "x@y.z" } },
      db: fakeDb,
    } as unknown as Context);

    const res = await caller.privateData();
    expect(res.message).toBe("This is private");
    expect(res.user).toEqual({ id: "u1", email: "x@y.z" });
  });
});
