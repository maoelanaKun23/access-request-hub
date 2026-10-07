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
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ModalRejectProps {
  triggerText?: string | React.ReactNode;
  title: string;
  subTitle: string;
  description?: string;
  actionText: string;
  actionTextClassName?: string;
  onAction: (description: string) => void;
  cancelText?: string;
  onCancel?: () => void;
  className?: string;
  destructive?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ModalReject = ({
  triggerText,
  title,
  subTitle,
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
}: ModalRejectProps) => {
  const [localDescription, setLocalDescription] = useState("");

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {triggerText && <AlertDialogTrigger>{triggerText}</AlertDialogTrigger>}
      <AlertDialogContent className={className} style={{ borderRadius: 8 }}>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          <div>
            <label className="block font-inter font-bold text-[22px] leading-[1] tracking-normal text-gray-700">
              {subTitle}
            </label>
            <textarea
              placeholder="Please write reason here ..."
              rows={3}
              className="
                        mt-3
                        w-full
                        border
                        border-[#B7B7B780]
                        rounded-[10px]
                        px-3
                        py-2
                        font-inter
                        text-sm
                        outline-none
                        focus:ring-0
                        focus:border-[#B7B7B780]
                    "
              value={description}
              onChange={(e) => {
                setLocalDescription(e.target.value);
              }}
            />
          </div>
        </div>
        <hr className="border-t border-[#B7B7B780]" />
        <AlertDialogFooter>
          <Button
            variant="ghost"
            className="w-[186px] rounded-[10px]"
            onClick={onCancel}
          >
            {cancelText}
          </Button>
          <Button
            onClick={() => onAction(localDescription)}
            variant="ghost"
            className={`${actionTextClassName} text-white hover:text-white w-[186px] rounded-[10px]`}
          >
            {actionText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
