import { describe, it, expect } from "vitest";
import { formatDateString } from "./date";

describe("formatDateString", () => {
  it("formats a valid date string correctly", () => {
    const input =
      "Mon Sep 23 2024 20:07:19 GMT+0200 (Central European Summer Time)";
    const expectedOutput = "2024-09-23";
    expect(formatDateString(input)).toBe(expectedOutput);
  });

  it("formats a date string with a different format correctly", () => {
    const input = "01/10/2023";
    const expectedOutput = "2023-01-09";
    expect(formatDateString(input)).toBe(expectedOutput);
  });
});
