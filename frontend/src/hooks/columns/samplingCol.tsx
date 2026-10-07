import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Edit, MoreVertical, Trash } from "lucide-react";
import { DeleteModal } from "@/components/atoms/delete-modal";
import { formatDateToLocal } from "@/lib/format-date";
import testProps from "@/lib/testing";
import {
  DESK_AUDIT_SAMPLING_BUTTON_DELETE_SAMPLING,
  DESK_AUDIT_SAMPLING_BUTTON_DOWNLOAD_FILE,
  DESK_AUDIT_SAMPLING_BUTTON_EDIT_SAMPLING,
} from "@/constants/test-ids/audit-execution/sampling";

export function useSamplingColumn(
  handleNavigate: () => void,
  handleDownload: (fileId: string, fileName: string) => void,
  handleDelete: (id: string) => void
) {
  return useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "area",
        header: () => <div className="p-3 text-center">Area</div>,
        cell: ({ row }) => {
          const areaData = row.original.area;
          const value =
            typeof areaData === "object" ? areaData.value : areaData;
          return <div className="p-3 text-start">{value || ""}</div>;
        },
      },
      {
        accessorKey: "process",
        header: () => <div className="p-3 text-center">Process</div>,
        cell: ({ row }) => {
          const processData = row.original.process;
          const value =
            typeof processData === "object" ? processData.value : processData;
          return <div className="p-3 text-start">{value || ""}</div>;
        },
      },
      {
        accessorKey: "subProcess",
        header: () => <div className="p-3 text-center">Sub Process</div>,
        cell: ({ row }) => {
          const subProcessData = row.original.subProcess;
          const value =
            typeof subProcessData === "object"
              ? subProcessData.value
              : subProcessData;
          return <div className="p-3 text-start">{value || ""}</div>;
        },
      },
      {
        accessorKey: "path",
        header: () => <div className="p-3 text-center">Attached File</div>,
        cell: ({ row }) => {
          const fileName = row.original.path;
          const displayName = fileName
            ? fileName.split("_").slice(3).join("_")
            : "No Attachment";

          return (
            <div className="p-3 text-start">
              <p
                onClick={() => handleDownload(row.original.itemID, fileName)}
                className={
                  fileName
                    ? "text-blue-500 underline cursor-pointer"
                    : "text-gray-500"
                }
                {...testProps(DESK_AUDIT_SAMPLING_BUTTON_DOWNLOAD_FILE)}
              >
                {displayName}
              </p>
            </div>
          );
        },
      },
      {
        accessorKey: "requestDate",
        header: () => <div className="p-3 text-center">Request Date</div>,
        cell: ({ getValue }) => {
          return (
            <div className="p-3 text-start">
              {formatDateToLocal(getValue() as string)}
            </div>
          );
        },
      },
      {
        accessorKey: "note",
        header: () => <div className="p-3 text-center">Notes Review</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{(getValue() as string) || ""}</div>
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
              fileName={row.original.path}
            />
          </div>
        ),
      },
    ],
    [handleNavigate, handleDownload]
  );
}

interface ActionMenuProps {
  rowId: string;
  handleNavigate: () => void;
  handleDelete: (id: string) => void;
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleEdit = () => {
    localStorage.setItem("editSamplingId", rowId);
    handleNavigate();
  };

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
              onClick={handleEdit}
              {...testProps(DESK_AUDIT_SAMPLING_BUTTON_EDIT_SAMPLING)}
            >
              <Edit size={16} className="text-gray-500" />
              <span>Edit</span>
            </Button>
            <Button
              variant="ghost"
              className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer w-full justify-start"
              onClick={() => setShowDeleteModal(true)}
              {...testProps(DESK_AUDIT_SAMPLING_BUTTON_DELETE_SAMPLING)}
            >
              <Trash size={16} className="text-gray-500" />
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
