import ProfileClient from "@/components/profile/ProfileClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
  title: "My Profile",
};

const ProfilePage = async () => {
  const { user } = await auth.api.getSession({
    headers: await headers(),
  });

  return <ProfileClient user={user} />;
};

export default ProfilePage;
