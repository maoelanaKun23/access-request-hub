import { useClosingMeetingColumn } from "./columns/closingMeetingCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

export function useTableClosingMeeting(
  data: any,
  handleDownload: (fileId: string, fileName: string) => void
) {
  const columns = useClosingMeetingColumn(handleDownload);

  const tableState = useTableState({
    initialColumnPinning: {
      left: [],
      right: ["actions"],
    },
  });

  const table = useTableConfig({
    data,
    columns,
    tableState,
    pageCount: 0,
  });

  return { table };
}
