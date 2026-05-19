import { Skeleton } from "@/components/ui/skeleton";

const TutorCardSkeleton = () => (
  <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
    <Skeleton className="h-48 w-full rounded-none" />
    <div className="flex flex-col gap-4 p-5">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-px w-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <div className="flex items-end justify-between pt-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="size-12 rounded-full" />
      </div>
    </div>
    <div className="border-t border-border p-4">
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
  </div>
);

export default TutorCardSkeleton;