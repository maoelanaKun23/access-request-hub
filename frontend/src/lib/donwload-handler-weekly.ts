import { useWeeklyPlanDownloadFileHook } from "@/api/msAuditManagement/hooks/weeklyPlan";

 const useFileIdToBlobConverter = () => {
  const { refetch: downloadFile, isLoading: isDownloading } =
    useWeeklyPlanDownloadFileHook(
      { FileID: "" },
      {
        query: { enabled: false },
        client: { responseType: "blob" },
      }
    );

  const convertFileIdToBlob = async (
    fileId: string,
    fileName: string
  ): Promise<{ blob: Blob; fileName: string } | null> => {
    if (!fileId) return null;

    try {
      const response = await downloadFile();

      if (response?.data) {
        const contentType =
          response.headers?.["content-type"] || "application/octet-stream";

        const blob = new Blob([response.data], { type: contentType });
        return { blob, fileName };
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  return { convertFileIdToBlob, isDownloading };
};