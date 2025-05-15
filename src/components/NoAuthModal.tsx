import { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface NoAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NoAuthModal: React.FC<NoAuthModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="border rounded-lg p-4">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-center">
            Oops! You need to log in!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center mt-2 text-sm">
            Please log in to continue accessing this feature.
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NoAuthModal;
