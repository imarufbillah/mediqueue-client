"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Check, X, Info, Star, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import GoogleAuth from "@/components/auth/GoogleAuth";
import { Logo } from "@/components/Logo";

const STRENGTH_LABELS = ["", "Weak", "Medium", "Strong", "Strongest"];
const STRENGTH_COLORS = [
  "",
  "bg-destructive",
  "bg-yellow-500",
  "bg-green-500",
  "bg-emerald-500",
];

export const SignUpClient = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Password strength checks
  const isLongEnough = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const PASSWORD_CHECKS = [
    { label: "At least 6 characters", passed: isLongEnough },
    { label: "One uppercase letter", passed: hasUppercase },
    { label: "One lowercase letter", passed: hasLowercase },
    { label: "One number", passed: hasNumber },
  ];

  const STRENGTH_LEVEL = isLongEnough + hasUppercase + hasLowercase + hasNumber;

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Full name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (photoUrl && !/^https?:\/\/.+\..+/.test(photoUrl)) {
      newErrors.photoUrl = "Please enter a valid URL";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!isLongEnough) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!hasUppercase) {
      newErrors.password = "Password must contain an uppercase letter";
    } else if (!hasLowercase) {
      newErrors.password = "Password must contain a lowercase letter";
    } else if (!hasNumber) {
      newErrors.password = "Password must contain a number";
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

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        image: photoUrl.trim() || undefined,
      });

      if (error) {
        toast.error(error.message || "Registration failed. Please try again.");
        return;
      }

      toast.success("Account created successfully!");
      router.push("/sign-in");
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
          <div className="mb-10">
            <Logo size="xl" link={false} />
          </div>

          {/* Display heading */}
          <h2 className="mb-4 max-w-sm font-heading text-3xl leading-tight tracking-tight text-foreground xl:text-4xl">
            Join thousands of students finding their perfect tutor.
          </h2>
          <p className="max-w-xs text-base text-muted-foreground">
            Create your free account and start learning with the best tutors
            today.
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
            &ldquo;I found an amazing chemistry tutor within minutes. The
            booking process was seamless.&rdquo;
          </p>
          <span className="text-xs font-medium text-foreground">
            — Alex R., Engineering Student
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
            Create your account
          </h1>
          <p className="mb-10 text-base text-muted-foreground">
            Start booking sessions in minutes.
          </p>

          {/* Form */}
          <form onSubmit={handleSignUp} className="flex flex-col gap-5">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  clearFieldError("name");
                }}
                autoComplete="name"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

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

            {/* Photo URL */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5">
                <Label htmlFor="photo">Photo URL</Label>
                <div className="group relative">
                  <Info className="size-3.5 cursor-help text-muted-foreground" />
                  <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-48 -translate-x-1/2 rounded-lg border border-border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-md opacity-0 transition-opacity group-hover:opacity-100">
                    Paste an image URL from any public source
                  </div>
                </div>
              </div>
              <Input
                id="photo"
                type="url"
                placeholder="https://..."
                value={photoUrl}
                onChange={(e) => {
                  setPhotoUrl(e.target.value);
                  clearFieldError("photoUrl");
                }}
                aria-invalid={!!errors.photoUrl}
              />
              {errors.photoUrl && (
                <p className="text-sm text-destructive">{errors.photoUrl}</p>
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
                  autoComplete="new-password"
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

              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <div className="mt-1 flex items-center gap-3">
                  <div className="flex flex-1 gap-1.5">
                    {[1, 2, 3, 4].map((level) => (
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
                            : STRENGTH_LEVEL === 3
                              ? "text-green-500"
                              : "text-emerald-500"
                      }`}
                    >
                      {STRENGTH_LABELS[STRENGTH_LEVEL]}
                    </span>
                  )}
                </div>
              )}

              {/* Password Requirements Checklist */}
              {password.length > 0 && (
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
                          check.passed
                            ? "text-green-500"
                            : "text-muted-foreground"
                        }`}
                      >
                        {check.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="mt-2 w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
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

          {/* Sign in link */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/sign-in"
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
