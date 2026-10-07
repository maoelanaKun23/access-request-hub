import { useSuratTugasColumn } from "./columns/suratTugasCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableSuratTugas(
  data: any,
  handleNavigate: (id: string, type: "edit" | "approval") => void,
  handleNavigatePreview: (projectId: string, note: string, id: string, type: "approval" | "preview",) => void,
  handleSort: (field: string) => void,
  sort: string,
  suratTugasStatus: any,
  handleDelete: (id: string) => void,
) {
  const columns = useSuratTugasColumn(
    handleNavigate,
    handleNavigatePreview,
    handleSort,
    sort,
    suratTugasStatus,
    handleDelete
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
