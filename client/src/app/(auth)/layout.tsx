// app/(auth)/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../globals.css";
import AuthCarousel from "@/components/AuthCarousel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chat Bot - Authentication",
  description: "Chat with a bot cos why not",
  icons: {
    icon: '/icon.png', 
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="grid grid-cols-2">
          <div className="flex items-center justify-center">
            {children}
          </div>
          <AuthCarousel />
        </div>
      </body>
    </html>
  );
}