import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  secret: process.env.SECRET,
} satisfies NextAuthConfig;
