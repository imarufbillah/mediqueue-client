"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MESSAGES = [
  "Finding your session...",
  "Loading your dashboard...",
  "Almost ready...",
];

const MESSAGE_INTERVAL = 2000;

const LoadingSpinner = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, MESSAGE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background">
      {/* Spinner */}
      <div className="relative size-14">
        {/* Outer ring — clockwise, slower */}
        <svg
          className="absolute inset-0 size-14 animate-[spin_3s_linear_infinite]"
          viewBox="0 0 56 56"
          fill="none"
        >
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="100 50"
            className="text-primary"
          />
        </svg>

        {/* Inner ring — counter-clockwise, faster */}
        <svg
          className="absolute inset-2 size-10 animate-[spin_2s_linear_infinite_reverse]"
          viewBox="0 0 40 40"
          fill="none"
        >
          <circle
            cx="20"
            cy="20"
            r="16"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="60 40"
            className="text-muted-foreground"
          />
        </svg>
      </div>

      {/* Logo */}
      <div className="mt-8 flex items-center gap-0.5">
        <span className="text-lg font-heading text-foreground">Medi</span>
        <span className="text-lg font-sans font-bold text-primary">Queue</span>
      </div>

      {/* Cycling message */}
      <div className="mt-3 h-5">
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-sm text-muted-foreground"
          >
            {MESSAGES[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoadingSpinner;
