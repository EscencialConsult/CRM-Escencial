import matches from "lodash/matches";
import pickBy from "lodash/pickBy";
import { useListContext, useTranslate } from "ra-core";
import type { ReactNode } from "react";

import { FilterOptionRow } from "./CheckboxFilterCategory";

/**
 * A single checkbox applying a fixed filter value (e.g. a date range or
 * "has pending tasks"). Checking one option of a mutually exclusive group
 * replaces the others because they share the same filter keys.
 */
export const ToggleCheckboxFilter = ({
  label,
  value,
}: {
  label: ReactNode;
  value: Record<string, unknown>;
}) => {
  const translate = useTranslate();
  const { filterValues, setFilters } = useListContext();
  const defined = pickBy(value, (val) => typeof val !== "undefined");
  const isChecked = matches(defined)(filterValues);

  const handleChange = (checked: boolean) => {
    if (!checked) {
      setFilters(
        Object.fromEntries(
          Object.entries(filterValues).filter(([key]) => !(key in value)),
        ),
      );
      return;
    }
    // Drop keys explicitly set to undefined (the other bound of a range)
    const cleared = Object.fromEntries(
      Object.entries(filterValues).filter(([key]) => !(key in value)),
    );
    setFilters({ ...cleared, ...defined });
  };

  return (
    <FilterOptionRow checked={isChecked} onCheckedChange={handleChange}>
      {typeof label === "string" ? translate(label, { _: label }) : label}
    </FilterOptionRow>
  );
};
