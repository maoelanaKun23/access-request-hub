import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import testProps from "@/lib/testing";
import { REPORTING_BUTTON_DELETE_RECOMMENDATION } from "@/constants/test-ids/audit-execution/reporting";

export function useAddReportingColumn(
  handleDeleteRecommendation: (id: any) => void
) {
  return useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "recommendation",
        header: () => <div className="p-3 text-center">Rekomendasi</div>,
        cell: ({ row }) => (
          <div className="p-3 text-center">{row.original.recommendation}</div>
        ),
      },
      {
        accessorKey: "completionLimit",
        header: () => (
          <div className="p-3 text-center">Batas Waktu Penyelesaian</div>
        ),
        cell: ({ row }) => (
          <div className="p-3 text-center">{row.original.completionLimit}</div>
        ),
      },
      {
        accessorKey: "executiveSummary",
        header: () => <div className="p-3 text-center">Executive Summary</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-center">{getValue() ? "Yes" : "No"}</div>
        ),
      },

      {
        accessorKey: "actions",
        header: () => <div className="p-3" />,
        cell: ({ row }) => (
          <div className="p-3 text-center">
            <Button
              onClick={() => handleDeleteRecommendation(row.original.itemID)}
              {...testProps(REPORTING_BUTTON_DELETE_RECOMMENDATION)}
            >
              Delete <Trash />
            </Button>
          </div>
        ),
      },
    ],
    []
  );
}
