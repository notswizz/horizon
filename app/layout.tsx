import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/chat/Chatbot";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Horizon Energy South | Free Home Energy Upgrades in Georgia",
    template: "%s | Horizon Energy South",
  },
  description:
    "Free home energy upgrades for Georgia homeowners through the Georgia Home Energy Rebates program. Energy audits, weatherization, insulation, and rebate assistance.",
  keywords: [
    "home energy audit",
    "weatherization",
    "insulation",
    "Georgia rebates",
    "energy efficiency",
    "free home upgrades",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
