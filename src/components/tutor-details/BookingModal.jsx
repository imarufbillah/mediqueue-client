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
import { useRouter } from "next/navigation";

const generateRef = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const code = Array.from({ length: 4 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length)),
  ).join("");
  return `MQ-2026-${code}`;
};

const PHONE_REGEX = /^\+?[\d\s\-()]{7,15}$/;

const BookingModal = ({ open, onOpenChange, tutor }) => {
  const router = useRouter();
  const {
    name: tutorName,
    photoUrl: tutorImage,
    subject,
    _id: tutorId,
  } = tutor;
  const { data: session } = authClient.useSession();
  const { email: studentEmail, id: studentId } = session?.user || {};

  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const newErrors = {};

    if (!data.studentName?.trim()) {
      newErrors.studentName = "Student name is required";
    } else if (data.studentName.trim().length < 3) {
      newErrors.studentName = "Name must be at least 3 characters";
    }

    if (!data.phone?.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!PHONE_REGEX.test(data.phone.trim())) {
      newErrors.phone = "Enter a valid phone number";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Run validation
    const validationErrors = validate(data);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);

    const studentName = data.studentName.trim();

    const bookingPayload = {
      studentId,
      tutor: {
        name: tutorName,
        tutorId,
        photo: tutorImage,
        subject,
      },
      student: {
        name: studentName,
        phone: data.phone.trim(),
        email: studentEmail,
      },
      bookedOn: new Date().toISOString(),
      status: "active",
    };

    try {
      await newBooking(bookingPayload);
      toast.success("Tutor booked successfully!");
      router.refresh();
      setBookingData({
        studentName,
        bookingRef: generateRef(),
      });
      setBooked(true);
      setErrors({});
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
      setErrors({});
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
                />
                {errors.studentName && (
                  <p className="text-sm text-destructive">
                    {errors.studentName}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="e.g. +8801XXXXXXXXX"
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone}</p>
                )}
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
