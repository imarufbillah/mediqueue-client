import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import {
  DM_Serif_Display,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/providers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  subsets: ["latin"],
  weight: "400",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | MediQueue",
    default: "MediQueue - Tutor Booking System",
  },
  description:
    "MediQueue is a tutor booking system designed to connect students with qualified tutors in various subjects. Our platform allows students to easily find and book tutoring sessions, while providing tutors with a convenient way to manage their schedules and connect with potential clients.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${plusJakartaSans.variable} ${jetBrainsMono.variable} antialiased`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="transition-colors duration-300">
        <ThemeProvider>
          <TooltipProvider delayDuration={300}>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster position="top-right" richColors closeButton />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
