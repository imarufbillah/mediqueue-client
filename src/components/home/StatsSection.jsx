"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 500, suffix: "+", label: "Active Tutors" },
  { value: 1200, suffix: "+", label: "Sessions Booked" },
  { value: 12, suffix: "+", label: "Subjects Covered" },
  { value: 4.9, suffix: " ★", label: "Average Rating", isDecimal: true },
];

const DURATION = 1500; // ms

const useCountUp = (target, isDecimal = false, shouldStart = false) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!shouldStart || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / DURATION, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      setCount(
        isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current),
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, isDecimal, shouldStart]);

  return count;
};

const StatItem = ({ value, suffix, label, isDecimal, shouldStart }) => {
  const count = useCountUp(value, isDecimal, shouldStart);

  return (
    <div className="flex flex-col items-center gap-2 py-6">
      <span className="font-heading text-4xl text-foreground sm:text-5xl lg:text-6xl">
        {isDecimal ? count.toFixed(1) : count.toLocaleString()}
        {suffix}
      </span>
      <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground sm:text-sm">
        {label}
      </span>
    </div>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-muted/50 py-16 sm:py-20"
    >
      {/* Dot grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25] dark:opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--primary) 0.75px, transparent 0.75px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mb-12 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8"
      >
        <span className="mb-3 text-xs font-medium uppercase tracking-widest text-primary sm:text-sm">
          By the Numbers
        </span>
        <h2 className="mb-3 font-heading text-3xl tracking-tight text-foreground sm:text-4xl">
          Trusted by Students Everywhere
        </h2>
        <p className="max-w-lg text-base text-muted-foreground sm:text-lg">
          Our growing community of tutors and learners speaks for itself.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        className="relative mx-auto grid max-w-6xl grid-cols-2 px-4 sm:px-6 md:grid-cols-4 lg:px-8"
      >
        {STATS.map((stat, index) => (
          <div
            key={stat.label}
            className={`${
              index < STATS.length - 1 ? "md:border-r md:border-border" : ""
            }`}
          >
            <StatItem
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              isDecimal={stat.isDecimal}
              shouldStart={isInView}
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default StatsSection;
