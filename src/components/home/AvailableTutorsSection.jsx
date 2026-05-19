"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import TutorCard from "@/components/tutor/TutorCard";

const TUTORS = [
  {
    name: "Dr. Sarah Ahmed",
    photo: "https://i.pravatar.cc/400?img=47",
    subject: "Mathematics",
    teachingMode: "Online",
    location: "Dhaka, Bangladesh",
    hourlyFee: 25,
    availableDays: "Sun–Thu, 5 PM–8 PM",
    startDate: "Jun 15, 2025",
    totalSlots: 10,
    slotsRemaining: 7,
  },
  {
    name: "Prof. Karim Hossain",
    photo: "https://i.pravatar.cc/400?img=12",
    subject: "Physics",
    teachingMode: "Both",
    location: "Chittagong, Bangladesh",
    hourlyFee: 30,
    availableDays: "Mon–Fri, 4 PM–7 PM",
    startDate: "Jun 20, 2025",
    totalSlots: 8,
    slotsRemaining: 3,
  },
  {
    name: "Nadia Rahman",
    photo: "https://i.pravatar.cc/400?img=32",
    subject: "Chemistry",
    teachingMode: "Online",
    location: "Sylhet, Bangladesh",
    hourlyFee: 20,
    availableDays: "Sat–Wed, 6 PM–9 PM",
    startDate: "Jun 10, 2025",
    totalSlots: 12,
    slotsRemaining: 12,
  },
  {
    name: "Tanvir Islam",
    photo: "https://i.pravatar.cc/400?img=53",
    subject: "Computer Science",
    teachingMode: "Online",
    location: "Dhaka, Bangladesh",
    hourlyFee: 35,
    availableDays: "Sun–Thu, 8 PM–10 PM",
    startDate: "Jul 01, 2025",
    totalSlots: 6,
    slotsRemaining: 0,
  },
  {
    name: "Fatima Begum",
    photo: "https://i.pravatar.cc/400?img=26",
    subject: "English",
    teachingMode: "Offline",
    location: "Rajshahi, Bangladesh",
    hourlyFee: 18,
    availableDays: "Mon–Thu, 3 PM–6 PM",
    startDate: "Jun 12, 2025",
    totalSlots: 15,
    slotsRemaining: 9,
  },
  {
    name: "Arif Chowdhury",
    photo: "https://i.pravatar.cc/400?img=60",
    subject: "Biology",
    teachingMode: "Both",
    location: "Khulna, Bangladesh",
    hourlyFee: 22,
    availableDays: "Sun–Wed, 5 PM–8 PM",
    startDate: "Jun 18, 2025",
    totalSlots: 10,
    slotsRemaining: 5,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const AvailableTutorsSection = () => {
  return (
    <section className="bg-muted/50 py-20 sm:py-28">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-14 flex flex-col items-center text-center"
        >
          <span className="mb-3 text-xs font-medium uppercase tracking-widest text-primary sm:text-sm">
            Who&apos;s Teaching
          </span>
          <h2 className="mb-4 font-heading text-3xl tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Meet Our Top Tutors
          </h2>
          <p className="max-w-lg text-base text-muted-foreground sm:text-lg">
            Hand-picked educators across mathematics, sciences, languages, and
            more. Real slots, real availability.
          </p>
        </motion.div>

        {/* Tutor Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TUTORS.map((tutor) => (
            <motion.div key={tutor.name} variants={cardVariants}>
              <TutorCard tutor={tutor} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-14 flex justify-center"
        >
          <Button variant="outline" size="lg" asChild>
            <Link href="/tutors">View All Tutors</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AvailableTutorsSection;
