import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDateToLocal } from "@/lib/format-date";

export function useLampiranSuratTugasColumn() {
  return useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "area",
        header: () => <div className="p-3 text-center">Area</div>,
        cell: ({ row }) => {
          const area = row.original.area;
          if (area.hidden) return null;

          return (
            <div
              className="p-3 text-start absolute top-0 left-0"
              data-rowspan={area.rowspan}
            >
              {area.value}
            </div>
          );
        },
      },
      {
        accessorKey: "process",
        header: () => <div className="p-3 text-center">Sub Activity</div>,
        cell: ({ row }) => {
          const process = row.original.process;
          if (process.hidden) return null;

          return (
            <div
              className="p-3 text-start absolute top-0 left-0"
              data-rowspan={process.rowspan}
            >
              {process.value}
            </div>
          );
        },
      },
      {
        accessorKey: "description",
        header: () => <div className="p-3 text-center">Keterangan</div>,
        cell: ({ row }) => {
          const description = row.original.description;
          if (description.hidden) return null;

          return (
            <div
              className="p-3 text-start absolute top-0 left-0"
              data-rowspan={description.rowspan}
            >
              {description.value}
            </div>
          );
        },
      },
      {
        accessorKey: "document",
        header: () => <div className="p-3 text-center">Document</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "cutOff",
        header: () => <div className="p-3 text-center">Periode / Cut Off</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "requestDate",
        header: () => <div className="p-3 text-center">Request Date</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">
            {formatDateToLocal(getValue() as string)}
          </div>
        ),
      },
      {
        accessorKey: "receivedDate",
        header: () => <div className="p-3 text-center">Received Date</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">
            {formatDateToLocal(getValue() as string)}
          </div>
        ),
      },
      {
        accessorKey: "leadtime",
        header: () => <div className="p-3 text-center">Lead Time Supply</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as number | null}</div>
        ),
      },
    ],
    []
  );
}
