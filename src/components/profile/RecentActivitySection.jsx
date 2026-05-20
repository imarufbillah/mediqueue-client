"use client";

import { motion } from "framer-motion";
import { CalendarCheck, X, Plus, Clock } from "lucide-react";

const ACTIVITIES = [
  {
    id: 1,
    type: "booking",
    icon: CalendarCheck,
    iconBg: "bg-primary/15",
    iconColor: "text-primary",
    title: "Booked a session with Ahmed Khan (Mathematics)",
    subtitle: "Session on Dec 15, 2025 · 5:00 PM – 7:00 PM",
    time: "2 days ago",
  },
  {
    id: 2,
    type: "listed",
    icon: Plus,
    iconBg: "bg-secondary",
    iconColor: "text-secondary-foreground",
    title: "Listed a new tutor: Sara Islam (English)",
    subtitle: "Online · Mon–Wed · $25/hr",
    time: "4 days ago",
  },
  {
    id: 3,
    type: "cancelled",
    icon: X,
    iconBg: "bg-destructive/15",
    iconColor: "text-destructive",
    title: "Cancelled session with Rahim Chowdhury (Physics)",
    subtitle: "Session was scheduled for Dec 10, 2025",
    time: "1 week ago",
  },
  {
    id: 4,
    type: "booking",
    icon: CalendarCheck,
    iconBg: "bg-primary/15",
    iconColor: "text-primary",
    title: "Booked a session with Nadia Rahman (Chemistry)",
    subtitle: "Session on Dec 8, 2025 · 3:00 PM – 5:00 PM",
    time: "1 week ago",
  },
  {
    id: 5,
    type: "listed",
    icon: Plus,
    iconBg: "bg-secondary",
    iconColor: "text-secondary-foreground",
    title: "Listed a new tutor: Hasan Ali (Computer Science)",
    subtitle: "Offline · Sat–Sun · $30/hr",
    time: "2 weeks ago",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const RecentActivitySection = () => {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      {/* Header */}
      <h3 className="mb-6 font-heading text-lg text-foreground">
        Recent Activity
      </h3>

      {/* Timeline */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col"
      >
        {/* Vertical dashed line */}
        <div className="absolute left-3.75 top-2 bottom-2 w-px border-l border-dashed border-border" />

        {ACTIVITIES.map((activity, index) => (
          <motion.div
            key={activity.id}
            variants={itemVariants}
            className={`relative flex gap-4 ${
              index < ACTIVITIES.length - 1 ? "pb-6" : ""
            }`}
          >
            {/* Icon */}
            <div
              className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full ${activity.iconBg}`}
            >
              <activity.icon className={`size-3.5 ${activity.iconColor}`} />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-0.5 pt-0.5">
              <p className="text-sm font-medium text-foreground">
                {activity.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {activity.subtitle}
              </p>
            </div>

            {/* Timestamp */}
            <span className="shrink-0 pt-1 text-xs text-muted-foreground">
              {activity.time}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* View All */}
      <div className="mt-6 text-center">
        <button className="text-sm text-primary transition-colors duration-200 hover:underline">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivitySection;
