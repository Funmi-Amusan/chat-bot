import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chat Bot",
  description: "Chat with a bot cos why not",
  icons: {
    icon: '/icon.png', 
  },
};

export default function RootLayout({
  carousel,
  signupForm,
}: Readonly<{
  children: React.ReactNode
  carousel: React.ReactNode;
  loginForm: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          {/* <main>{children}</main> */}
          <div className="grid grid-cols-2">
            {signupForm}
            {carousel}
          </div>
      </body>
    </html>
  );
}
