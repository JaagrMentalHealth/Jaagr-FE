import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/contexts/userContext";
import { useUser } from "@/contexts/userContext";
import { GoogleAnalytics } from '@next/third-parties/google'
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <UserProvider>
          {children}
          <Toaster />
        </UserProvider>
      </body>
      <GoogleAnalytics gaId="G-YLB2EJJWK3" />
    </html>
  );
}
