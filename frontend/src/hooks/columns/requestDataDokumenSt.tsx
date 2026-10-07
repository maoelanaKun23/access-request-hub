import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableCustomHeader } from "@/components/organisms/data-table/data-table-custom-header";

export function useRequestDataDokumenStColumn(
  handleCheck: (id: string) => void,
  handleNavigate: (id: string) => void,
  isAdd: boolean,
  handleSort: (input: string) => void,
  sort: string,
) {
  return useMemo<ColumnDef<any>[]>(
    () => [
      ...(isAdd
        ? [
            {
              accessorKey: "checkbox",
              header: () => <div className="p-3 text-center"></div>,
              cell: ({ row }: any) => (
                <div className="p-3 text-start">
                  <Checkbox onCheckedChange={() => handleCheck(row.original)} />
                </div>
              ),
            },
          ]
        : []),

      {
        accessorKey: "period",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Period"
            sortFilter={sort}
          />
        ),
        cell: ({ row }) => (
          <div className="p-3 text-start">{row.original.period?.value}</div>
        ),
      },
      {
        accessorKey: "projectName",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Project Name"
            sortFilter={sort}
          />
        ),
        cell: ({ row }) => (
          <div className="p-3 text-start">
            {row.original.projectName?.value}
          </div>
        ),
      },
      {
        accessorKey: "auditee",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Auditee"
            sortFilter={sort}
          />
        ),
        cell: ({ row }) => (
          <div className="p-3 text-start">{row.original.auditee?.value}</div>
        ),
      },
      {
        accessorKey: "area",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Area"
            sortFilter={sort}
          />
        ),
        cell: ({ row }) => (
          <div className="p-3 text-start">{row.original.area?.value}</div>
        ),
      },
      {
        accessorKey: "process",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Process/Activity"
            sortFilter={sort}
          />
        ),
        cell: ({ row }) => (
          <div className="p-3 text-start">{row.original.process?.value}</div>
        ),
      },
      {
        accessorKey: "subProcess",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Sub Process/Activity"
            sortFilter={sort}
          />
        ),
        cell: ({ row }) => (
          <div className="p-3 text-start">{row.original.subProcess?.value}</div>
        ),
      },
      {
        accessorKey: "document",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Document"
            sortFilter={sort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "description",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Description"
            sortFilter={sort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "cutOff",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Cut Off"
            sortFilter={sort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "dueDate",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Due Date"
            sortFilter={sort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "linkSubmission",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Link Submit"
            sortFilter={sort}
          />
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">
            <a
              href={getValue() as string}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {getValue() as string}
            </a>
          </div>
        ),
      },
      {
        accessorKey: "actions",
        header: () => <div className="p-3" />,
        cell: ({ row }) => (
          <div className="p-3 text-center">
            <ActionMenu
              rowId={row.original.lampiranStID}
              handleNavigate={handleNavigate}
              projectId={row.original.assignmentLetterID}
              fileName={row.original.document}
            />
          </div>
        ),
      },
    ],
    [isAdd],
  );
}

interface ActionMenuProps {
  rowId: string;
  handleNavigate: (id: string) => void;
  projectId: string;
  fileName: string;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  rowId,
  handleNavigate,
  projectId,
  fileName,
}) => {
  return (
    <div className="w-16">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <MoreVertical size={16} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-32 p-1 bg-white shadow-xl rounded-md border border-gray-200">
          <div className="flex flex-col">
            <Button
              variant="ghost"
              className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer w-full"
              onClick={() => handleNavigate(projectId)}
            >
              <span>Edit</span>
              <Pencil size={16} className="ml-auto text-gray-500" />
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
