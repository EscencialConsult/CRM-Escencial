import { describe, expect, it } from "vitest";

import { buildListFilter, parseListFilter } from "./inFilter";

describe("list filters", () => {
  it("round-trips numbers and quoted strings for the in operator", () => {
    const values = [1, "retail", "real estate"];

    expect(parseListFilter(buildListFilter(values))).toEqual(values);
  });

  it("builds and parses a contains (cs) array value", () => {
    expect(buildListFilter([3, 5], "cs")).toBe("{3,5}");
    expect(parseListFilter("{3,5}")).toEqual([3, 5]);
  });

  it("returns an empty list when the filter is not set", () => {
    expect(parseListFilter(undefined)).toEqual([]);
  });
});
