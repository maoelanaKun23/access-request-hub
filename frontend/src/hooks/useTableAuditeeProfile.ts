import { useAuditeeProfileColumn } from "./columns/auditeeProfile";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableAuditeeProfile(
  data: any,
) {
  const columns = useAuditeeProfileColumn();

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
