import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface MainIssuesModalProps {
  title?: string;
  actionText?: string;
  actionTextClassName?: string;
  onAction: () => void;
  cancelText?: string;
  onCancel?: () => void;
  className?: string;
  destructive?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  data: {
    name: string;
    score: number;
    position: string;
    projectID: string;
    mainIssuesRootCause: { mainIssue: string; rootCause: string }[];
  };
}

export const MainIssuesModal = ({
  title = "Hore selamat...",
  actionText = "Ok",
  actionTextClassName,
  onAction,
  onCancel,
  className,
  destructive = false,
  open,
  onOpenChange,
  data,
}: MainIssuesModalProps) => (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogContent
      className={cn("p-8 ", className)}
      style={{ borderRadius: 8, zIndex: 9999 }}
    >
      <AlertDialogHeader className="gap-4 mb-4">
        <div className="space-y-3">
          <AlertDialogTitle className="text-center text-xl font-bold border-b border-black/30">
            {title}
          </AlertDialogTitle>
          <div className="max-h-[50vh] overflow-y-auto space-y-2">
            <div>
              <p className="text-black text-sm text-start font-semibold mb-2">
                Grading/Score
              </p>
              <div className="bg-gray-100 p-2 rounded mt-1">
                <p className="text-start text-gray-700 text-xs">
                  {`${data.name || "-"} / ${data.score || "-"}`}
                </p>
              </div>
            </div>

            <div>
              <p className="text-black text-sm text-start font-semibold mb-2">
                Project ID
              </p>
              <div className="bg-gray-100 p-2 rounded mt-1">
                <p className="text-start text-gray-700 text-xs">
                  {data.projectID || "-"}
                </p>
              </div>
            </div>

            <p className="text-black text-sm text-start font-semibold mb-2">
              Main Issues / Root Cause Category
            </p>
            <div className="space-y-2">
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
          </div>
        </div>
      </AlertDialogHeader>
      <AlertDialogFooter className="flex flex-col gap-4">
        <AlertDialogCancel
          className="w-full rounded-lg"
          style={{ borderRadius: 8 }}
          onClick={onCancel}
        >
          Close
        </AlertDialogCancel>
        <AlertDialogAction
          className={`${destructive ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "w-full rounded-lg"} ${actionTextClassName}`}
          style={{ borderRadius: 8 }}
          onClick={onAction}
        >
          {actionText}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
