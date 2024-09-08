import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Provider } from "@/Provider";
import { Toaster } from "@/components/ui/sonner";
import { ChatOverlay } from "@/components/ChatOverlay";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GIC SuperTrader",
  description: "Hackathon project for GIC Code to Impact",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors position="bottom-left" />
            <ChatOverlay />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
