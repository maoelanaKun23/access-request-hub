import { useViewIsrColumn } from "./columns/viewIsrCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableViewIsr(
  data: any,
  selectedItems: any[],
  handleCheckItems: (id: string) => void,
  setOpenModal: (open: boolean) => void,
  setRecommendationID: (id: string) => void
) {
  const columns = useViewIsrColumn(selectedItems, handleCheckItems, setOpenModal, setRecommendationID);

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
