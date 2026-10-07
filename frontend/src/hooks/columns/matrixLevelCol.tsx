import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

interface RiskMatrixItem {
  id: string;
  consequence: string;
  rare: { value: string; color: string };
  unlikely: { value: string; color: string };
  possible: { value: string; color: string };
  likely: { value: string; color: string };
  almostCertain: { value: string; color: string };
}

export function useMatrixLevelColumns() {
  return useMemo<ColumnDef<RiskMatrixItem>[]>(
    () => [
      {
        accessorKey: "consequence",
        header: () => null,
        cell: ({ row }) => (
          <div className="p-3 text-center font-medium">
            {row.original.consequence}
          </div>
        ),
        footer: () => (
          <div className="p-3 text-center font-medium"></div>
        ),
      },
      {
        accessorKey: "rare",
        header: () => null,
        cell: ({ row }) => (
          <div
            className="p-3 text-center font-medium"
            style={{ backgroundColor: row.original.rare.color }}
          >
            {row.original.rare.value}
          </div>
        ),
        footer: () => (
          <div className="p-3 text-center font-medium">Rare</div>
        ),
      },
      {
        accessorKey: "unlikely",
        header: () => null,
        cell: ({ row }) => (
          <div
            className="p-3 text-center font-medium"
            style={{ backgroundColor: row.original.unlikely.color }}
          >
            {row.original.unlikely.value}
          </div>
        ),
        footer: () => (
          <div className="p-3 text-center font-medium">Unlikely</div>
        ),
      },
      {
        accessorKey: "possible",
        header: () => null,
        cell: ({ row }) => (
          <div
            className="p-3 text-center font-medium"
            style={{ backgroundColor: row.original.possible.color }}
          >
            {row.original.possible.value}
          </div>
        ),
        footer: () => (
          <div className="p-3 text-center font-medium">Possible</div>
        ),
      },
      {
        accessorKey: "likely",
        header: () => null,
        cell: ({ row }) => (
          <div
            className="p-3 text-center font-medium"
            style={{ backgroundColor: row.original.likely.color }}
          >
            {row.original.likely.value}
          </div>
        ),
        footer: () => (
          <div className="p-3 text-center font-medium">Likely</div>
        ),
      },
      {
        accessorKey: "almostCertain",
        header: () => null,
        cell: ({ row }) => (
          <div
            className="p-3 text-center font-medium"
            style={{ backgroundColor: row.original.almostCertain.color }}
          >
            {row.original.almostCertain.value}
          </div>
        ),
        footer: () => (
          <div className="p-3 text-center font-medium">
            Almost Certain
          </div>
        ),
      },
    ],
    []
  );
}
