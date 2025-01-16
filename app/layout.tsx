import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Montserrat} from 'next/font/google'
const montserrat = Montserrat({weight:['300' , '400' , '700'], subsets:['latin']})
export const metadata: Metadata = {
  title: "Gaming social",
  description: "this is a gaming web site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} dark antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
