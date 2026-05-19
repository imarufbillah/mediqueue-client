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

const FAKE_BOOKINGS = [
  {
    id: "1",
    tutor: {
      name: "Dr. Sarah Ahmed",
      photo: "https://i.pravatar.cc/400?img=47",
      subject: "Mathematics",
    },
    student: { name: "Maruf Billah", email: "maruf@example.com" },
    bookedOn: "May 12, 2025",
    status: "active",
  },
  {
    id: "2",
    tutor: {
      name: "Prof. Karim Hossain",
      photo: "https://i.pravatar.cc/400?img=12",
      subject: "Physics",
    },
    student: { name: "Maruf Billah", email: "maruf@example.com" },
    bookedOn: "May 10, 2025",
    status: "active",
  },
  {
    id: "3",
    tutor: {
      name: "Nadia Rahman",
      photo: "https://i.pravatar.cc/400?img=32",
      subject: "Chemistry",
    },
    student: { name: "Maruf Billah", email: "maruf@example.com" },
    bookedOn: "Apr 28, 2025",
    status: "cancelled",
  },
  {
    id: "4",
    tutor: {
      name: "Tanvir Islam",
      photo: "https://i.pravatar.cc/400?img=53",
      subject: "Computer Science",
    },
    student: { name: "Maruf Billah", email: "maruf@example.com" },
    bookedOn: "May 15, 2025",
    status: "active",
  },
  {
    id: "5",
    tutor: {
      name: "Fatima Begum",
      photo: "https://i.pravatar.cc/400?img=26",
      subject: "English",
    },
    student: { name: "Maruf Billah", email: "maruf@example.com" },
    bookedOn: "Apr 20, 2025",
    status: "cancelled",
  },
];

const BookingsTable = ({ onCancel }) => {
  const bookings = FAKE_BOOKINGS;

  const totalCount = bookings.length;
  const activeCount = bookings.filter((b) => b.status === "active").length;
  const cancelledCount = bookings.filter((b) => b.status === "cancelled").length;

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
                  key={booking.id}
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
                      {booking.bookedOn}
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
                      <span className="text-xs text-muted-foreground">—</span>
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
