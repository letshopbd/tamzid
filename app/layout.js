import localFont from "next/font/local";
import "./globals.css";

// Use Google Fonts via next/font/google or local if available.
// Original used Inter and Outfit from Google Fonts.
// I'll use next/font/google for better performance.
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });

export const metadata = {
  title: "Mr Huda",
  description: "Portfolio of S. M. Tamzid Huda - AI Expert, Web Developer & Digital Marketer",
  icons: {
    icon: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
