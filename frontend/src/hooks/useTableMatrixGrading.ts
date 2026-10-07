import {
  GradingItem,
  ProcessedGradingItem,
  useMatrixGradingColumns,
} from "./columns/matrixGradingCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableMatrixGrading(data: GradingItem[]) {
  function processGradingData(data: GradingItem[]): ProcessedGradingItem[] {
    return data.map((item) => ({
      ...item,
      rowSpan: {
        sequence: parseInt(item.sequence.rowspan),
        gradingName: parseInt(item.gradingName.rowspan),
      },
    }));
  }

  const processedData = processGradingData(data);

  const columns = useMatrixGradingColumns();

  const tableState = useTableState({
    initialColumnPinning: {
      left: [],
      right: [],
    },
  });

  const pageCount = 1;

  return useTableConfig<ProcessedGradingItem>({
    data: processedData,
    columns,
    tableState,
    pageCount,
  });
}
