import { DataTableCustomHeader } from "@/components/organisms/data-table/data-table-custom-header";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { columnAuditHistory } from "@/constants/lists";
import { YearCell } from "@/components/molecules/YearCell";
import testProps from "@/lib/testing";
import {
  AUDIT_HISTORY_CHECKBOX_SELECT_ALL,
  AUDIT_HISTORY_CHECKBOX_SELECT_BY_ID,
  AUDIT_HISTORY_SORT_BY_AUDITEE,
  AUDIT_HISTORY_SORT_BY_STATUS,
  AUDIT_HISTORY_SORT_BY_RISK_GRADING,
  AUDIT_HISTORY_SORT_BY_AUDIT_PRIORITY,
  AUDIT_HISTORY_SORT_BY_FRAUD_HISTORY,
  AUDIT_HISTORY_SORT_BY_AVERAGE_GRADING,
  AUDIT_HISTORY_SORT_BY_TOTAL_AUDIT_PROJECT_DONE,
  AUDIT_HISTORY_SORT_BY_YEAR_PREFIX,
  AUDIT_HISTORY_SORT_DYNAMIC_COLUMN,
} from "@/constants/test-ids/audit-plan/general-plan";

const cellRenderer = (value: any, field: string) => {
  if (value == null) {
    return <div className="p-3 text-start"></div>;
  }

  if (typeof value === "object") {
    if (field === "averageGrading" && value.hexColor) {
      return <div>{value.score || "-"}</div>;
    }
    return <div className="p-3 text-start">[Data]</div>;
  }

  if (field === "ownershipPercentage") {
    return <div className={`p-3 text-start`}>{`${value ? value : 0}%`}</div>;
  } else if (field === "revenue" || field === "netIncome") {
    const formattedValue = Number(value).toLocaleString("id-ID");
    return <div className={`p-3 text-start`}>{formattedValue}</div>;
  }

  return <div className={`p-3 text-start`}>{String(value)}</div>;
};

interface UseAuditHistoryColumnsProps {
  type: string;
  selectedItems: any[];
  handleSelectAll: () => void;
  toggleSelection: (name: string, type: string) => void;
  auditGradingYear: any[];
  sortFilter: any;
  handleSortChange: (column: any) => void;
  isAdd: boolean;
  handleDownload: (fileId: string, fileName: string) => void;
}

