import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableCustomHeader } from "@/components/organisms/data-table/data-table-custom-header";

export function useObtainUnderstandingBussinessProcessColumn(
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
        accessorKey: "process",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            title="Proses"
            sortFilter={sort}
            handleSortChange={handleSort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "subProcess",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            title="Sub Proses / Sub Activity"
            sortFilter={sort}
            handleSortChange={handleSort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "description",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            title="Description"
            sortFilter={sort}
            handleSortChange={handleSort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start whitespace-pre-line">
            {getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: "document",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            title="Document / Data"
            sortFilter={sort}
            handleSortChange={handleSort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "tCode",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            title="System / TCode"
            sortFilter={sort}
            handleSortChange={handleSort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "auditFocus",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            title="Audit Focus / Critical Process"
            sortFilter={sort}
            handleSortChange={handleSort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "reasonFocus",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            title="Reason Focus / Critical"
            sortFilter={sort}
            handleSortChange={handleSort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "fileName",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            title="File"
            sortFilter={sort}
            handleSortChange={handleSort}
          />
        ),
        cell: ({ getValue }) => {
          const value = getValue() as string | null;
          if (!value)
            return <div className="p-3 text-center text-gray-400">-</div>;
          const fileName = value.split("/").pop() ?? value;
          return <div className="p-3 text-center">{fileName}</div>;
        },
      },
    ],
    [pageNumber, pageSize],
  );
}
