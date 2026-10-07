import { Item, useStandardLeadtimeColumn } from "./columns/standardLeadtimeCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableStandardLeadTime(data: Item[], totals: any, setSelectedTab: (tab: "standardLeadtime" | "edit") => void) {
  const columns = useStandardLeadtimeColumn(totals, setSelectedTab);

  const tableState = useTableState({
    initialColumnPinning: {
      left: [],
      right: ["actions"],
    },
  });

  const pageCount = 1;

  return useTableConfig({
    data,
    columns,
    tableState,
    pageCount,
  });
}
