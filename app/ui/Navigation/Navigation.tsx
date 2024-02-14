"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

const Navlinks = [
  { label: "Home", route: "/home" },
  { label: "About", route: "/about" },
  { label: "Contact", route: "/contact" },
];

export default function Navigation({
  children,
  userButtons,
}: {
  children: React.ReactNode;
  userButtons: React.ReactNode;
}) {
  const drawerRef = useRef<HTMLInputElement>(null);
  return (
    <div className="drawer">
      <input
        id="my-drawer-3"
        type="checkbox"
        className="drawer-toggle"
        ref={drawerRef}
      />
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
              <Link className="relative" href={"/home"}>
                <Image
                  src={"/qg-logo.svg"}
                  height={80}
                  width={50}
                  alt={"Logo"}
                />
              </Link>
            </div>
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {Navlinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.route}>{link.label}</Link>
                </li>
              ))}
              {userButtons}
            </ul>
          </div>
        </div>
        {/* Page content here */}
        <main className="py-8">{children}</main>
      </div>
      <div className="drawer-side">
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          <li className="w-10">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            >
              <div className="flex justify-center items-center">X</div>
            </label>
          </li>

          {/* Sidebar content here */}
          {Navlinks.map((link, index) => (
            <li key={index}>
              <Link
                className="ml-2"
                href={link.route}
                onClick={(e) => {
                  if (drawerRef.current) {
                    drawerRef.current.checked = false;
                  }
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
          {userButtons}
        </ul>
      </div>
    </div>
  );
}
