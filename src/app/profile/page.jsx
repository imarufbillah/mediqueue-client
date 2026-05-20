import ProfileClient from "@/components/profile/ProfileClient";
import { auth } from "@/lib/auth";
import { getBookingsByCurrentUser, getTutorsByCurrentUser } from "@/lib/data";
import { headers } from "next/headers";

export const metadata = {
  title: "My Profile",
};

const ProfilePage = async () => {
  const listedTutors = await getTutorsByCurrentUser();
  const bookings = await getBookingsByCurrentUser();
  const { user } = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <ProfileClient
      user={user}
      listedTutors={listedTutors}
      bookings={bookings}
    />
  );
};

export default ProfilePage;
