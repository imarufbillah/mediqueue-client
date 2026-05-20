import { Skeleton } from "@/components/ui/skeleton";

const ProfileLoading = () => {
  return (
    <div className="min-h-dvh bg-background pb-20 pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.85fr]">
          {/* Left Column — Identity Card Skeleton */}
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-card p-6">
            {/* Avatar */}
            <Skeleton className="size-24 rounded-full" />

            {/* Name & Email */}
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-5 w-28 rounded-full" />
            </div>

            {/* Member Since */}
            <Skeleton className="h-4 w-36" />

            {/* Divider */}
            <div className="h-px w-full bg-border" />

            {/* Stats */}
            <div className="flex w-full flex-col">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between py-3 ${
                    i < 2 ? "border-b border-border" : ""
                  }`}
                >
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-8" />
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-border" />

            {/* Quick Links */}
            <div className="flex w-full flex-col gap-1">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded-lg" />
              ))}
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-border" />

            {/* Sign Out Button */}
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>

          {/* Right Column — Profile Details Skeleton */}
          <div className="flex flex-col gap-8">
            {/* Edit Profile Section */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-6 flex items-center justify-between">
                <Skeleton className="h-6 w-44" />
                <Skeleton className="h-8 w-16 rounded-md" />
              </div>
              <div className="flex flex-col">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex flex-col gap-1 py-4 ${
                      i < 4 ? "border-b border-border" : ""
                    }`}
                  >
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <Skeleton className="mb-6 h-6 w-36" />
              <div className="flex flex-col gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="size-8 shrink-0 rounded-full" />
                    <div className="flex flex-1 flex-col gap-1.5">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                    <Skeleton className="h-3 w-16 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLoading;
