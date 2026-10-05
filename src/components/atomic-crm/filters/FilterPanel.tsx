import { FilterX } from "lucide-react";
import { FilterLiveForm, useListContext, useTranslate } from "ra-core";
import type { ReactNode } from "react";
import { SearchInput } from "@/components/admin/search-input";
import { Button } from "@/components/ui/button";

/**
 * Right-hand filter card for desktop lists: search box, clear button and a
 * body that scrolls independently from the list next to it.
 */
export const FilterPanel = ({
  searchPlaceholder,
  children,
}: {
  searchPlaceholder?: string;
  children: ReactNode;
}) => {
  const translate = useTranslate();
  const { filterValues, setFilters } = useListContext();
  const hasActiveFilters = Object.keys(filterValues ?? {}).length > 0;

  return (
    <aside className="sticky top-4 w-64 min-w-64 self-start">
      <div className="flex max-h-[calc(100vh-2rem)] flex-col gap-4 rounded-xl border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">
            {translate("crm.common.filters")}
          </h2>
          {hasActiveFilters && (
            <Button
              size="sm"
              variant="ghost"
              className="h-7 gap-1 px-2 text-xs"
              onClick={() => setFilters({}, [])}
            >
              <FilterX className="size-3.5" />
              {translate("crm.common.clear_filters")}
            </Button>
          )}
        </div>
        <FilterLiveForm>
          <SearchInput source="q" placeholder={searchPlaceholder} />
        </FilterLiveForm>
        <div className="themed-scrollbar -mr-2 flex flex-col gap-5 overflow-y-auto pr-2">
          {children}
        </div>
      </div>
    </aside>
  );
};
