import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

interface EffectivenessItem {
  id: string;
  level: string;
  design: string[];
  operation: string[];
  environment: string;
}

export function useMatrixDetailColumn(): ColumnDef<EffectivenessItem>[] {
  return useMemo<ColumnDef<EffectivenessItem>[]>(
    () => [
      {
        id: "level",
        header: () => <div className="p-3 text-center font-medium">Level</div>,
        cell: ({ row }) => (
          <div className="p-3 text-left font-medium">{row.original.level}</div>
        ),
      },
      {
        id: "design",
        header: () => (
          <div className="p-3 text-center font-medium">Control Design</div>
        ),
        cell: ({ row }) => (
          <div className="p-3">
            {row.original.design.map((point, index) => (
              <p key={index} className="text-sm">
                {row.original.design.length > 1 ? "- " + point : point}
              </p>
            ))}
          </div>
        ),
      },
      {
        id: "operation",
        header: () => (
          <div className="p-3 text-center font-medium">Control Operation</div>
        ),
        cell: ({ row }) => (
          <div className="p-3">
            {row.original.operation.map((point, index) => (
              <p key={index} className="text-sm">
                {row.original.operation.length > 1 ? "- " + point : point}
              </p>
            ))}
          </div>
        ),
      },
      {
        id: "environment",
        header: () => (
          <div className="p-3 text-center font-medium">Control Environment</div>
        ),
        cell: ({ row }) => (
          <div className="p-3">
            <p className="text-sm">{row.original.environment}</p>
          </div>
        ),
      },
    ],
    []
  );
}
