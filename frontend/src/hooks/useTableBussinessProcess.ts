import { useBussinessProcessColumn } from "./columns/businessProcessCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableBussinessProcess(
  data: any,
  handleNavigate: (id: string) => void,
  handleDownload: (fileId: string, fileName: string) => void,
  handleDelete: (id: string) => void
) {
  const columns = useBussinessProcessColumn(handleNavigate, handleDownload, handleDelete);

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
