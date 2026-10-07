import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import testProps from "@/lib/testing";
import { MANPOWER_MANUAL_BOOK_TABLE } from "@/constants/test-ids/master-data/manpower";

export interface IManualBookItem {
  itemID: string;
  name: string;
  path: string;
  note: string;
}

export function useManualBookColumns(
  handleDelete: (isDeleted: boolean) => void,
  handleDeleteId: (id: string | null) => void,
  handleDownload: (id: string, name: string) => void
): ColumnDef<IManualBookItem>[] {
  return useMemo<ColumnDef<IManualBookItem>[]>(
    () => [
      {
        accessorKey: "name",
        header: () => <div className="p-3 text-center">Nama File</div>,
        cell: ({ row }) => (
          <div
            className="p-3 text-center text-blue-500 underline cursor-pointer"
            onClick={() =>
              handleDownload(row.original.itemID, row.original.path)
            }
            {...testProps(MANPOWER_MANUAL_BOOK_TABLE + "_BUTTON_DOWNLOAD")}
          >
            {row.original.name}
          </div>
        ),
      },
      {
        accessorKey: "note",
        header: () => <div className="p-3 text-center">Keterangan</div>,
        cell: ({ row }) => (
          <div className="p-3 text-center">{row.original.note}</div>
        ),
      },
      {
        accessorKey: "actions",
        header: () => null,
        cell: ({ row }) => (
          <div className="p-2 flex justify-center">
            <Button
              onClick={() => {
                handleDeleteId(row.original.itemID);
                handleDelete(true);
              }}
              {...testProps(MANPOWER_MANUAL_BOOK_TABLE + "_BUTTON_DELETE")}
            >
              Delete
              <Trash2 />
            </Button>
          </div>
        ),
      },
    ],
    []
  );
}
