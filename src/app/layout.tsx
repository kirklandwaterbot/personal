import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { portfolioData } from "@/data/portfolio";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://norman-mei.vercel.app";

const { profile } = portfolioData;
const pageTitle = `${profile.name} — ${profile.title}`;
const pageDescription = profile.summary;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: pageTitle,
    template: `%s — ${profile.name}`,
  },
  description: pageDescription,
  applicationName: `${portfolioData.osName} Portfolio`,
  authors: [{ name: profile.name }],
  creator: profile.name,
  keywords: [
    profile.name,
    "accountancy",
    "accounting intern",
    "Baruch College",
    "Zicklin School of Business",
    "QuickBooks",
    "Drake Tax",
    "bookkeeping",
    "tax preparation",
    "portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    url: siteUrl,
    siteName: `${profile.name} Portfolio`,
    title: pageTitle,
    description: pageDescription,
    firstName: profile.name.split(" ")[0],
    lastName: profile.name.split(" ").slice(1).join(" "),
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
