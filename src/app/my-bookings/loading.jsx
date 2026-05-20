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

const MyBookingsLoading = () => {
  return (
    <div className="min-h-dvh bg-background pb-20 pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-4">
          <h1 className="font-heading text-3xl tracking-tight text-foreground sm:text-4xl">
            My Booked Sessions
          </h1>
          <p className="mt-1 text-base text-muted-foreground">
            Track and manage your upcoming and past learning sessions.
          </p>
        </div>

        {/* Summary Stats Skeleton */}
        <div className="mb-8 mt-4 flex flex-wrap items-center gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-18 rounded-full" />
          <Skeleton className="h-6 w-22 rounded-full" />
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
                    Student
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Booked On
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
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

                    {/* Student — name + email */}
                    <TableCell>
                      <div className="flex flex-col gap-1.5">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-36" />
                      </div>
                    </TableCell>

                    {/* Booked On */}
                    <TableCell>
                      <Skeleton className="h-4 w-28" />
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <Skeleton className="ml-auto h-8 w-16 rounded-md" />
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

export default MyBookingsLoading;
