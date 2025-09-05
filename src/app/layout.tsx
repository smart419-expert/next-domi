import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "./providers";
import { LayoutProvider } from "@/components/layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Customer Communication Platform",
  description: "A comprehensive platform for customer communication and management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Providers>
          <LayoutProvider>
            {children}
          </LayoutProvider>
        </Providers>
      </body>
    </html>
  );
}
