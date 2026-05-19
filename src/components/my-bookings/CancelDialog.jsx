"use client";

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
import { cancelBooking } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CancelDialog = ({ selectedBooking, open, onOpenChange }) => {
  const router = useRouter();
  const handleCancel = async () => {
    try {
      await cancelBooking(selectedBooking._id);
      toast.success("Booking cancelled successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Failed to cancel booking. Please try again.");
    }
    onOpenChange(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-heading">
            Cancel this session?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Your booking will be marked as cancelled. The tutor slot will not be
            automatically freed. Contact support if you need a refund.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep Booking</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCancel}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Yes, Cancel Session
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelDialog;
