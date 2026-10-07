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

interface ModalDetailDescriptionProps {
    triggerText?: string | React.ReactNode;
    title: string;
    subTitle: string;
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
    setDescription: (value: string) => void;
    onChangeItem: (value: string) => void;
}

export const ModalDetailDescription = ({
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
    setDescription,
    onChangeItem
}: ModalDetailDescriptionProps) => (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
        {triggerText && <AlertDialogTrigger>{triggerText}</AlertDialogTrigger>}
        <AlertDialogContent className={className}>
            <AlertDialogHeader>
                <AlertDialogTitle className="text-center">{title}</AlertDialogTitle>
            </AlertDialogHeader>

            <div>
                <div>
                    <textarea
                        placeholder="Please write here ..."
                        rows={3}
                        value={description}
                        onChange={(e) => {
                            const updatedDescription = e.target.value;
                            setDescription(updatedDescription);
                            onChangeItem(updatedDescription);
                        }}
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
                    />
                </div>
            </div>
            <hr className="border-t border-[#B7B7B780]" />
            <AlertDialogFooter>
                <Button
                    variant="ghost"
                    className="bg-gray-400 hover:bg-gray-500 text-white w-[186px] rounded-[10px]"
                    onClick={onCancel}
                >
                    {cancelText}
                </Button>
                <Button
                    onClick={onAction}
                    variant="ghost"
                    className="bg-red-500 hover:bg-red-600 text-white w-[186px] rounded-[10px]"
                >
                    {actionText}
                </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
);