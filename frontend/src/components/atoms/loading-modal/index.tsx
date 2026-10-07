import { AlertDialogContent } from "@/components/ui/alert-dialog";
import { AlertDialog } from "@radix-ui/react-alert-dialog";

interface LoadingModalProps {
  open?: boolean;
}

export const LoadingModal = ({ open }: LoadingModalProps) => (
  <AlertDialog open={open}>
    <AlertDialogContent>
      <div className="bg-white p-6 rounded-lg flex flex-col items-center">
        <div className="animate-spin border-4 border-t-4 border-gray-300 border-t-yellow-500 rounded-full w-12 h-12 mb-4"></div>
        <p className="text-gray-700 font-medium">Loading...</p>
      </div>
    </AlertDialogContent>
  </AlertDialog>
);
