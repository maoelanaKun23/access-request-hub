import { useLikelihoodColumns } from "./columns/likelihoodCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableLikelihoodRiskLevel(data: any[]) {
  const columns = useLikelihoodColumns();

  const tableState = useTableState({
    initialColumnPinning: {
      left: [],
      right: [],
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
