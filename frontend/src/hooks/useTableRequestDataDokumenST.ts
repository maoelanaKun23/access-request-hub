import { useRequestDataDokumenStColumn } from "./columns/requestDataDokumenSt";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableRequestDataDokumenST(
  data: any,
  handleCheck: (id: string) => void,
  handleNavigate: (id: string) => void,
  isAdd: boolean,
  handleSort: (input: string) => void,
  sort: string,
) {
  const columns = useRequestDataDokumenStColumn(
    handleCheck,
    handleNavigate,
    isAdd,
    handleSort,
    sort
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
