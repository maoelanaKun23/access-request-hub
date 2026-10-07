import { IManualBookItem, useManualBookColumns } from "./columns/manualBookCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableManualBook(
  data: IManualBookItem[],
  handleDelete: (isDeleted: boolean) => void,
  handleDeleteId: (id: string | null) => void,
  handleDownload: (id: string, name: string) => void
) {
  const columns = useManualBookColumns(handleDelete, handleDeleteId, handleDownload);

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
