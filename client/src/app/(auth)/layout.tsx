import type { Metadata } from "next";
import "./../globals.css";
import AuthCarousel from "@/components/auth/AuthCarousel";

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
  <>
    <div className="min-h-screen w-full flex flex-col lg:grid lg:grid-cols-2">
    <div className="flex-1 w-full flex items-center justify-center">
      {children}
    </div>
    <div className="hidden lg:block">
      <AuthCarousel />
    </div>
  </div>
  </>
  
  );
}