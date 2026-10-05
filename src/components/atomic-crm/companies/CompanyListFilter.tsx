import { Building, Truck, Users } from "lucide-react";
import { useTranslate } from "ra-core";

import { CheckboxFilterCategory } from "../filters/CheckboxFilterCategory";
import { FilterPanel } from "../filters/FilterPanel";
import { useConfigurationContext } from "../root/ConfigurationContext";
import { useSalesFilterOptions } from "../sales/useSalesFilterOptions";
import { getTranslatedCompanySizeLabel } from "./getTranslatedCompanySizeLabel";
import { sizes } from "./sizes";

export const CompanyListFilter = () => {
  const { companySectors } = useConfigurationContext();
  const translate = useTranslate();
  const salesOptions = useSalesFilterOptions();

  const sizeOptions = sizes.map((size) => ({
    value: size.id,
    label: getTranslatedCompanySizeLabel(size, translate),
  }));
  const sectorOptions = companySectors.map((sector) => ({
    value: sector.value,
    label: sector.label,
  }));

  return (
    <FilterPanel>
      <CheckboxFilterCategory
        icon={<Building className="size-3.5" />}
        label="resources.companies.fields.size"
        source="size"
        options={sizeOptions}
      />
      <CheckboxFilterCategory
        icon={<Truck className="size-3.5" />}
        label="resources.companies.fields.sector"
        source="sector"
        options={sectorOptions}
      />
      <CheckboxFilterCategory
        icon={<Users className="size-3.5" />}
        label="resources.companies.fields.sales_id"
        source="sales_id"
        options={salesOptions}
      />
    </FilterPanel>
  );
};
