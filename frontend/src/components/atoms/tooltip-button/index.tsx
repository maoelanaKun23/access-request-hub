import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";

export function TooltipButton({
  children,
  data,
  className,
  onAction,
}: {
  tooltipText?: string;
  data: {
    name: string;
    score: number;
    position: string;
    projectID: string;
    mainIssuesRootCause: { mainIssue: string; rootCause: string }[];
  };
  children: React.ReactNode;
  className?: string;
  onAction: () => void;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={`${className}`}>{children}</TooltipTrigger>
        <TooltipPortal>
          <TooltipContent className="bg-white p-4 rounded-2xl border border-gray-200 shadow-lg w-80">
            <div className="space-y-3">
              <h3 className="font-bold text-lg border-b border-black/30 pb-1 text-center">
                Detail Main Issues
              </h3>

              <div>
                <p className="text-black text-sm text-start font-semibold">
                  Grading/Score
                </p>
                <div className="bg-gray-100 p-2 rounded mt-1">
                  <p className="text-start text-gray-700 text-xs">
                    {`${data.name || "-"} / ${data.score || "-"}`}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-black text-sm text-start font-semibold">
                  Project ID
                </p>
                <div className="bg-gray-100 p-2 rounded mt-1">
                  <p className="text-start text-gray-700 text-xs">
                    {data.projectID || "-"}
                  </p>
                </div>
              </div>

              <p className="text-black text-sm text-start font-semibold">
                Main Issues / Root Cause Category
              </p>
              {data.mainIssuesRootCause.map((issue, index) => (
                <div key={index}>
                  <div className="bg-gray-100 p-2 rounded mt-1">
                    <p className="text-start text-gray-700 text-xs">
                      {`${issue.mainIssue || "-"} / ${issue.rootCause || "-"}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              onClick={onAction}
              className="py-2 px-4 rounded w-full mt-4"
            >
              View of Project Letter
            </Button>
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  );
}
