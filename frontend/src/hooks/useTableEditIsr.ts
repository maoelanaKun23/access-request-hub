import { useEditIsrColumn } from "./columns/editIsrCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableEditIsr(
  data: any,
  selectedItems: any[],
  handleCheckItems: (id: string) => void,
  handleNavigate: (page: string) => void
) {
  const columns = useEditIsrColumn(selectedItems, handleCheckItems, handleNavigate);

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
