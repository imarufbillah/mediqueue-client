"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Menu,
  User,
  LogOut,
  ChevronDown,
  Home,
  GraduationCap,
  PlusCircle,
  BookOpen,
  CalendarCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/tutors", label: "Tutors", icon: GraduationCap },
];

const AUTH_LINKS = [
  { href: "/add-tutor", label: "Add Tutor", icon: PlusCircle },
  { href: "/my-tutors", label: "My Tutors", icon: BookOpen },
  { href: "/my-bookings", label: "My Booked Sessions", icon: CalendarCheck },
];

const Navbar = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session?.user;
  const user = session?.user || { name: "User", image: null };

  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.refresh();
      toast.success("Signed out successfully. See you next time!");
    } catch (error) {
      toast.error("Failed to sign out. Please try again.");
    }
  };

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = isPending
    ? NAV_LINKS
    : isLoggedIn
      ? [...NAV_LINKS, ...AUTH_LINKS]
      : NAV_LINKS;

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/95 shadow-md backdrop-blur-lg border-b border-border/50"
          : "bg-background/80 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo size="lg" />

        {/* Center Navigation — Desktop */}
        <div className="hidden items-center md:max-lg:gap-0.5 gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative rounded-lg px-4 md:max-lg:px-2 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive(link.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="navbar-indicator"
                  className="absolute bottom-0.5 left-4 right-4 h-0.5 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <div className="max-md:hidden">
            <ThemeToggle />
          </div>

          {/* Loading State — Session Pending */}
          {isPending && (
            <div className="hidden items-center gap-3 sm:flex">
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
          )}

          {/* Logged Out State */}
          {!isPending && !isLoggedIn && (
            <div className="hidden items-center gap-3 sm:flex">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </div>
          )}

          {/* Logged In State — Avatar Dropdown */}
          {!isPending && isLoggedIn && (
            <div className="max-md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center gap-1.5 rounded-full outline-none transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="User menu"
                  >
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={36}
                        height={36}
                        className="size-9 rounded-full border-2 border-border object-cover"
                      />
                    ) : (
                      <div className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                        {getInitials(user.name)}
                      </div>
                    )}
                    <ChevronDown className="hidden size-3.5 text-muted-foreground sm:block" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2.5">
                      <User className="size-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="flex items-center gap-2.5 text-destructive focus:text-destructive"
                  >
                    <LogOut className="size-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {/* Mobile Hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="flex w-80 flex-col border-r border-border/50 bg-background/95 backdrop-blur-lg"
        >
          <SheetHeader className="border-b border-border/50 pb-5">
            <SheetTitle>
              <Logo size="md" link={false} />
            </SheetTitle>
          </SheetHeader>

          {/* User Profile Card — Logged In */}
          {!isPending && isLoggedIn && (
            <div className="border-b border-border/50 px-4 py-5">
              <div className="flex items-center gap-3">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="size-10 rounded-full border-2 border-primary/30 object-cover"
                  />
                ) : (
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {getInitials(user.name)}
                  </div>
                )}
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate text-sm font-semibold text-foreground">
                    {user.name}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-2 pt-4">
            <span className="mb-1 px-3 text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground">
              Navigation
            </span>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? "border-l-2 border-primary bg-accent text-primary"
                    : "border-l-2 border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <link.icon className="size-4.5 shrink-0" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="mt-auto border-t border-border/50 px-2 pt-4 pb-2">
            {/* Mobile Auth Buttons */}
            {!isPending && !isLoggedIn && (
              <div className="flex flex-col gap-2.5 px-2 pb-3">
                <Button variant="outline" size="lg" asChild>
                  <Link href="/sign-in" onClick={() => setMobileOpen(false)}>
                    Sign in
                  </Link>
                </Button>
                <Button size="lg" asChild>
                  <Link href="/sign-up" onClick={() => setMobileOpen(false)}>
                    Sign up
                  </Link>
                </Button>
              </div>
            )}

            {/* Mobile Loading State */}
            {isPending && (
              <div className="flex items-center gap-3 px-4 py-3">
                <Skeleton className="size-10 rounded-full" />
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-36" />
                </div>
              </div>
            )}

            {/* Mobile Logged In — Profile & Logout */}
            {!isPending && isLoggedIn && (
              <div className="flex flex-col gap-1 pb-2">
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <User className="size-4.5" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleSignOut();
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="size-4.5" />
                  Logout
                </button>
              </div>
            )}

            {/* Theme Toggle Row */}
            <div className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-2.5">
              <span className="text-xs font-medium text-muted-foreground">
                Appearance
              </span>
              <ThemeToggle />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
