"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const floatingShapes = [
  { size: "size-4", top: "top-[15%]", left: "left-[10%]", shape: "rounded-full", opacity: "bg-primary/15", duration: 4, delay: 0 },
  { size: "size-6", top: "top-[25%]", left: "left-[80%]", shape: "rounded-md rotate-45", opacity: "bg-primary/10", duration: 5, delay: 0.5 },
  { size: "size-3", top: "top-[70%]", left: "left-[15%]", shape: "rounded-full", opacity: "bg-primary/20", duration: 3.5, delay: 1 },
  { size: "size-5", top: "top-[60%]", left: "left-[85%]", shape: "rounded-sm rotate-12", opacity: "bg-primary/10", duration: 4.5, delay: 0.8 },
  { size: "size-2", top: "top-[35%]", left: "left-[25%]", shape: "rounded-full", opacity: "bg-primary/20", duration: 3, delay: 1.5 },
  { size: "size-8", top: "top-[80%]", left: "left-[70%]", shape: "rounded-lg rotate-45", opacity: "bg-primary/5", duration: 6, delay: 0.3 },
  { size: "size-3", top: "top-[20%]", left: "left-[60%]", shape: "rounded-full", opacity: "bg-primary/15", duration: 4, delay: 2 },
  { size: "size-5", top: "top-[75%]", left: "left-[40%]", shape: "rounded-md -rotate-12", opacity: "bg-primary/10", duration: 5.5, delay: 0.7 },
];

const NotFoundPage = () => {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-background px-4">
      {/* Floating Shapes */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          animate={{ y: [-8, 8, -8] }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
          className={`pointer-events-none absolute ${shape.size} ${shape.top} ${shape.left} ${shape.shape} ${shape.opacity}`}
        />
      ))}

      {/* 404 Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mb-6"
      >
        {/* Subtle glow behind */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-32 w-64 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <h1 className="relative font-heading text-[10rem] leading-none tracking-tighter text-foreground sm:text-[12rem] lg:text-[14rem]">
          4<span className="text-primary">0</span>4
        </h1>
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center text-center"
      >
        <h2 className="mb-3 font-heading text-2xl text-foreground sm:text-3xl">
          Class Not Found
        </h2>
        <p className="mb-8 max-w-md text-base text-muted-foreground">
          Looks like this session was cancelled — or never existed. Let&apos;s
          get you back on track.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/tutors">Browse Tutors</Link>
          </Button>
        </div>
      </motion.div>

      {/* Bottom text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="absolute bottom-8 text-xs text-muted-foreground"
      >
        Error 404 · MediQueue
      </motion.p>
    </div>
  );
};

export default NotFoundPage;
