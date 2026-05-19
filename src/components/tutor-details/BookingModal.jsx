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
import { newBooking } from "@/lib/api-client";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import TokenCard from "@/components/booking/TokenCard";
import { format } from "date-fns";

const generateRef = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const code = Array.from({ length: 4 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length)),
  ).join("");
  return `MQ-2026-${code}`;
};

const BookingModal = ({
  open,
  onOpenChange,
  tutorId,
  tutorName,
  tutor,
  studentEmail = "maruf@example.com",
}) => {
  const { data: session } = authClient.useSession();

  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const today = format(new Date(), "MMM dd, yyyy");

    try {
      await newBooking({
        ...data,
        studentId: session?.user?.id,
        bookingDate: today,
        status: "active",
      });
      toast.success("Tutor booked successfully!");
      setBookingData({
        studentName: data.studentName,
        bookingRef: generateRef(),
      });
      setBooked(true);
    } catch (error) {
      toast.error("Failed to book tutor. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (value) => {
    if (!value) {
      // Reset state when dialog closes
      setBooked(false);
      setBookingData(null);
    }
    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={booked ? "sm:max-w-2xl" : "sm:max-w-md"}>
        {booked ? (
          /* Success — Token Card */
          <div className="flex flex-col items-center gap-6 py-4">
            <div className="text-center">
              <h2 className="font-heading text-2xl text-foreground">
                Booking Confirmed!
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Your session ticket is ready. Save it for your records.
              </p>
            </div>
            <TokenCard
              tutorName={tutorName}
              subject={tutor?.subject || ""}
              sessionDate={tutor?.startDate || ""}
              timeSlot={tutor?.timeSlot || tutor?.availableDays || ""}
              location={tutor?.teachingMode || tutor?.location || ""}
              studentName={bookingData?.studentName || ""}
              bookingRef={bookingData?.bookingRef || ""}
              status="CONFIRMED"
            />
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleClose(false)}
            >
              Close
            </Button>
          </div>
        ) : (
          /* Booking Form */
          <>
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
                  onClick={() => handleClose(false)}
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
