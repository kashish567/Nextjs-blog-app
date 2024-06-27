import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BLOGZEE APP",
  description: "A blog app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#FDC5F5]">
        <div className="bg-[#FDC5F5]">
          <div>
            <Header />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
