import { IImpactRiskLevel, useImpactColumns } from "./columns/impactCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableImpactRiskLevel(data: IImpactRiskLevel) {
  const columns = useImpactColumns();

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
