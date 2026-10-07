import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CustomInput } from "../custom-input";

interface CustomModalProps {
  triggerText?: string | React.ReactNode;
  title: string;
  description?: string;
  actionText: string;
  actionTextClassName?: string;
  onAction: () => void;
  cancelText?: string;
  onCancel?: () => void;
  className?: string;
  destructive?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  item: {
    recommendationID: string;
    name: string;
    projectId: string;
    file: File | string;
  };
  setItem: (item: {
    recommendationID: string;
    name: string;
    projectId: string;
    file: File | string;
  }) => void;
}

export const CustomAddFile = ({
  triggerText,
  title,
  description,
  actionText,
  actionTextClassName,
  onAction,
  cancelText = "Cancel",
  onCancel,
  className,
  destructive = false,
  open,
  onOpenChange,
  item,
  setItem,
}: CustomModalProps) => {
  const truncateFileName = (file: File, maxLength: number = 100): File => {
    if (file.name.length <= maxLength) return file;

    const extension = file.name.split(".").pop();
    const nameWithoutExt = file.name.slice(0, file.name.lastIndexOf("."));

    const truncatedName =
      nameWithoutExt.slice(0, maxLength - (extension?.length || 0) - 1) +
      (extension ? `.${extension}` : "");

    return new File([file], truncatedName, {
      type: file.type,
      lastModified: file.lastModified,
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {triggerText && <AlertDialogTrigger>{triggerText}</AlertDialogTrigger>}
      <AlertDialogContent
        className={className}
        style={{ borderRadius: "0.375rem" }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <p className="text-sm">Nama File</p>
        <CustomInput
          value={item.name}
          onChange={(e) =>
            setItem({
              ...item,
              name: e.target.value,
            })
          }
          placeholder="Enter file name"
          className="w-full p-2 border border-gray-300 rounded-md"
          style={{ borderRadius: "0.375rem" }}
        />

        <p className="text-sm ">Pilih Dokumen</p>
        <CustomInput
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const originalFile = e.target.files[0];

              const truncatedFile = truncateFileName(originalFile, 20);

              setItem({
                ...item,
                file: truncatedFile,
              });
            } else {
              setItem({
                ...item,
                file: item.file,
              });
            }
          }}
          placeholder="Enter file"
          className="w-full p-2 border border-gray-300 rounded-md"
          style={{ borderRadius: "0.375rem" }}
        />

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            className={
              destructive
                ? `bg-destructive text-destructive-foreground hover:bg-destructive/90  ${actionTextClassName}`
                : ""
            }
            style={{ borderRadius: "0.375rem" }}
            onClick={() => onAction()}
          >
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
