import type { Metadata } from "next";
import StoreProvider from "../../storeProvider";

export const metadata: Metadata = {
  title: "Chat Bot",
  description: "Chat with a bot cos why not",
  icons: {
    icon: '/icon.png', 
  },
};

export default function RootLayout({
  sidebar,
  chatWindow,
}: Readonly<{
  sidebar: React.ReactNode;
  chatWindow: React.ReactNode;
}>) {
  return (
    <div className="h-screen">
      <StoreProvider>
          <main className="grid grid-cols-2 lg:grid-cols-[300px_1fr] h-screen lg:gap-4 "> 
            <div className="hidden lg:flex flex-col h-full overflow-scroll ">
              {sidebar}
            </div>
            <div className="">
              {chatWindow}
            </div>
          </main>
        </StoreProvider>
      </div>
  );
}
