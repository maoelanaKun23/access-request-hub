import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Edit, MoreVertical, Trash } from "lucide-react";
import { DeleteModal } from "@/components/atoms/delete-modal";
import testProps from "@/lib/testing";
import {
  AUDIT_RESULT_BUTTON_DELETE,
  AUDIT_RESULT_BUTTON_EDIT,
} from "@/constants/test-ids/audit-execution/field-audit";

export function useAuditResultColumn(
  handleNavigate: (id: string) => void,
  handleDelete: (id: string) => void
) {
  return useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "area",
        header: () => <div className="p-3 text-center">Area</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-center">
            {(getValue() as string)?.split("T")[0]}
          </div>
        ),
      },
      {
        accessorKey: "process",
        header: () => <div className="p-3 text-center">Sub Activity</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-center">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "findingNo",
        header: () => <div className="p-3 text-center">Finding</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-center">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "result",
        header: () => <div className="p-3 text-center">Result</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-center">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "grading",
        header: () => <div className="p-3 text-center">Grading</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-center">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "score",
        header: () => <div className="p-3 text-center">Score</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-center">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "noteResult",
        header: () => <div className="p-3 text-center">Notes Review</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-center">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "risk",
        header: () => (
          <div className="p-3 text-center">Risk (What Could Go Wrong)</div>
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-center">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "expectedControl",
        header: () => <div className="p-3 text-center">Expected Control</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-center">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "auditObjective",
        header: () => <div className="p-3 text-center">Audit Objective</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-center">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "auditProcedure",
        header: () => <div className="p-3 text-center">Audit Procedure</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-center">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "tCode",
        header: () => <div className="p-3 text-center">T - Code</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-center">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "coso",
        header: () => <div className="p-3 text-center">COSO Framework</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-center">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "currentControl",
        header: () => <div className="p-3 text-center">Current Control</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-center">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "pathDocument",
        header: () => (
          <div className="p-3 text-center">Data / Document Request</div>
        ),
        cell: ({ getValue }) => (
          <div className="p-3 text-center">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "riskLevel",
        header: () => <div className="p-3 text-center">Risk Level</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-center">{getValue() as string}</div>
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
              handleDelete={handleDelete}
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
  handleDelete: (id: string) => void;
  projectId: string;
  fileName: string;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  rowId,
  handleNavigate,
  handleDelete,
  projectId,
  fileName,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
              className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer w-full justify-start"
              onClick={() => {
                localStorage.setItem("auditResultId", rowId);
                handleNavigate("editAuditResult");
              }}
              {...testProps(AUDIT_RESULT_BUTTON_EDIT)}
            >
              <Edit size={16} className="text-gray-500" />
              <span>Edit</span>
            </Button>
            <Button
              variant="ghost"
              className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer w-full justify-start"
              onClick={() => {
                setShowDeleteModal(true);
              }}
              {...testProps(AUDIT_RESULT_BUTTON_DELETE)}
            >
              <Trash size={16} className="text-gray-500" />
              <span>Delete</span>
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <DeleteModal
        onAction={() => handleDelete(rowId)}
        onCancel={() => setShowDeleteModal(false)}
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
      />
    </div>
  );
};
