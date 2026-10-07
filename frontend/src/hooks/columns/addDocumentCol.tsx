import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import testProps from "@/lib/testing";
import {
  WORKING_PAPER_SAMPLING_CHECKBOX_SELECT_ALL,
  WORKING_PAPER_SAMPLING_CHECKBOX_SELECT_BY_ID,
} from "@/constants/test-ids/audit-execution/field-audit";

export function useAddDocumentColumn(
  handleCheckItems: (id: string, isChecked: boolean) => void,
  handleSelectAll: (isChecked: boolean, rows: any[]) => void
) {
  return useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "auditee.value",
        header: () => <div className="p-1 text-center">Auditee</div>,
        cell: ({ row }) => (
          <div className="p-1 text-center">
            {row.original.auditee?.value || ""}
          </div>
        ),
        size: 120,
        minSize: 100,
        maxSize: 160,
      },
      {
        accessorKey: "area.value",
        header: () => <div className="p-1 text-center">Area</div>,
        cell: ({ row }) => (
          <div className="p-1 text-center">
            {row.original.area?.value || ""}
          </div>
        ),
        size: 120,
        minSize: 100,
        maxSize: 160,
      },
      {
        accessorKey: "process.value",
        header: () => <div className="p-1 text-center">Sub Area</div>,
        cell: ({ row }) => (
          <div className="p-1 text-center">
            {row.original.process?.value || ""}
          </div>
        ),
        size: 120,
        minSize: 100,
        maxSize: 160,
      },
      {
        accessorKey: "subProcess.value",
        header: () => <div className="p-1 text-center">Sub Process</div>,
        cell: ({ row }) => (
          <div className="p-1 text-center">
            {row.original.subProcess?.value || ""}
          </div>
        ),
        size: 120,
        minSize: 100,
        maxSize: 160,
      },
      {
        accessorKey: "description.value",
        header: () => <div className="p-1 text-center">Description</div>,
        cell: ({ row }) => (
          <div className="p-1 text-center">
            {row.original.description?.value || ""}
          </div>
        ),
        size: 120,
        minSize: 100,
        maxSize: 160,
      },
      {
        accessorKey: "document",
        header: () => <div className="p-1 text-center">Document</div>,
        cell: ({ row }) => {
          const attachments = row.original.document;
          let fileName: string | null = null;

          if (
            Array.isArray(attachments) &&
            attachments.length > 0 &&
            attachments[0] &&
            typeof attachments[0] === "object" &&
            "attributes" in attachments[0] &&
            attachments[0].attributes &&
            typeof attachments[0].attributes === "object" &&
            "name" in attachments[0].attributes
          ) {
            fileName =
              (attachments[0].attributes as { name?: string }).name ?? null;
          }

          return (
            <div className="p-1 text-center">{fileName ? fileName : ""}</div>
          );
        },
        size: 120,
        minSize: 100,
        maxSize: 160,
      },
      {
        accessorKey: "cutOff",
        header: () => <div className="px-3 text-center">Cut Off</div>,
        cell: ({ row }) => (
          <div className="px-3 text-center">{row.original.cutOff || ""}</div>
        ),
        size: 120,
        minSize: 100,
        maxSize: 160,
      },
      {
        id: "select",
        header: ({ table }) => {
          const rows = table.getRowModel().rows;
          return (
            <div className="px-3 text-center">
              <Checkbox
                checked={!!table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => {
                  const isChecked = !!value;
                  table.toggleAllPageRowsSelected(isChecked);
                  handleSelectAll(isChecked, rows);
                }}
                aria-label="Select all"
                style={{ borderRadius: "0.25rem" }}
                {...testProps(WORKING_PAPER_SAMPLING_CHECKBOX_SELECT_ALL)}
              />
            </div>
          );
        },
        cell: ({ row }) => {
          const id = row.original.itemID;

          return (
            <div className="px-3 text-center">
              <Checkbox
                checked={!!row.getIsSelected()}
                onCheckedChange={(value) => {
                  const isChecked = !!value;
                  row.toggleSelected(isChecked);
                  if (id) {
                    handleCheckItems(id, isChecked);
                  }
                }}
                aria-label="Select row"
                style={{ borderRadius: "0.25rem" }}
                {...testProps(WORKING_PAPER_SAMPLING_CHECKBOX_SELECT_BY_ID)}
              />
            </div>
          );
        },
        enableSorting: false,
        enableHiding: false,
        size: 120,
        minSize: 100,
        maxSize: 160,
      },
    ],
    [handleCheckItems, handleSelectAll]
  );
}
