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
import { ILampiranSt } from "./lampiranStCol";
import { EditLampiranStModal } from "@/components/atoms/edit-lampiran-st-modal";

export function useAddLampiranStColumns(
  setSelectedTab: (tab: "LampiranST" | "Add" | "Edit") => void,
  handleDelete: (itemId: string) => void,
  type?: "add" | "view" | "suratTugas",
  handleAdd?: (itemId: ILampiranSt) => void,
  selectedLampiranSt?: ILampiranSt[],
  selectedFile?: File | null,
  handleEdit?: (itemId: string, updatedData: ILampiranSt) => void,
): ColumnDef<ILampiranSt>[] {
  return useMemo<ColumnDef<ILampiranSt>[]>(
    () => [
      {
        accessorKey: "no",
        header: () => <div className="p-1 text-center min-w-[60px]">No</div>,
        cell: ({ row }) => (
          <div className="p-1 text-center">{row.index + 1}</div>
        ),
      },
      {
        accessorKey: "auditee",
        header: () => <div className="p-3 min-w-[160px]">Nama Auditee</div>,
        cell: ({ row }) => {
          const auditee = row.original.auditee;
          return <div className="p-2 text-start">{auditee.value}</div>;
        },
      },
      {
        accessorKey: "area",
        header: () => <div className="p-3 min-w-[160px]">Area</div>,
        cell: ({ row }) => {
          const area = row.original.area;
          return <div className="p-2 text-start">{area.value}</div>;
        },
      },
      {
        accessorKey: "subProcess",
        header: () => <div className="p-3 min-w-[180px]">Sub Area</div>,
        cell: ({ row }) => {
          const subProcess = row.original.subProcess;
          return <div className="p-2 text-start">{subProcess.value}</div>;
        },
      },
      {
        accessorKey: "description",
        header: () => <div className="p-3 min-w-[280px]">Description</div>,
        cell: ({ row }) => {
          const description = row.original.description;
          return (
            <div className="p-2 text-start break-words truncate max-w-[300px]">
              {description.value}
            </div>
          );
        },
      },
      {
        accessorKey: "document",
        header: () => <div className="p-3 min-w-[220px]">Document</div>,
        cell: ({ getValue }) => (
          <div className="p-2 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "cutOff",
        header: () => <div className="p-3 min-w-[140px]">Cut Off</div>,
        cell: ({ getValue }) => {
          const rawValue = getValue() as string;
          return (
            <div className="p-2 text-start">
              {rawValue.includes("9999") ? "Terbaru" : rawValue}
            </div>
          );
        },
      },
      ...(type !== "suratTugas"
        ? [
            {
              accessorKey: "actions",
              header: () => null,
              cell: ({ row }: any) => (
                <div className="p-2 text-center">
                  <ActionMenu
                    rowId={row.original.itemID}
                    data={row.original}
                    setSelectedTab={setSelectedTab}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    type={type}
                    handleAdd={handleAdd}
                    selectedLampiranSt={selectedLampiranSt}
                    selectedFile={selectedFile}
                  />
                </div>
              ),
            },
          ]
        : []),
    ],
    [setSelectedTab, handleDelete, type, handleAdd, handleEdit],
  );
}

const ActionMenu = ({
  rowId,
  data,
  setSelectedTab,
  handleEdit,
  handleDelete,
  type,
  handleAdd,
  selectedLampiranSt,
  selectedFile,
}: {
  rowId: string;
  data: ILampiranSt;
  setSelectedTab: (tab: "LampiranST" | "Add" | "Edit") => void;
  handleEdit?: (itemId: string, updatedData: ILampiranSt) => void;
  handleDelete: (itemId: string) => void;
  type?: "add" | "view" | "suratTugas";
  handleAdd?: (item: ILampiranSt) => void;
  selectedLampiranSt?: ILampiranSt[];
  selectedFile?: File | null;
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const generateUniqueId = (baseId: string): string => {
    let newId = baseId;
    let counter = 1;

    while (selectedLampiranSt?.some((item) => item.itemID === newId)) {
      newId = `${baseId}_${counter}`;
      counter++;
    }

    return newId;
  };

  if (type === "add") {
    return (
      <Button
        className="text-white bg-[#148F0F] hover:bg-[#008000]"
        onClick={() => {
          if (!handleAdd) return;

          const isDuplicate = selectedLampiranSt?.some(
            (item) => item.itemID === rowId,
          );

          const newRowId = isDuplicate ? generateUniqueId(rowId) : rowId;

          const newData: ILampiranSt = {
            ...data,
            itemID: newRowId,
          };

          handleAdd(newData);
        }}
      >
        Add <Plus className="w-4 h-4" />
      </Button>
    );
  } else if (type === "view") {
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
                className="px-4 py-2 hover:bg-primary flex items-center gap-2 cursor-pointer w-full justify-between"
                onClick={() => {
                  localStorage.setItem("editLampiranStId", rowId);
                  setShowEditModal(true);
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

        <EditLampiranStModal
          onAction={(updatedFormData) => {
            if (handleEdit) {
              const updatedLampiran: ILampiranSt = {
                ...data,
                auditee: { ...data.auditee, value: updatedFormData.auditee },
                area: { ...data.area, value: updatedFormData.area },
                process: { ...data.process, value: updatedFormData.process },
                subProcess: {
                  ...data.subProcess,
                  value: updatedFormData.subProcess,
                },
                description: {
                  ...data.description,
                  value: updatedFormData.description,
                },
                document: updatedFormData.document,
                cutOff: updatedFormData.cutOff,
              };
              handleEdit(rowId, updatedLampiran);
            }
            setShowEditModal(false);
          }}
          onCancel={() => setShowEditModal(false)}
          open={showEditModal}
          onOpenChange={setShowEditModal}
          data={data}
        />
      </div>
    );
  }
};
