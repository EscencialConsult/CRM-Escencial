export type TaskStatusFilter = "pending" | "overdue" | "done" | "all";

export interface TaskFilters {
  search: string;
  /** "all", "me" or a sales id */
  assignee: string;
  type: string;
  status: TaskStatusFilter;
}

export const defaultTaskFilters: TaskFilters = {
  search: "",
  assignee: "me",
  type: "all",
  status: "pending",
};
