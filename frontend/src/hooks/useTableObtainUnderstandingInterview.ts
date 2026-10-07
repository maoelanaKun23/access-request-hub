import { useObtainUnderstandingInterviewColumn } from "./columns/obtainUnderstandingInterview";
import { useTableState } from "./use-table-state";
import { useTableConfig } from "./use-table-config";

export function useTableObtainUnderstandingInterview(
  data: any,
  pageNumber: number,
  pageSize: number,
  handleSort: (field: string) => void,
  sortValue: string,
) {
  const columns = useObtainUnderstandingInterviewColumn(
    pageNumber,
    pageSize,
    handleSort,
    sortValue,
  );

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
