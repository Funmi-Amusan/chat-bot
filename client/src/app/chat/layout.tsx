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
    const userId = session?.user?.id;
  
    if (!userId) {
      redirect('/login');
    }

  return (
    <div className="h-screen">
          <main className="flex h-screen lg:gap-4 relative "> 
            <div className="hidden lg:flex flex-col h-full overflow-scroll ">
              {sidebar}
            </div>
            <div className="flex-grow ">
              {children}
            </div>
          </main>
      </div>
  );
}
