import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import DeleteImage from "/assets/images/delete-logo.svg";

interface ErrorModalProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionTextClassName?: string;
  onAction: () => void;
  className?: string;
  destructive?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ErrorModal = ({
  title = "Error!",
  description = "One or more validation errors occurred.",
  actionText = "Ok",
  actionTextClassName,
  onAction,
  className,
  destructive = false,
  open,
  onOpenChange,
}: ErrorModalProps) => (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogContent
      className={cn("p-8 ", className)}
      style={{ borderRadius: 8, zIndex: 9999 }}
    >
      <AlertDialogHeader className="gap-4 mb-4">
        <AlertDialogTitle className="text-center text-2xl font-bold">
          {title}
        </AlertDialogTitle>
        <img src={DeleteImage} alt="Error Image" className="mx-auto mb-4" />
        <AlertDialogDescription className="text-center text-md text-gray-500">
          {description}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="flex flex-col gap-4">
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
