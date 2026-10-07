import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableCustomHeader } from "@/components/organisms/data-table/data-table-custom-header";

export function useProjectInformationColumn(
  handleSort: (field: string) => void,
  sort: string,
) {
  return useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "projectId",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Project ID"
            sortFilter={sort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-center">{getValue() as string | null ?? "-"}</div>
        ),
      },
      {
        accessorKey: "period",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Period"
            sortFilter={sort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-center">{getValue() as string ?? "-"}</div>
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
          <div className="p-3 text-center">{getValue() as string | null ?? "-"}</div>
        ),
      },
      {
        accessorKey: "auditee",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Auditee"
            sortFilter={sort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-center">{getValue() as string | null ?? "-"}</div>
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
          <div className="p-3 text-center">{getValue() as string ?? "-"}</div>
        ),
      },
      {
        accessorKey: "Auditor",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Auditor"
            sortFilter={sort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-center">{getValue() as string | null ?? "-"}</div>
        ),
      },
    ],
    [],
  );
}
