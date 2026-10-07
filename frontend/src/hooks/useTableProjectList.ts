import { useAuditProjectColumns } from "./columns/projectListCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableProjectList(
  data: any,
  handleTabChange: (tab: string) => void,
  handleSort: (field: string) => void,
  sort: string,
  refetchProjectList: () => void,
  page: number = 1,
  perPage: number = 10
) {
  const columns = useAuditProjectColumns(
    handleTabChange,
    sort,
    handleSort,
    refetchProjectList,
    data,
    page,
    perPage
  );

  const tableState = useTableState({
    initialColumnPinning: {
      left: [],
      right: ["actions"],
    },
  });

  const tableData = data?.map((item: any) => ({
    ...item.attributes,
    id: item.id,
  }));

  const pageCount = data?.totalPages ?? 0;

  const table = useTableConfig({
    data: tableData,
    columns,
    tableState,
    pageCount,
  });

  return { table };
}
