"use client";

import { useState } from "react";
import Image from "next/image";
import { DollarSign, User, Loader2 } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

const SectionHeader = ({ title }) => (
  <div className="mb-6">
    <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
      {title}
    </h3>
    <div className="mt-2 h-px bg-border" />
  </div>
);

const EditDialog = ({ open, onOpenChange, tutor: selectedTutor }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(selectedTutor?.photoUrl || "");
  const [editStartDate, setEditStartDate] = useState(
    selectedTutor?.startDate ? new Date(selectedTutor.startDate) : null,
  );

  const handleEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Convert numeric fields
    data.availableDays = Number(data.availableDays);
    data.totalSlots = Number(data.totalSlots);
    data.hourlyFee = Number(data.hourlyFee);
    data.experience = Number(data.experience);

    // Send startDate as ISO string for database storage
    if (editStartDate) {
      data.startDate = new Date(editStartDate).toISOString();
    }

    try {
      await updateTutor(selectedTutor._id, data);
      toast.success("Tutor updated successfully!");
      onOpenChange(false);
      router.refresh();
    } catch (error) {
      toast.error("Failed to update tutor. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!isSubmitting) onOpenChange(value);
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl tracking-tight">
            Update Tutor
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Edit the details below to update this tutor listing.
          </p>
        </DialogHeader>

        {selectedTutor && (
          <form onSubmit={handleEdit} className="flex flex-col gap-10 pt-4">
            {/* Section 1 — Basic Information */}
            <section>
              <SectionHeader title="Basic Information" />
              <div className="flex flex-col gap-6">
                {/* Tutor Name */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-name">Tutor Name</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    type="text"
                    defaultValue={selectedTutor.name}
                    placeholder="Full name of the tutor"
                    required
                  />
                </div>

                {/* Photo URL with preview */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-photo">Photo URL</Label>
                  <div className="flex items-start gap-4">
                    <Input
                      id="edit-photo"
                      name="photoUrl"
                      type="url"
                      placeholder="https://example.com/photo.jpg"
                      defaultValue={selectedTutor.photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      className="flex-1"
                    />
                    <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted">
                      {photoUrl ? (
                        <Image
                          src={photoUrl}
                          alt="Tutor preview"
                          width={56}
                          height={56}
                          className="size-14 object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <User className="size-6 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-2">
                  <Label>Subject / Category</Label>
                  <Select name="subject" defaultValue={selectedTutor.subject}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a subject" />
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
              </div>
            </section>

            {/* Section 2 — Availability */}
            <section>
              <SectionHeader title="Availability" />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Available Days */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-days">Available Days</Label>
                  <Input
                    id="edit-days"
                    name="availableDays"
                    type="text"
                    defaultValue={selectedTutor.availableDays}
                    placeholder="e.g. Sun – Thu"
                    required
                  />
                </div>

                {/* Time Slot */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-time">Available Time Slot</Label>
                  <Input
                    id="edit-time"
                    name="timeSlot"
                    type="text"
                    defaultValue={selectedTutor.timeSlot}
                    placeholder="e.g. 5:00 PM – 8:00 PM"
                    required
                  />
                </div>

                {/* Start Date */}
                <div className="flex flex-col gap-2">
                  <Label>Session Start Date</Label>
                  <DatePicker
                    selected={editStartDate}
                    onChange={(date) => setEditStartDate(date)}
                    placeholderText="Pick a date"
                    dateFormat="MMM dd, yyyy"
                    minDate={new Date()}
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  />
                </div>

                {/* Total Slots */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-slots">Total Slots</Label>
                  <Input
                    id="edit-slots"
                    name="totalSlots"
                    type="number"
                    min="1"
                    defaultValue={selectedTutor.totalSlots}
                    placeholder="e.g. 10"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Section 3 — Professional Details */}
            <section>
              <SectionHeader title="Professional Details" />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Institution */}
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <Label htmlFor="edit-institution">Institution</Label>
                  <Input
                    id="edit-institution"
                    name="institution"
                    type="text"
                    defaultValue={selectedTutor.institution}
                    placeholder="University or school name"
                    required
                  />
                </div>

                {/* Experience */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-experience">Experience</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="edit-experience"
                      name="experience"
                      type="number"
                      min="0"
                      defaultValue={selectedTutor.experience}
                      placeholder="e.g. 3"
                      className="flex-1"
                      required
                    />
                    <span className="shrink-0 text-sm text-muted-foreground">
                      years
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-location">Location / Area</Label>
                  <Input
                    id="edit-location"
                    name="location"
                    type="text"
                    defaultValue={selectedTutor.location}
                    placeholder="e.g. Dhanmondi, Dhaka"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Section 4 — Session Info */}
            <section>
              <SectionHeader title="Session Info" />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Hourly Fee */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-fee">Hourly Fee</Label>
                  <div className="relative">
                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <DollarSign className="size-4" />
                    </div>
                    <Input
                      id="edit-fee"
                      name="hourlyFee"
                      type="number"
                      min="0"
                      defaultValue={selectedTutor.hourlyFee}
                      placeholder="0.00"
                      className="pl-9"
                      required
                    />
                  </div>
                </div>

                {/* Teaching Mode */}
                <div className="flex flex-col gap-2">
                  <Label>Teaching Mode</Label>
                  <Select
                    name="teachingMode"
                    defaultValue={selectedTutor.teachingMode}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select mode" />
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

                {/* Bio */}
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <Label htmlFor="edit-bio">Bio</Label>
                  <textarea
                    id="edit-bio"
                    name="bio"
                    rows={4}
                    defaultValue={selectedTutor.bio}
                    placeholder="Write a short bio about the tutor's experience, teaching style, and specializations..."
                    className="flex w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
            </section>

            {/* Submit Area */}
            <div className="border-t border-border pt-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  type="submit"
                  size="lg"
                  className="sm:flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="lg"
                  className="sm:flex-1"
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
