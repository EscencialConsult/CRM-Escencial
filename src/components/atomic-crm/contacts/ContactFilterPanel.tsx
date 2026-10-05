import { endOfYesterday, startOfMonth, startOfWeek, subMonths } from "date-fns";
import { CheckSquare, Clock, Tag, TrendingUp, Users } from "lucide-react";
import { useGetList, useTranslate } from "ra-core";
import { Badge } from "@/components/ui/badge";

import {
  CheckboxFilterCategory,
  FilterCategoryTitle,
} from "../filters/CheckboxFilterCategory";
import { FilterPanel } from "../filters/FilterPanel";
import { ToggleCheckboxFilter } from "../filters/ToggleCheckboxFilter";
import { Status } from "../misc/Status";
import { useConfigurationContext } from "../root/ConfigurationContext";
import { useSalesFilterOptions } from "../sales/useSalesFilterOptions";

const lastSeenOptions = () => [
  {
    label: "resources.contacts.filters.today",
    value: {
      "last_seen@gte": endOfYesterday().toISOString(),
      "last_seen@lte": undefined,
    },
  },
  {
    label: "resources.contacts.filters.this_week",
    value: {
      "last_seen@gte": startOfWeek(new Date()).toISOString(),
      "last_seen@lte": undefined,
    },
  },
  {
    label: "resources.contacts.filters.before_this_week",
    value: {
      "last_seen@gte": undefined,
      "last_seen@lte": startOfWeek(new Date()).toISOString(),
    },
  },
  {
    label: "resources.contacts.filters.before_this_month",
    value: {
      "last_seen@gte": undefined,
      "last_seen@lte": startOfMonth(new Date()).toISOString(),
    },
  },
  {
    label: "resources.contacts.filters.before_last_month",
    value: {
      "last_seen@gte": undefined,
      "last_seen@lte": subMonths(startOfMonth(new Date()), 1).toISOString(),
    },
  },
];

export const ContactFilterPanel = () => {
  const { noteStatuses } = useConfigurationContext();
  const translate = useTranslate();
  const salesOptions = useSalesFilterOptions();
  const { data: tags } = useGetList("tags", {
    pagination: { page: 1, perPage: 10 },
    sort: { field: "name", order: "ASC" },
  });

  return (
    <FilterPanel
      searchPlaceholder={translate("resources.contacts.filters.search")}
    >
      <div className="flex flex-col gap-1">
        <FilterCategoryTitle
          icon={<Clock className="size-3.5" />}
          label="resources.contacts.fields.last_seen"
        />
        {lastSeenOptions().map((option) => (
          <ToggleCheckboxFilter
            key={option.label}
            label={option.label}
            value={option.value}
          />
        ))}
      </div>

      <CheckboxFilterCategory
        icon={<TrendingUp className="size-3.5" />}
        label="resources.notes.fields.status"
        source="status"
        options={noteStatuses.map((status) => ({
          value: status.value,
          label: (
            <span>
              {status.label} <Status status={status.value} />
            </span>
          ),
        }))}
      />

      <CheckboxFilterCategory
        icon={<Tag className="size-3.5" />}
        label="resources.contacts.filters.tags"
        source="tags"
        operator="cs"
        options={(tags ?? []).map((tag) => ({
          value: Number(tag.id),
          label: (
            <Badge
              variant="secondary"
              className="text-black text-xs font-normal"
              style={{ backgroundColor: tag.color }}
            >
              {tag.name}
            </Badge>
          ),
        }))}
      />

      <div className="flex flex-col gap-1">
        <FilterCategoryTitle
          icon={<CheckSquare className="size-3.5" />}
          label="resources.contacts.filters.tasks"
        />
        <ToggleCheckboxFilter
          label="resources.tasks.filters.with_pending"
          value={{ "nb_tasks@gt": 0 }}
        />
      </div>

      <CheckboxFilterCategory
        icon={<Users className="size-3.5" />}
        label="resources.contacts.fields.sales_id"
        source="sales_id"
        options={salesOptions}
      />
    </FilterPanel>
  );
};
