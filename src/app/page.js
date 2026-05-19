import Hero from "@/components/home/Hero";
import AvailableTutorsSection from "@/components/home/AvailableTutorsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import StatsSection from "@/components/home/StatsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AvailableTutorsSection />
      <HowItWorksSection />
      <StatsSection />
    </>
  );
}
