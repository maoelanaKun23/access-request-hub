import { useSupportingDocumentColumn } from "./columns/supportingDocumentCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableSupportingDocument(data: any[]) {
  const columns = useSupportingDocumentColumn();

  const tableState = useTableState({
    initialColumnPinning: {
      left: [],
      right: [],
    },
  });

  const pageCount = 1;

  return useTableConfig({
    data,
    columns,
    tableState,
    pageCount,
  });
}
