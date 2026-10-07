import { IPic } from "@/pages/MasterData/Manpower/AuditeeTab";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";
import { useAuditeeColumns } from "./columns/useAuditeeColumns";

export function useTableAuditee(
  data: IPic[],
  sort: string,
  handleSort: (field: string) => void,
  handleNavigate: (type: "add" | "edit" | "close", userId: string) => void,
  handleDelete: (ID: string) => void,
  handleSetOpinion: (id: string, receivedOpinion: boolean) => void
) {
  const columns = useAuditeeColumns({ sort, handleSort, handleNavigate, handleDelete, handleSetOpinion });

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