export const useAuditHistoryColumns = ({
  type,
  selectedItems,
  handleSelectAll,
  toggleSelection,
  auditGradingYear,
  sortFilter,
  handleSortChange,
  isAdd,
  handleDownload,
}: UseAuditHistoryColumnsProps) => {
  return useMemo(() => {
    const commonColumns: ColumnDef<any>[] = [
      ...(isAdd
        ? [
            {
              id: "checkbox",
              cell: ({ row }: { row: any }) => (
                <div className="p-3 text-center">
                  <Checkbox
                    checked={selectedItems.includes(row.original.itemId)}
                    onCheckedChange={() =>
                      toggleSelection(row.original.itemId, row.original.type)
                    }
                    hidden={row.original.isDeleted}
                    {...testProps(AUDIT_HISTORY_CHECKBOX_SELECT_BY_ID)}
                  />
                </div>
              ),
              header: ({ table }: { table: any }) => {
                const rows = table.getRowModel().rows;

                const availableRows = rows.filter(
                  (row: any) => !row.original.isDeleted
                );

                const allSelected =
                  availableRows.length > 0 &&
                  availableRows.every((row: any) =>
                    selectedItems.includes(row.original.itemId)
                  );

                return (
                  <div className="p-3 text-center">
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={handleSelectAll}
                      {...testProps(AUDIT_HISTORY_CHECKBOX_SELECT_ALL)}
                    />
                  </div>
                );
              },
              backgroundColor: "#E6F2FA",
            },
          ]
        : []),
      {
        accessorKey: "name",

        cell: ({ getValue }) => (
          <div className="p-3 text-start font-medium">
            {getValue() ? String(getValue()) : "-"}
          </div>
        ),
        header: ({ column }) => (
          <DataTableCustomHeader
            sortFilter={sortFilter}
            column={column}
            handleSortChange={handleSortChange}
            title="Auditee"
            testID={AUDIT_HISTORY_SORT_BY_AUDITEE}
          />
        ),
        backgroundColor: "#E6F2FA",
      },
      {
        accessorKey: "status",
        cell: ({ getValue }) => cellRenderer(getValue(), "status"),
        header: ({ column }) => (
          <DataTableCustomHeader
            sortFilter={sortFilter}
            column={column}
            handleSortChange={handleSortChange}
            title="Status"
            testID={AUDIT_HISTORY_SORT_BY_STATUS}
          />
        ),
      },
    ];

    const [, columns] = columnAuditHistory.find(
      ([label]) => label === type
    ) || [null, []];

    const typeSpecificColumns: ColumnDef<any>[] = (columns ?? []).map(
      ({ accessorKey, title, testID }) => ({
        accessorKey,
        cell: ({ getValue }) => cellRenderer(getValue(), accessorKey),
        header: ({ column }) => (
          <DataTableCustomHeader
            sortFilter={sortFilter}
            column={column}
            handleSortChange={handleSortChange}
            title={title}
            testID={AUDIT_HISTORY_SORT_DYNAMIC_COLUMN + testID}
          />
        ),
      })
    );

    const trailingColumns: ColumnDef<any>[] = [
      {
        accessorKey: "riskGrading",
        cell: ({ getValue }) => cellRenderer(getValue(), "riskGrading"),
        header: ({ column }) => (
          <DataTableCustomHeader
            sortFilter={sortFilter}
            column={column}
            handleSortChange={handleSortChange}
            title="Risk Grading"
            testID={AUDIT_HISTORY_SORT_BY_RISK_GRADING}
          />
        ),
      },
      {
        accessorKey: "auditeePriority",
        cell: ({ getValue }) => cellRenderer(getValue(), "auditeePriority"),
        header: ({ column }) => (
          <DataTableCustomHeader
            sortFilter={sortFilter}
            column={column}
            handleSortChange={handleSortChange}
            title="Audit Priority"
            testID={AUDIT_HISTORY_SORT_BY_AUDIT_PRIORITY}
          />
        ),
      },
      {
        accessorKey: "fraudHistory",
        cell: ({ getValue }) => cellRenderer(getValue(), "fraudHistory"),
        header: ({ column }) => (
          <DataTableCustomHeader
            sortFilter={sortFilter}
            column={column}
            handleSortChange={handleSortChange}
            title="Fraud History"
            testID={AUDIT_HISTORY_SORT_BY_FRAUD_HISTORY}
          />
        ),
      },
      {
        id: "auditYears",
        header: "AUDIT GRADING & MAIN ISSUES",
        columns: auditGradingYear.map((year, index) => ({
          accessorKey: `year${index + 1}`,
          cell: ({ row }) => (
            <YearCell
              year={(row.original as any)[`year${index + 1}`]}
              handleDownload={handleDownload}
            />
          ),

          header: ({ column }) => (
            <DataTableCustomHeader
              sortFilter={sortFilter}
              column={column}
              handleSortChange={handleSortChange}
              title={String(year)}
              className="font-bold px-0 py-3 text-center whitespace-normal break-words text-sm w-24"
              testID={`${AUDIT_HISTORY_SORT_BY_YEAR_PREFIX}${index + 1}`}
            />
          ),
        })),
      },
      {
        accessorKey: "averageGrading",
        cell: ({ row }) => {
          const grading = row.original.averageGrading;
          return (
            <div
              className="p-0 h-full text-center"
              style={{ backgroundColor: grading?.hexColor || "transparent" }}
            >
              <div className="h-16 flex items-center justify-center">
                {grading?.score || "-"}
              </div>
            </div>
          );
        },
        header: ({ column }) => (
          <DataTableCustomHeader
            sortFilter={sortFilter}
            column={column}
            handleSortChange={handleSortChange}
            title="Average Grading"
            testID={AUDIT_HISTORY_SORT_BY_AVERAGE_GRADING}
          />
        ),
      },
      {
        accessorKey: "totalAuditprojectDone",
        cell: ({ getValue }) =>
          cellRenderer(getValue(), "totalAuditprojectDone"),
        header: ({ column }) => (
          <DataTableCustomHeader
            sortFilter={sortFilter}
            column={column}
            handleSortChange={handleSortChange}
            title="Total Audit Project Done"
            testID={AUDIT_HISTORY_SORT_BY_TOTAL_AUDIT_PROJECT_DONE}
          />
        ),
      },
    ];

    return [...commonColumns, ...typeSpecificColumns, ...trailingColumns];
  }, [
    type,
    selectedItems,
    handleSelectAll,
    toggleSelection,
    auditGradingYear,
    sortFilter,
    handleSortChange,
  ]);
};
