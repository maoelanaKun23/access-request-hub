import { useAuditorListColumns, UserData } from "./columns/auditorListCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableAuditorList(
  data: UserData[],
  handleTabChange: (value: "Auditor" | "Auditee" | "Detail") => void,
  addTeamMember: (data: {
    id: string;
    username: string;
    nrp: string;
    name: string;
    position: string;
    email: string;
  }) => void
) {
  const columns = useAuditorListColumns(handleTabChange, addTeamMember);

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
