import Link from "next/link";
import { Plus, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import MyTutorsClient from "@/components/my-tutors/MyTutorsClient";
import { getTutorsByCurrentUser } from "@/lib/data";

const MyTutorsPage = async () => {
  const myTutors = await getTutorsByCurrentUser();

  const showEmpty = myTutors.length === 0;

  return (
    <div className="min-h-dvh bg-background pb-20 pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl tracking-tight text-foreground sm:text-4xl">
              My Tutor Listings
            </h1>
            <p className="mt-1 text-base text-muted-foreground">
              Manage and update the tutors you&apos;ve added to MediQueue.
            </p>
          </div>
          <Button asChild>
            <Link href="/add-tutor">
              <Plus className="size-4" />
              Add New Tutor
            </Link>
          </Button>
        </div>

        {/* Empty State */}
        {showEmpty ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-muted">
              <ClipboardList className="size-10 text-muted-foreground" />
            </div>
            <h2 className="mb-2 font-heading text-xl text-foreground">
              No tutors listed yet
            </h2>
            <p className="mb-6 max-w-sm text-center text-sm text-muted-foreground">
              You haven&apos;t added any tutors. Start by creating your first
              listing.
            </p>
            <Button asChild>
              <Link href="/add-tutor">
                <Plus className="size-4" />
                Add Your First Tutor
              </Link>
            </Button>
          </div>
        ) : (
          <MyTutorsClient myTutors={myTutors} />
        )}
      </div>
    </div>
  );
};

export default MyTutorsPage;
