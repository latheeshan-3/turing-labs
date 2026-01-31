import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatBot } from "@/components/ai/ChatBot";
import { MobileNav } from "@/components/layout/MobileNav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Turing Labs | Artificial Intelligence Solutions",
  description: "We Build Intelligent Systems for the Future of Business. AI Automation, AI Agents & Enterprise-Grade Innovation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.variable,
          poppins.variable,
          "antialiased font-sans bg-background text-foreground"
        )}
      >
        <Navbar />
        <main className="min-h-screen pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <ChatBot />
        <MobileNav />
      </body>
    </html>
  );
}
