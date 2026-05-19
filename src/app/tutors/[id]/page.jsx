import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  Star,
  Clock,
  CalendarDays,
  Building2,
  Briefcase,
  Monitor,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SlotIndicator from "@/components/tutor-details/SlotIndicator";
import { getTutorById } from "@/lib/data";

const TutorDetailsPage = async ({ params }) => {
  const { id: tutorId } = await params;
  console.log(tutorId);
  const tutor = await getTutorById(tutorId);
  const isFull = tutor.slotsRemaining === 0;
  const isFuture = new Date(tutor.startDate) > new Date();

  const infoItems = [
    { icon: Building2, label: "Institution", value: tutor.institution },
    {
      icon: Briefcase,
      label: "Experience",
      value: `${tutor.experience} years`,
    },
    { icon: Clock, label: "Available Days", value: tutor.availableDays },
    { icon: Clock, label: "Time Slot", value: tutor.timeSlot },
    { icon: Monitor, label: "Teaching Mode", value: tutor.teachingMode },
    { icon: CalendarDays, label: "Session Start", value: tutor.startDate },
  ];

  return (
    <div className="min-h-dvh bg-background pb-20 pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/tutors"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Tutors
        </Link>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left Column — Tutor Profile */}
          <div className="flex flex-col gap-8">
            {/* Header Card */}
            <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-start sm:gap-6">
              {/* Photo */}
              <div className="shrink-0">
                <Image
                  src={tutor.photo}
                  alt={tutor.name}
                  width={96}
                  height={96}
                  className="size-24 rounded-full object-cover ring-2 ring-primary ring-offset-2 ring-offset-card"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-3">
                <div>
                  <h1 className="font-heading text-2xl text-foreground sm:text-3xl">
                    {tutor.name}
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      {tutor.subject}
                    </span>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                      {tutor.teachingMode}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" />
                  <span>{tutor.location}</span>
                </div>

                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${
                        i < Math.floor(tutor.rating)
                          ? "fill-primary text-primary"
                          : "text-muted"
                      }`}
                    />
                  ))}
                  <span className="ml-1.5 text-sm font-medium text-foreground">
                    {tutor.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="flex flex-col gap-3">
              <h2 className="font-heading text-xl text-foreground">About</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                {tutor.bio}
              </p>
            </div>

            {/* Details Grid */}
            <div className="flex flex-col gap-3">
              <h2 className="font-heading text-xl text-foreground">Details</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {infoItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col gap-1.5 rounded-xl bg-muted p-4"
                  >
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <item.icon className="size-4" />
                      <span>{item.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column — Booking Panel */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6">
              <h3 className="font-heading text-xl text-foreground">
                Book a Session
              </h3>

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
                <span>Sessions start {tutor.startDate}</span>
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
                    <span>Booking opens {tutor.startDate}</span>
                  </div>
                  <Button size="lg" className="w-full" disabled>
                    Opens {tutor.startDate}
                  </Button>
                </div>
              ) : (
                <Button size="lg" className="w-full">
                  Book This Session
                </Button>
              )}

              {/* Reassurance */}
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="size-3.5" />
                <span>Free cancellation before session starts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetailsPage;
