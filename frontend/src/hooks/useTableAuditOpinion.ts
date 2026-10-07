import { useAuditOpinionColumn } from "./columns/auditOpinionCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableAuditOpinion(
  data: any,
  handleNavigate: (id: string) => void
) {
  const columns = useAuditOpinionColumn(handleNavigate);

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
