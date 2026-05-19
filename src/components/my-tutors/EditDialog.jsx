"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { updateTutor } from "@/lib/api-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Bangla",
  "History",
  "Computer Science",
  "Other",
];

const TEACHING_MODES = ["Online", "Offline", "Both"];

const EditDialog = ({ open, onOpenChange, tutor: selectedTutor }) => {
  const router = useRouter();
  const handleEdit = async (e) => {
    e.preventDefault();
    onOpenChange(false);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await updateTutor(selectedTutor._id, data);
      toast.success("Tutor updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update tutor. Please try again.");
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            Update Tutor
          </DialogTitle>
        </DialogHeader>
        {selectedTutor && (
          <form onSubmit={handleEdit} className="flex flex-col gap-5 pt-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-name">Tutor Name</Label>
              <Input
                id="edit-name"
                name="name"
                defaultValue={selectedTutor.name}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Subject</Label>
              <Select name="subject" defaultValue={selectedTutor.subject}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUBJECTS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-days">Available Days</Label>
                <Input
                  id="edit-days"
                  name="availableDays"
                  defaultValue={selectedTutor.availableDays}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-time">Time Slot</Label>
                <Input
                  id="edit-time"
                  name="timeSlot"
                  defaultValue={selectedTutor.timeSlot}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-fee">Hourly Fee ($)</Label>
                <Input
                  id="edit-fee"
                  name="hourlyFee"
                  type="number"
                  defaultValue={selectedTutor.hourlyFee}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-slots">Total Slots</Label>
                <Input
                  id="edit-slots"
                  name="totalSlots"
                  type="number"
                  defaultValue={selectedTutor.totalSlots}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Teaching Mode</Label>
              <Select
                name="teachingMode"
                defaultValue={selectedTutor.teachingMode}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TEACHING_MODES.map((mode) => (
                    <SelectItem key={mode} value={mode}>
                      {mode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter className="gap-2 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
