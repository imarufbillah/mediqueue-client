import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ROW_COUNT = 5;

const MyTutorsLoading = () => {
  return (
    <div className="min-h-dvh bg-background pb-20 pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Page Header — real content, not skeleton */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl tracking-tight text-foreground sm:text-4xl">
              My Tutor Listings
            </h1>
            <p className="mt-1 text-base text-muted-foreground">
              Manage and update the tutors you&apos;ve added to MediQueue.
            </p>
          </div>
          <Skeleton className="h-10 w-36 rounded-lg" />
        </div>

        {/* Table Skeleton */}
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted hover:bg-muted">
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Tutor
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Availability
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Fee
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Slots
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Mode
                  </TableHead>
                  <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(ROW_COUNT)].map((_, i) => (
                  <TableRow key={i}>
                    {/* Tutor — avatar + name + subject badge */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Skeleton className="size-9 rounded-full" />
                        <div className="flex flex-col gap-1.5">
                          <Skeleton className="h-4 w-28" />
                          <Skeleton className="h-4 w-16 rounded-full" />
                        </div>
                      </div>
                    </TableCell>

                    {/* Availability */}
                    <TableCell>
                      <div className="flex flex-col gap-1.5">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </TableCell>

                    {/* Fee */}
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>

                    {/* Slots */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Skeleton className="size-2 rounded-full" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                    </TableCell>

                    {/* Mode */}
                    <TableCell>
                      <Skeleton className="h-5 w-14 rounded-full" />
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Skeleton className="size-8 rounded-md" />
                        <Skeleton className="size-8 rounded-md" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTutorsLoading;
