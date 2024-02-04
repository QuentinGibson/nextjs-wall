import { z } from "zod";

export const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Name must be more than 3 characters" })
      .max(30, { message: "Name must be less than 30 characters" }),
    email: z
      .string()
      .email()
      .max(100, { message: "Email must be less than 100 characters" }),
    password: z
      .string()
      .min(6, { message: "Password must be more than 6 characters" })
      .max(30, { message: "Password must be less than 30 characters" }),
    passwordConfirmation: z.string().min(6).max(30),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });
