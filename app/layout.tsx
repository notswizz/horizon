import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Horizon Energy South",
    title: "Horizon Energy South | Free Home Energy Upgrades in Georgia",
    description:
      "Free home energy upgrades for Georgia homeowners through the Georgia Home Energy Rebates program. Energy audits, weatherization, insulation, and rebate assistance.",
    url: "https://horizonenergysouth.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Horizon Energy South | Free Home Energy Upgrades in Georgia",
    description:
      "Free home energy upgrades for Georgia homeowners through the Georgia Home Energy Rebates program.",
  },
  metadataBase: new URL("https://horizonenergysouth.com"),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Horizon Energy South",
  description:
    "Free home energy upgrades for Georgia homeowners through the Georgia Home Energy Rebates program.",
  url: "https://horizonenergysouth.com",
  telephone: "+14044466668",
  email: "info@horizonenergysouth.com",
  address: {
    "@type": "PostalAddress",
    addressRegion: "GA",
    addressCountry: "US",
  },
  areaServed: [
    "Bibb County, GA",
    "Clayton County, GA",
    "Crawford County, GA",
    "DeKalb County, GA",
    "Fulton County, GA",
    "Jones County, GA",
    "Monroe County, GA",
    "Twiggs County, GA",
  ],
  serviceType: [
    "Home Energy Audits",
    "Weatherization",
    "Insulation",
    "Rebate Assistance",
  ],
  priceRange: "Free for qualifying homeowners",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
