"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import TutorCard from "@/components/tutor/tutor-card/TutorCard";

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

const AvailableTutorsSection = ({ tutors }) => {
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
          {tutors.map((tutor) => (
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
