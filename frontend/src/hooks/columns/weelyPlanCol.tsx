import {
  useWeeklyPlanDeleteWeeklyHook,
  useWeeklyPlanDownloadFileHook,
} from "@/api/msAuditManagement/hooks/weeklyPlan";
import { DeleteModal } from "@/components/atoms/delete-modal";
import { DataTableCustomHeader } from "@/components/organisms/data-table/data-table-custom-header";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  WEEKLY_PLAN_ACTION_APPROVAL,
  WEEKLY_PLAN_ACTION_DELETE,
  WEEKLY_PLAN_ACTION_EDIT,
  WEEKLY_PLAN_SORT_DYNAMIC,
} from "@/constants/test-ids/audit-plan/weekly-plan";
import { numberToMonth } from "@/lib/number-to-month";
import testProps from "@/lib/testing";
import type { ColumnDef } from "@tanstack/react-table";
import {
  CheckCircle,
  Edit,
  MoreVertical,
  Paperclip,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Activity {
  activityId: string;
  activity: string;
  detailActivity: string;
  outputActivity: string;
  fileID?: string;
  activitiesFiles?: {
    activityFileId: string;
    fileName: string;
    pathAttachment: string;
    fileSize?: number;
  }[];
}

interface WeeklyPlanActivity {
  itemId: string;
  activityCategory: string;
  auditee: string;
  activities: Activity[];
  status: string;
  problem: string;
  correctiveAction: string;
  approval: string;
  notes: string;
}

interface WeeklyPlanWeek {
  week: string;
  status: {
    status: string;
    item: WeeklyPlanActivity[];
  }[];
}

interface WeeklyPlanMonth {
  month: string;
  weeks: WeeklyPlanWeek[];
}

interface WeeklyPlanAuditor {
  name: string;
  months: WeeklyPlanMonth[];
}

interface WeeklyPlanTeam {
  teamLeader: string;
  nrpTeam: string;
  auditors: WeeklyPlanAuditor[];
}

interface TableRowData extends WeeklyPlanActivity {
  teamLeader: string;
  nrpTeam: string;
  auditors: string;
  month: string;
  week: string;
  statusValue: string;
  activityIndex: number;
  totalActivities: number;
  rowSpan?: {
    teamLeader?: number;
    auditors?: number;
    month?: number;
    week?: number;
    status?: number;
    activityCategory?: number;
    auditee?: number;
    problem?: number;
    correctiveAction?: number;
    approval?: number;
    notes?: number;
    actions?: number;
  };
  isFirstInGroup?: {
    teamLeader?: boolean;
    auditors?: boolean;
    month?: boolean;
    week?: boolean;
    status?: boolean;
    activityCategory?: boolean;
    auditee?: boolean;
    problem?: boolean;
    correctiveAction?: boolean;
    approval?: boolean;
    notes?: boolean;
    actions?: boolean;
  };
}

export function processWeeklyPlanData(data: WeeklyPlanTeam[]): TableRowData[] {
  const flatData: TableRowData[] = [];
  let globalItemIndex = 0;

  data.forEach((team) => {
    team.auditors.forEach((auditors) => {
      auditors.months.forEach((month) => {
        month.weeks.forEach((week) => {
          week.status.forEach((statusGroup) => {
            statusGroup.item.forEach((item, itemIndex) => {
              let weekStartIndex = 0;
              let statusStartIndex = 0;

              for (let s = 0; s < week.status.length; s++) {
                const status = week.status[s];
                if (status === statusGroup) {
                  statusStartIndex = weekStartIndex;
                  break;
                }
                weekStartIndex += status.item.reduce(
                  (acc, i) => acc + Math.max(1, i.activities.length),
                  0
                );
              }

              const totalWeekRows = week.status.reduce((acc, s) => {
                return (
                  acc +
                  s.item.reduce(
                    (itemAcc, i) => itemAcc + Math.max(1, i.activities.length),
                    0
                  )
                );
              }, 0);

              const totalStatusRows = statusGroup.item.reduce((acc, i) => {
                return acc + Math.max(1, i.activities.length);
              }, 0);

              const itemStartIndex = week.status
                .slice(0, week.status.indexOf(statusGroup))
                .reduce((acc, s) => {
                  return (
                    acc +
                    s.item.reduce(
                      (itemAcc, i) =>
                        itemAcc + Math.max(1, i.activities.length),
                      0
                    )
                  );
                }, 0);

              const activityCount = Math.max(1, item.activities.length);

              if (item.activities.length === 0) {
                flatData.push({
                  ...item,
                  teamLeader: team.teamLeader,
                  nrpTeam: team.nrpTeam,
                  auditors: auditors.name,
                  month: month.month,
                  week: week.week,
                  statusValue: statusGroup.status,
                  activityIndex: 0,
                  totalActivities: 1,
                  isFirstInGroup: {
                    teamLeader:
                      globalItemIndex === 0 &&
                      itemIndex === 0 &&
                      activityCount > 0,
                    auditors:
                      itemIndex === 0 &&
                      weekStartIndex === 0 &&
                      activityCount > 0,
                    month:
                      itemIndex === 0 &&
                      weekStartIndex === 0 &&
                      activityCount > 0,
                    week: statusStartIndex + itemStartIndex === 0,
                    status: itemStartIndex === 0,
                    activityCategory: itemStartIndex === 0,
                    auditee: itemStartIndex === 0,
                    problem: itemStartIndex === 0,
                    correctiveAction: itemStartIndex === 0,
                    approval: itemStartIndex === 0,
                    notes: itemStartIndex === 0,
                  },
                  rowSpan: {
                    teamLeader: 0,
                    auditors: 0,
                    month: 0,
                    week: totalWeekRows,
                    status: totalStatusRows,
                    activityCategory: activityCount,
                    auditee: activityCount,
                    problem: activityCount,
                    correctiveAction: activityCount,
                    approval: activityCount,
                    notes: activityCount,
                  },
                });
              } else {
                item.activities.forEach((activity, actIdx) => {
                  flatData.push({
                    ...item,
                    teamLeader: team.teamLeader,
                    nrpTeam: team.nrpTeam,
                    auditors: auditors.name,
                    month: month.month,
                    week: week.week,
                    statusValue: statusGroup.status,
                    activityIndex: actIdx,
                    totalActivities: item.activities.length,
                    isFirstInGroup: {
                      teamLeader:
                        globalItemIndex === 0 &&
                        itemIndex === 0 &&
                        actIdx === 0,
                      auditors:
                        itemIndex === 0 && weekStartIndex === 0 && actIdx === 0,
                      month:
                        itemIndex === 0 && weekStartIndex === 0 && actIdx === 0,
                      week:
                        statusStartIndex + itemStartIndex === 0 && actIdx === 0,
                      status: itemStartIndex === 0 && actIdx === 0,
                      activityCategory: actIdx === 0,
                      auditee: actIdx === 0,
                      problem: actIdx === 0,
                      correctiveAction: actIdx === 0,
                      approval: actIdx === 0,
                      notes: actIdx === 0,
                      actions: actIdx === 0,
                    },
                    rowSpan: {
                      teamLeader: 0,
                      auditors: 0,
                      month: 0,
                      week: totalWeekRows,
                      status: totalStatusRows,
                      activityCategory: activityCount,
                      auditee: activityCount,
                      problem: activityCount,
                      correctiveAction: activityCount,
                      approval: activityCount,
                      notes: activityCount,
                      actions: activityCount,
                    },
                  });
                });
              }

              globalItemIndex += activityCount;
            });
          });
        });
      });
    });
  });

  let currentTeamIndex = 0;

  data.forEach((team) => {
    const totalTeamRows = team.auditors.reduce((acc, auditors) => {
      return (
        acc +
        auditors.months.reduce((monthAcc, month) => {
          return (
            monthAcc +
            month.weeks.reduce((weekAcc, week) => {
              return (
                weekAcc +
                week.status.reduce((statusAcc, status) => {
                  return (
                    statusAcc +
                    status.item.reduce(
                      (itemAcc, item) =>
                        itemAcc + Math.max(1, item.activities.length),
                      0
                    )
                  );
                }, 0)
              );
            }, 0)
          );
        }, 0)
      );
    }, 0);

    if (currentTeamIndex < flatData.length) {
      flatData[currentTeamIndex].isFirstInGroup!.teamLeader = true;
      flatData[currentTeamIndex].rowSpan!.teamLeader = totalTeamRows;
    }

    let currentAuditorIndex = currentTeamIndex;
    team.auditors.forEach((auditors) => {
      const totalAuditorRows = auditors.months.reduce((monthAcc, month) => {
        return (
          monthAcc +
          month.weeks.reduce((weekAcc, week) => {
            return (
              weekAcc +
              week.status.reduce((statusAcc, status) => {
                return (
                  statusAcc +
                  status.item.reduce(
                    (itemAcc, item) =>
                      itemAcc + Math.max(1, item.activities.length),
                    0
                  )
                );
              }, 0)
            );
          }, 0)
        );
      }, 0);

      if (currentAuditorIndex < flatData.length) {
        flatData[currentAuditorIndex].isFirstInGroup!.auditors = true;
        flatData[currentAuditorIndex].rowSpan!.auditors = totalAuditorRows;
      }

      let currentMonthIndex = currentAuditorIndex;
      auditors.months.forEach((month) => {
        const totalMonthRows = month.weeks.reduce((weekAcc, week) => {
          return (
            weekAcc +
            week.status.reduce((statusAcc, status) => {
              return (
                statusAcc +
                status.item.reduce(
                  (itemAcc, item) =>
                    itemAcc + Math.max(1, item.activities.length),
                  0
                )
              );
            }, 0)
          );
        }, 0);

        if (currentMonthIndex < flatData.length) {
          flatData[currentMonthIndex].isFirstInGroup!.month = true;
          flatData[currentMonthIndex].rowSpan!.month = totalMonthRows;
        }

        currentMonthIndex += totalMonthRows;
      });

      currentAuditorIndex += totalAuditorRows;
    });

    currentTeamIndex += totalTeamRows;
  });

  return flatData;
}

export const useWeeklyPlanColumns = (
  sort: string,
  handleSort: (field: string) => void,
  handleTabChange: (tab: "add" | "edit" | "approval") => void,
  refetchWeeklyPlan: () => void,
  isAllowedEdit: boolean,
  isAllowedApprove: boolean,
  isAllowedDelete: boolean
) => {
  const ActionMenu = ({ rowId }: { rowId: string }) => {
    const [_isOpen, setIsOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { mutate: deletePlan } = useWeeklyPlanDeleteWeeklyHook();

    const handleDelete = () => {
      deletePlan(
        { params: { Id: rowId } },
        {
          onSuccess: () => {
            setIsOpen(false);
            setShowDeleteModal(false);
            refetchWeeklyPlan();
          },
          onError: (error) => {
            toast.error(error.message || "Failed to delete weekly plan");
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
                className={`px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer w-full justify-start ${
                  !isAllowedEdit ? "hidden" : ""
                }`}
                onClick={() => {
                  localStorage.setItem("editWeeklyPlanId", rowId);
                  handleTabChange("edit");
                }}
                {...testProps(WEEKLY_PLAN_ACTION_EDIT)}
              >
                <Edit size={16} className="text-gray-500" />
                <span>Edit</span>
              </Button>
              <Button
                variant="ghost"
                className={`px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer w-full justify-start ${
                  !isAllowedApprove ? "hidden" : ""
                }`}
                onClick={() => {
                  localStorage.setItem("editWeeklyPlanId", rowId);
                  handleTabChange("approval");
                }}
                {...testProps(WEEKLY_PLAN_ACTION_APPROVAL)}
              >
                <CheckCircle size={16} className="text-gray-500" />
                <span>Approval</span>
              </Button>
              <Button
                variant="ghost"
                className={`px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer w-full justify-start`}
                onClick={() => setShowDeleteModal(true)}
                disabled={true}
                {...testProps(WEEKLY_PLAN_ACTION_DELETE)}
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

  const [fileId, setFileId] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  const { refetch: downloadFile, isLoading: isDownloadingFile } =
    useWeeklyPlanDownloadFileHook(
      { FileID: fileId },
      {
        query: {
          enabled: false,
        },
        client: {
          responseType: "blob",
        },
      }
    );

  const triggerDownload = async () => {
    if (!fileId) return;

    try {
      const response = await downloadFile();

      if (!isDownloadingFile && response?.data) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        setFileId("");
      } else {
        toast.error("Failed to download file");
      }
    } catch (error) {
      toast.error("Error occurred while downloading file");
    }
  };

  useEffect(() => {
    triggerDownload();
  }, [fileId]);

  const handleDownload = (fileId: string, fileName: string) => {
    setFileName(fileName);
    setFileId(fileId);
  };

  const columns: ColumnDef<TableRowData>[] = [
    {
      id: "teamLeader",
      header: ({ column }) => (
        <DataTableCustomHeader
          column={column}
          handleSortChange={handleSort}
          title="Team Leader"
          sortFilter={sort}
          testID={WEEKLY_PLAN_SORT_DYNAMIC + "TEAM_LEADER"}
        />
      ),
      cell: ({ row }) => {
        const data = row.original;
        if (!data.isFirstInGroup?.teamLeader) {
          return null;
        }
        return (
          <div className="p-2 text-center" rowSpan={data.rowSpan?.teamLeader}>
            {data.teamLeader}
          </div>
        );
      },
    },
    {
      id: "auditors",
      header: ({ column }) => (
        <DataTableCustomHeader
          column={column}
          handleSortChange={handleSort}
          title="Auditor"
          sortFilter={sort}
          testID={WEEKLY_PLAN_SORT_DYNAMIC + "AUDITOR"}
        />
      ),
      cell: ({ row }) => {
        const data = row.original;
        if (!data.isFirstInGroup?.auditors) {
          return null;
        }
        return (
          <div className="p-2 text-center" rowSpan={data.rowSpan?.auditors}>
            {data.auditors}
          </div>
        );
      },
    },
    {
      id: "month",
      header: ({ column }) => (
        <DataTableCustomHeader
          column={column}
          handleSortChange={handleSort}
          title="Month"
          sortFilter={sort}
          testID={WEEKLY_PLAN_SORT_DYNAMIC + "MONTH"}
          sortID={"months"}
        />
      ),
      cell: ({ row }) => {
        const data = row.original;
        if (!data.isFirstInGroup?.month) {
          return null;
        }
        return (
          <div className="p-2 text-center" rowSpan={data.rowSpan?.month}>
            {numberToMonth(data.month)}
          </div>
        );
      },
    },
    {
      id: "week",
      header: ({ column }) => (
        <DataTableCustomHeader
          column={column}
          handleSortChange={handleSort}
          title="Week"
          sortFilter={sort}
          testID={WEEKLY_PLAN_SORT_DYNAMIC + "WEEK"}
          sortID={"weeks"}
        />
      ),
      cell: ({ row }) => {
        const data = row.original;
        if (!data.isFirstInGroup?.week) {
          return null;
        }
        return (
          <div className="p-2 text-center" rowSpan={data.rowSpan?.week}>
            {data.week}
          </div>
        );
      },
    },
    {
      id: "status",
      header: ({ column }) => (
        <DataTableCustomHeader
          column={column}
          handleSortChange={handleSort}
          title="Status"
          sortFilter={sort}
          testID={WEEKLY_PLAN_SORT_DYNAMIC + "STATUS"}
        />
      ),
      cell: ({ row }) => {
        const data = row.original;
        if (!data.isFirstInGroup?.status) {
          return null;
        }
        return (
          <div className="p-2 text-center" rowSpan={data.rowSpan?.status}>
            {data.statusValue}
          </div>
        );
      },
    },
    {
      id: "activityCategory",
      header: ({ column }) => (
        <DataTableCustomHeader
          column={column}
          handleSortChange={handleSort}
          title="Activity Category"
          sortFilter={sort}
          testID={WEEKLY_PLAN_SORT_DYNAMIC + "ACTIVITY_CATEGORY"}
        />
      ),
      cell: ({ row }) => {
        const data = row.original;
        if (!data.isFirstInGroup?.activityCategory) {
          return null;
        }
        return (
          <div
            className="p-2 text-center"
            rowSpan={data.rowSpan?.activityCategory}
          >
            {data.activityCategory}
          </div>
        );
      },
    },
    {
      id: "auditee",
      header: ({ column }) => (
        <DataTableCustomHeader
          column={column}
          handleSortChange={handleSort}
          title="Auditee"
          sortFilter={sort}
          testID={WEEKLY_PLAN_SORT_DYNAMIC + "AUDITEE"}
        />
      ),
      cell: ({ row }) => {
        const data = row.original;
        if (!data.isFirstInGroup?.auditee) {
          return null;
        }
        return (
          <div className="p-2 text-center" rowSpan={data.rowSpan?.auditee}>
            {data.auditee}
          </div>
        );
      },
    },
    {
      id: "activity",
      header: ({ column }) => (
        <DataTableCustomHeader
          column={column}
          handleSortChange={handleSort}
          title="Activity"
          sortFilter={sort}
          testID={WEEKLY_PLAN_SORT_DYNAMIC + "ACTIVITY"}
        />
      ),
      cell: ({ row }) => {
        const data = row.original;
        const activity = data.activities[data.activityIndex];
        return (
          <div className="p-2 text-center whitespace-pre-line">
            {activity?.activity}
          </div>
        );
      },
    },
    {
      id: "detailActivity",
      header: ({ column }) => (
        <DataTableCustomHeader
          column={column}
          handleSortChange={handleSort}
          title="Detail Activity"
          sortFilter={sort}
          testID={WEEKLY_PLAN_SORT_DYNAMIC + "DETAIL_ACTIVITY"}
        />
      ),
      cell: ({ row }) => {
        const data = row.original;
        const activity = data.activities[data.activityIndex];
        return (
          <div className="p-2 text-center whitespace-pre-line">
            {activity?.detailActivity}
          </div>
        );
      },
    },
    {
      id: "outputActivity",
      header: ({ column }) => (
        <DataTableCustomHeader
          column={column}
          handleSortChange={handleSort}
          title="Output Activity"
          sortFilter={sort}
          testID={WEEKLY_PLAN_SORT_DYNAMIC + "OUTPUT_ACTIVITY"}
        />
      ),
      cell: ({ row }) => {
        const data = row.original;
        const activity = data.activities[data.activityIndex];
        return (
          <div className="p-2 text-center whitespace-pre-line">
            {activity?.outputActivity}
          </div>
        );
      },
    },
    {
      id: "problem",
      header: ({ column }) => (
        <DataTableCustomHeader
          column={column}
          handleSortChange={handleSort}
          title="Problem"
          sortFilter={sort}
          testID={WEEKLY_PLAN_SORT_DYNAMIC + "PROBLEM"}
        />
      ),
      cell: ({ row }) => {
        const data = row.original;
        if (!data.isFirstInGroup?.problem) {
          return null;
        }
        return (
          <div className="p-2 text-center" rowSpan={data.rowSpan?.problem}>
            {data.problem}
          </div>
        );
      },
    },
    {
      id: "correctiveAction",
      header: ({ column }) => (
        <DataTableCustomHeader
          column={column}
          handleSortChange={handleSort}
          title="Corrective Action"
          sortFilter={sort}
          testID={WEEKLY_PLAN_SORT_DYNAMIC + "CORRECTIVE_ACTION"}
        />
      ),
      cell: ({ row }) => {
        const data = row.original;
        if (!data.isFirstInGroup?.correctiveAction) {
          return null;
        }
        return (
          <div
            className="p-2 text-center"
            rowSpan={data.rowSpan?.correctiveAction}
          >
            {data.correctiveAction}
          </div>
        );
      },
    },
    {
      id: "approval",
      header: ({ column }) => (
        <DataTableCustomHeader
          column={column}
          handleSortChange={handleSort}
          title="Approval"
          sortFilter={sort}
          testID={WEEKLY_PLAN_SORT_DYNAMIC + "APPROVAL"}
        />
      ),
      cell: ({ row }) => {
        const data = row.original;
        if (!data.isFirstInGroup?.approval) {
          return null;
        }
        return (
          <div className="p-2 text-center" rowSpan={data.rowSpan?.approval}>
            {data.approval}
          </div>
        );
      },
    },
    {
      id: "notes",
      header: ({ column }) => (
        <DataTableCustomHeader
          column={column}
          handleSortChange={handleSort}
          title="Notes"
          sortFilter={sort}
          testID={WEEKLY_PLAN_SORT_DYNAMIC + "NOTES"}
        />
      ),
      cell: ({ row }) => {
        const data = row.original;
        if (!data.isFirstInGroup?.notes) {
          return null;
        }
        return (
          <div className="p-2 text-center" rowSpan={data.rowSpan?.notes}>
            {data.notes}
          </div>
        );
      },
    },
    {
      id: "attachment",
      header: ({ column }) => (
        <DataTableCustomHeader
          column={column}
          handleSortChange={handleSort}
          title="Attachment"
          sortFilter={sort}
          testID={WEEKLY_PLAN_SORT_DYNAMIC + "ATTACHMENT"}
          disabled={true}
        />
      ),
      cell: ({ row }) => {
        const data = row.original;
        const activity = data.activities[data.activityIndex];
        const attachments = activity?.activitiesFiles || [];

        return (
          <div className="p-2 text-center">
            <div className="flex flex-col gap-2 items-start">
              {attachments.map((file) => (
                <button
                  key={file.activityFileId}
                  className="text-blue-600 hover:text-blue-800 underline underline-offset-2 flex items-center gap-2"
                  onClick={() =>
                    handleDownload(file.activityFileId, file.fileName)
                  }
                >
                  <Paperclip className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate text-start max-w-[250px]">
                    {file.fileName}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="p-2 font-bold text-center"></div>,
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div className="p-2 text-center" rowSpan={data.rowSpan?.actions}>
            <ActionMenu rowId={data.itemId} />
          </div>
        );
      },
    },
  ];

  return columns;
};
