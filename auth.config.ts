import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import prisma from "./app/lib/prisma";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  adapter: PrismaAdapter(prisma),
  providers: [],
  secret: process.env.SECRET,
} satisfies NextAuthConfig;
