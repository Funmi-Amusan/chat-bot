import type { Metadata } from "next";
import { Inter, Ubuntu } from "next/font/google";
import "./globals.css";
import StoreProvider from "./storeProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ToastContainer } from 'react-toastify';
import CustomToastContainer from "@/components/ui/CustomToast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: "700",
});

export const metadata: Metadata = {
  title: "Chat Bot",
  description: "Chat with a bot cos why not",
  icons: {
    icon: '/icon.png', 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" >
      <body
        className={`${inter.variable} ${ubuntu.variable} antialiased`}
      >
        <ThemeProvider>
      <StoreProvider>
     <CustomToastContainer />
        {children}
        </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
