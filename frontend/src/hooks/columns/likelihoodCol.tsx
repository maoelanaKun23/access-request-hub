import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

interface LikelihoodItem {
  id: string;
  likelihood: string;
  grading: string;
  kuantifikasi: string;
  scale: number;
}

export function useLikelihoodColumns(): ColumnDef<LikelihoodItem>[] {
  return useMemo<ColumnDef<LikelihoodItem>[]>(
    () => [
      {
        id: "likelihood_grading",
        header: () => <div className="p-3 text-center">Likelihood</div>,
        cell: ({ row }) => (
          <div className="grid grid-cols-3">
            <div className="p-3 text-center font-medium border-r col-span-2">
              {row.original.likelihood}
            </div>
            <div className="p-3 text-center col-span-1">
              {row.original.grading}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "kuantifikasi",
        header: () => <div className="p-3 text-center">Kuantifikasi</div>,
        cell: ({ row }) => (
          <div className="p-3 text-center">{row.original.kuantifikasi}</div>
        ),
      },
      {
        accessorKey: "scale",
        header: () => <div className="p-3 text-center">Skala</div>,
        cell: ({ row }) => (
          <div className="p-3 text-center font-medium">
            {row.original.scale}
          </div>
        ),
      },
    ],
    []
  );
}
