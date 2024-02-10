import { auth, signOut } from "@/auth";
import Link from "next/link";

export default async function UserButtons() {
  const session = await auth();
  const handleSignOut = async () => {
    "use server";
    await signOut();
  };
  const linkClass = `ml-2 md:ml-0 link-primary`;
  return session?.user ? (
    <>
      <li>
        <form className={linkClass} action={handleSignOut}>
          <button type="submit">Logout</button>
        </form>
      </li>
      <li>
        <Link className={linkClass} href={"/profile"}>
          Profile
        </Link>
      </li>
      <li>
        <Link className={`${linkClass} link-secondary`} href={"/newpost"}>
          Write a Post
        </Link>
      </li>
    </>
  ) : (
    <>
      <li>
        <Link className={linkClass} href={"/login"}>
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
