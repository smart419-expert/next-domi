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
    <html lang="en" className={`${inter.variable} light`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'light';
                  if (theme === 'dark') {
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  // Ignore errors during SSR
                }
              })();
            `,
          }}
        />
      </head>
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
