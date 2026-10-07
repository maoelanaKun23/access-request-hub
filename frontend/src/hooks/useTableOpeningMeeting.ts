import { useOpeningMeetingColumn } from "./columns/openingMeetingCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableOpeningMeeting(
  data: any,
  setSelectedTab: (tab: "meeting" | "add" | "edit") => void,
  handleDelete: (id: string) => void,
  handleDownload: (fileId: string, fileName: string) => void
) {
  const columns = useOpeningMeetingColumn(setSelectedTab, handleDelete, handleDownload);

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
