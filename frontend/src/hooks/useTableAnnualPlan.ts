import { useMemo } from "react";
import { useAnnualPlanColumns } from "./columns/annualPlanCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableAnnualPlan(
  data: any,
  yearNow: string,
  quarterNow: string
) {
  const columns = useAnnualPlanColumns(yearNow, quarterNow);

  const transformedData = useMemo(() => {
    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((item) => ({
      auditeeCategory: item.auditeeCategory,
      // Quarter Now data
      quarterNowPlan: item.quarterNow?.plan ?? "",
      quarterNowActual: item.quarterNow?.actual ?? "",
      quarterNowAchievement: item.quarterNow?.achievement ?? "",

      // YTD Quarter Now data
      ytdQuarterNowPlan: item.ytdQuarterNow?.plan ?? "",
      ytdQuarterNowActual: item.ytdQuarterNow?.actual ?? "",
      ytdQuarterNowAchievement: item.ytdQuarterNow?.achievement ?? "",

      // Full Year data
      fullYearPlan: item.fullYear?.plan ?? "",
      fullYearActual: item.fullYear?.actual ?? "",
      fullYearAchievement: item.fullYear?.achievement ?? "",

      // In Progress data
      inProgressDesk: item.inProgress?.desk ?? "",
      inProgressField: item.inProgress?.field ?? "",
      inProgressAuditReporting: item.inProgress?.auditReporting ?? "",
    }));
  }, [data]);

  const tableState = useTableState({
    initialColumnPinning: {
      left: [],
      right: [],
    },
  });

  const pageCount = transformedData
    ? Math.ceil(transformedData.length / 10)
    : 0;

  const table = useTableConfig({
    data: transformedData,
    columns,
    tableState,
    pageCount,
  });

  return { table };
}
