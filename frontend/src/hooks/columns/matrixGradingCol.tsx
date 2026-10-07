import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export interface GradingItem {
  itemId: string;
  sequence: {
    value: string;
    hidden: boolean;
    rowspan: string;
  };
  gradingName: {
    value: string;
    hidden: boolean;
    rowspan: string;
  };
  appropriatness: string;
  operational: string;
  term: string;
  score: number;
  hexColor: string;
}

export interface ProcessedGradingItem extends GradingItem {
  rowSpan: {
    sequence: number;
    gradingName: number;
  };
}

export function useMatrixGradingColumns() {
  return useMemo<ColumnDef<ProcessedGradingItem>[]>(
    () => [
      {
        id: "sequence",
        header: () => <div className="p-3 text-center">No</div>,
        cell: ({ row }) =>
          row.original.sequence.hidden ? null : (
            <div className="p-3 text-center">{row.original.sequence.value}</div>
          ),
      },
      {
        id: "gradingName",
        header: () => <div className="p-3 text-center">Grading</div>,
        cell: ({ row }) =>
          row.original.gradingName.hidden ? null : (
            <div className="p-3 text-center">
              {row.original.gradingName.value}
            </div>
          ),
      },
      {
        id: "controlEffectiveness",
        header: () => (
          <div className="p-3 text-center font-bold">Control Effectiveness</div>
        ),
        columns: [
          {
            accessorKey: "appropriatness",
            header: () => (
              <div className="p-3 text-center">Appropriateness</div>
            ),
            cell: ({ row }) => (
              <div className="p-3 text-center">
                {row.original.appropriatness}
              </div>
            ),
          },
          {
            accessorKey: "operational",
            header: () => <div className="p-3 text-center">Operational</div>,
            cell: ({ row }) => (
              <div className="p-3 text-center">{row.original.operational}</div>
            ),
          },
        ],
      },
      {
        accessorKey: "term",
        header: () => <div className="p-3 text-center">TERM</div>,
        cell: ({ row }) => (
          <div className="p-3 text-center">{row.original.term}</div>
        ),
      },
      {
        accessorKey: "score",
        header: () => <div className="p-3 text-center">Score</div>,
        cell: ({ row }) => (
          <div
            className="p-3 text-center"
            style={{ backgroundColor: row.original.hexColor }}
          >
            {row.original.score}
          </div>
        ),
      },
    ],
    []
  );
}
