import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Edit,
  MinusCircle,
  MoreVertical,
  Trash,
  XCircle,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DeleteModal } from "@/components/atoms/delete-modal";
import { formatDateToLocal } from "@/lib/format-date";
import testProps from "@/lib/testing";
import {
  WORKING_PAPER_SAMPLING_BUTTON_DELETE_ATTACHMENT,
  WORKING_PAPER_SAMPLING_BUTTON_DELETE_DOCUMENT,
  WORKING_PAPER_SAMPLING_BUTTON_EDIT,
  WORKING_PAPER_SAMPLING_TABLE_CHECKBOX,
} from "@/constants/test-ids/audit-execution/field-audit";

export function useEditSamplingColumn(
  handleNavigate: (id: string) => void,
  selectedItems: string[],
  handleCheckItems: (id: string) => void,
  handleDelete: (id: string, lampiranST: boolean) => void
) {
  return useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "area",
        header: () => <div className="p-3 text-center">Area</div>,
        cell: ({ row }) => {
          const area = row.original.area as {
            value: string;
            hidden: boolean;
            rowspan: string;
          };

          return (
            <div
              className="p-3 text-start absolute top-0 left-0"
              rowSpan={parseInt(area.rowspan)}
            >
              {area.value}
            </div>
          );
        },
      },
      {
        accessorKey: "process",
        header: () => <div className="p-3 text-center">Sub Activity</div>,
        cell: ({ row }) => {
          const process = row.original.process as {
            value: string;
            hidden: boolean;
            rowspan: string;
          };

          return (
            <div
              className="p-3 text-start  absolute top-0 left-0"
              rowSpan={parseInt(process.rowspan)}
            >
              {process.value}
            </div>
          );
        },
      },
      {
        accessorKey: "document",
        header: () => <div className="p-3 text-center">Document</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "status",
        header: () => <div className="p-3 text-center">Status</div>,
        cell: ({ getValue, row }) => (
          <div className="p-3 flex items-center justify-start gap-1">
            <Checkbox
              className="mr-1"
              checked={selectedItems.includes(row.original.itemID)}
              onClick={() => handleCheckItems(row.original.itemID)}
              {...testProps(WORKING_PAPER_SAMPLING_TABLE_CHECKBOX)}
            />
            {(getValue() as string | null) === "Approved" ? (
              <>
                <span>Approved</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </>
            ) : (getValue() as string | null) === "Pending" ? (
              <>
                <span>Pending</span>
                <MinusCircle className="h-4 w-4 text-yellow-500" />
              </>
            ) : (getValue() as string | null) === "Rejected" ? (
              <>
                <span>Rejected</span>
                <XCircle className="h-4 w-4 text-red-500" />
              </>
            ) : (
              <p>N/A</p>
            )}
          </div>
        ),
      },
      {
        accessorKey: "receivedDate",
        header: () => <div className="p-3 text-center">Received Date</div>,
        cell: ({ getValue }) => {
          return (
            <div className="p-3 text-start">
              {getValue() ? formatDateToLocal(getValue() as string) : "N/A"}
            </div>
          );
        },
      },
      {
        accessorKey: "attachments",
        header: () => <div className="p-3 text-center">Attach File</div>,
        cell: ({ getValue }) => {
          const attachments = getValue() as unknown;
          let fileName: string | null = null;

          if (
            Array.isArray(attachments) &&
            attachments.length > 0 &&
            attachments[0] &&
            typeof attachments[0] === "object" &&
            "attributes" in attachments[0] &&
            attachments[0].attributes &&
            typeof attachments[0].attributes === "object" &&
            "name" in attachments[0].attributes
          ) {
            fileName =
              (attachments[0].attributes as { name?: string }).name ?? null;
          }

          return (
            <div className="p-3 text-start">{fileName ? fileName : ""}</div>
          );
        },
      },
      {
        accessorKey: "note",
        header: () => <div className="p-3 text-center">Notes Review</div>,
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
              handleDelete={handleDelete}
              projectId={row.original.projectID}
              fileName={row.original.pathAttachment}
            />
          </div>
        ),
      },
    ],
    [handleNavigate]
  );
}

interface ActionMenuProps {
  rowId: string;
  handleNavigate: (id: string) => void;
  handleDelete: (id: string, lampiranST: boolean) => void;
  projectId: string;
  fileName: string;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  rowId,
  handleNavigate,
  handleDelete,
  projectId,
  fileName,
}) => {
  const [lampiranST, setLampiranST] = useState(false);
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
        <PopoverContent
          className="w-58 p-1 bg-white shadow-xl rounded-md border border-gray-200"
          align="end"
        >
          <div className="flex flex-col">
            <Button
              variant="ghost"
              className="px-3 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer w-full justify-start text-left"
              onClick={() => {
                localStorage.setItem("workingPaperSamplingId", rowId);
                handleNavigate("edit");
              }}
              {...testProps(WORKING_PAPER_SAMPLING_BUTTON_EDIT)}
            >
              <Edit size={16} className="text-gray-500 flex-shrink-0" />
              <span className="truncate">Edit</span>
            </Button>
            <Button
              variant="ghost"
              className="px-3 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer w-full justify-start text-left"
              onClick={() => {
                setLampiranST(false);
                setShowDeleteModal(true);
              }}
              {...testProps(WORKING_PAPER_SAMPLING_BUTTON_DELETE_ATTACHMENT)}
            >
              <Trash size={16} className="text-gray-500 flex-shrink-0" />
              <span className="truncate">Delete Attachment</span>
            </Button>
            <Button
              variant="ghost"
              className="px-3 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer w-full justify-start text-left"
              onClick={() => {
                setLampiranST(true);
                setShowDeleteModal(true);
              }}
              {...testProps(WORKING_PAPER_SAMPLING_BUTTON_DELETE_DOCUMENT)}
            >
              <Trash size={16} className="text-gray-500 flex-shrink-0" />
              <span className="truncate">Delete Document Request</span>
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <DeleteModal
        onAction={() => handleDelete(rowId, lampiranST)}
        onCancel={() => setShowDeleteModal(false)}
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
      />
    </div>
  );
};
