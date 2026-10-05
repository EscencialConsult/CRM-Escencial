import { Check, RotateCcw, Trash2, X } from "lucide-react";
import {
  type Identifier,
  useDeleteMany,
  useNotify,
  useTranslate,
  useUpdateMany,
} from "ra-core";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Sale } from "../types";

const DAY_MS = 24 * 60 * 60 * 1000;
const inDays = (days: number) =>
  new Date(Date.now() + days * DAY_MS).toISOString().slice(0, 10);

export const TaskBulkActions = ({
  ids,
  sales,
  onClear,
}: {
  ids: Identifier[];
  sales: Sale[];
  onClear: () => void;
}) => {
  const translate = useTranslate();
  const notify = useNotify();
  const [updateMany, { isPending: isUpdating }] = useUpdateMany();
  const [deleteMany, { isPending: isDeleting }] = useDeleteMany();
  const isPending = isUpdating || isDeleting;

  const run = (data: Record<string, unknown>, messageKey: string) =>
    updateMany(
      "tasks",
      { ids, data },
      {
        mutationMode: "undoable",
        onSuccess: () => {
          notify(messageKey, {
            type: "info",
            undoable: true,
            messageArgs: { smart_count: ids.length },
          });
          onClear();
        },
      },
    );

  const handleDelete = () =>
    deleteMany(
      "tasks",
      { ids },
      {
        mutationMode: "undoable",
        onSuccess: () => {
          notify("resources.tasks.bulk.deleted", {
            type: "info",
            undoable: true,
            messageArgs: { smart_count: ids.length },
          });
          onClear();
        },
      },
    );

  return (
    <div
      role="toolbar"
      className="sticky top-2 z-10 flex flex-wrap items-center gap-2 rounded-lg border bg-card p-2 shadow-md"
    >
      <span className="px-2 text-sm font-medium">
        {translate("resources.tasks.bulk.selected", {
          smart_count: ids.length,
        })}
      </span>
      <Button
        size="sm"
        disabled={isPending}
        onClick={() =>
          run(
            { done_date: new Date().toISOString() },
            "resources.tasks.bulk.completed",
          )
        }
      >
        <Check />
        {translate("resources.tasks.actions.complete")}
      </Button>
      <Button
        size="sm"
        variant="outline"
        disabled={isPending}
        onClick={() =>
          run({ done_date: null }, "resources.tasks.bulk.reopened")
        }
      >
        <RotateCcw />
        {translate("resources.tasks.actions.reopen")}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="outline" disabled={isPending}>
            {translate("resources.tasks.bulk.postpone")}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() =>
              run({ due_date: inDays(1) }, "resources.tasks.bulk.postponed")
            }
          >
            {translate("resources.tasks.actions.postpone_tomorrow")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              run({ due_date: inDays(7) }, "resources.tasks.bulk.postponed")
            }
          >
            {translate("resources.tasks.actions.postpone_next_week")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="outline" disabled={isPending}>
            {translate("resources.tasks.actions.reassign")}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {sales.map((sale) => (
            <DropdownMenuItem
              key={sale.id}
              onClick={() =>
                run({ sales_id: sale.id }, "resources.tasks.bulk.reassigned")
              }
            >
              {sale.first_name} {sale.last_name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        size="sm"
        variant="outline"
        className="text-destructive"
        disabled={isPending}
        onClick={handleDelete}
      >
        <Trash2 />
        {translate("ra.action.delete")}
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="ml-auto"
        onClick={onClear}
        aria-label={translate("resources.tasks.bulk.clear")}
      >
        <X />
      </Button>
    </div>
  );
};
