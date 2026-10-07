import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDateToLocal } from "@/lib/format-date";
import testProps from "@/lib/testing";
import { ISR_TABLE_BUTTON_EDIT, ISR_TABLE_CHECKBOX_RECOMMENDATIONS } from "@/constants/test-ids/audit-execution/isr";

export function useEditIsrColumn(
  selectedItems: any[],
  handleCheckItems: (id: string) => void,
  handleNavigate: (page: string) => void
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
        accessorKey: "responseByManagement",
        header: () => (
          <div className="p-3 text-center">Management Response</div>
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "picISR",
        header: () => <div className="p-3 text-center">PIC</div>,
        cell: ({ row }) => (
          <div className="p-3 text-start">
            {(row.original.picISR || []).map((pic: any) => pic.name).join("\n")}
          </div>
        ),
      },
      {
        accessorKey: "completionLimit",
        header: () => <div className="p-3 text-center">Deadline</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">
            {formatDateToLocal(getValue() as string)}
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
        accessorKey: "implementationStatus",
        header: () => (
          <div className="p-3 text-center">Implementation Status</div>
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "implementationDate",
        header: () => (
          <div className="p-3 text-center">Implementation Date</div>
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">
            {formatDateToLocal(getValue() as string)}
          </div>
        ),
      },
      {
        accessorKey: "remarks",
        header: () => <div className="p-3 text-center">Remarks</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
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
                localStorage.setItem("isrItemId", row.original.itemID);
                handleNavigate("edit");
              }}
              {...testProps(ISR_TABLE_BUTTON_EDIT)}
            >
              Edit <Pencil />
            </Button>
          </div>
        ),
      },
    ],
    [selectedItems, handleCheckItems, handleNavigate]
  );
}
