import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Rainbound",
  description: "Acompanhe suas leituras",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col bg-secondary">
        <Navbar />
        <div className="flex-1">{children}</div>
        <div className="shrink-0">
          <Footer />
        </div>
      </body>
    </html>
  );
}
