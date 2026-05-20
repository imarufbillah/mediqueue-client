"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RefreshCw, ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const TutorDetailsError = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-dvh bg-background pb-20 pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center justify-center py-24"
        >
          <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-destructive/10">
            <AlertTriangle className="size-10 text-destructive" />
          </div>
          <h2 className="mb-2 font-heading text-xl text-foreground">
            Failed to load tutor details
          </h2>
          <p className="mb-8 max-w-sm text-center text-sm text-muted-foreground">
            We couldn&apos;t fetch this tutor&apos;s information. The tutor may
            no longer exist or the server might be temporarily unavailable.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button onClick={() => reset()}>
              <RefreshCw className="size-4" />
              Try Again
            </Button>
            <Button variant="outline" asChild>
              <Link href="/tutors">
                <ArrowLeft className="size-4" />
                Back to Tutors
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TutorDetailsError;
