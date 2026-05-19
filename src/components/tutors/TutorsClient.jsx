"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, X, CalendarDays, RotateCcw } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TutorCard from "@/components/tutors/TutorCard";
import TutorCardSkeleton from "./TutorCardSkeleton";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const TutorsClient = ({ tutors }) => {
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [sortBy, setSortBy] = useState("featured");
  const [isLoading] = useState(false);

  const hasFilters = search || fromDate || toDate;

  const filteredTutors = search.toLowerCase() === "xyz" ? [] : tutors;

  const resetFilters = () => {
    setSearch("");
    setFromDate(null);
    setToDate(null);
  };

  const dateInputClass =
    "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  return (
    <>
      {/* Header / Search Zone */}
      <div className="border-b border-border bg-muted/50 pb-8 pt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Title Row */}
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mb-1 block text-xs font-medium uppercase tracking-widest text-primary">
                Explore
              </span>
              <h1 className="font-heading text-3xl tracking-tight text-foreground sm:text-4xl">
                Find Your Tutor
              </h1>
              <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                Browse all available tutors. Filter by name or session date to
                find the perfect match.
              </p>
            </div>
            <span className="shrink-0 text-sm text-muted-foreground">
              Showing {filteredTutors.length} tutors
            </span>
          </div>

          {/* Search & Filter Bar */}
          <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
              {/* Search Input */}
              <div className="relative flex-1 lg:max-w-[50%]">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by tutor name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex h-12 w-full rounded-xl border border-input bg-background pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>

              {/* Date Range */}
              <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:gap-3">
                <div className="relative flex-1">
                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <DatePicker
                    selected={fromDate}
                    onChange={(date) => setFromDate(date)}
                    placeholderText="Start date"
                    dateFormat="MMM dd, yyyy"
                    className={dateInputClass}
                  />
                </div>
                <div className="relative flex-1">
                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <DatePicker
                    selected={toDate}
                    onChange={(date) => setToDate(date)}
                    placeholderText="End date"
                    dateFormat="MMM dd, yyyy"
                    minDate={fromDate}
                    className={dateInputClass}
                  />
                </div>
              </div>

              {/* Reset */}
              <Button
                variant="outline"
                onClick={resetFilters}
                disabled={!hasFilters}
                className="shrink-0"
              >
                <RotateCcw className="size-4" />
                Reset
              </Button>
            </div>

            {/* Active Filter Chips */}
            {hasFilters && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {search && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                    Name: {search}
                    <button
                      onClick={() => setSearch("")}
                      className="transition-colors hover:text-foreground"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                )}
                {fromDate && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                    From:{" "}
                    {fromDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                    <button
                      onClick={() => setFromDate(null)}
                      className="transition-colors hover:text-foreground"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                )}
                {toDate && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                    To:{" "}
                    {toDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                    <button
                      onClick={() => setToDate(null)}
                      className="transition-colors hover:text-foreground"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results Area */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Results Header */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {filteredTutors.length} tutors found
          </span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Sort by: Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Loading Skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <TutorCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredTutors.length === 0 ? (
          /* No Results */
          <div className="flex flex-col items-center justify-center py-24">
            <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-muted">
              <Search className="size-10 text-muted-foreground" />
            </div>
            <h2 className="mb-2 font-heading text-xl text-foreground">
              No tutors found
            </h2>
            <p className="mb-6 max-w-sm text-center text-sm text-muted-foreground">
              Try adjusting your search term or clearing the date filter.
            </p>
            <Button onClick={resetFilters}>Clear Search</Button>
          </div>
        ) : (
          /* Tutor Grid */
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredTutors.map((tutor) => (
                <motion.div key={tutor._id} variants={cardVariants}>
                  <TutorCard tutor={tutor} />
                </motion.div>
              ))}
            </motion.div>

            {/* Load More */}
            <div className="mt-12 flex flex-col items-center gap-2">
              <Button variant="outline" size="lg">
                Load More Tutors
              </Button>
              <span className="text-xs text-muted-foreground">
                Showing {filteredTutors.length} of 48 tutors
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TutorsClient;
