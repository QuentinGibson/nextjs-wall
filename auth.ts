import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import { z } from "zod";
import { getUser } from "./app/lib/actions";
import { authConfig } from "./auth.config";
import Google from "@auth/core/providers/google";
import CredentialsProvider from "@auth/core/providers/credentials";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  ...authConfig,
  providers: [
    Google,
    CredentialsProvider({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
