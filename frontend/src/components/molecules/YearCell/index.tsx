import { MainIssuesModal } from "@/components/atoms/main-issues-modal";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function YearCell({
  year,
  handleDownload,
}: {
  year: any;
  handleDownload: (fileId: string, fileName: string) => void;
}) {
  const [openModal, setOpenModal] = useState(false);

  if (!year || typeof year !== "object") {
    return <div className="p-0 text-center">-</div>;
  }

  return (
    <div
      className="p-0 text-center"
      style={{ backgroundColor: year.hexColor || "transparent" }}
    >
      <Button
        variant="ghost"
        className="w-full h-16 hover:bg-black/10"
        onClick={() => setOpenModal(true)}
      >
        {year.score ?? "-"}
      </Button>

      <MainIssuesModal
        title="Detail Main Issues"
        open={openModal}
        onOpenChange={setOpenModal}
        onAction={() => handleDownload(year.projectID, year.name)}
        data={year}
        actionText="View Project Letter"
      />
    </div>
  );
}
