import type { Task } from "../types";
import type { TaskFilters } from "./taskFilters";
import {
  isDone,
  isDueLater,
  isDueThisWeek,
  isDueToday,
  isDueTomorrow,
  isOverdue,
} from "./tasksPredicate";

export type TaskGroupKey =
  | "overdue"
  | "today"
  | "tomorrow"
  | "this_week"
  | "later"
  | "done";

export interface TaskContactInfo {
  name: string;
  companyName?: string;
}

export const matchesFilters = (
  task: Task,
  filters: Pick<TaskFilters, "search" | "type" | "status">,
  contact?: TaskContactInfo,
): boolean => {
  const { search, type, status } = filters;
  if (type !== "all" && task.type !== type) return false;
  if (status === "pending" && isDone(task)) return false;
  if (status === "done" && !isDone(task)) return false;
  if (status === "overdue" && (isDone(task) || !isOverdue(task.due_date))) {
    return false;
  }
  const query = search.trim().toLowerCase();
  if (!query) return true;
  return [task.text, contact?.name, contact?.companyName].some((value) =>
    value?.toLowerCase().includes(query),
  );
};

const groupOf = (task: Task): TaskGroupKey | null => {
  if (isDone(task)) return "done";
  if (isOverdue(task.due_date)) return "overdue";
  if (isDueToday(task.due_date)) return "today";
  if (isDueTomorrow(task.due_date)) return "tomorrow";
  if (isDueThisWeek(task.due_date)) return "this_week";
  if (isDueLater(task.due_date)) return "later";
  return null;
};

export const GROUP_ORDER: TaskGroupKey[] = [
  "overdue",
  "today",
  "tomorrow",
  "this_week",
  "later",
  "done",
];

/** Buckets tasks by due date; completed tasks go last, most recent first. */
export const groupTasks = (tasks: Task[]): Record<TaskGroupKey, Task[]> => {
  const groups: Record<TaskGroupKey, Task[]> = {
    overdue: [],
    today: [],
    tomorrow: [],
    this_week: [],
    later: [],
    done: [],
  };
  for (const task of tasks) {
    const key = groupOf(task);
    if (key) groups[key].push(task);
  }
  groups.done = [...groups.done].sort(
    (a, b) =>
      new Date(b.done_date ?? 0).getTime() -
      new Date(a.done_date ?? 0).getTime(),
  );
  return groups;
};
