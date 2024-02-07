import { auth, signOut } from "@/auth";
import Link from "next/link";

export default async function UserButtons() {
  const session = await auth();
  const handleSignOut = async () => {
    "use server";
    await signOut();
  };
  return session?.user ? (
    <>
      <li>
        <form className="ml-2 link-primary" action={handleSignOut}>
          <button type="submit">Logout</button>
        </form>
      </li>
      <li>
        <Link className={`ml-2 link-primary`} href={"/profile"}>
          Profile
        </Link>
      </li>
    </>
  ) : (
    <>
      <li>
        <Link className={`ml-2 link-primary`} href={"/login"}>
          Log In
        </Link>
      </li>
      <li>
        <Link className={`ml-2 link-secondary `} href={"/signup"}>
          Sign Up
        </Link>
      </li>
    </>
  );
}
