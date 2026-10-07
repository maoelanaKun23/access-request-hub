import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";

export type AchievementRatioData = {
  name: string;
  plan: number;
  actual: number;
  totalPlan: number;
  totalActual: number;
  percentage: number;
};

export function useAchievementRatioColumns() {
  return useMemo<ColumnDef<AchievementRatioData>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Month",
        cell: ({ getValue }) => (
          <div className="p-1  text-start font-semibold">
            {getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: "plan",
        header: "Plan",
        cell: ({ getValue }) => (
          <div className="p-1  text-center">{getValue() as number}</div>
        ),
      },
      {
        accessorKey: "actual",
        header: "Actual",
        cell: ({ getValue }) => (
          <div className="p-1  text-center">{getValue() as number}</div>
        ),
      },
      {
        accessorKey: "totalPlan",
        header: "Total Plan",
        cell: ({ getValue }) => (
          <div className="p-1  text-center">{getValue() as number}</div>
        ),
      },
      {
        accessorKey: "totalActual",
        header: "Total Actual",
        cell: ({ getValue }) => (
          <div className="p-1  text-center">{getValue() as number}</div>
        ),
      },
      {
        accessorKey: "percentage",
        header: "Percentage",
        cell: ({ getValue }) => (
          <div className="p-1  text-center">{getValue() as number}%</div>
        ),
      },
    ],
    []
  );
}
