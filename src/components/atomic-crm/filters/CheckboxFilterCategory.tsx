import { useListContext, useTranslate } from "ra-core";
import type { ReactNode } from "react";
import { Checkbox } from "@/components/ui/checkbox";

import {
  buildListFilter,
  parseListFilter,
  type InFilterValue,
  type ListFilterOperator,
} from "./inFilter";

export interface CheckboxFilterOption {
  value: InFilterValue;
  label: ReactNode;
}

export const FilterOptionRow = ({
  checked,
  onCheckedChange,
  children,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  children: ReactNode;
}) => (
  <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent">
    <Checkbox
      checked={checked}
      onCheckedChange={(value) => onCheckedChange(value === true)}
    />
    <span className="min-w-0 flex-1 truncate">{children}</span>
  </label>
);

export const FilterCategoryTitle = ({
  icon,
  label,
  count = 0,
}: {
  icon: ReactNode;
  label: string;
  count?: number;
}) => {
  const translate = useTranslate();
  return (
    <h3 className="flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {icon}
      {translate(label, { _: label })}
      {count > 0 && (
        <span className="ml-auto rounded-full bg-primary px-1.5 text-[10px] font-medium text-primary-foreground">
          {count}
        </span>
      )}
    </h3>
  );
};

/**
 * A filter category rendered as accumulable checkboxes. With the default `in`
 * operator, records matching ANY checked option are kept; with `cs`, only
 * records containing ALL of them (array columns such as tags).
 */
export const CheckboxFilterCategory = ({
  icon,
  label,
  source,
  options,
  operator = "in",
}: {
  icon: ReactNode;
  label: string;
  source: string;
  options: CheckboxFilterOption[];
  operator?: ListFilterOperator;
}) => {
  const { filterValues, setFilters } = useListContext();
  const filterKey = `${source}@${operator}`;
  const selected = parseListFilter(filterValues[filterKey]);

  if (options.length === 0) return null;

  const toggle = (value: InFilterValue, checked: boolean) => {
    const next = checked
      ? [...selected, value]
      : selected.filter((item) => item !== value);
    const others = Object.fromEntries(
      Object.entries(filterValues).filter(([key]) => key !== filterKey),
    );
    setFilters(
      next.length > 0
        ? { ...others, [filterKey]: buildListFilter(next, operator) }
        : others,
    );
  };

  return (
    <div className="flex flex-col gap-1">
      <FilterCategoryTitle icon={icon} label={label} count={selected.length} />
      {options.map((option) => (
        <FilterOptionRow
          key={option.value}
          checked={selected.includes(option.value)}
          onCheckedChange={(checked) => toggle(option.value, checked)}
        >
          {option.label}
        </FilterOptionRow>
      ))}
    </div>
  );
};
