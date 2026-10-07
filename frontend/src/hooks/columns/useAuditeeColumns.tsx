import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Edit, MoreVertical, Pin, Plus, Trash2, X } from "lucide-react";
import { DeleteModal } from "@/components/atoms/delete-modal";
import { IPic } from "@/pages/MasterData/Manpower/AuditeeTab";
import { DataTableCustomHeader } from "@/components/organisms/data-table/data-table-custom-header";
import testProps from "@/lib/testing";
import {
  MANPOWER_TABLE_DETAIL_AUDITEE,
  MANPOWER_TABLE_DETAIL_AUDITEE_SORT_DYNAMIC,
} from "@/constants/test-ids/master-data/manpower";

export function useAuditeeColumns({
  sort,
  handleSort,
  handleNavigate,
  handleDelete,
  handleSetOpinion,
}: {
  sort: string;
  handleSort: (field: string) => void;
  handleNavigate: (type: "add" | "edit" | "close", userId: string) => void;
  handleDelete: (ID: string) => void;
  handleSetOpinion: (id: string, receivedOpinion: boolean) => void;
}) {
  return useMemo<ColumnDef<IPic>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Nama PIC"
            buttonClassName="text-center"
            testID={MANPOWER_TABLE_DETAIL_AUDITEE_SORT_DYNAMIC + "PIC_NAME"}
          />
        ),
        cell: ({ getValue, row }) => (
          <div className="p-2 text-start">
            <span className="inline-flex items-center gap-1 break-words">
              {getValue() as string}
              {row.original.receivedOpinion && (
                <Pin className="size-3 flex-shrink-0" />
              )}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "gender",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Gender"
            buttonClassName="text-center"
            testID={MANPOWER_TABLE_DETAIL_AUDITEE_SORT_DYNAMIC + "GENDER"}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-2 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "orderPIC",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Urutan PIC"
            buttonClassName="text-center"
            testID={MANPOWER_TABLE_DETAIL_AUDITEE_SORT_DYNAMIC + "ORDER_PIC"}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-2 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "auditeeType",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Kategori Auditee"
            buttonClassName="text-center"
            testID={
              MANPOWER_TABLE_DETAIL_AUDITEE_SORT_DYNAMIC + "AUDITEE_CATEGORY"
            }
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-2 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "auditeeName",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Auditee"
            buttonClassName="text-center"
            testID={MANPOWER_TABLE_DETAIL_AUDITEE_SORT_DYNAMIC + "AUDITEE"}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-2 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "position",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Jabatan"
            buttonClassName="text-center"
            testID={MANPOWER_TABLE_DETAIL_AUDITEE_SORT_DYNAMIC + "JABATAN"}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-2 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "duration",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Lama Menjabat"
            buttonClassName="text-center"
            testID={
              MANPOWER_TABLE_DETAIL_AUDITEE_SORT_DYNAMIC + "LAMA_MENJABAT"
            }
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-2 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "area",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Area"
            className="text-center"
            buttonClassName="text-center"
            testID={MANPOWER_TABLE_DETAIL_AUDITEE_SORT_DYNAMIC + "AREA"}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-2 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Email"
            className="text-center"
            buttonClassName="text-center"
            testID={MANPOWER_TABLE_DETAIL_AUDITEE_SORT_DYNAMIC + "EMAIL"}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-2 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "isFraudster",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Status Fraudster"
            className="text-center"
            buttonClassName="text-center"
            testID={
              MANPOWER_TABLE_DETAIL_AUDITEE_SORT_DYNAMIC + "STATUS_FRAUDSTER"
            }
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-2 text-start">
            {(getValue() as boolean) ? "Yes" : "No"}
          </div>
        ),
      },
      {
        accessorKey: "notes",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Notes"
            buttonClassName="text-center"
            testID={MANPOWER_TABLE_DETAIL_AUDITEE_SORT_DYNAMIC + "NOTES"}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-2 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "actions",
        header: () => <div className="p-2" />,
        cell: ({ row }) => (
          <div className="p-2 text-center">
            <ActionMenu
              rowId={row.original.itemId}
              handleNavigate={handleNavigate}
              handleDelete={handleDelete}
              handleSetOpinion={handleSetOpinion}
              receivedOpinion={row.original.receivedOpinion}
            />
          </div>
        ),
      },
    ],
    [sort, handleSort, handleNavigate, handleDelete, handleSetOpinion]
  );
}

const ActionMenu = ({
  rowId,
  handleNavigate,
  handleDelete,
  handleSetOpinion,
  receivedOpinion,
}: {
  rowId: string;
  handleNavigate: (type: "add" | "edit" | "close", userId: string) => void;
  handleDelete: (ID: string) => void;
  handleSetOpinion: (id: string, receivedOpinion: boolean) => void;
  receivedOpinion: boolean | null;
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
        <PopoverContent className="w-46 p-1 bg-white shadow-xl rounded-md border border-gray-200">
          <div className="flex flex-col">
            <Button
              variant="ghost"
              className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer w-full justify-start"
              onClick={() => handleNavigate("edit", rowId)}
              {...testProps(MANPOWER_TABLE_DETAIL_AUDITEE + "BUTTON_EDIT")}
            >
              <Edit size={16} className="text-gray-500" />
              <span>Edit</span>
            </Button>
            <Button
              variant="ghost"
              className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer w-full justify-start"
              onClick={() => setShowDeleteModal(true)}
              {...testProps(MANPOWER_TABLE_DETAIL_AUDITEE + "BUTTON_DELETE")}
            >
              <Trash2 size={16} className="text-gray-500" />
              <span>Delete</span>
            </Button>
            <Button
              variant="ghost"
              className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer w-full justify-start"
              onClick={() => handleSetOpinion(rowId, !receivedOpinion)}
              {...testProps(
                MANPOWER_TABLE_DETAIL_AUDITEE +
                  (receivedOpinion
                    ? "BUTTON_REMOVE_RECEIVER"
                    : "BUTTON_ADD_RECEIVER")
              )}
            >
              {receivedOpinion ? (
                <X size={16} className="text-gray-500" />
              ) : (
                <Plus size={16} className="text-gray-500" />
              )}
              <span>
                {receivedOpinion ? "Remove Receiver" : "Add Receiver"}
              </span>
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
