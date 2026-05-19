"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Clock, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

// Slot indicator ring component
const SlotIndicator = ({ slots, totalSlots }) => {
  const percentage = totalSlots > 0 ? (slots / totalSlots) * 100 : 0;
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (slots === 0) return "text-destructive";
    if (percentage <= 50) return "text-yellow-500";
    return "text-primary";
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative flex size-12 items-center justify-center">
        <svg className="size-12 -rotate-90" viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-muted"
          />
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-500 ${getColor()}`}
          />
        </svg>
        <span className={`absolute text-sm font-semibold ${getColor()}`}>
          {slots}
        </span>
      </div>
      <span className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
        slots left
      </span>
    </div>
  );
};

const TutorCard = ({
  tutor = {
    name: "Dr. Sarah Ahmed",
    photo: "https://i.pravatar.cc/400?img=47",
    subject: "Mathematics",
    teachingMode: "Online",
    location: "Dhaka, Bangladesh",
    hourlyFee: 25,
    availableDays: "Sun–Thu, 5 PM–8 PM",
    startDate: "Jun 15, 2025",
    totalSlots: 10,
    slotsRemaining: 7,
  },
}) => {
  const {
    name,
    photo,
    subject,
    teachingMode,
    location,
    hourlyFee,
    availableDays,
    startDate,
    totalSlots,
    slotsRemaining,
  } = tutor;

  const isFull = slotsRemaining === 0;
  const isFuture = new Date(startDate) > new Date();

  const getButtonText = () => {
    if (isFull) return "Fully Booked";
    if (isFuture) return `Opens ${startDate}`;
    return "Book Session";
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg"
    >
      {/* Image Area */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={photo}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-card to-transparent" />

        {/* Subject Badge — top left */}
        <span className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          {subject}
        </span>

        {/* Teaching Mode Badge — top right */}
        <span className="absolute top-3 right-3 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          {teachingMode}
        </span>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Name & Location */}
        <div>
          <h3 className="font-heading text-lg text-foreground">{name}</h3>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-3.5" />
            <span>{location}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Info Rows */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="size-4 shrink-0 text-primary" />
            <span>{availableDays}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="size-4 shrink-0 text-primary" />
            <span>Starts {startDate}</span>
          </div>
        </div>

        {/* Fee & Slot Indicator */}
        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-foreground">
              ${hourlyFee}
            </span>
            <span className="text-sm text-muted-foreground">/ hr</span>
          </div>
          <SlotIndicator slots={slotsRemaining} totalSlots={totalSlots} />
        </div>
      </div>

      {/* Card Footer */}
      <div className="border-t border-border p-4">
        <Button
          size="lg"
          className="w-full"
          disabled={isFull}
        >
          {getButtonText()}
        </Button>
      </div>
    </motion.div>
  );
};

export default TutorCard;
