export type InFilterValue = string | number;

/** `in` matches ANY value (`col@in.(1,2)`), `cs` matches ALL values (`col@cs.{1,2}`). */
export type ListFilterOperator = "in" | "cs";

const ITEM_REGEX = /"([^"]*)"|([^,(){}]+)/g;

/** Builds a PostgREST list filter value, e.g. `(1,"a b")` or `{1,2}`. */
export const buildListFilter = (
  values: InFilterValue[],
  operator: ListFilterOperator = "in",
): string => {
  const items = values
    .map((v) => (typeof v === "number" ? v : `"${v}"`))
    .join(",");
  return operator === "cs" ? `{${items}}` : `(${items})`;
};

/** Parses a PostgREST list filter value back into its items. */
export const parseListFilter = (value: unknown): InFilterValue[] => {
  if (typeof value !== "string") return [];
  return [...value.matchAll(ITEM_REGEX)].map((match) => {
    const raw = match[1] ?? match[2];
    const asNumber = Number(raw);
    return match[2] != null && raw.trim() !== "" && !Number.isNaN(asNumber)
      ? asNumber
      : raw;
  });
};
