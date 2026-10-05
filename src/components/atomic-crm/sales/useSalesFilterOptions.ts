import {
  useCanAccess,
  useGetIdentity,
  useGetList,
  useTranslate,
} from "ra-core";

import type { CheckboxFilterOption } from "../filters/CheckboxFilterCategory";
import type { Sale } from "../types";

const MAX_DISPLAYED_SALES = 10;

/** "Me" followed by the other active sales, as checkbox filter options. */
export const useSalesFilterOptions = (): CheckboxFilterOption[] => {
  const translate = useTranslate();
  const { identity } = useGetIdentity();
  const { canAccess } = useCanAccess({ resource: "sales", action: "list" });
  const { data: sales } = useGetList<Sale>(
    "sales",
    {
      pagination: { page: 1, perPage: MAX_DISPLAYED_SALES },
      sort: { field: "last_name", order: "ASC" },
      filter: { "disabled@neq": true, "id@neq": identity?.id },
    },
    { enabled: canAccess === true && identity?.id != null },
  );

  if (identity?.id == null) return [];
  return [
    { value: Number(identity.id), label: translate("crm.common.me") },
    ...(canAccess ? (sales ?? []) : []).map((sale) => ({
      value: Number(sale.id),
      label: `${sale.first_name} ${sale.last_name}`,
    })),
  ];
};
