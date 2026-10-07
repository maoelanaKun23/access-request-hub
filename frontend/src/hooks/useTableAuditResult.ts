import { useAuditResultColumn } from "./columns/auditResultCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableAuditResult(
  data: any,
  handleNavigate: (id: string) => void,
  handleDelete: (id: string) => void
) {
  const columns = useAuditResultColumn(handleNavigate, handleDelete);

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
