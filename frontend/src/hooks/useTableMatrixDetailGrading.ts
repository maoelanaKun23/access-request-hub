import { useMatrixDetailColumn } from "./columns/matrixDetailCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableMatrixDetailGrading(data: any[]) {
  const columns = useMatrixDetailColumn();

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
