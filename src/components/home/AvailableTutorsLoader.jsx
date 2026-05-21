import { getLimitedTutors } from "@/lib/data";
import AvailableTutorsSection from "./AvailableTutorsSection";

const AvailableTutorsLoader = async () => {
  const tutors = await getLimitedTutors();

  return <AvailableTutorsSection tutors={tutors} />;
};

export default AvailableTutorsLoader;
