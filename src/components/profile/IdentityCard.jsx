"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Camera,
  LogOut,
  Plus,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

const STATS = [
  { label: "Total Bookings", value: 8 },
  { label: "Active Sessions", value: 3 },
  { label: "Tutors Added", value: 4 },
];

const QUICK_LINKS = [
  { icon: CalendarDays, label: "My Booked Sessions", href: "/my-bookings" },
  { icon: ClipboardList, label: "My Tutor Listings", href: "/my-tutors" },
  { icon: Plus, label: "Add New Tutor", href: "/add-tutor" },
];

const IdentityCard = ({ user }) => {
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-card p-6">
        {/* Avatar */}
        <div className="relative">
          <div className="relative size-24 rounded-full ring-2 ring-primary ring-offset-4 ring-offset-card">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name}
                width={96}
                height={96}
                className="size-full rounded-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                {initials}
              </div>
            )}
            {/* Online indicator */}
            <span className="absolute bottom-0.5 right-0.5 size-3 rounded-full border-2 border-card bg-green-500" />
            {/* Hover overlay */}
            <div className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-0.5 rounded-full bg-foreground/60 opacity-0 transition-opacity duration-200 hover:opacity-100">
              <Camera className="size-4 text-background" />
              <span className="text-[0.6rem] font-medium text-background">
                Change
              </span>
            </div>
          </div>
          {/* Outer subtle ring */}
          <div className="absolute -inset-1 rounded-full ring-4 ring-primary/20" />
        </div>

        {/* Name & Email */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h2 className="font-heading text-xl text-foreground">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          {user.emailVerified && (
            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
              <BadgeCheck className="size-3" />
              Verified Student
            </span>
          )}
        </div>

        {/* Member Since */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="size-3.5" />
          <span>Member since {formatDate(user.createdAt)}</span>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-border" />

        {/* Stats */}
        <div className="flex w-full flex-col">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex items-center justify-between py-3 ${
                index < STATS.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
              <span className="text-sm font-semibold text-foreground">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-border" />

        {/* Quick Links */}
        <nav className="flex w-full flex-col gap-1">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors duration-200 hover:bg-accent/50 hover:text-primary"
            >
              <link.icon className="size-4" />
              <span className="flex-1">{link.label}</span>
              <ChevronRight className="size-3.5" />
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="h-px w-full bg-border" />

        {/* Sign Out */}
        <Button
          variant="ghost"
          className="w-full border border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="size-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default IdentityCard;
