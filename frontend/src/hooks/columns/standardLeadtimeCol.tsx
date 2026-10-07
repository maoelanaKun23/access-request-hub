import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import testProps from "@/lib/testing";
import { MANPOWER_STANDARD_LEADTIME_TABLE } from "@/constants/test-ids/master-data/manpower";

export interface IStandardLeadtime {
  itemId: string;
  items: Item[];
  totalBranchSite: number;
  totalDivisionAffco: number;
  totalIt: number;
  totalFoundation: number;
}

export interface Item {
  itemId: string;
  workingMandays: string;
  branchSite: number;
  divisionAffco: number;
  it: number;
  foundation: number;
}

export function useStandardLeadtimeColumn(
  totals: any,
  setSelectedTab: (tab: "standardLeadtime" | "edit") => void
): ColumnDef<Item>[] {
  return useMemo<ColumnDef<Item>[]>(
    () => [
      {
        accessorKey: "workingMandays",
        header: () => <div className="p-3 text-center">Working Mandays</div>,
        cell: ({ row }) => (
          <div className="p-3 text-start">{row.original.workingMandays}</div>
        ),
        footer: () => (
          <div className="p-3 flex flex-col items-start">
            <p className="font-bold">TOTAL</p>
            <p className="font-bold text-red-500">*(Exclude ISR)</p>
          </div>
        ),
      },
      {
        accessorKey: "branchSite",
        header: () => <div className="p-3 text-center">Branch/Site</div>,
        cell: ({ row }) => (
          <div className="p-3 text-center">{row.original.branchSite}</div>
        ),
        footer: () => (
          <div className="p-3 text-center">{totals.totalBranchSite ?? 0}</div>
        ),
      },
      {
        accessorKey: "divisionAffco",
        header: () => <div className="p-3 text-center">Division/Affco</div>,
        cell: ({ row }) => (
          <div className="p-3 text-center">{row.original.divisionAffco}</div>
        ),
        footer: () => (
          <div className="p-3 text-center">
            {totals.totalDivisionAffco ?? 0}
          </div>
        ),
      },
      {
        accessorKey: "foundation",
        header: () => <div className="p-3 text-center">Yayasan/Koperasi</div>,
        cell: ({ row }) => (
          <div className="p-3 text-center">{row.original.foundation}</div>
        ),
        footer: () => (
          <div className="p-3 text-center">{totals.totalFoundation ?? 0}</div>
        ),
      },
      {
        accessorKey: "it",
        header: () => <div className="p-3 text-center">IT</div>,
        cell: ({ row }) => (
          <div className="p-3 text-center">{row.original.it}</div>
        ),
        footer: () => (
          <div className="p-3 text-center">{totals.totalIt ?? 0}</div>
        ),
      },
      {
        accessorKey: "actions",
        header: () => null,
        cell: ({ row }) => (
          <div className="p-2 flex justify-center">
            <Button
              onClick={() => {
                localStorage.setItem(
                  "editStandardLeadtime",
                  row.original.itemId
                );
                setSelectedTab("edit");
              }}
              {...testProps(MANPOWER_STANDARD_LEADTIME_TABLE + "_BUTTON_EDIT")}
            >
              Edit
              <Pencil />
            </Button>
          </div>
        ),
      },
    ],
    [totals]
  );
}
