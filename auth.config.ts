import type { NextAuthConfig } from "next-auth";

const protectedRoutes = [
  "/profile",
  "/newpost",
  "/editpost",
  "/editprofile",
  "/auth",
];

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isLoggedin = !!auth?.user;
      const nextPathName = nextUrl?.pathname;
      const isOnProtectedPage = protectedRoutes.some((route) =>
        route.startsWith(nextPathName)
      );
      if (isOnProtectedPage) {
        if (isLoggedin) return true;
        return false;
      }
      return true;
    },
  },
  providers: [],
  secret: process.env.SECRET,
} satisfies NextAuthConfig;
