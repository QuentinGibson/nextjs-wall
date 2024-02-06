import React from "react";
import Navigation from "../ui/Navigation/Navigation";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider>
      <Navigation session={session}>{children}</Navigation>
    </SessionProvider>
  );
}
