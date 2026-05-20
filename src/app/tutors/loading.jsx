import { Skeleton } from "@/components/ui/skeleton";
import TutorCardSkeleton from "@/components/tutors/TutorCardSkeleton";

const TutorsLoading = () => {
  return (
    <div className="min-h-dvh bg-background pt-20">
      {/* Header / Search Zone Skeleton */}
      <div className="border-b border-border bg-muted/50 pb-8 pt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Title Row */}
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-9 w-64 sm:w-80" />
              <Skeleton className="mt-1 h-4 w-72 sm:w-96" />
            </div>
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Search & Filter Bar Skeleton */}
          <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
              {/* Search Input */}
              <Skeleton className="h-12 flex-1 rounded-xl lg:max-w-[50%]" />
              {/* Date Range */}
              <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:gap-3">
                <Skeleton className="h-10 flex-1 rounded-lg" />
                <Skeleton className="h-10 flex-1 rounded-lg" />
              </div>
              {/* Reset Button */}
              <Skeleton className="h-10 w-24 shrink-0 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Results Area Skeleton */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Results Header */}
        <div className="mb-6 flex items-center justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-8 w-44 rounded-lg" />
        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <TutorCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorsLoading;
