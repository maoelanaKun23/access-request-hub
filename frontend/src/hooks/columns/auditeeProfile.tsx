import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";

export function useAuditeeProfileColumn() {
  return useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "name",
        header: () => <div className="p-3 text-center">Name</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">
            {(getValue() as string)?.split("T")[0]}
          </div>
        ),
      },
      {
        accessorKey: "orderPIC",
        header: () => <div className="p-3 text-center">PIC Order</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "auditeeName",
        header: () => <div className="p-3 text-center">Auditee</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "position",
        header: () => <div className="p-3 text-center">Position</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "duration",
        header: () => (
          <div className="p-3 text-center">Length of Employment</div>
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "area",
        header: () => <div className="p-3 text-center">Area</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "email",
        header: () => <div className="p-3 text-center">Email</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
    ],
    []
  );
}
