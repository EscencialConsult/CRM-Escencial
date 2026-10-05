import { addDays, subDays } from "date-fns";
import { describe, expect, it } from "vitest";

import type { Task } from "../types";
import { groupTasks, matchesFilters } from "./groupTasks";

const buildTask = (overrides: Partial<Task>): Task => ({
  id: 1,
  contact_id: 1,
  type: "call",
  text: "Follow up",
  due_date: new Date().toISOString(),
  done_date: null,
  ...overrides,
});

describe("groupTasks", () => {
  it("puts overdue pending tasks in overdue and completed ones in done", () => {
    const overdue = buildTask({
      id: 1,
      due_date: subDays(new Date(), 3).toISOString(),
    });
    const done = buildTask({
      id: 2,
      due_date: subDays(new Date(), 3).toISOString(),
      done_date: new Date().toISOString(),
    });

    const groups = groupTasks([overdue, done]);

    expect(groups.overdue).toEqual([overdue]);
    expect(groups.done).toEqual([done]);
  });

  it("puts tasks due far in the future in later", () => {
    const later = buildTask({
      due_date: addDays(new Date(), 30).toISOString(),
    });

    expect(groupTasks([later]).later).toEqual([later]);
  });
});

describe("matchesFilters", () => {
  const filters = { search: "", type: "all", status: "pending" } as const;

  it("excludes completed tasks when status is pending", () => {
    const task = buildTask({ done_date: new Date().toISOString() });

    expect(matchesFilters(task, filters)).toBe(false);
  });

  it("matches the search text against the company name", () => {
    const task = buildTask({});

    expect(
      matchesFilters(
        task,
        { ...filters, search: "acme" },
        { name: "Jane Doe", companyName: "Acme Corp" },
      ),
    ).toBe(true);
  });

  it("excludes tasks of another type", () => {
    const task = buildTask({ type: "email" });

    expect(matchesFilters(task, { ...filters, type: "call" })).toBe(false);
  });
});
