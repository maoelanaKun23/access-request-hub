import { useMatrixLevelColumns } from "./columns/matrixLevelCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableMatrixRiskLevel(data: any[]) {
  const columns = useMatrixLevelColumns();

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
