import { DeleteModal } from "@/components/atoms/delete-modal";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

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

export interface ILampiranStRaw {
  itemID: string;
  auditee: string;
  area: string;
  process: string;
  subProcess: string;
  description: string;
  document: string;
  cutOff: string;
  path: string | null;
}

export interface IItem {
  value: string;
  hidden: boolean;
  rowspan: string;
}

export interface ILampiranStTable {
  itemID: string;
  auditee: IItem;
  area: IItem;
  process: IItem;
  subProcess: IItem;
  description: IItem;
  document: string;
  cutOff: string;
  path: string | null;
}

export function buildLampiranStTable(
  data: ILampiranStRaw[]
): ILampiranStTable[] {
  const result: ILampiranStTable[] = [];

  let lastAuditee = "";
  let lastArea = "";
  let lastProcess = "";
  let lastSubProcess = "";

  let auditeeIndex = -1;
  let areaIndex = -1;
  let processIndex = -1;
  let subProcessIndex = -1;

  data.forEach((item) => {
    const isNewAuditee = item.auditee !== lastAuditee;
    const isNewArea = isNewAuditee || item.area !== lastArea;
    const isNewProcess = isNewArea || item.process !== lastProcess;
    const isNewSubProcess = isNewProcess || item.subProcess !== lastSubProcess;

    const row: ILampiranStTable = {
      itemID: item.itemID,
      auditee: {
        value: item.auditee,
        hidden: !isNewAuditee,
        rowspan: "1",
      },
      area: {
        value: item.area,
        hidden: !isNewArea,
        rowspan: "1",
      },
      process: {
        value: item.process,
        hidden: !isNewProcess,
        rowspan: "1",
      },
      subProcess: {
        value: item.subProcess,
        hidden: !isNewSubProcess,
        rowspan: "1",
      },
      description: {
        value: item.description,
        hidden: false,
        rowspan: "1",
      },
      document: item.document,
      cutOff: item.cutOff,
      path: item.path,
    };

    if (!isNewAuditee && auditeeIndex >= 0) {
      result[auditeeIndex].auditee.rowspan = String(
        +result[auditeeIndex].auditee.rowspan + 1
      );
    } else {
      auditeeIndex = result.length;
      lastAuditee = item.auditee;
    }

    if (!isNewArea && areaIndex >= 0) {
      result[areaIndex].area.rowspan = String(
        +result[areaIndex].area.rowspan + 1
      );
    } else {
      areaIndex = result.length;
      lastArea = item.area;
    }

    if (!isNewProcess && processIndex >= 0) {
      result[processIndex].process.rowspan = String(
        +result[processIndex].process.rowspan + 1
      );
    } else {
      processIndex = result.length;
      lastProcess = item.process;
    }

    if (!isNewSubProcess && subProcessIndex >= 0) {
      result[subProcessIndex].subProcess.rowspan = String(
        +result[subProcessIndex].subProcess.rowspan + 1
      );
    } else {
      subProcessIndex = result.length;
      lastSubProcess = item.subProcess;
    }

    result.push(row);
  });

  return result;
}

export function useDataPreviewLampiranStColumns(
  setSelectedTab: (tab: "LampiranST" | "Add" | "Edit") => void,
  handleDelete: (itemId: string) => void,
  type?: "add" | "view",
  handleAdd?: (itemId: ILampiranSt) => void
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
        header: () => <div className="p-3">Cut Off</div>,
        cell: ({ getValue }) => {
          const rawValue = getValue() as string;

          return (
            <div className="p-2 text-start">
              {rawValue.includes("9999") ? "Terbaru" : rawValue}
            </div>
          );
        },
      }
    ],
    []
  );
}

const ActionMenu = ({
  rowId,
  data,
  setSelectedTab,
  handleDelete,
  type,
  handleAdd,
}: {
  rowId: string;
  data: ILampiranSt;
  setSelectedTab: (tab: "LampiranST" | "Add" | "Edit") => void;
  handleDelete: (itemId: string) => void;
  type?: "add" | "view";
  handleAdd?: (itemId: string) => void;
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (type === "add") {
    return (
      <Button
        className="text-white bg-[#148F0F] hover:bg-[#008000]"
        onClick={() => type === "add" && handleAdd && handleAdd(data)}
      >
        Add <Plus className="w-4 h-4 " />
      </Button>
    );
  } else {
    return (
      <div className="flex justify-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="p-1 rounded-full hover:bg-gry-100"
            >
              <MoreVertical size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-32 p-1 bg-white shadow-xl rounded-md border border-gray-200">
            <div className="flex flex-col">
              <Button
                variant="ghost"
                className="px-4 py-2 hover:bg-primary flex items-center gap-2 cursor-pointer w-full justify-between "
                onClick={() => {
                  localStorage.setItem("editLampiranStId", rowId);
                  setSelectedTab("Edit");
                }}
              >
                <span>Edit</span>
                <Pencil size={16} className="text-gray-500" />
              </Button>
              <Button
                variant="ghost"
                className="px-4 py-2 hover:bg-primary flex items-center gap-2 cursor-pointer w-full justify-between"
                onClick={() => setShowDeleteModal(true)}
              >
                <span>Delete</span>
                <Trash2 size={16} className="text-gray-500" />
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
  }
};
