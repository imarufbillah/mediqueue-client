"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const BookingModal = ({
  open,
  onOpenChange,
  tutorId,
  tutorName,
  studentEmail = "maruf@example.com",
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // TODO: wire up API call
    console.log("Booking data:", data);

    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            Book a Session
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-2">
          {/* Student Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="student-name">Student Name</Label>
            <Input
              id="student-name"
              name="studentName"
              type="text"
              placeholder="Your full name"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="e.g. +880 1XXXXXXXXX"
              required
            />
          </div>

          {/* Tutor ID — auto-filled, read-only */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="tutor-id">Tutor ID</Label>
            <Input
              id="tutor-id"
              name="tutorId"
              type="text"
              value={tutorId}
              readOnly
              className="bg-muted text-muted-foreground"
            />
          </div>

          {/* Tutor Name — auto-filled, read-only */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="tutor-name">Tutor Name</Label>
            <Input
              id="tutor-name"
              name="tutorName"
              type="text"
              value={tutorName}
              readOnly
              className="bg-muted text-muted-foreground"
            />
          </div>

          {/* Student Email — auto-filled, read-only */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="student-email">Student Email</Label>
            <Input
              id="student-email"
              name="studentEmail"
              type="email"
              value={studentEmail}
              readOnly
              className="bg-muted text-muted-foreground"
            />
          </div>

          <DialogFooter className="gap-2 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Booking...
                </>
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
