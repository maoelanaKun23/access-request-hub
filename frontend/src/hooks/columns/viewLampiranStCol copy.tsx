// useViewLampiranStColumns.ts
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { formatDateToLocal } from "@/lib/format-date";
import { ActionMenu, ILampiranStFlattened } from "./addLampiranStCol";

export function useViewLampiranStColumns(
  onEdit: (id: string) => void,
  onDelete: (id: string) => void
): ColumnDef<ILampiranStFlattened>[] {
  return useMemo(
    () => [
      {
        accessorKey: "no",
        header: () => <div className="p-1">No</div>,
        cell: ({ row }) => (
          <div className="p-1 text-center">{row.index + 1}</div>
        ),
      },
      {
        accessorKey: "auditee",
        header: () => <div className="p-3">Nama Auditee</div>,
        cell: ({ row }) => {
          const auditee = row.original.auditee;
          if (auditee.hidden) return null;
          return (
            <div className="p-2 text-start" data-rowspan={auditee.rowspan}>
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
        accessorKey: "subProcess",
        header: () => <div className="p-3">Sub Area</div>,
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
        accessorKey: "document",
        header: () => <div className="p-3">Document</div>,
        cell: ({ row }) => (
          <div className="p-2 text-start">{row.original.document}</div>
        ),
      },
      {
        accessorKey: "cutOff",
        header: () => <div className="p-3 min-w-24">Cut Off</div>,
        cell: ({ row }) => (
          <div className="p-2 text-start">
            {formatDateToLocal(row.original.cutOff)}
          </div>
        ),
      },
      {
        accessorKey: "actions",
        header: () => null,
        cell: ({ row }) => (
          <ActionMenu
            rowId={row.original.itemID}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ),
      },
    ],
    [onEdit, onDelete]
  );
}
