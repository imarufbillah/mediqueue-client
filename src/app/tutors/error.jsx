"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const TutorsError = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-dvh bg-background pt-20">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center justify-center"
        >
          <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-destructive/10">
            <AlertTriangle className="size-10 text-destructive" />
          </div>
          <h2 className="mb-2 font-heading text-xl text-foreground">
            Failed to load tutors
          </h2>
          <p className="mb-8 max-w-sm text-center text-sm text-muted-foreground">
            We couldn&apos;t fetch the tutor listings. Please check your
            connection and try again.
          </p>
          <Button onClick={() => reset()}>
            <RefreshCw className="size-4" />
            Try Again
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default TutorsError;
