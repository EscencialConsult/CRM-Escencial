import { startOfToday } from "date-fns/startOfToday";
import { useGetIdentity, useGetList } from "ra-core";

/** Number of pending tasks assigned to the current user that are past due. */
export const useOverdueTasksCount = (): number => {
  const { identity } = useGetIdentity();
  const { total } = useGetList(
    "tasks",
    {
      pagination: { page: 1, perPage: 1 },
      filter: {
        "done_date@is": null,
        "due_date@lt": startOfToday().toISOString(),
        sales_id: identity?.id,
      },
    },
    { enabled: !!identity },
  );
  return total ?? 0;
};
