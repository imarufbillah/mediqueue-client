"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Star, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import GoogleAuth from "@/components/auth/GoogleAuth";
import { Logo } from "@/components/Logo";

export const SignInClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearFieldError = (field) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message || "Sign in failed. Please try again.");
        return;
      }

      toast.success("Signed in successfully!");
      router.push(redirectTo);
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh">
      {/* Left Panel — Branding (desktop only) */}
      <div className="relative hidden w-[45%] overflow-hidden bg-card lg:flex lg:flex-col lg:items-center lg:justify-center">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-card via-background to-card" />

        {/* Decorative diagonal lines */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, var(--primary) 0px, var(--primary) 1px, transparent 1px, transparent 20px)",
          }}
        />

        {/* Floating hexagonal shapes */}
        <div className="pointer-events-none absolute top-16 left-12 h-20 w-20 rotate-30ded-lg border-2 border-primary/25" />
        <div className="pointer-events-none absolute top-28 left-20 h-14 w-14 rotate-60 rounded-lg border border-primary/15 bg-primary/5" />
        <div className="pointer-events-none absolute bottom-1/4 right-10 h-28 w-28 -rotate-12 rounded-2xl border-2 border-primary/20" />
        <div className="pointer-events-none absolute bottom-[35%] right-20 h-16 w-16 rotate-20 rounded-xl border border-primary/10 bg-primary/5" />

        {/* Glowing orbs */}
        <div className="pointer-events-none absolute top-1/4 right-0 h-40 w-40 rounded-full bg-primary/12 blur-[70px]" />
        <div className="pointer-events-none absolute bottom-16 left-0 h-52 w-52 rounded-full bg-primary/8 blur-[90px]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[50px]" />

        {/* Concentric rings — center accent */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/5" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center px-12 text-center">
          {/* Logo */}
          <div className="mb-10">
            <Logo size="xl" link={false} />
          </div>

          {/* Display heading */}
          <h2 className="mb-4 max-w-sm font-heading text-3xl leading-tight tracking-tight text-foreground xl:text-4xl">
            Your next great tutor is one click away.
          </h2>
          <p className="max-w-xs text-base text-muted-foreground">
            Join thousands of students finding the perfect learning match every
            day.
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
            &ldquo;MediQueue made finding a tutor effortless. Booked my first
            session in under a minute.&rdquo;
          </p>
          <span className="text-xs font-medium text-foreground">
            — Sarah K., Medical Student
          </span>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex w-full flex-col items-center justify-center bg-background px-6 py-12 sm:px-12 lg:w-[55%] lg:px-16 xl:px-24">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 lg:hidden">
            <Logo size="lg" link={false} />
          </div>

          {/* Header */}
          <h1 className="mb-2 font-heading text-3xl tracking-tight text-foreground sm:text-4xl">
            Welcome back
          </h1>
          <p className="mb-10 text-base text-muted-foreground">
            Sign in to your MediQueue account
          </p>

          {/* Form */}
          <form onSubmit={handleSignIn} className="flex flex-col gap-6">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearFieldError("email");
                }}
                autoComplete="email"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearFieldError("password");
                  }}
                  autoComplete="current-password"
                  className="pr-10"
                  aria-invalid={!!errors.password}
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
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary transition-colors hover:text-primary/80"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            {/* Divider */}
            <div className="relative flex items-center">
              <div className="flex-1 border-t border-border" />
              <span className="px-4 text-sm text-muted-foreground">Or</span>
              <div className="flex-1 border-t border-border" />
            </div>

            {/* Google OAuth Button */}
            <GoogleAuth />
          </form>

          {/* Sign up link */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
