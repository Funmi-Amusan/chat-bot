import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat Bot",
  description: "Chat with a bot cos why not",
  icons: {
    icon: '/icon.png', 
  },
};

export default function RootLayout({
  children,
  sidebar,
}: Readonly<{
    children: React.ReactNode;
    sidebar: React.ReactNode;
}>) {
  return (
    <div className="h-screen">
          <main className="grid grid-cols-2 lg:grid-cols-[300px_1fr] h-screen lg:gap-4 "> 
            <div className="hidden lg:flex flex-col h-full overflow-scroll ">
              {sidebar}
            </div>
            <div className=" ">
              {children}
            </div>
          </main>
      </div>
  );
}
