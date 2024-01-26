import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import TopBar from "@/component/shared/TopBar";
import RightSidebar from "@/component/shared/RightSidebar";
import BottomBar from "@/component/shared/BottomBar";
import LeftSidebar from "@/component/shared/LeftSidebar";



const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: 'Threads',
  description:' A Next.js 13 Meta Threads Application clone'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return(
  
  <html>
    <ClerkProvider>
      <body className={`${inter.className} bg-dark-1`}>
        <TopBar />
        <main className="flex flex-row">
          <LeftSidebar />
          <section className="main-container">
            <div className="w-full max-w-4xl">
            {children}
            </div>
          
          </section>
          
          <RightSidebar />
          </main>
         <BottomBar />
      </body>
      </ClerkProvider>
  </html>

  );
}
