import { Skeleton } from "@/components/ui/skeleton";

const TutorCardSkeleton = () => (
  <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
    {/* Image Area */}
    <div className="relative h-48 w-full">
      <Skeleton className="h-full w-full rounded-none" />
      {/* Subject Badge */}
      <div className="absolute top-3 left-3">
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      {/* Teaching Mode Badge */}
      <div className="absolute top-3 right-3">
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>

    {/* Card Body */}
    <div className="flex flex-1 flex-col gap-4 p-5">
      {/* Name & Location */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3.5 w-1/2" />
      </div>

      {/* Divider */}
      <Skeleton className="h-px w-full" />

      {/* Info Rows */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded" />
          <Skeleton className="h-3.5 w-24" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded" />
          <Skeleton className="h-3.5 w-32" />
        </div>
      </div>

      {/* Fee & Slot Indicator */}
      <div className="mt-auto flex items-end justify-between pt-2">
        <div className="flex items-baseline gap-1">
          <Skeleton className="h-7 w-14" />
          <Skeleton className="h-3.5 w-8" />
        </div>
        <Skeleton className="size-12 rounded-full" />
      </div>
    </div>

    {/* Card Footer */}
    <div className="border-t border-border p-4">
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
  </div>
);

export default TutorCardSkeleton;
