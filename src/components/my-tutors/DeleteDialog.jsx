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
import { deleteTutor } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DeleteDialog = ({ open, onOpenChange, tutor: selectedTutor }) => {
  const router = useRouter();

  const handleDelete = async () => {
    onOpenChange(false);

    try {
      await deleteTutor(selectedTutor._id);
      toast.success("Tutor deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete tutor. Please try again.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-heading">
            Delete this listing?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove the tutor listing. Students with
            existing bookings will be affected. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep Listing</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
