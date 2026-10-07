import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";
import { useListObjectiveColumn } from "./columns/listObjectiveColumn";

export function useTableObtainUnderstandingListObjectiveKPI(
  data: any,
  handleDeleteListObjective: (projectId: string, objectiveKPIId: string) => void,
  handleSort: (field: string) => void,
  sort: string,
  handleEditItemTable: (id: string) => void,
) {
  const columns = useListObjectiveColumn(
    handleDeleteListObjective,
    handleSort,
    sort,
    handleEditItemTable
  );

  const tableState = useTableState({
    initialColumnPinning: {
      left: [],
      right: ["actions"],
    },
  });

  const pageCount = data?.pageIndex;

  const table = useTableConfig({
    data,
    columns,
    tableState,
    pageCount,
  });

  return { table };
}
