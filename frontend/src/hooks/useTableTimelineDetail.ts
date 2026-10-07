import { useTimelineDetailColumn } from "./columns/timelineDetailCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableTimelineDetail(data: any, handleShowModal: (name: string) => void) {
  const columns = useTimelineDetailColumn(handleShowModal);

  const tableState = useTableState({
    initialColumnPinning: {
      left: [],
      right: ["reason"],
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
