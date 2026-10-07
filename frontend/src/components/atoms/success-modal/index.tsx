import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import SuccessImage from "/assets/images/success.svg";

interface SuccessModalProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionTextClassName?: string;
  onAction: () => void;
  cancelText?: string;
  onCancel?: () => void;
  className?: string;
  destructive?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const SuccessModal = ({
  title = "Hore selamat...",
  description = "Data berhasil ditambahkan",
  actionText = "Ok",
  actionTextClassName,
  onAction,
  className,
  destructive = false,
  open,
  onOpenChange,
}: SuccessModalProps) => (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogContent
      className={cn("p-8 ", className)}
      style={{ borderRadius: 8, zIndex: 9999 }}
    >
      <AlertDialogHeader className="gap-4 mb-4">
        <AlertDialogTitle className="text-center text-xl font-bold">
          {title}
        </AlertDialogTitle>
        <img src={SuccessImage} alt="Success Image" className="mx-auto mb-4" />
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
