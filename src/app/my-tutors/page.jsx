"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, ClipboardList } from "lucide-react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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

const FAKE_TUTORS = [
  {
    id: "1",
    name: "Dr. Sarah Ahmed",
    photo: "https://i.pravatar.cc/400?img=47",
    subject: "Mathematics",
    availableDays: "Sun – Thu",
    timeSlot: "5:00 PM – 8:00 PM",
    hourlyFee: 25,
    totalSlots: 10,
    slotsRemaining: 7,
    teachingMode: "Online",
  },
  {
    id: "2",
    name: "Prof. Karim Hossain",
    photo: "https://i.pravatar.cc/400?img=12",
    subject: "Physics",
    availableDays: "Mon – Fri",
    timeSlot: "4:00 PM – 7:00 PM",
    hourlyFee: 30,
    totalSlots: 8,
    slotsRemaining: 3,
    teachingMode: "Both",
  },
  {
    id: "3",
    name: "Nadia Rahman",
    photo: "https://i.pravatar.cc/400?img=32",
    subject: "Chemistry",
    availableDays: "Sat – Wed",
    timeSlot: "6:00 PM – 9:00 PM",
    hourlyFee: 20,
    totalSlots: 12,
    slotsRemaining: 0,
    teachingMode: "Online",
  },
  {
    id: "4",
    name: "Tanvir Islam",
    photo: "https://i.pravatar.cc/400?img=53",
    subject: "Computer Science",
    availableDays: "Sun – Thu",
    timeSlot: "8:00 PM – 10:00 PM",
    hourlyFee: 35,
    totalSlots: 6,
    slotsRemaining: 6,
    teachingMode: "Offline",
  },
];

const SUBJECTS = [
  "Mathematics", "Physics", "Chemistry", "Biology",
  "English", "Bangla", "History", "Computer Science", "Other",
];

const TEACHING_MODES = ["Online", "Offline", "Both"];

const getSlotColor = (remaining, total) => {
  if (remaining === 0) return "bg-destructive";
  if (remaining / total <= 0.5) return "bg-yellow-500";
  return "bg-primary";
};

const getModeVariant = (mode) => {
  if (mode === "Online") return "bg-primary/10 text-primary";
  if (mode === "Offline") return "bg-secondary text-secondary-foreground";
  return "bg-accent text-accent-foreground";
};

const MyTutorsPage = () => {
  const [tutors] = useState(FAKE_TUTORS);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);

  const showEmpty = false; // Toggle to true to preview empty state

  const handleEdit = (tutor) => {
    setSelectedTutor(tutor);
    setEditOpen(true);
  };

  const handleDelete = (tutor) => {
    setSelectedTutor(tutor);
    setDeleteOpen(true);
  };

  return (
    <div className="min-h-dvh bg-background pb-20 pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl tracking-tight text-foreground sm:text-4xl">
              My Tutor Listings
            </h1>
            <p className="mt-1 text-base text-muted-foreground">
              Manage and update the tutors you&apos;ve added to MediQueue.
            </p>
          </div>
          <Button asChild>
            <Link href="/add-tutor">
              <Plus className="size-4" />
              Add New Tutor
            </Link>
          </Button>
        </div>

        {/* Empty State */}
        {showEmpty ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-muted">
              <ClipboardList className="size-10 text-muted-foreground" />
            </div>
            <h2 className="mb-2 font-heading text-xl text-foreground">
              No tutors listed yet
            </h2>
            <p className="mb-6 max-w-sm text-center text-sm text-muted-foreground">
              You haven&apos;t added any tutors. Start by creating your first
              listing.
            </p>
            <Button asChild>
              <Link href="/add-tutor">
                <Plus className="size-4" />
                Add Your First Tutor
              </Link>
            </Button>
          </div>
        ) : (
          /* Table */
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted hover:bg-muted">
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Tutor
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Availability
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Fee
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Slots
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Mode
                    </TableHead>
                    <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tutors.map((tutor) => (
                    <TableRow
                      key={tutor.id}
                      className="transition-colors hover:bg-accent/50"
                    >
                      {/* Tutor */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Image
                            src={tutor.photo}
                            alt={tutor.name}
                            width={36}
                            height={36}
                            className="size-9 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {tutor.name}
                            </p>
                            <span className="mt-0.5 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[0.65rem] font-medium text-primary">
                              {tutor.subject}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Availability */}
                      <TableCell>
                        <div className="flex flex-col text-sm text-muted-foreground">
                          <span>{tutor.availableDays}</span>
                          <span className="text-xs">{tutor.timeSlot}</span>
                        </div>
                      </TableCell>

                      {/* Fee */}
                      <TableCell>
                        <span className="font-mono text-sm font-medium text-foreground">
                          ${tutor.hourlyFee} / hr
                        </span>
                      </TableCell>

                      {/* Slots */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span
                            className={`size-2 rounded-full ${getSlotColor(
                              tutor.slotsRemaining,
                              tutor.totalSlots
                            )}`}
                          />
                          <span className="text-sm text-muted-foreground">
                            {tutor.slotsRemaining} / {tutor.totalSlots}
                          </span>
                        </div>
                      </TableCell>

                      {/* Mode */}
                      <TableCell>
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getModeVariant(
                            tutor.teachingMode
                          )}`}
                        >
                          {tutor.teachingMode}
                        </span>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleEdit(tutor)}
                            aria-label="Edit tutor"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Pencil className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleDelete(tutor)}
                            aria-label="Delete tutor"
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-heading text-xl">
                Update Tutor
              </DialogTitle>
            </DialogHeader>
            {selectedTutor && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setEditOpen(false);
                }}
                className="flex flex-col gap-5 pt-2"
              >
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-name">Tutor Name</Label>
                  <Input
                    id="edit-name"
                    defaultValue={selectedTutor.name}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Subject</Label>
                  <Select defaultValue={selectedTutor.subject}>
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
                      defaultValue={selectedTutor.availableDays}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="edit-time">Time Slot</Label>
                    <Input
                      id="edit-time"
                      defaultValue={selectedTutor.timeSlot}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="edit-fee">Hourly Fee ($)</Label>
                    <Input
                      id="edit-fee"
                      type="number"
                      defaultValue={selectedTutor.hourlyFee}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="edit-slots">Total Slots</Label>
                    <Input
                      id="edit-slots"
                      type="number"
                      defaultValue={selectedTutor.totalSlots}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Teaching Mode</Label>
                  <Select defaultValue={selectedTutor.teachingMode}>
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
                    onClick={() => setEditOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
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
                onClick={() => setDeleteOpen(false)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default MyTutorsPage;
