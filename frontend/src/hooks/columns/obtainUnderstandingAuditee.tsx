import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableCustomHeader } from "@/components/organisms/data-table/data-table-custom-header";

export function useObtainUnderstandingAuditeeColumn(
  sort: string,
  handleSort: (field: string) => void,
  pageNumber: number,
  pageSize: number,
) {
  return useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "rowNumber",
        header: () => <div className="p-3 text-center font-bold">No</div>,
        cell: ({ row }) => (
          <div className="p-3 text-center">
            {(pageNumber - 1) * pageSize + row.index + 1}
          </div>
        ),
      },
      {
        accessorKey: "auditee",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            title="Auditee"
            sortFilter={sort}
            handleSortChange={handleSort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "picName",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            title="Nama PIC"
            sortFilter={sort}
            handleSortChange={handleSort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "gender",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            title="Gender"
            sortFilter={sort}
            handleSortChange={handleSort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "position",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            title="Jabatan"
            sortFilter={sort}
            handleSortChange={handleSort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "duration",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            title="Lama Menjabat"
            sortFilter={sort}
            handleSortChange={handleSort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "area",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            title="Area"
            sortFilter={sort}
            handleSortChange={handleSort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            title="Alamat Email"
            sortFilter={sort}
            handleSortChange={handleSort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
    ],
    [pageNumber, pageSize],
  );
}
