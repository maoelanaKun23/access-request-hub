import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableCustomHeader } from "@/components/organisms/data-table/data-table-custom-header";

export function useObtainUnderstandingInterviewColumn(
  pageNumber: number,
  pageSize: number,
  handleSort: (field: string) => void,
  sortValue: string,
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
            sortFilter={sortValue}
            handleSortChange={handleSort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "questions",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            title="Pertanyaan"
            sortFilter={sortValue}
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
        accessorKey: "answer",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            title="Jawaban"
            sortFilter={sortValue}
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
        accessorKey: "fileName",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            title="File"
            sortFilter={sortValue}
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
