import {
  useAddLampiranStColumns,
  ILampiranSt,
} from "./columns/addLampiranStCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableAddLampiranSt(
  data: ILampiranSt[],
  setSelectedTab: (tab: "LampiranST" | "Add" | "Edit") => void,
  handleDeleteLampiranSt: (itemId: string) => void,
  type?: "add" | "view" | "suratTugas",
  handleAddLampiranSt?: (itemId: ILampiranSt) => void,
  selectedLampiranSt?: ILampiranSt[],
  selectedFile?: File | null,
  handleEdit?: (itemId: string, updatedData: ILampiranSt) => void,
) {
  const columns = useAddLampiranStColumns(
    setSelectedTab,
    handleDeleteLampiranSt,
    type,
    handleAddLampiranSt,
    selectedLampiranSt,
    selectedFile,
    handleEdit,
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
