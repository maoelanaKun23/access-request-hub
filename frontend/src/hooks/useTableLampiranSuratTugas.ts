import { useLampiranSuratTugasColumn } from "./columns/lampiranSuratTugas";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableLampiranSuratTugas(data: any[]) {
  const columns = useLampiranSuratTugasColumn();

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
