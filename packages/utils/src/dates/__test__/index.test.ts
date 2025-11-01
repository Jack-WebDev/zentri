import { describe, expect, it } from "vitest";
import { compareNullableDates, isOverdue } from "../index";

describe("dates", () => {
  it("isOverdue respects now", () => {
    const now = new Date("2025-01-01T00:00:00Z");
    expect(isOverdue(new Date("2024-12-31T23:59:59Z"), now)).toBe(true);
    expect(isOverdue(new Date("2025-01-01T00:00:01Z"), now)).toBe(false);
  });

  it("compareNullableDates sorts nulls last", () => {
    const a = new Date("2025-01-01");
    expect([a, null].sort(compareNullableDates)).toEqual([a, null]);
  });
});
