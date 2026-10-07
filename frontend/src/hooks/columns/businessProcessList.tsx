import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Edit, MoreVertical } from "lucide-react";
import { DataTableCustomHeader } from "@/components/organisms/data-table/data-table-custom-header";

const BG = {
  identification: "#9AE091",
  risk: "#F9CBCB",
  control: "#C4E6FF",
} as const;

const cellRenderer = (value: any, field: string) => {
  if (value == null) {
    return <div className="p-3 text-start"></div>;
  }

  if (typeof value === "object") {
    return <div className="p-3 text-start">[Data]</div>;
  }

  return <div className="p-3 text-start">{String(value)}</div>;
};

type RCColumnDef = ColumnDef<any> & {
  backgroundColor?: string;
  headerBackgroundColor?: string;
  columns?: RCColumnDef[];
};

export const useBusinessProcessListColumns = (
  sort: string,
  handleSort: (field: string) => void,
  pageNumber: number,
  pageSize: number,
  setToDataDetail: (value: boolean) => void,
  setDataDetailType: (value: "add" | "edit" | "editPerItem") => void,
) => {
  return useMemo(() => {
    const identificationGroup: RCColumnDef = {
      id: "identificationGroup",
      headerBackgroundColor: BG.identification,
      header: "Identification",
      columns: [
        {
          id: "no",
          header: ({ column }) => (
            <DataTableCustomHeader
              column={column}
              handleSortChange={handleSort}
              title="No"
              sortFilter={sort}
            />
          ),
          cell: ({ row }) => {
            const index = (pageNumber - 1) * pageSize + row.index + 1;

            return <div className="p-3 text-center">{index}</div>;
          },
        },
        {
          accessorKey: "criticalItem",
          header: ({ column }) => (
            <DataTableCustomHeader
              column={column}
              handleSortChange={handleSort}
              title="Critical Item"
              sortFilter={sort}
            />
          ),
          cell: ({ getValue }) =>
            cellRenderer(getValue() === true ? "Yes" : "No", "criticalItem"),
        },
        {
          accessorKey: "auditor",

          header: ({ column }) => (
            <DataTableCustomHeader
              column={column}
              handleSortChange={handleSort}
              title="Auditor"
              sortFilter={sort}
            />
          ),
          cell: ({ getValue }) => cellRenderer(getValue(), "auditor"),
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
          cell: ({ getValue }) => cellRenderer(getValue(), "area"),
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
          cell: ({ getValue }) => cellRenderer(getValue(), "processActivity"),
        },
        {
          accessorKey: "subProcess",

          header: ({ column }) => (
            <DataTableCustomHeader
              column={column}
              handleSortChange={handleSort}
              title="Sub Process/Sub Activity"
              sortFilter={sort}
            />
          ),
          cell: ({ getValue }) =>
            cellRenderer(getValue(), "subProcessActivity"),
        },
        {
          accessorKey: "picAuditee",

          header: ({ column }) => (
            <DataTableCustomHeader
              column={column}
              handleSortChange={handleSort}
              title="PIC Auditor"
              sortFilter={sort}
            />
          ),
          cell: ({ getValue }) => cellRenderer(getValue(), "picAuditor"),
        },
        {
          accessorKey: "auditObjective",

          header: ({ column }) => (
            <DataTableCustomHeader
              column={column}
              handleSortChange={handleSort}
              title="Audit Objective"
              sortFilter={sort}
            />
          ),
          cell: ({ getValue }) => cellRenderer(getValue(), "auditObjective"),
        },
      ],
    };

    const riskGroup: RCColumnDef = {
      id: "riskGroup",
      headerBackgroundColor: BG.risk,
      header: "Risk",
      columns: [
        {
          id: "riskDescription",
          header: () => (
            <div className="pt-4 text-center items-center font-bold">
              Risk Description
            </div>
          ),
          columns: [
            {
              accessorKey: "riskLossEvents",

              header: ({ column }) => (
                <DataTableCustomHeader
                  column={column}
                  handleSortChange={handleSort}
                  title="Loss Events"
                  sortFilter={sort}
                />
              ),
              cell: ({ getValue }) =>
                cellRenderer(getValue(), "riskLossEvents"),
            },
            {
              accessorKey: "riskRootCause",

              header: ({ column }) => (
                <DataTableCustomHeader
                  column={column}
                  handleSortChange={handleSort}
                  title="Root Cause"
                  sortFilter={sort}
                />
              ),
              cell: ({ getValue }) => cellRenderer(getValue(), "riskRootCause"),
            },
            {
              accessorKey: "riskImpact",

              header: ({ column }) => (
                <DataTableCustomHeader
                  column={column}
                  handleSortChange={handleSort}
                  title="Impact"
                  sortFilter={sort}
                />
              ),
              cell: ({ getValue }) => cellRenderer(getValue(), "riskImpact"),
            },
          ],
        },
        {
          accessorKey: "impact",

          header: ({ column }) => (
            <DataTableCustomHeader
              column={column}
              handleSortChange={handleSort}
              title="Impact"
              sortFilter={sort}
            />
          ),
          cell: ({ getValue }) => cellRenderer(getValue(), "impact"),
        },
        {
          accessorKey: "likelihood",

          header: ({ column }) => (
            <DataTableCustomHeader
              column={column}
              handleSortChange={handleSort}
              title="Likelihood"
              sortFilter={sort}
            />
          ),
          cell: ({ getValue }) => cellRenderer(getValue(), "likelihood"),
        },
        {
          accessorKey: "overallInherent",

          header: ({ column }) => (
            <DataTableCustomHeader
              column={column}
              handleSortChange={handleSort}
              title="Overall Inherent"
              sortFilter={sort}
            />
          ),
          cell: ({ getValue }) => cellRenderer(getValue(), "overallInherent"),
        },
      ],
    };

    const controlGroup: RCColumnDef = {
      id: "controlGroup",
      headerBackgroundColor: BG.control,
      header: "Control",
      columns: [
        {
          accessorKey: "controlAction",
          header: ({ column }) => (
            <DataTableCustomHeader
              column={column}
              handleSortChange={handleSort}
              title="Current Control/Action"
              sortFilter={sort}
            />
          ),
          cell: ({ getValue }) => cellRenderer(getValue(), "controlAction"),
        },
        {
          accessorKey: "controlImpact",
          header: ({ column }) => (
            <DataTableCustomHeader
              column={column}
              handleSortChange={handleSort}
              title="Impact"
              sortFilter={sort}
            />
          ),
          cell: ({ getValue }) => cellRenderer(getValue(), "controlImpact"),
        },
        {
          accessorKey: "controlLikelihood",
          header: ({ column }) => (
            <DataTableCustomHeader
              column={column}
              handleSortChange={handleSort}
              title="Likelihood"
              sortFilter={sort}
            />
          ),
          cell: ({ getValue }) => cellRenderer(getValue(), "controlLikelihood"),
        },
        {
          accessorKey: "overallResidual",
          header: ({ column }) => (
            <DataTableCustomHeader
              column={column}
              handleSortChange={handleSort}
              title="Overall Residual"
              sortFilter={sort}
            />
          ),
          cell: ({ getValue }) => cellRenderer(getValue(), "overallResidual"),
        },
        {
          accessorKey: "coso",
          header: ({ column }) => (
            <DataTableCustomHeader
              column={column}
              handleSortChange={handleSort}
              title="COSO Procedure"
              sortFilter={sort}
            />
          ),
          cell: ({ getValue }) => cellRenderer(getValue(), "coso"),
        },
        {
          accessorKey: "auditProcedure",
          header: ({ column }) => (
            <DataTableCustomHeader
              column={column}
              handleSortChange={handleSort}
              title="Audit Procedure"
              sortFilter={sort}
            />
          ),
          cell: ({ getValue }) => cellRenderer(getValue(), "auditProcedure"),
        },
        {
          accessorKey: "dataDocumentRequest",
          header: ({ column }) => (
            <DataTableCustomHeader
              column={column}
              handleSortChange={handleSort}
              title="Data/Document Request"
              sortFilter={sort}
            />
          ),
          cell: ({ getValue }) =>
            cellRenderer(getValue(), "dataDocumentRequest"),
        },
        {
          accessorKey: "tCode",
          header: ({ column }) => (
            <DataTableCustomHeader
              column={column}
              handleSortChange={handleSort}
              title="System/T-Code"
              sortFilter={sort}
            />
          ),
          cell: ({ getValue }) => cellRenderer(getValue(), "tCode"),
        },
        {
          accessorKey: "actions",
          header: () => <div className="p-3" />,
          cell: ({ row }) => (
            <div className="p-3 text-center">
              <ActionMenu
                rowId={row.original.itemID}
                handleNavigate={() => {}}
                projectId={row.original.projectID}
                fileName={row.original.pathAttachment}
                setToDataDetail={setToDataDetail}
                setDataDetailType={setDataDetailType}
                attachmentID={row.original.attachmentID}
              />
            </div>
          ),
        },
      ],
    };

    return [identificationGroup, riskGroup, controlGroup];
  }, [sort, pageNumber, pageSize]);
};

interface ActionMenuProps {
  rowId: string;
  handleNavigate: (id: string) => void;
  projectId: string;
  fileName: string;
  setToDataDetail: (value: boolean) => void;
  setDataDetailType: (value: "add" | "edit" | "editPerItem") => void;
  attachmentID: string;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  rowId,
  handleNavigate,
  projectId,
  fileName,
  setToDataDetail,
  setDataDetailType,
  attachmentID,
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
              className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer w-full justify-start"
              onClick={() => {
                localStorage.setItem("selectedAttachmentID", attachmentID);
                setToDataDetail(true);
                setDataDetailType("editPerItem");
              }}
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
