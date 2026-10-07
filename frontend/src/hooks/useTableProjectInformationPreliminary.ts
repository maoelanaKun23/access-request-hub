import { useProjectInformationPreliminaryColumn } from "./columns/projectInformationPreliminary";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableProjectInformationPreliminary(
  data: any,
  sort: string,
  handleSort: (field: string) => void,
) {
  const columns = useProjectInformationPreliminaryColumn(sort, handleSort);

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
