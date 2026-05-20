"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const GlobalError = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex max-w-md flex-col items-center text-center"
      >
        {/* Icon */}
        <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-destructive/10">
          <AlertTriangle className="size-10 text-destructive" />
        </div>

        {/* Heading */}
        <h1 className="mb-2 font-heading text-2xl text-foreground sm:text-3xl">
          Something went wrong
        </h1>
        <p className="mb-8 text-base text-muted-foreground">
          An unexpected error occurred. Please try again or return to the
          homepage.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => reset()}>
            <RefreshCw className="size-4" />
            Try Again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="size-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default GlobalError;
