import { useEditSamplingColumn } from "./columns/editSamplingCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableEditSampling(
  data: any,
  handleNavigate: (page: string) => void,
  handleDelete: (id: string, lampiranST: boolean) => void,
  selectedItems: string[],
  handleCheckItems: (id: string) => void
) {
  const columns = useEditSamplingColumn(handleNavigate, selectedItems, handleCheckItems, handleDelete);

  const tableState = useTableState({
    initialColumnPinning: {
      left: [],
      right: ["actions"],
    },
  });

  const tableEdit = useTableConfig({
    data,
    columns,
    tableState,
    pageCount: 0,
  });

  return { tableEdit };
}
