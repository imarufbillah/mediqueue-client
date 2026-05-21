import { Skeleton } from "@/components/ui/skeleton";

const AvailableTutorsSkeleton = () => {
  return (
    <section className="bg-muted/50 py-20 sm:py-28">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Section Header Skeleton */}
        <div className="mb-14 flex flex-col items-center text-center">
          <Skeleton className="mb-3 h-4 w-28" />
          <Skeleton className="mb-4 h-10 w-72 sm:w-96" />
          <Skeleton className="h-5 w-64 sm:w-80" />
        </div>

        {/* Cards Grid Skeleton */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5"
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-3">
                <Skeleton className="size-12 rounded-full" />
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>

              {/* Subject badge */}
              <Skeleton className="h-6 w-24 rounded-full" />

              {/* Info rows */}
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-3/4" />
                <Skeleton className="h-3.5 w-1/2" />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-9 w-24 rounded-lg" />
              </div>
            </div>
          ))}
        </div>

        {/* View All Button Skeleton */}
        <div className="mt-14 flex justify-center">
          <Skeleton className="h-11 w-36 rounded-lg" />
        </div>
      </div>
    </section>
  );
};

export default AvailableTutorsSkeleton;
