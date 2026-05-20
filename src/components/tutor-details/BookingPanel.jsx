"use client";

import { useState } from "react";
import { CalendarDays, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import SlotIndicator from "./SlotIndicator";
import BookingModal from "./BookingModal";
import { formatDate } from "@/lib/utils";

const BookingPanel = ({ tutor }) => {
  const [bookingOpen, setBookingOpen] = useState(false);

  const slotsRemaining = Number(tutor.slotsRemaining);
  const isFull = slotsRemaining === 0;
  const isFuture = new Date(tutor.startDate) > new Date();

  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6">
        <h3 className="font-heading text-xl text-foreground">Book a Session</h3>

        {/* Fee */}
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-foreground">
            ${tutor.hourlyFee}
          </span>
          <span className="text-base text-muted-foreground">/ hour</span>
        </div>

        {/* Slot Ring */}
        <div className="flex justify-center py-2">
          <SlotIndicator
            slots={tutor.slotsRemaining}
            totalSlots={tutor.totalSlots}
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Session Start */}
        <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <CalendarDays className="size-4 text-primary" />
          <span>Sessions start {formatDate(tutor.startDate)}</span>
        </div>

        {/* Action */}
        {isFull ? (
          <div className="flex flex-col items-center gap-2">
            <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">
              Fully Booked
            </span>
            <Button size="lg" className="w-full" disabled>
              No Slots Available
            </Button>
          </div>
        ) : isFuture ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
              <CalendarDays className="size-4 text-primary" />
              <span>Booking opens {formatDate(tutor.startDate)}</span>
            </div>
            <Button size="lg" className="w-full" disabled>
              Opens {formatDate(tutor.startDate)}
            </Button>
          </div>
        ) : (
          <Button
            size="lg"
            className="w-full"
            onClick={() => setBookingOpen(true)}
          >
            Book This Session
          </Button>
        )}

        {/* Reassurance */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Shield className="size-3.5" />
          <span>Free cancellation before session starts</span>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        tutor={tutor}
      />
    </div>
  );
};

export default BookingPanel;
