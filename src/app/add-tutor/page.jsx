"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, DollarSign, User } from "lucide-react";
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

const AddTutorPage = () => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [startDate, setStartDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log("Form Data:", data);
  };

  return (
    <div className="min-h-dvh bg-background pb-20 pt-28">
      <div className="mx-auto w-full max-w-180 px-4 sm:px-6">
        {/* Page Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>
          <h1 className="mb-2 font-heading text-3xl tracking-tight text-foreground sm:text-4xl">
            List a New Tutor
          </h1>
          <p className="text-base text-muted-foreground">
            Fill in the details below to create a tutor listing on MediQueue.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-12">
          {/* Section 1 — Basic Information */}
          <section>
            <SectionHeader title="Basic Information" />
            <div className="flex flex-col gap-6">
              {/* Tutor Name */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="tutor-name">Tutor Name</Label>
                <Input
                  id="tutor-name"
                  name="name"
                  type="text"
                  placeholder="Full name of the tutor"
                />
              </div>

              {/* Photo URL with preview */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="photo-url">Photo URL</Label>
                <div className="flex items-start gap-4">
                  <Input
                    id="photo-url"
                    name="photoUrl"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={photoUrl}
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
                <Select name="subject">
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
                <Label htmlFor="available-days">Available Days</Label>
                <Input
                  id="available-days"
                  name="availableDays"
                  type="text"
                  placeholder="e.g. Sun – Thu"
                />
              </div>

              {/* Time Slot */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="time-slot">Available Time Slot</Label>
                <Input
                  id="time-slot"
                  name="timeSlot"
                  type="text"
                  placeholder="e.g. 5:00 PM – 8:00 PM"
                />
              </div>

              {/* Session Start Date */}
              <div className="flex flex-col gap-2">
                <Label>Session Start Date</Label>
                <DatePicker
                  selected={startDate}
                  name="startDate"
                  onChange={(date) => setStartDate(date)}
                  placeholderText="Pick a date"
                  dateFormat="MMM dd, yyyy"
                  minDate={new Date()}
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </div>

              {/* Total Slots */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="total-slots">Total Slots</Label>
                <Input
                  id="total-slots"
                  name="totalSlots"
                  type="number"
                  min="1"
                  placeholder="e.g. 10"
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
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  name="institution"
                  type="text"
                  placeholder="University or school name"
                />
              </div>

              {/* Experience */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="experience">Experience</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="experience"
                    name="experience"
                    type="number"
                    min="0"
                    placeholder="e.g. 3"
                    className="flex-1"
                  />
                  <span className="shrink-0 text-sm text-muted-foreground">
                    years
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="location">Location / Area</Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="e.g. Dhanmondi, Dhaka"
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
                <Label htmlFor="hourly-fee">Hourly Fee</Label>
                <div className="relative">
                  <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <DollarSign className="size-4" />
                  </div>
                  <Input
                    id="hourly-fee"
                    name="hourlyFee"
                    type="number"
                    min="0"
                    placeholder="0.00"
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Teaching Mode */}
              <div className="flex flex-col gap-2">
                <Label>Teaching Mode</Label>
                <Select name="teachingMode">
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
            </div>
          </section>

          {/* Submit Area */}
          <div className="border-t border-border pt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button type="submit" size="lg" className="sm:flex-1">
                Create Listing
              </Button>
              <Button variant="ghost" size="lg" asChild className="sm:flex-1">
                <Link href="/">Cancel</Link>
              </Button>
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Your listing will be visible to all students immediately after
              submission.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTutorPage;
