import Link from "next/link";
import { CalendarX } from "lucide-react";
import { Button } from "@/components/ui/button";
import MyBookingsClient from "@/components/my-bookings/MyBookingsClient";

const MyBookingsPage = () => {
  const showEmpty = false; // Toggle to true to preview empty state

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

        {/* Empty State */}
        {showEmpty ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-muted">
              <CalendarX className="size-10 text-muted-foreground" />
            </div>
            <h2 className="mb-2 font-heading text-xl text-foreground">
              No sessions booked yet
            </h2>
            <p className="mb-6 max-w-sm text-center text-sm text-muted-foreground">
              You haven&apos;t booked any sessions. Browse available tutors to
              get started.
            </p>
            <Button asChild>
              <Link href="/tutors">Browse Tutors</Link>
            </Button>
          </div>
        ) : (
          <MyBookingsClient />
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
