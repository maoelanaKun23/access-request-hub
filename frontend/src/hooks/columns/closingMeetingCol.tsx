import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDateToLocal } from "@/lib/format-date";
import { CLOSING_MEETING_ACTION_DOWNLOAD } from "@/constants/test-ids/audit-execution/closing-meeting";
import testProps from "@/lib/testing";

export function useClosingMeetingColumn(
  handleDownload: (fileId: string, fileName: string) => void
) {
  return useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "meetingDate",
        header: () => <div className="p-3 text-center">Hari / Tanggal</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">
            {formatDateToLocal(getValue() as string)}
          </div>
        ),
      },
      {
        accessorKey: "projectID",
        header: () => <div className="p-3 text-center">Project ID</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        id: "time",
        header: () => <div className="p-3 text-center">Waktu</div>,
        cell: ({ row }) => {
          const startTime = row.original.startTime ?? "";
          const finishTime = row.original.finishTime ?? "";
          return (
            <div className="p-3 text-start">
              {startTime && finishTime ? `${startTime} - ${finishTime}` : ""}
            </div>
          );
        },
      },
      {
        accessorKey: "teamLeader",
        header: () => <div className="p-3 text-center">Team Leader</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "teamMember",
        header: () => <div className="p-3 text-center">Team Member</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "pathAttachment",
        header: () => <div className="p-3 text-center">Bahan Closing</div>,
        cell: ({ row }) => (
          <div
            className="p-3 text-start text-blue-500 underline cursor-pointer"
            onClick={() => {
              const value = row.original;
              if (value && value.projectID && value.path) {
                handleDownload(value.projectID, value.path);
              }
            }}
            {...testProps(CLOSING_MEETING_ACTION_DOWNLOAD)}
          >
            {row.original.path ? row.original.path : ""}
          </div>
        ),
      },
    ],
    []
  );
}
