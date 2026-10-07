import { DeleteModal } from "@/components/atoms/delete-modal";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { DataTableCustomHeader } from "@/components/organisms/data-table/data-table-custom-header";

export interface IItem {
  value: string;
  hidden: boolean;
  rowspan: string;
}

export interface IListObjective {
  itemID: string;
  projectID: string;
  organizationObjective: IItem;
  organizationsBusinessProcess: IItem;
  organizationsKPI: IItem;
  deptKPI: IItem;
  area: IItem;
  process: IItem;
  subProcess: IItem;
}

export function useListObjectiveColumn(
  handleDeleteListObjective: (projectId: string, objectiveKPIId: string) => void,
  handleSort: (field: string) => void,
  sort: string,
  handleEditItemTable: (itemID: string) => void,
): ColumnDef<IListObjective>[] {
  return useMemo<ColumnDef<IListObjective>[]>(
    () => [
      {
        accessorKey: "No",
        accessorFn: (row) => row.organizationObjective,
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="No"
            sortFilter={sort}
          />
        ),
        cell: ({ row }) => {
          const organizationObjective = row.original.organizationObjective;
          if (organizationObjective.hidden) return null;
          return (
            <div
              className="p-2 text-start whitespace-normal line-clamp-2 break-words"
              data-rowspan={organizationObjective.rowspan}
            >
              <div className="flex justify-center">
                <div className="p-3 text-center">{row.index + 1}</div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "organizationObjective",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Organization Objective"
            sortFilter={sort}
          />
        ),
        cell: ({ row }) => {
          const organizationObjective = row.original.organizationObjective;
          if (organizationObjective.hidden) return null;
          return (
            <div
              className="p-2 text-start whitespace-normal line-clamp-2 break-words"
              data-rowspan={organizationObjective.rowspan}
              title={organizationObjective.value}
            >
              {organizationObjective.value || "-"}
            </div>
          );
        },
      },
      {
        accessorKey: "organizationsBusinessProcess",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Organization Business Process"
            sortFilter={sort}
          />
        ),
        cell: ({ row }) => {
          const organizationsBusinessProcess = row.original.organizationsBusinessProcess;
          if (organizationsBusinessProcess.hidden) return null;
          return (
            <div
              className="p-2 text-start whitespace-normal line-clamp-2 break-words"
              data-rowspan={organizationsBusinessProcess.rowspan}
              title={organizationsBusinessProcess.value}
            >
              {organizationsBusinessProcess.value || "-"}
            </div>
          );
        },
      },
      {
        accessorKey: "organizationsKPI",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Organization KPI"
            sortFilter={sort}
          />
        ),
        cell: ({ row }) => {
          const organizationsKPI = row.original.organizationsKPI;
          if (organizationsKPI.hidden) return null;
          return (
            <div
              className="p-2 text-start whitespace-normal line-clamp-2 break-words"
              data-rowspan={organizationsKPI.rowspan}
              title={organizationsKPI.value}
            >
              {organizationsKPI.value || "-"}
            </div>
          );
        },
      },
      {
        accessorKey: "deptKPI",
        header: ({ column }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={handleSort}
            title="Department/Unit/Branch KPI"
            sortFilter={sort}
          />
        ),
        cell: ({ row }) => {
          const deptKPI = row.original.deptKPI;
          if (deptKPI.hidden) return null;
          return (
            <div
              className="p-2 text-start whitespace-normal line-clamp-2 break-words"
              data-rowspan={deptKPI.rowspan}
              title={deptKPI.value}
            >
              {deptKPI.value || "-"}
            </div>
          );
        },
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
        cell: ({ row }) => {
          const area = row.original.area;
          if (area.hidden) return null;
          return (
            <div className="p-2 text-start" data-rowspan={area.rowspan}>
              {area.value || "-"}
            </div>
          );
        },
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
        cell: ({ row }) => {
          const process = row.original.process;
          if (process.hidden) return null;
          return (
            <div className="p-2 text-start" data-rowspan={process.rowspan}>
              {process.value || "-"}
            </div>
          );
        },
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
        cell: ({ row }) => {
          const subProcess = row.original.subProcess;
          if (subProcess.hidden) return null;
          return (
            <div className="p-2 text-start" data-rowspan={subProcess.rowspan}>
              {subProcess.value || "-"}
            </div>
          );
        },
      },
      {
        accessorKey: "actions",
        header: () => null,
        accessorFn: (row) => row.organizationObjective,
        cell: ({ row }) => {
          const organizationObjective = row.original.organizationObjective;
          if (organizationObjective.hidden) return null;
          return (
            <div
              className="p-2 text-start whitespace-normal line-clamp-2 break-words"
              data-rowspan={organizationObjective.rowspan}
            >
              <ActionMenu
                rowId={row.original.itemID}
                projectId={row.original.projectID}
                handleDelete={handleDeleteListObjective}
                handleEditItemTable={() => handleEditItemTable(row.original.itemID)}
              />
            </div>
          );
        },
      },
    ],
    [handleSort],
  );
}

const ActionMenu = ({
  rowId,
  projectId,
  handleDelete,
  handleEditItemTable,
}: {
  rowId: string;
  projectId: string;
  handleDelete: (projectId: string, rowId: string) => void;
  handleEditItemTable: () => void;
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="flex justify-center">
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
              onClick={handleEditItemTable}
            >
              <Edit size={16} className="text-gray-500" />
              <span>Edit</span>
            </Button>
            <Button
              variant="ghost"
              className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer w-full justify-start"
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash2 size={16} className="text-gray-500" />
              <span>Delete</span>
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <DeleteModal
        onAction={() => handleDelete(projectId, rowId)}
        onCancel={() => setShowDeleteModal(false)}
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
      />
    </div>
  );
};