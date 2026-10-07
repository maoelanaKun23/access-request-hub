import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { DeleteModal } from "@/components/atoms/delete-modal";
import { formatDateToLocal } from "@/lib/format-date";
import testProps from "@/lib/testing";
import {
  DESK_AUDIT_OPENING_MEETING_BUTTON_DELETE_MEETING,
  DESK_AUDIT_OPENING_MEETING_BUTTON_DOWNLOAD,
  DESK_AUDIT_OPENING_MEETING_BUTTON_EDIT_MEETING,
} from "@/constants/test-ids/audit-execution/desk-audit";

export function useOpeningMeetingColumn(
  setSelectedTab: (tab: "meeting" | "add" | "edit") => void,
  handleDelete: (id: string) => void,
  handleDownload: (fileId: string, fileName: string) => void,
): ColumnDef<any>[] {
  return useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "projectID",
        header: () => <div className="p-3 text-center">Project ID</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "projectName",
        header: () => <div className="p-3 text-center">Project Name</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "auditeeCategory",
        header: () => <div className="p-3 text-center">Auditee Category</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "auditee",
        header: () => <div className="p-3 text-center">Auditee</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "meetingDate",
        header: () => <div className="p-3 text-center">Hari / Tanggal</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "meetingTime",
        header: () => <div className="p-3 text-center">Waktu</div>,
        cell: ({ row }) => (
          <div className="p-3 text-start">{`${row.original.meetingTime}`}</div>
        ),
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
        header: () => <div className="p-3 text-center">Auditor</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "pathAttachment",
        header: () => <div className="p-3 text-center">File Attachment</div>,
        cell: ({ row }) => (
          <div
            className="p-3 text-start text-blue-500 underline cursor-pointer"
            onClick={() => {
              const value = row.original;
              if (value && value.projectID && value.path) {
                handleDownload(value.projectID, value.path);
              }
            }}
            {...testProps(DESK_AUDIT_OPENING_MEETING_BUTTON_DOWNLOAD)}
          >
            {row.original.path ? row.original.path : ""}
          </div>
        ),
      },
      {
        accessorKey: "actions",
        header: () => <div className="p-3" />,
        cell: ({ row }) => (
          <div className="p-3 text-center">
            <ActionMenu
              rowId={row.original.itemID}
              handleNavigate={setSelectedTab}
              handleDelete={handleDelete}
            />
          </div>
        ),
      },
    ],
    [],
  );
}

const ActionMenu = ({
  rowId,
  handleNavigate,
  handleDelete,
}: {
  rowId: string;
  handleNavigate: (tab: "meeting" | "add" | "edit") => void;
  handleDelete: (id: string) => void;
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="w-16">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <MoreVertical size={16} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-32 p-1 bg-white shadow-xl rounded-md border border-gray-200">
          <div className="flex flex-col">
            <Button
              variant="ghost"
              className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer w-full justify-start"
              onClick={() => {
                localStorage.setItem("editMeetingId", rowId);
                handleNavigate("edit");
              }}
              {...testProps(DESK_AUDIT_OPENING_MEETING_BUTTON_EDIT_MEETING)}
            >
              <Edit size={16} className="text-gray-500" />
              <span>Edit</span>
            </Button>
            <Button
              variant="ghost"
              className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer w-full justify-start"
              onClick={() => setShowDeleteModal(true)}
              {...testProps(DESK_AUDIT_OPENING_MEETING_BUTTON_DELETE_MEETING)}
            >
              <Trash2 size={16} className="text-gray-500" />
              <span>Delete</span>
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <DeleteModal
        onAction={() => handleDelete(rowId)}
        onCancel={() => setShowDeleteModal(false)}
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
      />
    </div>
  );
};
