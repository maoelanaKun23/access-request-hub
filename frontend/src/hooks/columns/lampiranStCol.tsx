import { DeleteModal } from "@/components/atoms/delete-modal";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, MoreVertical, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import testProps from "@/lib/testing";
import {
  MANPOWER_LAMPIRAN_ST_TABLE,
  MANPOWER_LAMPIRAN_ST_TABLE_LAMPIRAN_ST_SORT_DYNAMIC,
} from "@/constants/test-ids/master-data/manpower";

export interface IItem {
  value: string;
  hidden: boolean;
  rowspan: string;
}

export interface ILampiranSt {
  itemID: string;
  auditee: IItem;
  area: IItem;
  process: IItem;
  subProcess: IItem;
  description: IItem;
  document: string;
  cutOff: string;
  path: null | string;
}

export function useLampiranStColumns(
  setSelectedTab: (tab: "LampiranST" | "Add" | "Edit") => void,
  handleDeleteLampiranSt: (itemId: string) => void,
  handleSort: (field: string) => void,
): ColumnDef<ILampiranSt>[] {
  return useMemo<ColumnDef<ILampiranSt>[]>(
    () => [
      {
        accessorKey: "auditee",
        header: () => <div className="p-3">Auditee</div>,
        cell: ({ row }) => {
          const auditee = row.original.auditee;
          if (auditee.hidden) return null;
          return (
            <div
              className="p-2 text-start whitespace-normal line-clamp-2 break-words"
              data-rowspan={auditee.rowspan}
              title={auditee.value}
            >
              {auditee.value}
            </div>
          );
        },
      },
      {
        accessorKey: "area",
        header: () => <div className="p-3">Area</div>,
        cell: ({ row }) => {
          const area = row.original.area;
          if (area.hidden) return null;
          return (
            <div className="p-2 text-start" data-rowspan={area.rowspan}>
              {area.value}
            </div>
          );
        },
      },
      {
        accessorKey: "process",
        header: () => <div className="p-3">Process</div>,
        cell: ({ row }) => {
          const process = row.original.process;
          if (process.hidden) return null;
          return (
            <div className="p-2 text-start" data-rowspan={process.rowspan}>
              {process.value}
            </div>
          );
        },
      },
      {
        accessorKey: "subProcess",
        header: () => <div className="p-3">Sub Process</div>,
        cell: ({ row }) => {
          const subProcess = row.original.subProcess;
          if (subProcess.hidden) return null;
          return (
            <div className="p-2 text-start" data-rowspan={subProcess.rowspan}>
              {subProcess.value}
            </div>
          );
        },
      },
      {
        accessorKey: "document",
        header: () => <div className="p-3">Document</div>,
        cell: ({ getValue }) => (
          <div className="p-2 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "description",
        header: () => <div className="p-3">Description</div>,
        cell: ({ row }) => {
          const description = row.original.description;
          if (description.hidden) return null;
          return (
            <div className="p-2 text-start" data-rowspan={description.rowspan}>
              {description.value}
            </div>
          );
        },
      },
      {
        accessorKey: "cutOff",
        header: () => (
          <div className="p-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                handleSort("cutOff");
              }}
              className="h-full gap-1 px-0  data-[state=open]:bg-transparent justify-center hover:bg-transparent font-bold text-start leading-tight break-words whitespace-normal"
              {...testProps(
                MANPOWER_LAMPIRAN_ST_TABLE_LAMPIRAN_ST_SORT_DYNAMIC + "CUT_OFF",
              )}
            >
              <span>Cut Off</span>
              <ArrowUpDown />
            </Button>
          </div>
        ),
        cell: ({ getValue }) => {
          const rawValue = getValue() as string;

          return (
            <div className="p-2 text-start">
              {rawValue.includes("9999") ? "Terbaru" : rawValue}
            </div>
          );
        },
      },
      {
        accessorKey: "actions",
        header: () => null,
        cell: ({ row }) => (
          <div className="p-2 text-start">
            <ActionMenu
              rowId={row.original.itemID}
              setSelectedTab={setSelectedTab}
              handleDelete={handleDeleteLampiranSt}
            />
          </div>
        ),
      },
    ],
    [handleSort],
  );
}

const ActionMenu = ({
  rowId,
  setSelectedTab,
  handleDelete,
}: {
  rowId: string;
  setSelectedTab: (tab: "LampiranST" | "Add" | "Edit") => void;
  handleDelete: (itemId: string) => void;
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="flex justify-center">
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
                localStorage.setItem("editLampiranStId", rowId);
                setSelectedTab("Edit");
              }}
              {...testProps(MANPOWER_LAMPIRAN_ST_TABLE + "BUTTON_EDIT")}
            >
              <Edit size={16} className="text-gray-500" />
              <span>Edit</span>
            </Button>
            <Button
              variant="ghost"
              className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer w-full justify-start"
              onClick={() => setShowDeleteModal(true)}
              {...testProps(MANPOWER_LAMPIRAN_ST_TABLE + "BUTTON_DELETE")}
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
