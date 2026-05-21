import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import AvailableTutorsLoader from "@/components/home/AvailableTutorsLoader";
import AvailableTutorsSkeleton from "@/components/home/AvailableTutorsSkeleton";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import StatsSection from "@/components/home/StatsSection";

export const metadata = {
  title: "Home | MediQueue",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<AvailableTutorsSkeleton />}>
        <AvailableTutorsLoader />
      </Suspense>
      <HowItWorksSection />
      <StatsSection />
    </>
  );
}
