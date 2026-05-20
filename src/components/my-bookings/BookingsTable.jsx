"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";

const BookingsTable = ({ bookings, onCancel }) => {
  const totalCount = bookings.length;
  const activeCount = bookings.filter((b) => b.status === "active").length;
  const cancelledCount = bookings.filter(
    (b) => b.status === "cancelled",
  ).length;

  return (
    <>
      {/* Summary Stats */}
      <div className="mb-8 mt-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          {totalCount} Total
        </span>
        <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
          {activeCount} Active
        </span>
        <span className="rounded-full border border-destructive/20 bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">
          {cancelledCount} Cancelled
        </span>
      </div>

      {/* Table */}
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
              {bookings.map((booking) => (
                <TableRow
                  key={booking._id}
                  className={`transition-colors hover:bg-accent/50 ${
                    booking.status === "cancelled" ? "opacity-60" : ""
                  }`}
                >
                  {/* Tutor */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={booking.tutor.photo}
                        alt={booking.tutor.name}
                        width={36}
                        height={36}
                        className="size-9 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {booking.tutor.name}
                        </p>
                        <span className="mt-0.5 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[0.65rem] font-medium text-primary">
                          {booking.tutor.subject}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Student */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {booking.student.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {booking.student.email}
                      </span>
                    </div>
                  </TableCell>

                  {/* Booked On */}
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(booking.bookedOn)}
                    </span>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    {booking.status === "active" ? (
                      <span className="inline-flex rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-600 dark:text-green-400">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full border border-destructive/20 bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive">
                        Cancelled
                      </span>
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    {booking.status === "active" ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onCancel(booking)}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        Cancel
                      </Button>
                    ) : (
                      <Button
                        disabled
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                      >
                        Cancel
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default BookingsTable;
