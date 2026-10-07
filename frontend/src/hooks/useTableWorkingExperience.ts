import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";
import { WorkExperienceType } from "@/types/type";
import { useWorkingExperienceColumns } from "./columns/workingExperienceCol";

export function useTableWorkingExperience(data: WorkExperienceType[]) {
  const columns = useWorkingExperienceColumns();

  const tableState = useTableState({
    initialColumnPinning: {
      left: [],
      right: ["actions"],
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
