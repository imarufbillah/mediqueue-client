import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-lg bg-muted/80 dark:bg-muted/60",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
