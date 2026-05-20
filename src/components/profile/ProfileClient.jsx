"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import IdentityCard from "./IdentityCard";
import EditProfileSection from "./EditProfileSection";
import RecentActivitySection from "./RecentActivitySection";

const ProfileClient = ({ user, listedTutors, bookings }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-dvh bg-background pb-20 pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.85fr]"
        >
          {/* Left Column — Identity Card */}
          <IdentityCard
            user={user}
            listedTutors={listedTutors}
            bookings={bookings}
          />

          {/* Right Column — Profile Details */}
          <div className="flex flex-col gap-8">
            <EditProfileSection
              user={user}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
            <RecentActivitySection />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileClient;
