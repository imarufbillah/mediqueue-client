"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Star, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

const SignInPage = () => {
  const router = useRouter();
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
      router.push("/");
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
        <div className="absolute inset-0 bg-linear-to-br from-card via-background to-card" />

        {/* Decorative teal shapes */}
        <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-primary/15 blur-[80px]" />
        <div className="pointer-events-none absolute top-1/3 right-10 h-48 w-48 rounded-full border-2 border-primary/20" />
        <div className="pointer-events-none absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full border border-primary/10" />
        <div className="pointer-events-none absolute bottom-20 right-1/4 h-32 w-32 rounded-full bg-primary/10 blur-[60px]" />
        <div className="pointer-events-none absolute top-1/2 left-1/3 h-20 w-20 rounded-full bg-primary/20 blur-2xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center px-12 text-center">
          {/* Logo */}
          <div className="mb-10 flex items-center gap-0.5">
            <span className="text-3xl font-heading text-foreground">Medi</span>
            <span className="text-3xl font-sans font-bold text-primary">
              Queue
            </span>
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
          <div className="mb-8 flex items-center gap-0.5 lg:hidden">
            <span className="text-2xl font-heading text-foreground">Medi</span>
            <span className="text-2xl font-sans font-bold text-primary">
              Queue
            </span>
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
              <span className="px-4 text-sm text-muted-foreground">
                Or continue with
              </span>
              <div className="flex-1 border-t border-border" />
            </div>

            {/* Google Button */}
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full gap-3"
              disabled={loading}
            >
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

export default SignInPage;
