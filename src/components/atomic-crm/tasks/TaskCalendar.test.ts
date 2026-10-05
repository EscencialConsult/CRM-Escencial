import { describe, expect, it } from "vitest";

import { getMonthGridDays } from "./getMonthGridDays";

describe("getMonthGridDays", () => {
  it("returns whole Monday-to-Sunday weeks covering the month", () => {
    // Arrange: February 2026 starts on a Sunday and ends on a Saturday
    const month = new Date(2026, 1, 1);

    // Act
    const days = getMonthGridDays(month);

    // Assert
    expect(days.length % 7).toBe(0);
    expect(days[0].getDay()).toBe(1);
    expect(days[days.length - 1].getDay()).toBe(0);
    expect(
      days.some((day) => day.getMonth() === 1 && day.getDate() === 28),
    ).toBe(true);
  });
});
