import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";
import { useProjectInformationColumn } from './columns/projectInformationCol';

export function useTableProjectInformation(
  data: any,
  handleSort: (field: string) => void,
  sort: string,
) {
  const columns = useProjectInformationColumn(
    handleSort,
    sort,
  );

  const tableState = useTableState({
    initialColumnPinning: {
      left: [],
      right: ["actions"],
    },
  });

  const pageCount = data?.pageIndex;

  const tableProjectInformation = useTableConfig({
    data,
    columns,
    tableState,
    pageCount,
  });

  return { tableProjectInformation };
}
