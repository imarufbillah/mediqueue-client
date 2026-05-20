import TutorsClient from "@/components/tutors/TutorsClient";
import { getTutors } from "@/lib/data";

export const metadata = {
  title: "Browse Tutors",
};

const TutorsPage = async () => {
  const tutors = await getTutors();
  return (
    <div className="min-h-dvh bg-background pt-20">
      <TutorsClient tutors={tutors} />
    </div>
  );
};

export default TutorsPage;
