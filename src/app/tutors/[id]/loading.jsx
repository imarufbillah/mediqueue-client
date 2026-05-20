import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

const TutorDetailsLoading = () => {
  return (
    <div className="min-h-dvh bg-background pb-20 pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <ArrowLeft className="size-4" />
          <span>Back to Tutors</span>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left Column — Tutor Profile */}
          <div className="flex flex-col gap-8">
            {/* Header Card */}
            <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-start sm:gap-6">
              {/* Photo */}
              <Skeleton className="size-24 shrink-0 rounded-full" />

              {/* Info */}
              <div className="flex flex-col gap-3">
                <div>
                  <Skeleton className="h-8 w-48" />
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                </div>
                <Skeleton className="h-4 w-36" />
              </div>
            </div>

            {/* About Section */}
            <div className="flex flex-col gap-3">
              <Skeleton className="h-6 w-20" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>

            {/* Details Grid */}
            <div className="flex flex-col gap-3">
              <Skeleton className="h-6 w-20" />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-1.5 rounded-xl bg-muted p-4"
                  >
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column — Booking Panel */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6">
              <Skeleton className="h-6 w-36" />

              {/* Fee */}
              <div className="flex items-baseline gap-1">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-4 w-12" />
              </div>

              {/* Slot Ring */}
              <div className="flex justify-center py-2">
                <div className="flex flex-col items-center gap-2">
                  <Skeleton className="size-20 rounded-full" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-border" />

              {/* Session Start */}
              <Skeleton className="h-4 w-48" />

              {/* Button */}
              <Skeleton className="h-12 w-full rounded-lg" />

              {/* Reassurance */}
              <Skeleton className="mx-auto h-3 w-52" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetailsLoading;
