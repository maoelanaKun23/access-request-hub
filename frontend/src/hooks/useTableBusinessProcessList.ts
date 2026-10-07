import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";
import { useBusinessProcessListColumns } from "./columns/businessProcessList";

export function useTableBusinessProcessList(
  data: any,
  sort: string,
  handleSort: (field: string) => void,
  pageNumber: number,
  pageSize: number,
  setToDataDetail: (value: boolean) => void,
  setDataDetailType: (value: "add" | "edit" | "editPerItem") => void
) {
  const columns = useBusinessProcessListColumns(sort, handleSort, pageNumber, pageSize, setToDataDetail, setDataDetailType);

  const tableState = useTableState({
    initialColumnPinning: {
      left: [],
      right: [],
    },
  });
  const pageCount = 1;

  const table = useTableConfig({
    data,
    columns,
    tableState,
    pageCount,
  });

  return { table };
}
