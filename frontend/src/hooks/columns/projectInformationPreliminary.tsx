import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableCustomHeader } from "@/components/organisms/data-table/data-table-custom-header";

export function useProjectInformationPreliminaryColumn(
  sort: string,
  handleSort: (field: string) => void,
) {
  return useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "projectId",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            title="Project ID"
            sortFilter={sort}
            handleSortChange={handleSort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "auditeeCategory",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Auditee Category"
            sortFilter={sort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "auditee",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            title="Auditee"
            sortFilter={sort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },

      {
        accessorKey: "meetingDate",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            title="Waktu"
            sortFilter={sort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "teamLeader",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Team Leader"
            sortFilter={sort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "auditor",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Auditor"
            sortFilter={sort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
    ],
    [],
  );
}
