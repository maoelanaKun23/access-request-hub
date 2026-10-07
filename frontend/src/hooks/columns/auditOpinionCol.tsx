import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Edit, MoreVertical } from "lucide-react";
import testProps from "@/lib/testing";
import { AUDIT_OPINION_BUTTON_EDIT } from "@/constants/test-ids/audit-execution/audit-opinion";

export function useAuditOpinionColumn(handleNavigate: (id: string) => void) {
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
        accessorKey: "grading",
        header: () => <div className="p-3 text-center">Grading</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "gradingArea",
        header: () => <div className="p-3 text-center">Grading per Area</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "gradingAverage",
        header: () => (
          <div className="p-3 text-center">Average Grading Project</div>
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "score",
        header: () => <div className="p-3 text-center">Score</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "scoreArea",
        header: () => <div className="p-3 text-center">Score per Area</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "scoreAverage",
        header: () => (
          <div className="p-3 text-center">Average Score Project</div>
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "noteOpinion",
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
                localStorage.setItem("editAuditOpinion", rowId);
                handleNavigate("edit");
              }}
              {...testProps(AUDIT_OPINION_BUTTON_EDIT)}
            >
              <Edit size={16} className="text-gray-500" />
              <span>Edit</span>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
