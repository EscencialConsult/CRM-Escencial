import { useMemo, useState } from "react";
import { CalendarDays, List } from "lucide-react";
import {
  type Identifier,
  useGetIdentity,
  useGetList,
  useTranslate,
} from "ra-core";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import type { Contact, Sale, Task as TData } from "../types";
import { AddTask } from "./AddTask";
import { Task } from "./Task";
import { TaskBulkActions } from "./TaskBulkActions";
import { TaskCalendar } from "./TaskCalendar";
import {
  GROUP_ORDER,
  groupTasks,
  matchesFilters,
  type TaskContactInfo,
} from "./groupTasks";
import { defaultTaskFilters, type TaskFilters } from "./taskFilters";
import { TaskListToolbar } from "./TaskListToolbar";

export const TaskList = () => {
  const translate = useTranslate();
  const { identity } = useGetIdentity();
  const [filters, setFilters] = useState<TaskFilters>(defaultTaskFilters);
  const [view, setView] = useState<"list" | "calendar">("list");
  const [selection, setSelection] = useState<Set<Identifier>>(new Set());

  const assigneeId =
    filters.assignee === "me" ? identity?.id : filters.assignee;
  const isReady = filters.assignee !== "me" || !!identity;

  const { data: sales = [] } = useGetList<Sale>("sales", {
    pagination: { page: 1, perPage: 200 },
    sort: { field: "first_name", order: "ASC" },
  });
  const { data: tasks, isPending } = useGetList<TData>(
    "tasks",
    {
      pagination: { page: 1, perPage: 1000 },
      sort: { field: "due_date", order: "ASC" },
      filter: filters.assignee === "all" ? {} : { sales_id: assigneeId },
    },
    { enabled: isReady },
  );

  const contactIds = useMemo(
    () => [...new Set((tasks ?? []).map((task) => task.contact_id))],
    [tasks],
  );
  const { data: contacts } = useGetList<Contact & { id: number }>(
    "contacts",
    {
      pagination: { page: 1, perPage: 1000 },
      filter: { "id@in": `(${contactIds.join(",")})` },
    },
    { enabled: contactIds.length > 0 },
  );

  const contactInfo = useMemo(() => {
    const map = new Map<number | string, TaskContactInfo>();
    for (const contact of contacts ?? []) {
      map.set(contact.id, {
        name: `${contact.first_name} ${contact.last_name}`,
        companyName: contact.company_name,
      });
    }
    return map;
  }, [contacts]);

  const salesNames = useMemo(
    () =>
      new Map(
        sales.map((sale) => [sale.id, `${sale.first_name} ${sale.last_name}`]),
      ),
    [sales],
  );

  const groups = useMemo(
    () =>
      groupTasks(
        (tasks ?? []).filter((task) =>
          matchesFilters(task, filters, contactInfo.get(task.contact_id)),
        ),
      ),
    [tasks, filters, contactInfo],
  );

  const visibleTasks = useMemo(
    () => GROUP_ORDER.flatMap((key) => groups[key]),
    [groups],
  );
  // Only keep selected ids that are still visible (filters/completions change the list)
  const selectedIds = useMemo(
    () => visibleTasks.map((task) => task.id).filter((id) => selection.has(id)),
    [visibleTasks, selection],
  );
  const allSelected =
    visibleTasks.length > 0 && selectedIds.length === visibleTasks.length;

  const toggleSelected = (id: Identifier, selected: boolean) =>
    setSelection((current) => {
      const next = new Set(current);
      if (selected) next.add(id);
      else next.delete(id);
      return next;
    });

  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {translate("resources.tasks.name", { smart_count: 2 })}
        </h1>
        <div className="flex items-center gap-2">
          <div className="flex rounded-md border p-0.5">
            <Button
              size="sm"
              variant={view === "list" ? "secondary" : "ghost"}
              onClick={() => setView("list")}
            >
              <List />
              {translate("resources.tasks.views.list")}
            </Button>
            <Button
              size="sm"
              variant={view === "calendar" ? "secondary" : "ghost"}
              onClick={() => setView("calendar")}
            >
              <CalendarDays />
              {translate("resources.tasks.views.calendar")}
            </Button>
          </div>
          <AddTask selectContact display="chip" />
        </div>
      </div>
      <TaskListToolbar filters={filters} onChange={setFilters} sales={sales} />
      {view === "calendar" ? (
        <TaskCalendar tasks={visibleTasks} contactInfo={contactInfo} />
      ) : (
        <>
          {selectedIds.length > 0 && (
            <TaskBulkActions
              ids={selectedIds}
              sales={sales}
              onClear={() => setSelection(new Set())}
            />
          )}
          {visibleTasks.length > 0 && (
            <label className="flex w-fit items-center gap-2 text-sm text-muted-foreground">
              <Checkbox
                checked={allSelected}
                onCheckedChange={(checked) =>
                  setSelection(
                    checked === true
                      ? new Set(visibleTasks.map((task) => task.id))
                      : new Set(),
                  )
                }
              />
              {translate("resources.tasks.bulk.select_all")}
            </label>
          )}
          {!isPending && visibleTasks.length === 0 && (
            <p className="text-sm text-muted-foreground">
              {translate("resources.tasks.filters.no_results")}
            </p>
          )}
          {GROUP_ORDER.map((key) =>
            groups[key].length === 0 ? null : (
              <section key={key} className="flex flex-col gap-2">
                <h2 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  {translate(`resources.tasks.filters.${key}`)} (
                  {groups[key].length})
                </h2>
                <div className="flex flex-col divide-y rounded-lg border bg-card">
                  {groups[key].map((task) => (
                    <div key={task.id} className="p-3">
                      <Task
                        task={task}
                        showContact
                        companyName={
                          contactInfo.get(task.contact_id)?.companyName
                        }
                        assigneeName={
                          filters.assignee === "all" && task.sales_id != null
                            ? salesNames.get(task.sales_id)
                            : undefined
                        }
                        salesOptions={sales}
                        selection={{
                          selected: selection.has(task.id),
                          onChange: (selected) =>
                            toggleSelected(task.id, selected),
                        }}
                      />
                    </div>
                  ))}
                </div>
              </section>
            ),
          )}
        </>
      )}
    </div>
  );
};
