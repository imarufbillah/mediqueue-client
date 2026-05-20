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
} from "lucide-react";
import BookingPanel from "@/components/tutor-details/BookingPanel";
import { getTutorById } from "@/lib/data";

export const generateMetadata = async ({ params }) => {
  const { id: tutorId } = await params;
  const tutor = await getTutorById(tutorId);
  return {
    title: tutor ? `${tutor.name} — ${tutor.subject}` : "Tutor Details",
  };
};

const TutorDetailsPage = async ({ params }) => {
  const { id: tutorId } = await params;
  const tutor = await getTutorById(tutorId);

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
                  src={tutor.photoUrl}
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
          <BookingPanel tutor={tutor} />
        </div>
      </div>
    </div>
  );
};

export default TutorDetailsPage;
