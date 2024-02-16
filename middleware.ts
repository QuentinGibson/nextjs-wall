import { RateLimiter } from "limiter";
import { NextResponse } from "next/server";
import { setFlash } from "./app/lib/flash-toast";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
// const limiter = new RateLimiter({ tokensPerInterval: 1, interval: "second" });

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
