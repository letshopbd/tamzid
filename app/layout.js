import localFont from "next/font/local";
import "./globals.css";

// Use Google Fonts via next/font/google or local if available.
// Original used Inter and Outfit from Google Fonts.
// I'll use next/font/google for better performance.
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: {
    default: "S. M. Tamzid Huda | AI Expert & Full Stack Developer",
    template: "%s | S. M. Tamzid Huda"
  },
  description: "Portfolio of S. M. Tamzid Huda - AI Expert, Web Developer & Digital Marketer. Showcasing projects, skills, and expertise in modern web technologies.",
  keywords: ["Tamzid Huda", "Web Developer", "AI Expert", "Next.js", "React", "Portfolio", "Full Stack"],
  authors: [{ name: "S. M. Tamzid Huda" }],
  icons: {
    icon: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },
  openGraph: {
    title: "S. M. Tamzid Huda | AI Expert & Full Stack Developer",
    description: "Explore the portfolio of S. M. Tamzid Huda, featuring innovative web projects and AI solutions.",
    url: 'https://tamzid-portfolio.com', // Replace with actual URL if known, or leave generic
    siteName: 'Tamzid Portfolio',
    images: [
      {
        url: '/images/og-image.jpg', // Ensure this image exists or use a placeholder
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "S. M. Tamzid Huda | Portfolio",
    description: "AI Expert, Web Developer & Digital Marketer.",
    images: ['/images/og-image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
