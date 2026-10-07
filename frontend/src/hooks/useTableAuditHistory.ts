import { AuditeeType } from "@/types/type";
import { useAuditHistoryColumns } from "./columns/auditHistoryCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableAuditHistory(
  data: any,
  handleSortChange: (field: string) => void,
  isAdd: boolean,
  type: AuditeeType,
  selectedItems: string[],
  toggleSelection: (name: string, type: string) => void,
  handleSelectAll: () => void,
  auditGradingYear: number[],
  sortFilter: string,
  handleDownload: (fileId: string, fileName: string) => void
) {
  const columns = useAuditHistoryColumns({
    handleSortChange,
    isAdd,
    type,
    selectedItems,
    handleSelectAll,
    toggleSelection,
    auditGradingYear,
    sortFilter,
    handleDownload,
  });

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
