import Hero from "@/components/home/Hero";
import AvailableTutorsSection from "@/components/home/AvailableTutorsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import StatsSection from "@/components/home/StatsSection";
import { getLimitedTutors } from "@/lib/data";

export default async function Home() {
  const tutors = await getLimitedTutors();

  return (
    <>
      <Hero />
      <AvailableTutorsSection tutors={tutors} />
      <HowItWorksSection />
      <StatsSection />
    </>
  );
}
