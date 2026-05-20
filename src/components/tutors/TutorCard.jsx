"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Clock, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import CardSlotIndicator from "./CardSlotIndicator";
import { formatDate } from "@/lib/utils";

const TutorCard = ({ tutor }) => {
  const {
    _id,
    name,
    photoUrl: photo,
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
    if (isFuture) return `Opens ${formatDate(startDate)}`;
    return "Book Session";
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg"
    >
      {/* Image Area */}
      <div className="relative h-64 w-full overflow-hidden">
        {photo ? (
          <Image
            src={photo}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-3xl font-heading text-muted-foreground">
              {name?.charAt(0) || "T"}
            </span>
          </div>
        )}

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
            <span>{availableDays} Available Days</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="size-4 shrink-0 text-primary" />
            <span>Starts {formatDate(startDate)}</span>
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
          <CardSlotIndicator slots={slotsRemaining} totalSlots={totalSlots} />
        </div>
      </div>

      {/* Card Footer */}
      <div className="border-t border-border p-4">
        <Link href={`/tutors/${_id}`}>
          <Button size="lg" className="w-full cursor-pointer" disabled={isFull}>
            {getButtonText()}
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default TutorCard;
