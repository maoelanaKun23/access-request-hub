import { Button } from "@/components/ui/button";
import { formatDateToLocal } from "@/lib/format-date";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Plus } from "lucide-react";
import { useMemo } from "react";

export const useTimelineDetailColumn = (
  handleShowModal: (name: string) => void
) => {
  return useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "name",
        cell: ({ getValue }) => (
          <div className="p-3 text-start text-xs font-medium">
            {getValue() ? String(getValue()) : "-"}
          </div>
        ),
        header: () => (
          <div className="bg-primary p-3 text-center text-sm font-bold">
            Project
          </div>
        ),
      },
      // Start Date Group
      {
        id: "startDateGroup",
        header: () => (
          <div className="bg-primary p-3 text-center text-sm font-bold">
            Start Date
          </div>
        ),
        columns: [
          {
            accessorKey: "startPlan",
            id: "startPlan",
            cell: ({ getValue }) => {
              const value = getValue();
              return (
                <div className="p-3 text-start text-xs">
                  {value ? formatDateToLocal(value as string) : ""}
                </div>
              );
            },
            header: () => (
              <div className="bg-primary p-3 text-center text-xs font-bold">
                Plan
              </div>
            ),
          },
          {
            accessorKey: "startActual",
            id: "startActual",
            cell: ({ getValue }) => {
              const value = getValue();
              return (
                <div className="p-3 text-start text-xs">
                  {value ? formatDateToLocal(value as string) : ""}
                </div>
              );
            },
            header: () => (
              <div className="bg-primary p-3 text-center text-xs font-bold">
                Actual
              </div>
            ),
          },
        ],
      },
      // Finish Date Group
      {
        id: "finishDateGroup",
        header: () => (
          <div className="bg-primary p-3 text-center text-sm font-bold">
            Finish Date
          </div>
        ),
        columns: [
          {
            accessorKey: "finishPlan",
            id: "finishPlan",
            cell: ({ getValue }) => {
              const value = getValue();
              return (
                <div className="p-3 text-start text-xs">
                  {value ? formatDateToLocal(value as string) : ""}
                </div>
              );
            },
            header: () => (
              <div className="bg-primary p-3 text-center text-xs font-bold">
                Plan
              </div>
            ),
          },
          {
            accessorKey: "finishActual",
            id: "finishActual",
            cell: ({ getValue }) => {
              const value = getValue();
              return (
                <div className="p-3 text-start text-xs">
                  {value ? formatDateToLocal(value as string) : ""}
                </div>
              );
            },
            header: () => (
              <div className="bg-primary p-3 text-center text-xs font-bold">
                Actual
              </div>
            ),
          },
        ],
      },
      {
        accessorKey: "actualMandays",
        cell: ({ getValue }) => (
          <div className="p-3 text-start text-xs font-medium">
            {getValue() ? String(getValue()) : "-"}
          </div>
        ),
        header: () => (
          <div className="bg-primary p-3 text-center text-sm font-bold">
            Actual Mandays
          </div>
        ),
      },
      {
        accessorKey: "reason",
        cell: ({ row }) =>
          row.original.reason ? (
            <div className="p-3 text-start text-md flex flex-row items-center justify-center">
              {row.original.reason}
              <Pencil
                onClick={() => handleShowModal(row.original.name)}
                className="h-4 w-4 ml-1 hover:text-blue-500 cursor-pointer"
              />
            </div>
          ) : (
            <div className="p-3 text-center text-xs font-medium">
              <Button onClick={() => handleShowModal(row.original.name)}>
                <Plus />
                Add Remark
              </Button>
            </div>
          ),
        header: () => (
          <div className="bg-primary p-3 text-center text-sm font-bold">
            Reason Deviasi Mandays
          </div>
        ),
      },
    ],
    []
  );
};
