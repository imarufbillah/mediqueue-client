"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, User, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
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
import { authClient } from "@/lib/auth-client";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tutors", label: "Tutors" },
];

const AUTH_LINKS = [
  { href: "/add-tutor", label: "Add Tutor" },
  { href: "/my-tutors", label: "My Tutors" },
  { href: "/my-bookings", label: "My Booked Sessions" },
];

const Navbar = () => {
  const { data: session } = authClient.useSession();
  console.log(session);
  const isLoggedIn = !!session?.user;

  const user = session?.user || { name: "User", image: null };

  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = isLoggedIn ? [...NAV_LINKS, ...AUTH_LINKS] : NAV_LINKS;

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
        <Link
          href="/"
          className="flex items-center gap-0.5 transition-opacity duration-200 hover:opacity-80"
        >
          <span className="text-2xl font-heading text-foreground">Medi</span>
          <span className="text-2xl font-sans font-bold text-primary">
            Queue
          </span>
        </Link>

        {/* Center Navigation — Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
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
          <ThemeToggle />

          {/* Logged Out State */}
          {!isLoggedIn && (
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
          {isLoggedIn && (
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
                <DropdownMenuItem className="flex items-center gap-2.5 text-destructive focus:text-destructive">
                  <LogOut className="size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
          className="w-80 border-r border-border/50 bg-background/95 backdrop-blur-lg"
        >
          <SheetHeader className="border-b border-border/50 pb-5">
            <SheetTitle className="flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-lg font-heading text-foreground">Medi</span>
              <span className="text-lg font-sans font-bold text-primary">
                Queue
              </span>
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-1 pt-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-4 py-3 text-base font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? "bg-accent text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Auth Buttons */}
          {!isLoggedIn && (
            <div className="mt-8 flex flex-col gap-3 border-t border-border/50 pt-8">
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

          {/* Mobile Logged In */}
          {isLoggedIn && (
            <div className="mt-8 flex flex-col gap-1 border-t border-border/50 pt-8">
              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <User className="size-5" />
                Profile
              </Link>
              <button className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-destructive hover:bg-destructive/10">
                <LogOut className="size-5" />
                Logout
              </button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
