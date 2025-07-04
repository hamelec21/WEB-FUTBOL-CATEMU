import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar"; // aquí tienes el navbar

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Futbol Catemu",
  description:
    "Fútbol amateur local en Catemu: resultados, tablas y noticias del campeonato Local",
  keywords: [
    "futbol",
    "catemu",
    "futbol amateur",
    "campeonato local",
    "resultados",
    "tablas",
    "noticias",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navbar /> {/* Descomenta esta línea para que aparezca */}
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
