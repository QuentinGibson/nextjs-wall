import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/auth";
import Navigation from "@/app/ui/Navigation/Navigation";

export const metadata: Metadata = {
  title: "Wall of Love",
  description: "Quentin Gibson's Portfolio",
};

export async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="">{children}</div>;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" data-theme="valentine">
      <body>{children}</body>
    </html>
  );
}
