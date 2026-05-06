import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import favicon from "./favicon.png";

import "./globals.css";

import Header from "@/shared/components/layout/Header";

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
    default: "MPC Organization",
    template: "%s | MPC Web",
  },
  description: "MPC Web application",
  icons: {
    icon: favicon.src,
    shortcut: favicon.src,
    apple: favicon.src,
  },
};

const rootClassName = `${geistSans.variable} ${geistMono.variable} h-full overflow-x-hidden antialiased`;
const bodyClassName = "flex min-h-full flex-col overflow-x-hidden";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={rootClassName}>
      <body className={bodyClassName}>
        <Header />
        <main className="flex-1 pt-16">{children}</main>
      </body>
    </html>
  );
}
