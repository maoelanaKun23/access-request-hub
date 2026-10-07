import { useEditFeedbackSamplingColumn } from "./columns/editFeedbackSamplingCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableEditFeedbackSampling(
  data: any,
  handleNavigate: (page: string) => void,
  selectedItems: string[],
  handleCheckItems: (id: string) => void,
  handleDelete: (id: string, lampiranST: boolean) => void
) {
  const columns = useEditFeedbackSamplingColumn(
    handleNavigate,
    selectedItems,
    handleCheckItems,
    handleDelete
  );

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
