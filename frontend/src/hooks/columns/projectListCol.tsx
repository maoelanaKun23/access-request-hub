import { CheckCircle, Edit, MoreVertical, Trash2 } from "lucide-react";
import { useState, useMemo } from "react";
import { useGeneralPlanDeleteProjectHook } from "@/api/msAuditManagement/hooks/generalPlan";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableCustomHeader } from "@/components/organisms/data-table/data-table-custom-header";
import { Button } from "@/components/ui/button";
import { columnProjectList } from "@/constants/lists";
import { formatDate } from "@/lib/format-date";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DeleteModal } from "@/components/atoms/delete-modal";
import {
  PROJECT_LIST_ACTION_APPROVAL,
  PROJECT_LIST_ACTION_DELETE,
  PROJECT_LIST_ACTION_EDIT,
  PROJECT_LIST_SORT_DYNAMIC,
} from "@/constants/test-ids/audit-plan/general-plan";
import testProps from "@/lib/testing";

export interface AuditProject {
  id: string;
  auditeeCategory?: string;
  auditeeName?: string;
  projectID: string;
  projectName: string;
  projectScope?: string;
  projectCategory?: string;
  planStartDate?: string;
  planFinishDate?: string;
  actualStartDate?: string;
  actualFinishDate?: string;
  teamLeader?: string;
  teamMember?: string;
  joinProject?: string;
  projectStatus?: string;
  approvalStatus?: string;
  note?: string;
  isAllowedApproved?: boolean;
  isAllowedDelete?: boolean;
  isAllowedEdit?: boolean;
  achieved?: string;
  nrpTeam?: string;
  year?: string;
}

const ActionMenu = ({
  id,
  handleTabChange,
  refetchProjectList,
  isAllowedApproved,
  isAllowedDelete,
  isAllowedEdit,
}: {
  id: string;
  handleTabChange: (tab: string) => void;
  refetchProjectList: () => void;
  isAllowedApproved: boolean;
  isAllowedDelete: boolean;
  isAllowedEdit: boolean;
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { mutate: deleteProject } = useGeneralPlanDeleteProjectHook();

  const handleDelete = () => {
    deleteProject(
      { params: { Id: id, Discard: true } },
      {
        onSuccess: () => {
          refetchProjectList();
          setShowDeleteModal(false);
        },
        onError: (error) => {
          return toast("Error!", {
            description: `${error.message ? error.message : "Something went wrong."}`,
          });
        },
      }
    );
  };

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
              className={`px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer w-full justify-start ${!isAllowedEdit ? "hidden" : ""}`}
              onClick={() => {
                localStorage.setItem("editProjectListId", id);
                handleTabChange("Edit Project");
              }}
              {...testProps(PROJECT_LIST_ACTION_EDIT)}
            >
              <Edit size={16} className="text-gray-500" />
              <span>Edit</span>
            </Button>
            <Button
              variant="ghost"
              className={`px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer w-full justify-start ${!isAllowedApproved ? "hidden" : ""}`}
              onClick={() => {
                localStorage.setItem("editProjectListId", id);
                handleTabChange("Approval Project");
              }}
              {...testProps(PROJECT_LIST_ACTION_APPROVAL)}
            >
              <CheckCircle size={16} className="text-gray-500" />
              <span>Approval</span>
            </Button>
            <Button
              variant="ghost"
              className={`px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer w-full justify-start ${!isAllowedDelete ? "hidden" : ""}`}
              onClick={() => setShowDeleteModal(true)}
              {...testProps(PROJECT_LIST_ACTION_DELETE)}
            >
              <Trash2 size={16} className="text-gray-500" />
              <span>Delete</span>
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <DeleteModal
        onAction={() => handleDelete()}
        onCancel={() => setShowDeleteModal(false)}
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
      />
    </div>
  );
};

export function useAuditProjectColumns(
  handleTabChange: (tab: string) => void,
  sort: string,
  handleSort: (field: string) => void,
  refetchProjectList: () => void,
  _data?: any[],
  page: number = 1,
  perPage: number = 10
) {
  return useMemo<ColumnDef<AuditProject>[]>(() => {
    const baseColumns = columnProjectList
      .filter((col) => col.accessorKey !== "teamMember")
      .map(({ accessorKey, title, testID }) => ({
        accessorKey,
        cell: ({ row }: { row: any }) => {
          if (accessorKey.includes("Date")) {
            const value = formatDate({
              date: row.original[accessorKey],
              formatDate: "dd MMMM yyyy",
            });
            return <div className="p-3">{value}</div>;
          }
          return <div className="p-3">{row.original[accessorKey]}</div>;
        },
        header: ({ column }: { column: any }) => (
          <DataTableCustomHeader
            column={column}
            handleSortChange={() => handleSort(accessorKey)}
            title={title}
            sortFilter={sort}
            testID={PROJECT_LIST_SORT_DYNAMIC + testID}
          />
        ),
      }));

    const teamLeaderIndex = baseColumns.findIndex(
      (col) => col.accessorKey === "teamLeader"
    );

    const teamMemberColumn = {
      accessorKey: "teamMember",
      cell: ({ row }: { row: any }) => {
        const members = row.original.teamMember;
        if (!members) return <div className="p-3">-</div>;
        const memberList = members.split(",").map((m: string, idx: number) => (
          <div key={idx} className="mb-2">
            {idx + 1}. {m.trim()}
          </div>
        ));
        return <div className="p-3 min-w-[30vh]">{memberList}</div>;
      },
      header: ({ column }: { column: any }) => (
        <DataTableCustomHeader
          column={column}
          handleSortChange={() => handleSort("teamMember")}
          title="Team Member"
          sortFilter={sort}
        />
      ),
    };

    return [
      {
        id: "rowNumber",
        header: () => <div className="p-3 text-start font-semibold">No</div>,
        cell: ({ row }) => {
          const rowNumber = row.index + 1 + (page - 1) * perPage;
          return <div className="p-3 text-center">{rowNumber}</div>;
        },
      },
      ...baseColumns.slice(0, teamLeaderIndex + 1),
      teamMemberColumn,
      ...baseColumns.slice(teamLeaderIndex + 1),
      {
        id: "actions",
        cell: ({ row }) => (
          <div className="p-3 text-start">
            <ActionMenu
              id={row.original.id}
              handleTabChange={handleTabChange}
              refetchProjectList={refetchProjectList}
              isAllowedApproved={row.original.isAllowedApproved!}
              isAllowedDelete={row.original.isAllowedDelete!}
              isAllowedEdit={row.original.isAllowedEdit!}
            />
          </div>
        ),
        header: () => null,
      },
    ];
  }, [handleTabChange, page]);
}
