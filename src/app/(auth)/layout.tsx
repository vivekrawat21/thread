import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import '../globals.css';
export const metadata = {
    title: 'Threads',
    description:' A Next.js 13 Meta Threads Application clone'
}
const inter = Inter({subsets: ["latin"]})
export default function RootLayout({
    children
}: {
    children : React.ReactNode
 }){
    return (
    <ClerkProvider>
        <html>
            <body className={`${inter.className} bg-dark-1`}>
                {children}
            </body>
        </html>
    </ClerkProvider>
    )
}