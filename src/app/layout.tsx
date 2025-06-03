import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";
import { ConfiguratorProvider } from "@/components/configurator-context";
import { ErrorBoundary } from "@/components/error-boundary";
import { LoadingProvider } from "@/components/loading-system";
import { PageTransition } from "@/components/animated";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SOC Product Configurator - Embedded System Configuration Tool",
  description: "Configure your embedded system requirements with our intelligent product configurator. Get personalized recommendations for SOC platforms, operating systems, and development tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans h-screen flex flex-col overflow-hidden text-sm`}>
        <ErrorBoundary>
          <LoadingProvider>
            <ConfiguratorProvider>
              <Header />
              <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-auto bg-gray-50">
                  <PageTransition>
                    {children}
                  </PageTransition>
                </main>
              </div>
              <Footer />
            </ConfiguratorProvider>
          </LoadingProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
