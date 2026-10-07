import { useReportingColumn } from "./columns/reportingCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableReporting(
  data: any,
  handleNavigate: (id: string) => void,
) {
  const columns = useReportingColumn(handleNavigate);

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
