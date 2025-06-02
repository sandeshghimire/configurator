import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";
import { ConfiguratorProvider } from "@/components/configurator-context";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} h-screen flex flex-col overflow-hidden`}>
        <ConfiguratorProvider>
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
          </div>
          <Footer />
        </ConfiguratorProvider>
      </body>
    </html>
  );
}
