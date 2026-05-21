"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Users, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const SLIDES = [
  {
    overline: "TRUSTED LEARNING PLATFORM",
    heading: "Find Your Perfect Tutor, Book in Seconds",
    subtext:
      "Browse verified tutors across every subject. Reserve your learning session with one click — no phone calls, no waiting.",
    buttons: [
      { label: "Browse Tutors", href: "/tutors", variant: "default" },
      { label: "How It Works", href: "#how-it-works", variant: "outline" },
    ],
    showBadges: true,
    image: "/hero-1.png",
  },
  {
    overline: "ZERO SCHEDULING CONFLICTS",
    heading: "Real-Time Slot Availability, Always Accurate",
    subtext:
      "Our system tracks every booking live. When a session fills up, it locks automatically — so you never show up to a double-booked class.",
    buttons: [
      { label: "See Available Tutors", href: "/tutors", variant: "default" },
    ],
    showBadges: false,
    image: "/hero-2.png",
  },
  {
    overline: "FOR EVERY LEARNER",
    heading: "Online, Offline, or Both — You Choose",
    subtext:
      "Every tutor lists their teaching mode. Filter by your preferred style and location. Learning should fit your life, not the other way around.",
    buttons: [
      { label: "Get Started Free", href: "/sign-up", variant: "default" },
    ],
    showBadges: false,
    image: "/hero-3.png",
  },
];

const TRUST_BADGES = [
  { icon: Users, label: "500+ Active Tutors" },
  { icon: Calendar, label: "1,200+ Sessions Booked" },
  { icon: Star, label: "4.9★ Average Rating" },
];

const AUTO_PLAY_INTERVAL = 5000;

const slideVariants = {
  enter: { opacity: 0, y: 28 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -28 },
};

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative flex min-h-dvh items-center overflow-hidden bg-background pt-20"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt=""
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            className="object-cover object-center"
          />
          {/* Dark overlay — subtle, lets image show through */}
          <div className="absolute inset-0 bg-background/30 dark:bg-background/50" />
          {/* Gradient fade from left for text area — solid left, clear right */}
          <div className="absolute inset-0 bg-linear-to-r from-background/90 via-background/50 via-35% to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Background Dot Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--primary) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Teal Glow Blob — Top Right */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-125 w-125 rounded-full bg-primary/10 blur-[120px]" />

      {/* Slide Content — Left Aligned */}
      <div className="relative z-10 flex w-full items-center px-5 pb-20 sm:px-12 lg:px-24">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-start"
            >
              {/* Overline */}
              <motion.span
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary sm:text-sm"
              >
                {slide.overline}
              </motion.span>

              {/* Heading */}
              <h1 className="mb-6 font-heading text-4xl leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
                {slide.heading}
              </h1>

              {/* Subtext */}
              <p className="mb-10 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                {slide.subtext}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                {slide.buttons.map((btn) => (
                  <Button
                    key={btn.label}
                    variant={btn.variant}
                    size="lg"
                    asChild
                  >
                    <Link href={btn.href}>{btn.label}</Link>
                  </Button>
                ))}
              </div>

              {/* Trust Badges */}
              {slide.showBadges && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-12 flex flex-wrap items-center gap-6 sm:gap-8"
                >
                  {TRUST_BADGES.map((badge) => (
                    <div
                      key={badge.label}
                      className="flex items-center gap-2.5 text-sm text-muted-foreground sm:text-base"
                    >
                      <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                        <badge.icon className="size-4 text-primary" />
                      </div>
                      <span className="font-medium">{badge.label}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dot Indicators — Bottom Center */}
      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === current
                ? "w-7 bg-primary"
                : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>

      {/* Arrow Controls — visible on hover */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className={`absolute left-4 top-1/2 z-20 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-border/50 bg-card/60 text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:bg-card hover:text-foreground hover:scale-110 sm:left-8 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className={`absolute right-4 top-1/2 z-20 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-border/50 bg-card/60 text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:bg-card hover:text-foreground hover:scale-110 sm:right-8 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <ChevronRight className="size-5" />
      </button>
    </section>
  );
};

export default Hero;
