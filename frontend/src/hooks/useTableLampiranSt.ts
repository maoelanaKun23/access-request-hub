import { ILampiranSt, useLampiranStColumns } from "./columns/lampiranStCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableLampiranSt(
  data: ILampiranSt[],
  setSelectedTab: (tab: "LampiranST" | "Add" | "Edit") => void,
  handleDeleteLampiranSt: (itemId: string) => void,
  handleSort: (field: string) => void
) {
  const columns = useLampiranStColumns(
    setSelectedTab,
    handleDeleteLampiranSt,
    handleSort
  );

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
