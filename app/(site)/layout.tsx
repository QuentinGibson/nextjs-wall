import React from "react";
import Navigation from "../ui/Navigation/Navigation";
import UserButtons from "../ui/UserButtons/UserButtons";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Navigation userButtons={<UserButtons />}>{children}</Navigation>;
}
