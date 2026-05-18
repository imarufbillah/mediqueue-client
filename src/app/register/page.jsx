"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Check, X, Info, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Hardcoded password state for design purposes
const STRENGTH_LEVEL = 2; // 0 = none, 1 = weak, 2 = medium, 3 = strong
const PASSWORD_CHECKS = [
  { label: "At least 6 characters", passed: true },
  { label: "One uppercase letter", passed: true },
  { label: "One lowercase letter", passed: false },
];

const STRENGTH_LABELS = ["", "Weak", "Medium", "Strong"];
const STRENGTH_COLORS = ["", "bg-destructive", "bg-yellow-500", "bg-green-500"];

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-dvh">
      {/* Left Panel — Branding (desktop only) */}
      <div className="relative hidden w-[45%] overflow-hidden bg-card lg:flex lg:flex-col lg:items-center lg:justify-center">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-card via-background to-card" />

        {/* Decorative grid of teal dots */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--primary) 2px, transparent 2px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Decorative overlapping squares */}
        <div className="pointer-events-none absolute top-1/4 right-16 h-32 w-32 rotate-12 rounded-2xl border-2 border-primary/20" />
        <div className="pointer-events-none absolute top-[30%] right-24 h-32 w-32 -rotate-6 rounded-2xl border border-primary/15" />
        <div className="pointer-events-none absolute bottom-1/3 left-12 h-24 w-24 rotate-45 rounded-xl bg-primary/10 blur-sm" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-primary/10 blur-[80px]" />
        <div className="pointer-events-none absolute -top-16 right-0 h-48 w-48 rounded-full bg-primary/15 blur-[60px]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center px-12 text-center">
          {/* Logo */}
          <div className="mb-10 flex items-center gap-0.5">
            <span className="text-3xl font-heading text-foreground">Medi</span>
            <span className="text-3xl font-sans font-bold text-primary">Queue</span>
          </div>

          {/* Display heading */}
          <h2 className="mb-4 max-w-sm font-heading text-3xl leading-tight tracking-tight text-foreground xl:text-4xl">
            Join thousands of students finding their perfect tutor.
          </h2>
          <p className="max-w-xs text-base text-muted-foreground">
            Create your free account and start learning with the best tutors today.
          </p>
        </div>

        {/* Social proof strip — bottom */}
        <div className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center gap-4 px-12">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="size-4 fill-primary text-primary" />
            ))}
          </div>
          <p className="max-w-xs text-center text-sm italic text-muted-foreground">
            &ldquo;I found an amazing chemistry tutor within minutes. The booking process was seamless.&rdquo;
          </p>
          <span className="text-xs font-medium text-foreground">— Alex R., Engineering Student</span>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex w-full flex-col items-center justify-center bg-background px-6 py-12 sm:px-12 lg:w-[55%] lg:px-16 xl:px-24">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-0.5 lg:hidden">
            <span className="text-2xl font-heading text-foreground">Medi</span>
            <span className="text-2xl font-sans font-bold text-primary">Queue</span>
          </div>

          {/* Header */}
          <h1 className="mb-2 font-heading text-3xl tracking-tight text-foreground sm:text-4xl">
            Create your account
          </h1>
          <p className="mb-10 text-base text-muted-foreground">
            Start booking sessions in minutes.
          </p>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            {/* Photo URL */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5">
                <Label htmlFor="photo">Photo URL</Label>
                <div className="group relative">
                  <Info className="size-3.5 text-muted-foreground cursor-help" />
                  <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-lg bg-popover px-3 py-2 text-xs text-popover-foreground shadow-md opacity-0 transition-opacity group-hover:opacity-100 w-48 border border-border">
                    Paste an image URL from any public source
                  </div>
                </div>
              </div>
              <Input
                id="photo"
                type="url"
                placeholder="https://..."
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              <div className="mt-1 flex items-center gap-3">
                <div className="flex flex-1 gap-1.5">
                  {[1, 2, 3].map((level) => (
                    <div
                      key={level}
                      className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                        level <= STRENGTH_LEVEL
                          ? STRENGTH_COLORS[STRENGTH_LEVEL]
                          : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
                {STRENGTH_LEVEL > 0 && (
                  <span
                    className={`text-xs font-medium ${
                      STRENGTH_LEVEL === 1
                        ? "text-destructive"
                        : STRENGTH_LEVEL === 2
                          ? "text-yellow-500"
                          : "text-green-500"
                    }`}
                  >
                    {STRENGTH_LABELS[STRENGTH_LEVEL]}
                  </span>
                )}
              </div>

              {/* Password Requirements Checklist */}
              <div className="mt-2 flex flex-col gap-1.5">
                {PASSWORD_CHECKS.map((check) => (
                  <div key={check.label} className="flex items-center gap-2">
                    {check.passed ? (
                      <Check className="size-3.5 text-green-500" />
                    ) : (
                      <X className="size-3.5 text-destructive" />
                    )}
                    <span
                      className={`text-sm ${
                        check.passed ? "text-green-500" : "text-muted-foreground"
                      }`}
                    >
                      {check.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <Button type="submit" size="lg" className="mt-2 w-full">
              Create Account
            </Button>

            {/* Divider */}
            <div className="relative flex items-center">
              <div className="flex-1 border-t border-border" />
              <span className="px-4 text-sm text-muted-foreground">Or continue with</span>
              <div className="flex-1 border-t border-border" />
            </div>

            {/* Google Button */}
            <Button type="button" variant="outline" size="lg" className="w-full gap-3">
              <svg className="size-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
          </form>

          {/* Login link */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
