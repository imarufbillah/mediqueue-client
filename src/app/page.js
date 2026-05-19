import Hero from "@/components/home/Hero";
import AvailableTutorsSection from "@/components/home/AvailableTutorsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import StatsSection from "@/components/home/StatsSection";
import { getTutors } from "@/lib/data";

export default async function Home() {
  const tutors = await getTutors();

  return (
    <>
      <Hero />
      <AvailableTutorsSection tutors={tutors} />
      <HowItWorksSection />
      <StatsSection />
    </>
  );
}
