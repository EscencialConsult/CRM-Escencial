import {
  addMonths,
  format,
  isSameMonth,
  isToday,
  startOfMonth,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type Identifier, useLocale, useTranslate } from "ra-core";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { Task as TData } from "../types";
import type { TaskContactInfo } from "./groupTasks";
import { getMonthGridDays } from "./getMonthGridDays";
import { isDone, isOverdue } from "./tasksPredicate";
import { TaskEdit } from "./TaskEdit";

const MAX_CHIPS_PER_DAY = 3;
const dayKey = (date: Date) => format(date, "yyyy-MM-dd");

export const TaskCalendar = ({
  tasks,
  contactInfo,
}: {
  tasks: TData[];
  contactInfo: Map<Identifier, TaskContactInfo>;
}) => {
  const translate = useTranslate();
  const locale = useLocale();
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const [editingId, setEditingId] = useState<Identifier | null>(null);

  const days = useMemo(() => getMonthGridDays(month), [month]);
  const tasksByDay = useMemo(() => {
    const map = new Map<string, TData[]>();
    for (const task of tasks) {
      const key = dayKey(new Date(task.due_date));
      map.set(key, [...(map.get(key) ?? []), task]);
    }
    return map;
  }, [tasks]);

  const weekdayFormat = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(month);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => setMonth(addMonths(month, -1))}
          aria-label={translate("ra.navigation.previous")}
        >
          <ChevronLeft />
        </Button>
        <h2 className="min-w-40 text-center text-lg font-medium capitalize">
          {monthLabel}
        </h2>
        <Button
          size="icon"
          variant="outline"
          onClick={() => setMonth(addMonths(month, 1))}
          aria-label={translate("ra.navigation.next")}
        >
          <ChevronRight />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setMonth(startOfMonth(new Date()))}
        >
          {translate("resources.tasks.calendar.today")}
        </Button>
      </div>
      <div className="grid grid-cols-7 overflow-hidden rounded-lg border bg-card text-xs">
        {days.slice(0, 7).map((day) => (
          <div
            key={day.getDay()}
            className="border-b bg-muted/50 p-2 text-center font-medium uppercase text-muted-foreground"
          >
            {weekdayFormat.format(day)}
          </div>
        ))}
        {days.map((day) => {
          const dayTasks = tasksByDay.get(dayKey(day)) ?? [];
          return (
            <div
              key={dayKey(day)}
              className={cn(
                "flex min-h-28 flex-col gap-1 border-b border-r p-1",
                !isSameMonth(day, month) && "bg-muted/30 text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "self-end rounded-full px-1.5 py-0.5",
                  isToday(day) && "bg-primary text-primary-foreground",
                )}
              >
                {format(day, "d")}
              </span>
              {dayTasks.slice(0, MAX_CHIPS_PER_DAY).map((task) => (
                <button
                  key={task.id}
                  type="button"
                  title={contactInfo.get(task.contact_id)?.name}
                  onClick={() => setEditingId(task.id)}
                  className={cn(
                    "truncate rounded px-1.5 py-0.5 text-left",
                    isDone(task)
                      ? "bg-muted text-muted-foreground line-through"
                      : isOverdue(task.due_date)
                        ? "bg-destructive/15 text-destructive"
                        : "bg-primary/10 text-primary",
                  )}
                >
                  {task.text}
                </button>
              ))}
              {dayTasks.length > MAX_CHIPS_PER_DAY && (
                <span className="px-1 text-muted-foreground">
                  +{dayTasks.length - MAX_CHIPS_PER_DAY}
                </span>
              )}
            </div>
          );
        })}
      </div>
      {editingId != null && (
        <TaskEdit taskId={editingId} open close={() => setEditingId(null)} />
      )}
    </div>
  );
};
