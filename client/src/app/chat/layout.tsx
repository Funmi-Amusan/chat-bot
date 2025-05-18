import MainHeader from "@/components/layout/MainHeader";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Chat Bot",
  description: "Chat with a bot cos why not",
  icons: {
    icon: '/icon.png', 
  },
};

export default async function RootLayout({
  children,
  sidebar,
}: Readonly<{
    children: React.ReactNode;
    sidebar: React.ReactNode;
}>) {

    const session = await auth();
  
    // if (!session) {
    //   redirect('/login');
    // }

  return (
    <div className="h-screen ">
          <main className="flex h-screen relative "> 
            <div className="absolute z-50 bg-white dark:bg-neutral-800 top-0 md:static md:flex flex-col h-full overflow-scroll ">
              {sidebar}
            </div>
            <div className="flex-grow ">
       <MainHeader />
              {children}
            </div>
          </main>
      </div>
  );
}
