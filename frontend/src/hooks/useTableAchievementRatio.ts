import { useAchievementRatioColumns } from "./columns/achievementRatioCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableAchievementRatio(data: any) {
  const columns = useAchievementRatioColumns();

  const transformedData = data.map((monthData: any) => {
    const items = monthData.items.reduce((month: any, item: any) => {
      month[item.key] = item.value;
      return month;
    }, {} as Record<string, any>);
    
    return {
      name: monthData.month,
      ...items
    };
  });

  const tableState = useTableState({
    initialColumnPinning: {
      left: [],
      right: [],
    },
  });

  const pageCount = data?.pageIndex;

  const table = useTableConfig({
    data: transformedData,
    columns,
    tableState,
    pageCount,
  });

  return { table };
}