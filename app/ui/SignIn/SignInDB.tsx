import { auth } from "@/auth";
import SignIn from "./SignIn";
import { SessionProvider } from "next-auth/react";

export default async function SignInDB() {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <SignIn />
    </SessionProvider>
  );
}
