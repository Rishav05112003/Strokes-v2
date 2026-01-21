import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
}); 


export const metadata: Metadata = {
  title: "STROKES-NITD",
  description: "The official Art and Photography club of NIT Durgapur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Add both font variables to the html tag
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased bg-black text-white selection:bg-[#d4af37] selection:text-black">
        {children}
      </body>
    </html>
  );
}