import {
  useWeeklyPlanColumns,
  processWeeklyPlanData,
} from "./columns/weelyPlanCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";
import { useMemo } from "react";

export function useTableWeeklyPlan(
  rawData: any,
  sort: string,
  handleSort: (field: string) => void,
  handleTabChange: (tab: "add" | "edit" | "approval") => void,
  refetchWeeklyPlan: () => void,
  isAllowedEdit: boolean,
  isAllowedApprove: boolean,
  isAllowedDelete: boolean
) {
  const columns = useWeeklyPlanColumns(
    sort,
    handleSort,
    handleTabChange,
    refetchWeeklyPlan,
    isAllowedEdit,
    isAllowedApprove,
    isAllowedDelete
  );

  const processedData = useMemo(() => {
    if (!rawData || !Array.isArray(rawData)) {
      return [];
    }
    return processWeeklyPlanData(rawData);
  }, [rawData]);

  const tableState = useTableState({
    initialColumnPinning: {
      left: [],
      right: ["actions"],
    },
  });

  const pageCount = processedData ? Math.ceil(processedData.length / 10) : 0;

  const table = useTableConfig({
    data: processedData,
    columns,
    tableState,
    pageCount,
  });

  return { table };
}
