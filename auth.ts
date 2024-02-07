import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import { z } from "zod";
import { getUser } from "./app/lib/actions";
import { authConfig } from "./auth.config";
import Google from "@auth/core/providers/google";
import CredentialsProvider from "@auth/core/providers/credentials";
import prisma from "./app/lib/prisma";
import { setFlash } from "./app/lib/flash-toast";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60, // 3 days
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.endsWith("/login")) {
        return `${baseUrl}/home`;
      }
      return url;
    },
  },
  events: {
    createUser: async () => {
      setFlash({ type: "success", message: "User created!" });
    },
    signIn: async () => {
      setFlash({ type: "success", message: "Log in successfully!" });
    },
    signOut: async () => {
      setFlash({ type: "success", message: "Logged out!" });
    },
    linkAccount: async () => {
      setFlash({ type: "success", message: "Account linked successfully!" });
    },
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;

          const user = await getUser(username);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log(`Passwords match: ${passwordsMatch}`);
          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials!");
        return null;
      },
    }),
  ],
});
