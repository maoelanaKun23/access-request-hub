import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import testProps from "@/lib/testing";
import {
  ISR_TABLE_BUTTON_ADD_FILE,
  ISR_TABLE_CHECKBOX_RECOMMENDATIONS,
} from "@/constants/test-ids/audit-execution/isr";

export function useViewIsrColumn(
  selectedItems: any[],
  handleCheckItems: (id: string) => void,
  setOpenModal: (open: boolean) => void,
  setRecommendationID: (id: string) => void
) {
  return useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "area",
        header: () => <div className="p-3 text-center">Department</div>,
        cell: ({ row }) => (
          <div className="p-3 text-start">{row.original.area?.value}</div>
        ),
      },
      {
        accessorKey: "findingTitle",
        header: () => <div className="p-3 text-center">Finding Title</div>,
        cell: ({ row }) => (
          <div className="p-3 text-start">
            {row.original.findingTitle?.value}
          </div>
        ),
      },
      {
        accessorKey: "recommendation",
        header: () => <div className="p-3 text-center">Recommendations</div>,
        cell: ({ getValue, row }) => (
          <div className="p-3 flex items-center justify-start gap-1">
            <Checkbox
              className="mr-1"
              checked={selectedItems.includes(row.original.itemID)}
              onClick={() => handleCheckItems(row.original.itemID)}
              {...testProps(ISR_TABLE_CHECKBOX_RECOMMENDATIONS)}
            />
            {getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: "fileISR",
        header: () => (
          <div className="p-3 text-center">Supporting Document</div>
        ),
        cell: ({ row }) => (
          <div className="p-3 text-start">
            {(row.original.fileISR || []).length > 0
              ? row.original.fileISR.name
              : ""}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: () => <div className="p-3 text-center">Status</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "note",
        header: () => <div className="p-3 text-center">Notes Auditor</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "actions",
        header: () => <div className="p-3" />,
        cell: ({ row }) => (
          <div className="p-3 text-center">
            <Button
              onClick={() => {
                setRecommendationID(row.original.itemID);
                setOpenModal(true);
              }}
              {...testProps(ISR_TABLE_BUTTON_ADD_FILE)}
            >
              Add File
            </Button>
          </div>
        ),
      },
    ],
    [selectedItems, handleCheckItems]
  );
}
