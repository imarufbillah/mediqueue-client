"use client";

import { CalendarDays, Clock, MapPin, User } from "lucide-react";

const TokenCard = ({
  tutorName = "Dr. Sarah Ahmed",
  subject = "Mathematics",
  sessionDate = "Jun 15, 2025",
  timeSlot = "5:00 PM – 8:00 PM",
  location = "Online",
  studentName = "Maruf Billah",
  bookingRef = "MQ-2025-7X9K",
  status = "CONFIRMED",
}) => {
  return (
    <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border-2 border-primary bg-linear-to-br from-card to-muted">
      {/* Shimmer overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 animate-[shimmer_3s_ease-in-out_infinite] bg-linear-to-r from-transparent via-primary/5 to-transparent" />

      {/* Left notch */}
      <div className="absolute -left-3 top-1/2 z-20 size-6 -translate-y-1/2 rounded-full bg-background" />
      {/* Right notch */}
      <div className="absolute -right-3 top-1/2 z-20 size-6 -translate-y-1/2 rounded-full bg-background" />

      {/* Content */}
      <div className="relative flex flex-col sm:flex-row">
        {/* Left Section */}
        <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0.5">
              <span className="text-sm font-heading text-foreground">Medi</span>
              <span className="text-sm font-sans font-bold text-primary">Queue</span>
            </div>
            <span className="font-mono text-[0.6rem] font-medium uppercase tracking-widest text-primary">
              Session Ticket
            </span>
          </div>

          {/* Tutor Info */}
          <div>
            <h3 className="font-heading text-xl text-foreground sm:text-2xl">
              {tutorName}
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">{subject}</p>
          </div>

          {/* Info Row */}
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <CalendarDays className="size-3.5 text-primary" />
              <span>{sessionDate}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="size-3.5 text-primary" />
              <span>{timeSlot}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5 text-primary" />
              <span>{location}</span>
            </div>
          </div>

          {/* Student */}
          <div className="flex items-center gap-1.5 border-t border-dashed border-border pt-4 text-sm text-foreground">
            <User className="size-3.5 text-primary" />
            <span className="font-medium">{studentName}</span>
          </div>
        </div>

        {/* Dashed Divider */}
        <div className="relative hidden sm:block">
          {/* Top notch */}
          <div className="absolute -top-3 left-1/2 z-20 size-6 -translate-x-1/2 rounded-full bg-background" />
          {/* Bottom notch */}
          <div className="absolute -bottom-3 left-1/2 z-20 size-6 -translate-x-1/2 rounded-full bg-background" />
          <div className="h-full w-px border-l-2 border-dashed border-border" />
        </div>

        {/* Mobile horizontal divider */}
        <div className="relative block sm:hidden">
          <div className="absolute -left-3 top-1/2 z-20 size-6 -translate-y-1/2 rounded-full bg-background" />
          <div className="absolute -right-3 top-1/2 z-20 size-6 -translate-y-1/2 rounded-full bg-background" />
          <div className="w-full border-t-2 border-dashed border-border" />
        </div>

        {/* Right Section */}
        <div className="flex w-full flex-col items-center justify-between gap-4 p-6 sm:w-[35%] sm:p-8">
          {/* Booking Ref */}
          <div className="flex flex-col items-center gap-1">
            <span className="font-mono text-[0.6rem] font-medium uppercase tracking-widest text-muted-foreground">
              Booking Ref
            </span>
            <span className="font-mono text-lg font-bold text-primary sm:text-xl">
              {bookingRef}
            </span>
          </div>

          {/* QR Code Placeholder */}
          <div className="grid grid-cols-6 gap-1">
            {[...Array(36)].map((_, i) => (
              <div
                key={i}
                className={`size-2.5 rounded-sm ${
                  [0, 1, 4, 5, 6, 7, 10, 11, 12, 17, 18, 23, 24, 25, 28, 29, 30, 31, 34, 35].includes(i)
                    ? "bg-primary"
                    : "bg-primary/20"
                }`}
              />
            ))}
          </div>

          {/* Status Badge */}
          <span className="inline-flex rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
