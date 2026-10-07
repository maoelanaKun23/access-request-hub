import { useObtainUnderstandingAuditeeColumn } from "./columns/obtainUnderstandingAuditee";
import { useTableState } from "./use-table-state";
import { useTableConfig } from "./use-table-config";

export function useTableObtainUnderstandingAuditee(data: any, sort: string, handleSort: (field: string) => void, pageNumber: number, pageSize: number) {
  const columns = useObtainUnderstandingAuditeeColumn(sort, handleSort, pageNumber, pageSize);

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
    pageCount: 0
  });

  return { table };
}