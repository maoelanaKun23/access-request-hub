import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  CalendarClock,
  CheckCircle,
  MinusCircle,
  MoreVertical,
  Send,
  StickyNote,
  Eye,
  Pencil,
  NotepadText,
  Trash2,
} from "lucide-react";
import { formatDateToLocal } from "@/lib/format-date";
import { DataTableCustomHeader } from "@/components/organisms/data-table/data-table-custom-header";
import { DeleteModal } from "@/components/atoms/delete-modal";
import { toast } from "sonner";
import {
  useAssignmentLetterSendEmailHook,
  useAssignmentLetterUpdateStatusApprovalHook,
} from "@/api/msAuditManagement/hooks/assignmentLetter";

export function useSuratTugasColumn(
  handleNavigate: (id: string, type: "edit" | "approval") => void,
  handleNavigatePreview: (
    projectId: string,
    note: string,
    id: string,
    type: "approval" | "preview",
  ) => void,
  handleSort: (field: string) => void,
  sort: string,
  suratTugasStatus: any,
  handleDelete: (id: string) => void,
) {
  const { mutate: updateApproval } =
    useAssignmentLetterUpdateStatusApprovalHook({
      mutation: {
        onError: (error) => {
          const errorMessage = error.response?.data?.status?.desc;

          if (errorMessage) {
            if (typeof errorMessage === "object") {
              const messages = Object.values(errorMessage).flat();
              toast.error(
                `Failed to update status Surat Tugas: ${messages[0]}`,
              );
            } else {
              toast.error(
                `Failed to update status Surat Tugas: ${errorMessage}`,
              );
            }
          } else {
            toast.error(
              `Failed to update status Surat Tugas: ${error.message || "Unknown error"}`,
            );
          }
        },
      },
    });

  const { mutate: sendEmail } = useAssignmentLetterSendEmailHook({
    mutation: {
      onSuccess: (_, variables) => {
        const id = variables?.params?.AssignmentLetterID;

        updateApproval({
          data: {
            id: id || "",
            status: "Sent",
            reason: "",
          },
        });
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.status?.desc;

        if (errorMessage) {
          if (typeof errorMessage === "object") {
            const messages = Object.values(errorMessage).flat();
            toast.error(`Failed to Send Email: ${messages[0]}`);
          } else {
            toast.error(`Failed to Send Email: ${errorMessage}`);
          }
        } else {
          toast.error(
            `Failed to Send Email: ${error.message || "Unknown error"}`,
          );
        }
      },
    },
  });

  return useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "projectID",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Project ID"
            sortFilter={sort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "auditeeCategory",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Audit Category"
            sortFilter={sort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "auditee",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Auditee"
            sortFilter={sort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "letterDate",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Tanggal Surat"
            sortFilter={sort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">
            {formatDateToLocal(getValue() as string)}
          </div>
        ),
      },
      {
        accessorKey: "teamLeader",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Team Leader"
            sortFilter={sort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "auditor",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Auditor"
            sortFilter={sort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Status"
            sortFilter={sort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 flex items-center justify-start gap-1">
            {(getValue() as string | null) === "Approved" ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Approved</span>
              </>
            ) : (getValue() as string | null) === "Draft" ? (
              <>
                <StickyNote className="h-4 w-4" />
                <span>Draft</span>
              </>
            ) : (getValue() as string | null) === "Pending" ? (
              <>
                <CalendarClock className="h-4 w-4" />
                <span>Pending</span>
              </>
            ) : (getValue() as string | null) === "Reconfirm" ? (
              <>
                <MinusCircle className="h-4 w-4 text-yellow-500" />
                <span>Reconfirm</span>
              </>
            ) : (getValue() as string | null) === "Sent" ? (
              <>
                <Send className="h-4 w-4" />
                <span>Sent</span>
              </>
            ) : null}
          </div>
        ),
      },
      {
        accessorKey: "note",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Notes"
            sortFilter={sort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "actions",
        header: () => <div className="p-3" />,
        cell: ({ row }) => (
          <div className="p-3 text-center">
            <ActionMenu
              rowId={row.original.itemID}
              handleNavigate={handleNavigate}
              handleNavigatePreview={handleNavigatePreview}
              projectId={row.original.projectID}
              fileName={row.original.pathAttachment}
              note={row.original.note}
              status={suratTugasStatus}
              handleDelete={handleDelete}
              statusEdit={row.original.isAllowedEditByStatus}
              statusST={row.original.status}
              sendEmail={sendEmail}
            />
          </div>
        ),
      },
    ],
    [suratTugasStatus, sort, handleSort, sendEmail],
  );
}

interface ActionMenuProps {
  rowId: string;
  handleNavigate: (id: string, type: "edit" | "approval") => void;
  projectId: string;
  note: string;
  fileName: string;
  handleNavigatePreview: (
    projectId: string,
    note: string,
    id: string,
    type: "approval" | "preview",
  ) => void;
  status: any;
  handleDelete: (id: string) => void;
  statusEdit?: boolean;
  statusST?: string;
  sendEmail: (data: any) => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  rowId,
  handleNavigate,
  projectId,
  fileName,
  handleNavigatePreview,
  note,
  status,
  handleDelete,
  statusEdit,
  statusST,
  sendEmail,
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
            {status?.isAllowedEditByRole &&
              statusEdit &&
              statusST !== "Approved" &&
              statusST !== "Sent" && (
                <Button
                  variant="ghost"
                  className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer w-full"
                  onClick={() => handleNavigate(rowId, "edit")}
                >
                  <span>Edit</span>
                  <Pencil size={16} className="ml-auto text-gray-500" />
                </Button>
              )}
            {status?.isAllowedApproved &&
              statusST !== "Approved" &&
              statusST !== "Sent" && (
                <Button
                  variant="ghost"
                  className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer w-full"
                  onClick={() =>
                    handleNavigatePreview(projectId, note, rowId, "approval")
                  }
                >
                  <span>Approval</span>
                  <NotepadText size={16} className="ml-auto text-gray-500" />
                </Button>
              )}
            {status?.isAllowedDelete &&
              statusST !== "Approved" &&
              statusST !== "Sent" && (
                <Button
                  variant="ghost"
                  className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer w-full"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <span>Delete</span>
                  <Trash2 size={16} className="ml-auto text-gray-500" />
                </Button>
              )}
            {statusST === "Approved" && (
              <Button
                variant="ghost"
                className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer w-full"
                onClick={() =>
                  sendEmail({
                    params: {
                      AssignmentLetterID: rowId,
                    },
                  })
                }
              >
                <span>Send</span>
                <Send size={16} className="ml-auto text-gray-500" />
              </Button>
            )}
            <Button
              variant="ghost"
              className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer w-full"
              onClick={() =>
                handleNavigatePreview(projectId, note, rowId, "preview")
              }
            >
              <span>Preview</span>
              <Eye size={16} className="ml-auto text-gray-500" />
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
