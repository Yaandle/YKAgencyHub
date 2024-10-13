import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import UserTypeSelection from "@/components/UserTypeSelection";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MYConnect",
  description: "MY Connect",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <UserTypeSelection>
            {children}
          </UserTypeSelection>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
