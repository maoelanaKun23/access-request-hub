import { useSamplingColumn } from "./columns/samplingCol";
import { useTableConfig } from "./use-table-config";
import { useTableState } from "./use-table-state";

const formatSamplingData = (rawData: any[]) => {
  if (!Array.isArray(rawData)) return [];

  return rawData.map((item) => ({
    area: item?.area || { value: "-", hidden: false, rowspan: "1" },
    process: item?.process || { value: "-", hidden: false, rowspan: "1" },
    subProcess: item?.subProcess || { value: "-", hidden: false, rowspan: "1" },

    path: item?.path ?? "-",
    note: item?.note ?? "-",
    requestDate: item?.requestDate ?? "-",
    projectID: item?.projectID ?? "-",
    itemID: item?.itemID ?? "-",
  }));
};

export function useTableSampling(
  data: any[],
  handleNavigate: () => void,
  handleDownload: (fileId: string, fileName: string) => void,
  handleDelete: (id: string) => void
) {
  const formattedData = formatSamplingData(data);

  const columns = useSamplingColumn(
    handleNavigate,
    handleDownload,
    handleDelete
  );

  const tableState = useTableState({
    initialColumnPinning: {
      left: [],
      right: ["actions"],
    },
  });

  const table = useTableConfig({
    data: formattedData,
    columns,
    tableState,
    pageCount: 0,
  });

  return { table };
}
