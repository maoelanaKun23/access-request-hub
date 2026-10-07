import { useAddDocumentColumn } from "./columns/addDocumentCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableAddDocument(
  data: any,
  handleCheckItems: (id: string, isChecked: boolean) => void,
  handleSelectAll: (isChecked: boolean, rows: any[]) => void,
  selectedItems: string[] = []
) {
  const columns = useAddDocumentColumn(handleCheckItems, handleSelectAll);

  const tableState = useTableState({
    initialColumnPinning: {
      left: [],
      right: ["actions"],
    },
  });

  const table = useTableConfig({
    data,
    columns,
    tableState,
    pageCount: 0,
  });

  return { table };
}
