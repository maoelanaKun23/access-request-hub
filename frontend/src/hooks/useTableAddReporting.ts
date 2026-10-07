import { useAddReportingColumn } from "./columns/addReportingCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableAddReporting(
  data: any,
  handleDeleteRecommendation: (id: any) => void
) {
  const columns = useAddReportingColumn(
    handleDeleteRecommendation
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
