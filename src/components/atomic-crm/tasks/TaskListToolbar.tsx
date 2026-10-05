import { Search } from "lucide-react";
import { useTranslate } from "ra-core";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useConfigurationContext } from "../root/ConfigurationContext";
import type { Sale } from "../types";
import type { TaskFilters, TaskStatusFilter } from "./taskFilters";

const STATUSES: TaskStatusFilter[] = ["pending", "overdue", "done", "all"];

export const TaskListToolbar = ({
  filters,
  onChange,
  sales,
}: {
  filters: TaskFilters;
  onChange: (filters: TaskFilters) => void;
  sales: Sale[];
}) => {
  const translate = useTranslate();
  const { taskTypes } = useConfigurationContext();
  const patch = (partial: Partial<TaskFilters>) =>
    onChange({ ...filters, ...partial });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          value={filters.search}
          onChange={(event) => patch({ search: event.target.value })}
          placeholder={translate("resources.tasks.filters.search")}
          className="pl-8"
        />
      </div>
      <Select
        value={filters.status}
        onValueChange={(status) =>
          patch({ status: status as TaskStatusFilter })
        }
      >
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUSES.map((status) => (
            <SelectItem key={status} value={status}>
              {translate(`resources.tasks.filters.status_${status}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={filters.assignee}
        onValueChange={(assignee) => patch({ assignee })}
      >
        <SelectTrigger className="w-44">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="me">
            {translate("resources.tasks.filters.mine")}
          </SelectItem>
          <SelectItem value="all">
            {translate("resources.tasks.filters.everyone")}
          </SelectItem>
          {sales.map((sale) => (
            <SelectItem key={sale.id} value={String(sale.id)}>
              {sale.first_name} {sale.last_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={filters.type} onValueChange={(type) => patch({ type })}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            {translate("resources.tasks.filters.all_types")}
          </SelectItem>
          {taskTypes.map((taskType) => (
            <SelectItem key={taskType.value} value={taskType.value}>
              {taskType.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
