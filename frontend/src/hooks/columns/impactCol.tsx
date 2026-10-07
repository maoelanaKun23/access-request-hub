import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";

export type IImpactRiskLevel = {
  itemID: string;
  impactName: string;
  entityWide: string;
  output: string;
  financial: string;
  scale: number;
  hexColor: string;
}[];

export function useImpactColumns() {
  return useMemo<ColumnDef<IImpactRiskLevel[number]>[]>(
    () => [
      {
        accessorKey: "impactName",
        header: () => null,
        cell: ({ row }) => (
          <div className="p-3 text-start">{row.original.impactName}</div>
        ),
      },
      {
        accessorKey: "entityWide",
        header: () => <div className="p-3 text-center">Entity Wide</div>,
        cell: ({ row }) => (
          <div className="p-3 text-center">{row.original.entityWide}</div>
        ),
        backgroundColor: (row: { original: IImpactRiskLevel[number] }) =>
          row.original.hexColor,
      },
      {
        accessorKey: "output",
        header: () => <div className="p-3 text-center">Output</div>,
        cell: ({ row }) => (
          <div className="p-3 text-center">{row.original.output}</div>
        ),
        backgroundColor: (row: { original: IImpactRiskLevel[number] }) =>
          row.original.hexColor,
      },
      {
        accessorKey: "financial",
        header: () => <div className="p-3 text-center">Financial</div>,
        cell: ({ row }) => (
          <div className="p-3 text-center">{row.original.financial}</div>
        ),
        backgroundColor: (row: { original: IImpactRiskLevel[number] }) =>
          row.original.hexColor,
      },
      {
        accessorKey: "scale",
        header: () => <div className="p-3 text-center">Skala</div>,
        cell: ({ row }) => (
          <div className="p-3 text-center">{row.original.scale}</div>
        ),
        backgroundColor: (row: { original: IImpactRiskLevel[number] }) =>
          row.original.hexColor,
      },
    ],
    []
  );
}
