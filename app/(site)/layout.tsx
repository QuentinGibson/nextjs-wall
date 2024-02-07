import React from "react";
import Navigation from "../ui/Navigation/Navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Navigation>{children}</Navigation>;
}
