import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/auth";
import { FlashToaster } from "./lib/flash-toast";

export const metadata: Metadata = {
  title: "Wall of Love",
  description: "Quentin Gibson's Portfolio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="valentine">
      <body>{children}</body>
      <FlashToaster />
    </html>
  );
}
