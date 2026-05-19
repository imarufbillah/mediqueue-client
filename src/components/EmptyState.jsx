"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmptyState = ({
  icon: Icon = ClipboardList,
  heading = "Nothing here yet",
  description = "There's no data to display right now.",
  ctaLabel,
  ctaHref,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      {/* Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="mb-6 flex size-20 items-center justify-center rounded-full bg-muted shadow-sm"
      >
        <Icon className="size-9 text-muted-foreground" />
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center text-center"
      >
        <h2 className="mb-2 font-heading text-xl text-foreground">
          {heading}
        </h2>
        <p className="max-w-xs text-sm text-muted-foreground">
          {description}
        </p>
      </motion.div>

      {/* CTA Button */}
      {ctaLabel && ctaHref && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
          className="mt-6"
        >
          <Button asChild>
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default EmptyState;
