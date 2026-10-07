import { useTableProjectList } from "@/hooks/useTableProjectList";
import { DataTable } from "../data-table/data-table";
import { DataTableContainer } from "../data-table/data-table-container";
import { PROJECT_LIST_TABLE } from "@/constants/test-ids/audit-plan/general-plan";

export function ProjectListTable({
  data,
  handleTabChange,
  handleSort,
  sort,
  refetchProjectList,
  page,
  perPage,
}: {
  data: any;
  handleTabChange: (tab: string) => void;
  handleSort: (field: string) => void;
  sort: string;
  refetchProjectList: () => void;
  page: number;
  perPage: number;
}) {
  const { table } = useTableProjectList(
    data,
    handleTabChange,
    handleSort,
    sort,
    refetchProjectList,
    page,
    perPage
  );

  return (
    <div className="grid grid-cols-1 space-y-2 overflow-x-auto mt-4">
      <DataTableContainer>
        <DataTable table={table} testID={PROJECT_LIST_TABLE} />
      </DataTableContainer>
    </div>
  );
}
