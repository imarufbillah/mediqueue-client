"use client";

import { motion } from "framer-motion";
import { Search, CalendarCheck, GraduationCap } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Search,
    title: "Browse Tutors",
    description:
      "Filter by subject, teaching mode, location, and available dates. Find someone who fits your exact schedule.",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Book a Session",
    description:
      "Select your tutor, fill in your details, and confirm. The system instantly generates your session token and updates availability.",
  },
  {
    number: "03",
    icon: GraduationCap,
    title: "Start Learning",
    description:
      "Show up at the scheduled time with your session token. Online or in-person — your tutor is ready for you.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="bg-background py-20 sm:py-28">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <span className="mb-3 text-xs font-medium uppercase tracking-widest text-primary sm:text-sm">
            Simple Process
          </span>
          <h2 className="mb-4 font-heading text-3xl tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Book a Session in 3 Steps
          </h2>
          <p className="max-w-lg text-base text-muted-foreground sm:text-lg">
            No sign-up headaches. No scheduling back-and-forth. Just find, book,
            and learn.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 md:gap-0"
        >
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              variants={stepVariants}
              className="relative flex flex-col items-center text-center"
            >
              {/* Dashed connector — horizontal on desktop */}
              {index < STEPS.length - 1 && (
                <div className="pointer-events-none absolute top-15 left-[calc(50%+48px)] hidden h-px w-[calc(100%-96px)] border-t-2 border-dashed border-border md:block" />
              )}

              {/* Dashed connector — vertical on mobile */}
              {index < STEPS.length - 1 && (
                <div className="pointer-events-none absolute -bottom-4 left-1/2 h-8 -translate-x-1/2 border-l-2 border-dashed border-border md:hidden" />
              )}

              {/* Step Card */}
              <div className="group relative flex flex-col items-center rounded-2xl px-6 py-8 transition-colors duration-300 hover:bg-muted/50">
                {/* Watermark Number */}
                <span className="pointer-events-none absolute top-2 font-heading text-7xl font-bold text-primary/10 sm:text-8xl">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="relative z-10 mb-5 flex size-14 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                  <step.icon className="size-7 text-primary" />
                </div>

                {/* Title */}
                <h3 className="relative z-10 mb-3 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
