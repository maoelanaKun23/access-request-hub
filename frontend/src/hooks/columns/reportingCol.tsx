import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Edit, MoreVertical, Trash } from "lucide-react";
import testProps from "@/lib/testing";
import { REPORTING_BUTTON_DELETE, REPORTING_BUTTON_EDIT } from "@/constants/test-ids/audit-execution/reporting";

export function useReportingColumn(handleNavigate: (id: string) => void) {
  return useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "area",
        header: () => <div className="p-3 text-center">Area</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">
            {(getValue() as string)?.split("T")[0]}
          </div>
        ),
      },
      {
        accessorKey: "process",
        header: () => <div className="p-3 text-center">Sub Activity</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "findingNo",
        header: () => <div className="p-3 text-center">No. Finding</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "findingTitle",
        header: () => <div className="p-3 text-center">Judul Temuan</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "background",
        header: () => <div className="p-3 text-center">Latar Belakang</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "proof",
        header: () => <div className="p-3 text-center">Bukti</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "conclusion",
        header: () => <div className="p-3 text-center">Kesimpulan</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "causeCategory",
        header: () => <div className="p-3 text-center">Kategori</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "cause",
        header: () => <div className="p-3 text-center">Penyebab</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "detailRisk",
        header: () => <div className="p-3 text-center">Resiko</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "noteReport",
        header: () => <div className="p-3 text-center">Notes Review</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "actions",
        header: () => <div className="p-3" />,
        cell: ({ row }) => (
          <div className="p-3 text-center">
            <ActionMenu
              rowId={row.original.itemID}
              handleNavigate={handleNavigate}
              projectId={row.original.projectID}
              fileName={row.original.pathAttachment}
            />
          </div>
        ),
      },
    ],
    []
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
        <PopoverContent
          className="w-32 p-1 bg-white shadow-xl rounded-md border border-gray-200"
          align="end"
        >
          <div className="flex flex-col">
            <Button
              variant="ghost"
              className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer w-full justify-start"
              onClick={() => {
                localStorage.setItem("reportingId", rowId);
                handleNavigate("edit");
              }}
              {...testProps(REPORTING_BUTTON_EDIT)}
            >
              <Edit size={16} className="text-gray-500" />
              <span>Edit</span>
            </Button>
            <Button
              variant="ghost"
              className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer w-full justify-start"
              onClick={() => {}}
              disabled={true}
              {...testProps(REPORTING_BUTTON_DELETE)}
            >
              <Trash size={16} className="text-gray-500" />
              <span>Delete</span>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
