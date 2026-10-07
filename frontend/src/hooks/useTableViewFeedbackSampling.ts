import { useViewFeedbackSamplingColumn } from "./columns/viewFeedbackSamplingCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableViewFeedbackSampling(
  data: any,
  handleNavigate: (page: string) => void,
  handleDelete: (id: string, lampiranST: boolean) => void
) {
  const columns = useViewFeedbackSamplingColumn(handleNavigate, handleDelete);

  const tableState = useTableState({
    initialColumnPinning: {
      left: [],
      right: ["actions"],
    },
  });

  const tableView = useTableConfig({
    data,
    columns,
    tableState,
    pageCount: 0,
  });

  return { tableView };
}
