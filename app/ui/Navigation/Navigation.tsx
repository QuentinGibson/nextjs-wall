import Link from "next/link";
import { Session } from "next-auth";

const Navlinks = [
  { label: "Home", route: "/" },
  { label: "About", route: "/about" },
  { label: "Contact", route: "/contact" },
];

export default async function Navigation({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-100">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            <div className="flex flex-col">
              <p>Quentin Gibson</p>
              <p>Portfolio</p>
            </div>
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {Navlinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.route}>{link.label}</Link>
                </li>
              ))}
              {session ? (
                <>
                  <li>
                    <Link className={`ml-2 link-primary`} href={"/login"}>
                      Log Out
                    </Link>
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
              )}
            </ul>
          </div>
        </div>
        {/* Page content here */}
        <main className="py-8">{children}</main>
      </div>
      <div className="drawer-side">
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          <div className="flex">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay btn btn-square btn-ghost"
            >
              X
            </label>
          </div>

          {/* Sidebar content here */}
          {Navlinks.map((link, index) => (
            <li key={index}>
              <Link className="ml-2" href={link.route}>
                {link.label}
              </Link>
            </li>
          ))}
          {session ? (
            <>
              <li>
                <Link className={`ml-2 link-primary`} href={"/login"}>
                  Log Out
                </Link>
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
          )}
        </ul>
      </div>
    </div>
  );
}
