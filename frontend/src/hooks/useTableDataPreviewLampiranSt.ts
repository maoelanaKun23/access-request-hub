import { useDataPreviewLampiranStColumns,ILampiranSt} from "./columns/dataPreviewLampiranStCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableDataPreviewLampiranSt(
  data: ILampiranSt[],
  setSelectedTab: (tab: "LampiranST" | "Add" | "Edit") => void,
  handleDeleteLampiranSt: (itemId: string) => void,
  type?: "add" | "view",
  handleAddLampiranSt?: (itemId: ILampiranSt) => void,
) {
  const columns = useDataPreviewLampiranStColumns(
    setSelectedTab,
    handleDeleteLampiranSt,
    type,
    handleAddLampiranSt
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
