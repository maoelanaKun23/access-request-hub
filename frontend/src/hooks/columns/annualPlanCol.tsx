import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export const useAnnualPlanColumns = (yearNow: string, quarterNow: string) => {
  return useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "auditeeCategory",
        cell: ({ getValue }) => (
          <div className="p-3 text-center text-xs font-medium">
            {getValue() ? String(getValue()) : ""}
          </div>
        ),
        header: () => (
          <div className="bg-primary p-3 text-center text-xs font-bold">
            Auditee Category
          </div>
        ),
      },
      // QuarterNow Group
      {
        id: "quarterNowGroup",
        header: () => (
          <div className="bg-primary p-3 text-center text-sm font-bold">
            {quarterNow}
          </div>
        ),
        columns: [
          {
            accessorKey: "quarterNowPlan",
            id: "quarterNowPlan",
            cell: ({ getValue }) => (
              <div className="p-3 text-center text-xs">
                {getValue() ? String(getValue()) : ""}
              </div>
            ),
            header: () => (
              <div className="bg-primary p-3 text-center text-xs font-bold">
                Plan
              </div>
            ),
          },
          {
            accessorKey: "quarterNowActual",
            id: "quarterNowActual",
            cell: ({ getValue }) => (
              <div className="p-3 text-center text-xs"></div>
            ),
            header: () => (
              <div className="bg-primary p-3 text-center text-xs font-bold">
                Actual
              </div>
            ),
          },
          {
            accessorKey: "quarterNowAchievement",
            id: "quarterNowAchievement",
            cell: ({ getValue }) => (
              <div className="p-3 text-center text-xs"></div>
            ),
            header: () => (
              <div className="bg-primary p-3 text-center text-xs font-bold">
                Achievement
              </div>
            ),
          },
        ],
      },
      // YTD QuarterNow Group
      {
        id: "ytdQuarterNowGroup",
        header: () => (
          <div className="bg-primary p-3 text-center text-sm font-bold">
            YTD
          </div>
        ),
        columns: [
          {
            accessorKey: "ytdQuarterNowPlan",
            id: "ytdQuarterNowPlan",
            cell: ({ getValue }) => (
              <div className="p-3 text-center text-xs">
                {getValue() ? String(getValue()) : ""}
              </div>
            ),
            header: () => (
              <div className="bg-primary p-3 text-center text-xs font-bold">
                Plan
              </div>
            ),
          },
          {
            accessorKey: "ytdQuarterNowActual",
            id: "ytdQuarterNowActual",
            cell: ({ getValue }) => (
              <div className="p-3 text-center text-xs"></div>
            ),
            header: () => (
              <div className="bg-primary p-3 text-center text-xs font-bold">
                Actual
              </div>
            ),
          },
          {
            accessorKey: "ytdQuarterNowAchievement",
            id: "ytdQuarterNowAchievement",
            cell: ({ getValue }) => (
              <div className="p-3 text-center text-xs"></div>
            ),
            header: () => (
              <div className="bg-primary p-3 text-center text-xs font-bold">
                Achievement
              </div>
            ),
          },
        ],
      },
      // Full Year Group
      {
        id: "fullYearGroup",
        header: () => (
          <div className="bg-primary p-3 text-center text-sm font-bold">
            Full Year {yearNow}
          </div>
        ),
        columns: [
          {
            accessorKey: "fullYearPlan",
            id: "fullYearPlan",
            cell: ({ getValue }) => (
              <div className="p-3 text-center text-xs">
                {getValue() ? String(getValue()) : ""}
              </div>
            ),
            header: () => (
              <div className="bg-primary p-3 text-center text-xs font-bold">
                Plan
              </div>
            ),
          },
          {
            accessorKey: "fullYearActual",
            id: "fullYearActual",
            cell: ({ getValue }) => (
              <div className="p-3 text-center text-xs"></div>
            ),
            header: () => (
              <div className="bg-primary p-3 text-center text-xs font-bold">
                Actual
              </div>
            ),
          },
          {
            accessorKey: "fullYearAchievement",
            id: "fullYearAchievement",
            cell: ({ getValue }) => (
              <div className="p-3 text-center text-xs"></div>
            ),
            header: () => (
              <div className="bg-primary p-3 text-center text-xs font-bold">
                Achievement
              </div>
            ),
          },
        ],
      },
      // In Progress Group
      {
        id: "inProgressGroup",
        header: () => (
          <div className="bg-primary p-3 text-center text-sm font-bold">
            In Progress
          </div>
        ),
        columns: [
          {
            accessorKey: "inProgressDesk",
            id: "inProgressDesk",
            cell: ({ getValue }) => (
              <div className="p-3 text-center text-xs">
                {getValue() ? String(getValue()) : ""}
              </div>
            ),
            header: () => (
              <div className="bg-primary p-3 text-center text-xs font-bold">
                Desk
              </div>
            ),
          },
          {
            accessorKey: "inProgressField",
            id: "inProgressField",
            cell: ({ getValue }) => (
              <div className="p-3 text-center text-xs">
                {getValue() ? String(getValue()) : ""}
              </div>
            ),
            header: () => (
              <div className="bg-primary p-3 text-center text-xs font-bold">
                Field
              </div>
            ),
          },
          {
            accessorKey: "inProgressAuditReporting",
            id: "inProgressAuditReporting",
            cell: ({ getValue }) => (
              <div className="p-3 text-center text-xs">
                {getValue() ? String(getValue()) : ""}
              </div>
            ),
            header: () => (
              <div className="bg-primary p-3 text-center text-xs font-bold">
                Audit Reporting
              </div>
            ),
          },
        ],
      },
    ],
    [yearNow, quarterNow]
  );
};
